
import { SuperAdminController } from '@/controllers/superAdmin.controllers';
import { Router } from 'express';

export class SuperAdminRouter {
  private router: Router;
  private superAdminController: SuperAdminController;

  constructor() {
    this.superAdminController = new SuperAdminController();
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get('/', this.superAdminController.loginSuperAdmin);
  }

  getRouter(): Router {
    return this.router;
  }
}
