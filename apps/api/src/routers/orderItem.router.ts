import { OrderItemController } from '@/controllers/orderItems.controllers';
import { Router } from 'express';


export class OrderItemRouter {
  private router: Router;
  private orderItemController: OrderItemController;

  constructor() {
    this.orderItemController = new OrderItemController();
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get('/', this.orderItemController.getOrderItems);
    this.router.get('/:id', this.orderItemController.getOrderItemById);
    this.router.get('/order/:orderId', this.orderItemController.getOrderItemsByOrderId);
    this.router.post('/', this.orderItemController.createOrderItem);
  }

  getRouter(): Router {
    return this.router;
  }
}
