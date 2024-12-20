import { GoogleController } from '@/controllers/google.controller';
import { Router } from 'express';

export class GoogleRouter {
  private router: Router;
  private googleController: GoogleController;

  constructor() {
    this.googleController = new GoogleController();
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get("/login", (req, res) => this.googleController.googleLogin(req, res));
    this.router.get("/callback", (req, res) => this.googleController.googleCallback(req, res));
  }

  getRouter(): Router {
    return this.router;
  }
}
