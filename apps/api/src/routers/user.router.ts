import { UserController } from '@/controllers/user.controller';
import { uploaderImg } from '@/helpers/uploader';
import { authenticateToken } from '@/middlewares/auth.middleware';
import { validateOnlyVerify, validateUpdateMailUser, validateUpdatePass, validateUsername } from '@/middlewares/validator/userValidator';
import { Router } from 'express';

export class UserRouter {
  private router: Router;
  private userController: UserController;

  constructor() {
    this.userController = new UserController();
    this.router = Router();
    this.initializeRoutes();
  }
  private initializeRoutes(): void {
    // authenticateToken
    this.router.delete('/delete', this.userController.deleteUser);
    this.router.get('/profile', authenticateToken, this.userController.getUserProfile);
    this.router.patch('/update-mail', validateUpdateMailUser, this.userController.updateMailUser); // oldMail, newMail, token
    this.router.patch('/only-verify', validateOnlyVerify, this.userController.onlyVerifyAccount); // verifiedToken
    this.router.patch('/delete-avatar', this.userController.deleteAvatar);
    this.router.patch('/update-username', validateUsername, this.userController.updateUsername); // username
    this.router.patch('/update-password', validateUpdatePass, this.userController.updatePasswordUser); // userId, oldPassword, newPassword
    this.router.patch('/update-avatar',uploaderImg('avatar-', '/avatar').single('avatar'),this.userController.updateAvatar); // ava = req.file?.filename;
  }

  // Mengembalikan objek router
  getRouter(): Router {
    return this.router;
  }
}
