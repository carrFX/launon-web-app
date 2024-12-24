import { Router } from 'express';
import { PickupDeliveryRequestController } from '@/controllers/pdrd.controllers';
import { validateIdOnParams } from '@/middlewares/validator/addressValidator';
import { validateCreatePdr, validateUpdatePdr, validateUpdatePdrStatus } from '@/middlewares/validator/pdrdValidator';

export class PickupDeliveryRequestRouter {
  private router: Router;
  private pickupDeliveryRequestController: PickupDeliveryRequestController

  constructor() {
    this.router = Router();
    this.pickupDeliveryRequestController = new PickupDeliveryRequestController();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get('/', this.pickupDeliveryRequestController.getAllPickupDeliveryRequests.bind(this.pickupDeliveryRequestController));
    this.router.get('/:id', validateIdOnParams, this.pickupDeliveryRequestController.getPickupDeliveryRequestById.bind(this.pickupDeliveryRequestController)); // id.params
    this.router.get('/driver/:id', validateIdOnParams, this.pickupDeliveryRequestController.getPickupDeliveryRequestWorkerId.bind(this.pickupDeliveryRequestController)); // id.params
    this.router.post('/', validateCreatePdr, this.pickupDeliveryRequestController.createPickupDeliveryRequest.bind(this.pickupDeliveryRequestController)); // orderId,distance,driverId,fromAddressId,toAddressId,requestType,status
    this.router.put('/:id',validateUpdatePdr, this.pickupDeliveryRequestController.updatePickupDeliveryRequest.bind(this.pickupDeliveryRequestController)); // id.params && orderId, distance, driverId, fromAddressId, toAddressId, requestType, status
    this.router.patch('/', validateUpdatePdrStatus, this.pickupDeliveryRequestController.updatePickupDeliveryRequestStatus.bind(this.pickupDeliveryRequestController)); // id, status (req.body)
    this.router.delete('/:id',validateIdOnParams, this.pickupDeliveryRequestController.deletePickupDeliveryRequest.bind(this.pickupDeliveryRequestController)); // id.params
  }

  getRouter(): Router {
    return this.router;
  }
}
