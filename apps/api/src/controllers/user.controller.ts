import { Request, Response } from 'express';
import prisma from '@/prisma';
import { verify } from 'jsonwebtoken';
import { compare, genSalt, hash } from 'bcrypt';
import dayjs from 'dayjs';
import { unVerifiedUser, updateAvaByUserId, updateMailUserByOldMail, updatePassUser, updateUsernameById, updateVerifyUserByVerifyToken } from '@/services/update-data/user.update';
import { existingUserById, existingUserByMail, existingVerifiedUserByVerifiedToken, profileUserById } from '@/services/existing-data/user.exist';
import { deleteUserById } from '@/services/delete.data/user.delete';
export class UserController {

  async getUserProfile(req: Request, res: Response) {
    try {
      const cookiesLoginToken = req.cookies?.loginToken;
      if (!cookiesLoginToken) throw 'no user is logged in !';
      const decoded = verify(cookiesLoginToken, process.env.JWT_SECRET!) as { id: string};
      const existingUser = await profileUserById(decoded.id)

      res.status(200).send({status: 'ok', message: 'get user success !', data: existingUser,});
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).send({ status: 'error', message: error.message, });
      } else {
        res.status(400).send({ status: 'error', message: error,});
      }
    }
  }
  async updateAvatar(req: Request, res: Response) {
    try {
      const ava = req.file?.filename;
      if (!ava) throw 'File not found';
      const linkAva = `${process.env.BACKEND_URL}/api/public/avatar/${ava}`;
      const cookies = req.cookies.loginToken;
      if (!cookies) throw 'no user is logged in !';
      const decoded = verify(cookies, process.env.JWT_SECRET!) as { id: string };
      const updateAva = await updateAvaByUserId(decoded.id, linkAva);
      return res.status(200).send({ status: 'ok', message: 'Edit avatar successfully',data: updateAva });
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).send({status: 'error', message: error.message});
      } else {
        res.status(400).send({ status: 'error', message: error });
      }
    }
  }

  async deleteAvatar(req: Request, res: Response) {
    try {
      const cookies = req.cookies.loginToken;
      if (!cookies) throw 'no user is logged in !';
      const decoded = verify(cookies, process.env.JWT_SECRET!) as { id: string };
      const deleteAva = await updateAvaByUserId(decoded.id, 'https://cdn.pixabay.com/photo/2018/11/13/21/43/avatar-3814049_960_720.png')
      return res.status(200).send({ status: 'ok', message: 'Delete avatar successfully', data: deleteAva, });
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).send({ status: 'error', message: error.message });
      } else {
        res.status(400).send({ status: 'error', message: error });
      }
    }
  }

  async updateUsername(req: Request, res: Response) {
    try {
      const {username} = req.body
      const cookies = req.cookies.loginToken;
      if (!cookies) throw 'no user is logged in !';
      const decoded = verify(cookies, process.env.JWT_SECRET!) as { id: string };
      const user = await updateUsernameById(decoded.id, username);
      return res.status(200).send({ status: 'ok', message: 'Edit username successfully', data: user,});
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).send({ status: 'error', message: error.message });
      } else {
        res.status(400).send({ status: 'error', message: error });
      }
    }
  }
  async deleteUser(req: Request, res: Response) {
    try {
      const cookiesLoginToken = req.cookies?.loginToken;
      if (!cookiesLoginToken) throw 'no user is logged in !';
      const decoded = verify(cookiesLoginToken, process.env.JWT_SECRET!) as { id: string};
      const deleteUser = await deleteUserById(decoded.id)
      if (!deleteUser) throw 'User not found';
      res.status(200).send({ status: 'ok', message: 'delete user success !', data: deleteUser });
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).send({ status: 'error', message: error.message });
      } else {
        res.status(400).send({ status: 'error', message: error });
      }
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
      if (error instanceof Error) {
        res.status(400).send({ status: 'error', message: error.message });
      } else {
        res.status(400).send({ status: 'error', message: error });
      }
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
      if (error instanceof Error) {
        res.status(400).send({ status: 'error', message: error.message });
      } else {
        res.status(400).send({ status: 'error', message: error });
      }
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
      if (error instanceof Error) {
        res.status(400).send({ status: 'error', message: error.message });
      } else {
        res.status(400).send({ status: 'error', message: error });
      }
    }
  }
}
