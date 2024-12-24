import { Request, Response } from 'express';
import prisma from '@/prisma';
import { compare, hash } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { transporter } from '@/helpers/nodemailer';
import path from 'path';
import fs from 'fs';
import handlebars from 'handlebars';
import { v4 as uuidv4 } from 'uuid';
import dayjs from 'dayjs';
import { existingUserById, existingUserByMail, existingUserByUserToken, existingVerifiedUser } from '@/services/existing-data/user.exist';
import { setDataPassUser, updatePassUser, updateRefreshToken, updateVerifyUserByUserId, updateVerifyUserByVerifyToken } from '@/services/update-data/user.update';
import { createNewUser, createVerifyUser } from '@/services/create-data/user.create';
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from '@/helpers/jwtToken';
const verifyToken = uuidv4();
const verifyTokenExp = dayjs().add(1, 'hour').toDate();

export class AuthController {
  async registerUserWithMail(req: Request, res: Response) {
    const { username, mail } = req.body;
    try {
      const existingMail = await existingUserByMail(mail);
      if (existingMail) {
        const userIsVerified = await existingVerifiedUser(existingMail.id);
        if(userIsVerified?.verified == true ) throw new Error('Email already exists!'); 
        if(userIsVerified?.verified == false && dayjs().isBefore(dayjs(userIsVerified.tokenExp))) throw new Error('Email already sent, please try again 1 hour after the previous email was sent');
      }
      const newUser = await createNewUser(username, mail);
      if(existingMail) {
        await updateVerifyUserByUserId(newUser.id, verifyToken, verifyTokenExp)
      } else {
        await createVerifyUser(newUser.id, verifyToken, verifyTokenExp)
      }
      const templatePath = path.join( __dirname,'../templates/verificationMail.hbs' );
      const tempalteSource = fs.readFileSync(templatePath, 'utf-8');
      const compiledTemplate = handlebars.compile(tempalteSource);
      const html = compiledTemplate({ username, link: `${process.env.FRONTEND_URL}/auth/set-password/${newUser.id}/${verifyToken}`});
      transporter.sendMail(
        {
          from: process.env.MAIL_USER,
          to: mail,
          subject: 'Email Confirmation and set password',
          html: html,
        },
        (err) => {
          if (err) throw 'Error sending email';
          return res.status(200).send({
            status: 'ok',
            message:
              'Please check your email to set password/confirm your account',
            verifyToken,
          });
        },
      ); 
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : error as string;
      return res.status(500).send({ status: 'error',error: errorMessage });
    }
  }
  async setPassword(req: Request, res: Response) {
    const { userId, verifyToken, password } = req.body;
    try {
      const registerUser = await existingUserById(userId)
      const resetPassUser = await existingUserByUserToken(verifyToken)
      if (!registerUser ) throw 'user not found !';
      const hashedPassword = await hash(password, 10);
      if (resetPassUser) {
        await setDataPassUser(verifyToken, hashedPassword)
      }
      if (registerUser) {
        await updatePassUser(registerUser.id, hashedPassword);
        await updateVerifyUserByVerifyToken(verifyToken)
      }

      return res.status(200).send({
        status: 'ok',
        message: 'Password set successfully, you can now login',
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : error as string;
      return res.status(500).send({ status: 'error',error: errorMessage });
    }
  }
  async loginWithMail(req: Request, res: Response) {
    try {
      const { mail, password } = req.body;
      const existingUser = await existingUserByMail(mail);
      if (!existingUser) throw 'user not found !';
      if (existingUser.password === null)
        throw 'Please login with google if you dont have a password';
      const isValidPass = await compare(password, existingUser.password);
      if (!isValidPass) throw 'incorrect password !';
      const accessToken = await generateAccessToken(existingUser.id, existingUser.role);
      const refreshToken = await generateRefreshToken(existingUser.id, existingUser.role);
      await updateRefreshToken(existingUser.id, refreshToken);
      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        maxAge: 30 * 24 * 60 * 60 * 1000,
      }).status(200)
        .send({ status: 'ok', message: 'login success !', data: { user: existingUser, accessToken } });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : error as string;
      return res.status(500).send({ status: 'error',error: errorMessage });
    }
  }
  async refreshToken(req: Request, res: Response) {
    try {
      const { refreshToken } = req.cookies;
      if (!refreshToken) throw new Error("refresh token not found");
      const decoded = await verifyRefreshToken(refreshToken);
      const user = await existingUserById(decoded.id);
      // penanganan bisa juga dengan di logoutkan
      if (!user || user.refreshToken !== refreshToken)throw new Error("invalid refresh token");
      const newAccessToken = await generateAccessToken(user.id, user.role);
      const newRefreshToken = await generateRefreshToken(user.id, user.role);
      await updateRefreshToken(user.id, newRefreshToken);

      res.cookie("refreshToken", newRefreshToken, {
          httpOnly: true,
        }).send({ status: 'ok', message: "refresh token success", accessToken: newAccessToken });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : error as string;
      return res.status(500).send({ status: 'error',error: errorMessage });
    }
  }
  async logoutUser(req: Request, res: Response) {
    const { refreshToken } = req.cookies;
    try {
      if (!refreshToken) throw 'no user is logged in !';
      const decoded = await verifyRefreshToken(refreshToken);
      await updateRefreshToken(decoded.id, null);
      res.clearCookie('refreshToken').status(201).send({ status: 'ok', message: 'logout success !' });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : error as string;
      return res.status(500).send({ status: 'error',error: errorMessage });
    }
  }
}
