import { OutletController } from '@/controllers/outlet.controllers';
import { Router } from 'express';

export class OutletRouter {
  private router: Router;
  private outletController: OutletController;

  constructor() {
    this.outletController = new OutletController();
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    // this.router.get('/', this.outletController.getAllOutlet);
    // this.router.post('/login', this.outletController.loginOutlet);
    // this.router.get('/id/:id', this.outletController.getOutletById);
    // this.router.post('/', this.outletController.createOutlet);
    // this.router.put('/id/:id', this.outletController.updateOutlet);
    // this.router.delete('/id/:id', this.outletController.deleteOutlet);
  }

  getRouter(): Router {
    return this.router;
  }
}
