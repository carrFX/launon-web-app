import { AuthController } from '@/controllers/auth.controller';
import {
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
    this.router.post('/set-password',validateSetPass,this.authController.setPassword);
    // this.router.post('/login',validateLogin,this.authController.loginWithMail,);
    // this.router.post('/logout', this.authController.logoutUser);
  }

  getRouter(): Router {
    return this.router;
  }
}
