
import { WorkerJobHistoryController } from '@/controllers/workerHistory.controller';
import { Router } from 'express';

export class WorkerJobHistoryRouter {
  private router: Router;
  private workerJobHistoryController: WorkerJobHistoryController;

  constructor() {
    this.workerJobHistoryController = new WorkerJobHistoryController();
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get('/', this.workerJobHistoryController.getAllWorkerJobHistory.bind(this.workerJobHistoryController));
    this.router.get('/:id', this.workerJobHistoryController.getWorkerJobHistoryById.bind(this.workerJobHistoryController));
    this.router.get('/:id/order', this.workerJobHistoryController.getWorkerJobHistoryByOrderId.bind(this.workerJobHistoryController));
    this.router.post('/', this.workerJobHistoryController.createWorkerJobHistory.bind(this.workerJobHistoryController));
    this.router.put('/:id', this.workerJobHistoryController.updateWorkerJobHistory.bind(this.workerJobHistoryController));
    this.router.delete('/:id', this.workerJobHistoryController.deleteWorkerJobHistory.bind(this.workerJobHistoryController));
  }

  getRouter(): Router {
    return this.router;
  }
}
