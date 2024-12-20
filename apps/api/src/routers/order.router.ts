import { OrderController } from '@/controllers/order.controller';
import { validateIdOnParams } from '@/middlewares/validator/addressValidator';
import { validateCreateOrder, validateOrderIdOnBody, validateOrderIdOnParams, validateUpdateOrder, validateUpdateOrderStatus } from '@/middlewares/validator/orderValidator';
import { Router } from 'express';

export class OrderRouter {
  private router: Router;
  private orderController: OrderController;

  constructor() {
    this.orderController = new OrderController();
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get('/', this.orderController.getAllOrder);
    this.router.get('/:orderId', validateOrderIdOnParams, this.orderController.getOrderById); // orderId 
    this.router.get('/user/:id', validateIdOnParams, this.orderController.getAllOrderByUserId); // id.req.params
    this.router.post('/search', this.orderController.searcOrder); // date or invoice
    this.router.post('/create', validateCreateOrder, this.orderController.createOrder); // userId, addressId, pickupSchedule
    this.router.put('/:orderId', validateUpdateOrder, this.orderController.updateOrder); // orderId.params && addressId, packageName, pickupSchedule,totalWeight,totalItems,totalPrice,paymentStatus,status
    this.router.patch('/:orderId', validateUpdateOrderStatus, this.orderController.updateOrderStatus); // orderId.params && status, userId
    this.router.patch('/price/:orderId',this.orderController.updateOrderPriceAndWeight); // orderId.params && weight, distance, totalItems
    this.router.delete('/:orderId',validateOrderIdOnParams, this.orderController.deleteOrder); // orderId.params
    this.router.post('/confirm',validateOrderIdOnBody, this.orderController.confirmOrder); // orderId.body
  }

  getRouter(): Router {
    return this.router;
  }
}
