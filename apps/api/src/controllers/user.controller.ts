import { Request, Response } from 'express';
import prisma from '@/prisma';
import { verify } from 'jsonwebtoken';
import { compare } from 'bcrypt';
import dayjs from 'dayjs';
import { unVerifiedUser, updateAvaByUserId, updateMailUserByOldMail, updatePassUser, updateUsernameById, updateVerifyUserByVerifyToken } from '@/services/update-data/user.update';
import { existingUserById, existingUserByMail, existingVerifiedUserByVerifiedToken } from '@/services/existing-data/user.exist';
import { deleteUserById } from '@/services/delete.data/user.delete';
import { verifyRefreshToken } from '@/helpers/jwtToken';
export class UserController {
  async getUserProfile(req: Request, res: Response) {
    const { refreshToken } = req.cookies;
    try {
      if (!refreshToken) throw new Error("refresh token not found");
      const decoded = await verifyRefreshToken(refreshToken);
      const user = await existingUserById(decoded.id);
      res.status(200).send({status: 'ok', message: 'get user success !', data: user,});
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : error;
      res.status(500).send({ message: errorMessage });
    }
  }
  async updateAvatar(req: Request, res: Response) {
    try {
      const ava = req.file?.filename;
      const { refreshToken } = req.cookies;
      if (!ava) throw 'File not found';
      if (!refreshToken) throw 'no user is logged in !';
      const linkAva = `${process.env.BACKEND_URL}/api/public/avatar/${ava}`;
      const decoded = await verifyRefreshToken(refreshToken);
      const updateAva = await updateAvaByUserId(decoded.id, linkAva);
      return res.status(200).send({ status: 'ok', message: 'Edit avatar successfully',data: updateAva });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : error;
      res.status(500).send({ message: errorMessage });
    }
  }

  async deleteAvatar(req: Request, res: Response) {
    try {
      const { refreshToken } = req.cookies;
      if (!refreshToken) throw 'no user is logged in !';
      const decoded = await verifyRefreshToken(refreshToken);
      const deleteAva = await updateAvaByUserId(decoded.id, 'https://cdn.pixabay.com/photo/2018/11/13/21/43/avatar-3814049_960_720.png')
      return res.status(200).send({ status: 'ok', message: 'Delete avatar successfully', data: deleteAva, });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : error;
      res.status(500).send({ message: errorMessage });
    }
  }

  async updateUsername(req: Request, res: Response) {
    try {
      const {username} = req.body
      const { refreshToken } = req.cookies.loginToken;
      if (!refreshToken) throw 'no user is logged in !';
      const decoded = await verifyRefreshToken(refreshToken);
      const user = await updateUsernameById(decoded.id, username);
      return res.status(200).send({ status: 'ok', message: 'Edit username successfully', data: user,});
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : error;
      res.status(500).send({ message: errorMessage });
    }
  }
  async deleteUser(req: Request, res: Response) {
    try {
      const { refreshToken } = req.cookies.loginToken;
      if (!refreshToken) throw 'no user is logged in !';
      const decoded = await verifyRefreshToken(refreshToken);
      const deleteUser = await deleteUserById(decoded.id)
      if (!deleteUser) throw 'User not found';
      res.status(200).send({ status: 'ok', message: 'delete user success !', data: deleteUser });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : error;
      res.status(500).send({ message: errorMessage });
    }
  }
  async updateMailUser(req: Request, res: Response) {
    const { oldMail, newMail, token } = req.body;
    try {
      const user = await prisma.user.findFirst({ where: { mail: oldMail } });
      const newMailUser = await existingUserByMail(newMail);
      if (!user) throw 'your old email is not exist !';
      if (newMailUser) throw 'mail already exist !';
      if (token !== user.userToken) throw 'Verification Expired !';
      await updateMailUserByOldMail(oldMail, newMail);
      await unVerifiedUser(user.id);
      res.status(200).send({ status: 'ok', message: 'update email success !', data: user });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : error;
      res.status(500).send({ message: errorMessage });
    }
  }
  async updatePasswordUser(req: Request, res: Response) {
    const { userId, oldPassword, newPassword } = req.body;
    try {
      const user = await existingUserById(userId);
      if (!user) throw 'user not found !';
      if (user.password !== null) {
        const isValid = await compare(oldPassword, user.password);
        if (!isValid) throw 'incorrect password !';
      }
      await updatePassUser(userId, newPassword)
      res.status(200).send({ status: 'ok', message: 'update password success !' });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : error;
      res.status(500).send({ message: errorMessage });
    }
  }
  async onlyVerifyAccount(req: Request, res: Response) {
    const { verifiedToken } = req.body;
    try {
      const verifiedUser = await existingVerifiedUserByVerifiedToken(verifiedToken)
      if (!verifiedUser) throw 'user not found !';
      if (verifiedUser.tokenExp && dayjs().isBefore(dayjs(verifiedUser.tokenExp))) {
        throw "'Email already sent, please try again 1 hour after the previous email was sent'"
      }
      if (verifiedUser.verified) throw 'user already verified !';
      await updateVerifyUserByVerifyToken(verifiedToken);
      res.status(200).send({ status: 'ok', message: 'verify account success !' });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : error;
      res.status(500).send({ message: errorMessage });
    }
  }
}
