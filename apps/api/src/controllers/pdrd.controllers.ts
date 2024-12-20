import prisma from '@/prisma';
import { deletePdrdById } from '@/services/delete.data/pdrd.delete';
import { existingOrderById } from '@/services/existing-data/order.exist';
import { allPickupDeliveryRequest, getPdrdByDriverId, getPdrdById } from '@/services/existing-data/pdrd.exist';
import { updatePdrdStatus } from '@/services/update-data/pdrd.update';
import axios from 'axios';
import { Request, Response } from 'express';

export class PickupDeliveryRequestController {
  async createPickupDeliveryRequest(req: Request,res: Response){
    const { orderId,distance,driverId,fromAddressId,toAddressId,requestType,status } = req.body;
    try {
      const newRequest = await prisma.pickupDeliveryRequest.create({
        data: {
          orderId,
          distance,
          driverId,
          fromAddressId,
          toAddressId,
          requestType: requestType || '',
          status: status || 'Wait to pick up',
        },
      });
      return res.status(201).send({status: 'ok', message: 'Pickup Delivery Request created successfully', data: newRequest});
    } catch (error) {
      if (error instanceof Error){
        res.status(400).send({ status: 'error', message: error.message });
      } else {
        res.status(400).send({ status: 'error', message: error });
      }
    }
  }

  async getAllPickupDeliveryRequests(req: Request,res: Response){
    try {
      const requests = await allPickupDeliveryRequest();
      return res.status(200).send(requests);
    } catch (error) {
      if (error instanceof Error){
        res.status(400).send({ status: 'error', message: error.message });
      } else {
        res.status(400).send({ status: 'error', message: error });
      }
    }
  }

  async getPickupDeliveryRequestById( req: Request, res: Response){
    const { id } = req.params;
    try {
      const request = await getPdrdById(id)
      if (!request) throw new Error('Pickup Delivery Request not found');

      return res.status(200).send(request);
    } catch (error) {
      if (error instanceof Error){
        res.status(400).send({ status: 'error', message: error.message });
      } else {
        res.status(400).send({ status: 'error', message: error });
      }
    }
  }
  async getPickupDeliveryRequestWorkerId( req: Request,res: Response){
    const { id } = req.params;
    try {
      const request = await getPdrdByDriverId(id)
      if (!request) throw new Error('Pickup Delivery Request not found');

      return res.status(200).json(request);
    } catch (error) {
      if (error instanceof Error){
        res.status(400).send({ status: 'error', message: error.message });
      } else {
        res.status(400).send({ status: 'error', message: error });
      }
    }
  }

  async updatePickupDeliveryRequest( req: Request, res: Response){
    const { id } = req.params;
    const { orderId, distance, driverId, fromAddressId, toAddressId, requestType, status } = req.body;
    try {
      const updatedRequest = await prisma.pickupDeliveryRequest.update({
        where: { id },
        data: {
          orderId,
          distance,
          driverId,
          fromAddressId,
          toAddressId,
          requestType,
          status,
        },
      });

      return res.status(200).send({
        status: 'ok',
        message: 'Pickup Delivery Request updated successfully',
        data: updatedRequest,
      });
    } catch (error: any) {
      if (error instanceof Error){
        res.status(400).send({ status: 'error', message: error.message });
      } else {
        res.status(400).send({ status: 'error', message: error });
      }
    }
  }

  async updatePickupDeliveryRequestStatus( req: Request, res: Response ) {
    const { id, status } = req.body;
    try {
      const request = await getPdrdById(id)
      if (!request) throw new Error('Pickup Delivery Request not found')

      const updatedRequest = await updatePdrdStatus(id, status);
      if (status === 'done') {
        const order = await existingOrderById(updatedRequest.orderId);
        if (order) {
          if (order.status === 'on_the_way_to_outlet') {
            const updateOrder = await axios.patch(
              `${process.env.BACKEND_URL}/api/order/${order.id}`,
              {
                status: 'arrived_at_outlet',
                userId: order.userId,
              },
            );
          } else {
            const updateOrder = await axios.patch(
              `${process.env.BACKEND_URL}/api/order/${order.id}`,
              {
                status: 'on_the_way_to_customer',
                userId: order.userId,
              },
            );
          }
        }
      }

      if (status === 'onGoing') {
        const order = await existingOrderById(updatedRequest.orderId);
        if (order) {
          if (order.status === 'waiting_for_pickup') {
            const updateOrder = await axios.patch(
              `${process.env.BACKEND_URL}/api/order/${order.id}`,
              {
                status: 'on_the_way_to_outlet',
                userId: order.userId,
              },
            );
          } else {
            const updateOrder = await axios.patch(
              `${process.env.BACKEND_URL}/api/order/${order.id}`,
              {
                status: 'on_the_way_to_customer',
                userId: order.userId,
              },
            );
          }
        }
      }

      return res.status(200).json({ status: 'success',message:'Pickup Delivery Request updated successfully', updatedRequest });
    } catch (error) {
      if (error instanceof Error){
        res.status(400).send({ status: 'error', message: error.message });
      } else {
        res.status(400).send({ status: 'error', message: error });
      }
    }
  }

  async deletePickupDeliveryRequest( req: Request, res: Response ){
    const { id } = req.params;
    try {
      const deletedPdrd = await deletePdrdById(id);
      if(!deletedPdrd) throw new Error('Failed to delete Pickup Delivery Request');

      return res.status(200).send({status: 'ok', message: 'Pickup Delivery Request deleted successfully', data: deletedPdrd});
    } catch (error: any) {
      if (error instanceof Error){
        res.status(400).send({ status: 'error', message: error.message });
      } else {
        res.status(400).send({ status: 'error', message: error });
      }
    }
  }
}