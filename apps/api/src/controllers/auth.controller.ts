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
import { setDataPassUser, updatePassUser, updateVerifyUserByUserId, updateVerifyUserByVerifyToken } from '@/services/update-data/user.update';
import { createNewUser, createVerifyUser } from '@/services/create-data/user.create';
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
      if (error instanceof Error) { 
        res.status(400).send({ status: 'error', message: error.message});
      } else {
        res.status(400).send({ status: 'error', message: error });
      }
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
      if (error instanceof Error) { 
        res.status(400).send({ status: 'error', message: error.message, });
      } else {
        res.status(400).send({ status: 'error', message: error, });
      }
    }
  }

  // async loginWithMail(req: Request, res: Response) {
  
  //   try {
  //     const { email, password } = req.body;
  //     const existingUser = await prisma.user.findUnique({
  //       where: { email: email },
  //     });
  //     if (!existingUser) throw 'user not found !';
  //     if (existingUser.password === null)
  //       throw 'Please login with google if you dont have a password';
  //     const isValidPass = await compare(password, existingUser.password);
  //     if (!isValidPass) throw 'incorrect password !';
  //     const payload = {
  //       id: existingUser.id,
  //       username: existingUser.username,
  //       email: existingUser.email,
  //       role: existingUser.role,
  //     };
  //     const loginToken = sign(payload, process.env.JWT_SECRET!, {
  //       expiresIn: '30d',
  //     });
  //     res.cookie('loginToken', loginToken, {
  //       httpOnly: true,
  //       maxAge: 30 * 24 * 60 * 60 * 1000,
  //     });
  //     res.cookie('role', existingUser.role);

  //     res
  //       .status(200)
  //       .send({ status: 'ok', message: 'login success !', data: existingUser });
  //   } catch (error) {
  //     if (error instanceof Error) {
  //       res.status(400).send({ status: 'error', message: error.message });
  //     }
  //     res.status(400).send({ status: 'error', message: error });
  //   }
  // }
  // async logoutUser(req: Request, res: Response) {
  //   try {
  //     const loginToken = req.cookies.loginToken;
  //     if (!loginToken) throw 'no user is logged in !';
  //     res.clearCookie('loginToken');
  //     res.clearCookie('role');
  //     res.status(201).send({ status: 'ok', message: 'logout success !' });
  //   } catch (error) {
  //     if (error instanceof Error) {
  //       res.status(400).send({ status: 'error', message: error.message });
  //     }
  //     res.status(400).send({ status: 'error', message: error });
  //   }
  // }
}
