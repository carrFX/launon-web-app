
import { NotificationController } from '@/controllers/norification.controller';
import { Router } from 'express';

export class NotificationRouter {
  private router: Router;
  private notificationController: NotificationController;

  constructor() {
    this.notificationController = new NotificationController();
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get('/', this.notificationController.getNotifications); // GET /notifications?userId=1&workerId=2
    this.router.post('/', this.notificationController.createNotification); 
    this.router.patch('/:notificationId', this.notificationController.updateNotification); 
    this.router.delete('/:notificationId', this.notificationController.deleteNotification); 
  }

  getRouter(): Router {
    return this.router;
  }
}
