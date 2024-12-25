import { Request, Response } from 'express';
import { transporter } from '@/helpers/nodemailer';
import path from 'path';
import fs from 'fs';
import handlebars from 'handlebars';
import { v4 as uuidv4 } from 'uuid';
import dayjs from 'dayjs';
import { existingUserByMail, existingVerifiedUser } from '@/services/existing-data/user.exist';
import { updateUserToken } from '@/services/update-data/user.update';
const userToken = uuidv4();
const userTokenExp = dayjs().add(1, 'hour').toDate();

export class MailController {
  async sendMailOnlyVerification(req: Request, res: Response) {
    try {
      const { mail } = req.body;
      const user = await existingUserByMail(mail);
      if (!user) throw 'Email not found';
      const verifiedUser = await existingVerifiedUser(user.id);
      if (verifiedUser && dayjs().isBefore(dayjs(verifiedUser.tokenExp))) {
        throw 'email already sent, please try again 1 hour after the previous email was sent';
      }
      const username = user.username;
      await updateUserToken(mail, userToken, userTokenExp);
      const templatePath = path.join(__dirname,'../templates/mailOnlyVerify.hbs',);
      const tempalteSource = fs.readFileSync(templatePath, 'utf-8');
      const compiledTemplate = handlebars.compile(tempalteSource);
      const html = compiledTemplate({username,link: `${process.env.FRONTEND_URL}/auth/verify-account/${userToken}`});
      transporter.sendMail(
        {
          from: process.env.MAIL_USER,
          to: mail,
          subject: 'Email Confirmation to verify your account',
          html: html,
        },
        (err) => {
          if (err) throw 'Error sending email';
          return res.status(200).send({
            status: 'ok',
            message:
              'Please check your email and confirm to verify your account',
            userToken,
          });
        },
      );
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : error;
      res.status(500).send({ message: errorMessage });
    }
  }
  async sendMailResetPassword(req: Request, res: Response) {
    try {
      const { mail } = req.body;
      const existingUser = await existingUserByMail(mail);
      if (!existingUser) throw 'Email not found';
      if (existingUser.password == null) throw new Error('Only accounts logged in with an email can reset their password.');
      if (existingUser && existingUser.userTokenExp && dayjs().isBefore(dayjs(existingUser.userTokenExp))) {
        throw 'Email already sent, please try again 1 hour after the previous email was sent';
      }
      const username = existingUser.username;
      await updateUserToken(mail, userToken, userTokenExp);
      const templatePath = path.join(__dirname,'../templates/resetPassword.hbs');
      const tempalteSource = fs.readFileSync(templatePath, 'utf-8');
      const compiledTemplate = handlebars.compile(tempalteSource);
      const html = compiledTemplate({ username, link: `${process.env.FRONTEND_URL}/auth/set-password/${userToken}`});
      transporter.sendMail(
        {
          from: process.env.MAIL_USER,
          to: mail,
          subject: 'Email Confirmation to Reset your password',
          html: html,
        },
        (err) => {
          if (err) throw 'Error sending email';
          return res.status(200).send({
            status: 'ok',
            message:
              'Please check your email and confirm to reset your password',
            userToken,
          });
        },
      );
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : error;
      res.status(500).send({ message: errorMessage });
    }
  }
  async sendMailUpdateEmail(req: Request, res: Response) {
    try {
      const { mail } = req.body;
      const user = await existingUserByMail(mail)
      if (!user) throw new Error('Email not found');
      if ( user && dayjs().isBefore(dayjs(user.userTokenExp))) {
        throw 'Email already sent, please try again 1 hour after the previous email was sent';
      }
      const username = user.username;
      await updateUserToken(mail, userToken, userTokenExp);
      const templatePath = path.join(__dirname, '../templates/updateMail.hbs');
      const tempalteSource = fs.readFileSync(templatePath, 'utf-8');
      const compiledTemplate = handlebars.compile(tempalteSource);
      const html = compiledTemplate({ username, link: `${process.env.FRONTEND_URL}/auth/update-mail/${userToken}`});
      transporter.sendMail(
        {
          from: process.env.MAIL_USER,
          to: mail,
          subject: 'Email Confirmation to Set new email',
          html: html,
        },
        (err) => {
          if (err) throw 'Error sending email';
          return res.status(200).send({
            status: 'ok',
            message: 'Please check your email and confirm to Set new email',
            userToken,
          });
        },
      );
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : error;
      res.status(500).send({ message: errorMessage });
    }
  }
}
