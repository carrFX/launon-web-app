import { AuthController } from '@/controllers/auth.controller';
import {
  validateIdOnParams,
  validateLogin,
  validateRegister,
  validateSetPass,
} from '@/middlewares/validator/authValidator';
import { Router } from 'express';

export class AuthRouter {
  private router: Router;
  private authController: AuthController;

  constructor() {
    this.authController = new AuthController();
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post('/register',validateRegister,this.authController.registerUserWithMail);
    this.router.post('/set-password',validateSetPass,this.authController.setPasswordAfterRegister);
    this.router.post('/refresh-token', this.authController.refreshToken);
    this.router.post('/login',validateLogin,this.authController.loginWithMail,);
    this.router.put('/logout/:id',validateIdOnParams, this.authController.logoutUser);
  }

  getRouter(): Router {
    return this.router;
  }
}
