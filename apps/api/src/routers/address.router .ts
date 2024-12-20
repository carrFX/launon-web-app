import { AddressController } from '@/controllers/address.controllers';
import { validateCreateAddress, validateIdOnParams, validateOutletIdOnParams, validateUpdateAddress, validateUserIdAndAddressId } from '@/middlewares/validator/addressValidator';

import { Router } from 'express';

export class AddressRouter {
  private router: Router;
  private addressController: AddressController;

  constructor() {
    this.addressController = new AddressController();
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get('/', this.addressController.getAllAddresses);
    this.router.get('/id/:id', validateIdOnParams, this.addressController.getAddressById); // id.params
    this.router.get('/outlets/:role', validateOutletIdOnParams,this.addressController.getAllAddressByRole); // role.params (outlet/user)
    this.router.get('/user/:id',validateIdOnParams, this.addressController.getAddresByUserId); // id.params
    this.router.get('/outlet/:id',validateIdOnParams, this.addressController.getAddresByOutletId); // id.params
    this.router.patch('/set-main',validateUserIdAndAddressId, this.addressController.setMainAddress); // userId, addressId
    this.router.post('/create',validateCreateAddress,this.addressController.createAddress); // phone, street, city, state, country, postalCode, outletId, userId,
    this.router.put('/update',validateUpdateAddress, this.addressController.updateAddress); // id, street, city, state, postalCode, country, phone
    this.router.delete('/delete/:id',validateIdOnParams, this.addressController.deleteAddress); // id.params
  }

  getRouter(): Router {
    return this.router;
  }
}
