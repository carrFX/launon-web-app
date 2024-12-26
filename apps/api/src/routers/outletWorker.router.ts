import { OutletWorkerController } from '@/controllers/outletWorker.controllers';
import { Router } from 'express';

export class OutletWorkerRouter {
  private router: Router;
  private outletWorkerController: OutletWorkerController;

  constructor() {
    this.outletWorkerController = new OutletWorkerController();
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post('/register', this.outletWorkerController.registerWorker);
    this.router.post('/login', this.outletWorkerController.loginWorker);
    this.router.get('/', this.outletWorkerController.getAllOutletWorkers);
    this.router.get('/id/:id', this.outletWorkerController.getOutletWorkerById);
    this.router.put('/id/:id', this.outletWorkerController.updateOutletWorker);
    this.router.delete('/id/:id',this.outletWorkerController.deleteOutletWorker,);
  }

  getRouter(): Router {
    return this.router;
  }
}
