import { Request, Response } from 'express';
import prisma from '@/prisma';
import { OrderStatus } from '@prisma/client';
import { findNearestOutlet } from '@/helpers/haversine';
import axios from 'axios';
import { existingAllOrders, existingAllOrdersByUserId, existingOrderByDate, existingOrderById, existingOrderByInvoice } from '../services/existing-data/order.exist';
import { existingOutletById } from '@/services/existing-data/outlet.exist';
import { existingUserById } from '@/services/existing-data/user.exist';
import { orderIsConfirmedStatus, orderIsDeleted, updatePriceWeight } from '@/services/update-data/order.update';
import { existingAddressById } from '@/services/existing-data/address.exist';
import { createNewOrder } from '@/services/create-data/order.create';
import { createNewNotification } from '@/services/create-data/notification.create';
import { existingDriverByOutletId } from '@/services/existing-data/worker.exist';
const pricePerKg = 30000; // 1 kg = 30.000 Rupiah
const pricePerKm = 3000; // 1 km = 10.000 Rupiah

export class OrderController {
  async getAllOrder(req: Request, res: Response) {
    try {
      const orders = await existingAllOrders();
      if (!orders.length) throw new Error('No orders found');
      return res.status(200).send({status: 'ok' , message: 'Get All Order Successfully', data: orders});
    } catch (error) {
      if(error instanceof Error) {
        res.status(400).send({ status: 'error', message: error.message });
      } else {
        res.status(400).send({ status: 'error', message: error });
      }
    }
  }
  async getOrderById(req: Request, res: Response) {
    const { orderId } = req.params;
    try {
      const order = await existingOrderById(orderId);
      if (!order) throw 'Order not found';
      const customerAddress = await prisma.address.findUnique({
        where: { id: order.addressId },
      });
      const customerIntro = await existingUserById(order.userId);
      const outletName = await existingOutletById(order.outletId);
      return res.status(200).send({
        status: 'ok',
        message: 'Get Order By Id Successfully',
        data: { order, customerIntro, customerAddress, outletName },
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : error as string;
      return res.status(500).send({ status: 'error',error: errorMessage });
    }
  }

  async searcOrder(req: Request, res: Response) {
    try {
      const { date, invoice } = req.body;
      if (date == null && invoice == null) throw 'date or invoice is required !';
      if (date) {
        const targetDate = new Date(date);
        targetDate.setUTCHours(targetDate.getUTCHours() - 7); // Kurangi 7 jam untuk WIB
        const startOfDay = new Date(targetDate).setUTCHours(0, 0, 0, 0);
        const endOfDay = new Date(startOfDay).setUTCHours(23, 59, 59, 999);
        const orderByDate = await existingOrderByDate(startOfDay, endOfDay);
        return res.status(200).send({
          status: 'ok',
          message: 'Get Order By Date Successfully',
          data: orderByDate,
        });
      }
      if (invoice) {
        const orderByInvoice = await existingOrderByInvoice(invoice);
        return res.status(200).send({
          status: 'ok',
          message: 'Get Order By Id Successfully',
          data: orderByInvoice,
        });
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : error as string;
      return res.status(500).send({ status: 'error',error: errorMessage });
    }
  }

  async getAllOrderByUserId(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 5;
      const startIndex = (page - 1) * limit;
      const orders = await existingAllOrdersByUserId(id)
      const paginatedOrders = orders.slice(startIndex, startIndex + limit);
      res.status(200).send({
        status: 'ok',
        message: 'Get All Orders By User Id Successfully',
        data: paginatedOrders,
        currentPage: page,
        totalPages: Math.ceil(orders.length / limit),
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : error as string;
      return res.status(500).send({ status: 'error',error: errorMessage });
    }
  }

  async createOrder(req: Request, res: Response) {
    try {
      const { userId, addressId, pickupSchedule } = req.body;
      const user = await existingUserById(userId);
      if (!user) throw new Error('User not found!');
      const userAddress = await existingAddressById(addressId);
      if (!userAddress) throw new Error('Address not found!');
      const { nearestOutlet, distance } = await findNearestOutlet(addressId);
      if (!nearestOutlet?.outletId) throw new Error('Outlet not found!');
      const newOrder = await createNewOrder(userId, addressId, nearestOutlet.outletId, pickupSchedule);
      const driver = await existingDriverByOutletId(nearestOutlet.outletId);
      if (driver) {
        await axios.post(`${process.env.BACKEND_URL}/api/pdr`, {
          orderId: newOrder.id,
          distance: distance,
          driverId: driver.id,
          fromAddressId: addressId,
          toAddressId: nearestOutlet.id,
          requestType: 'pickup',
          status: 'Wait to pick up',
        });
      }
      res.status(200).send({
        status: 'ok',
        message: `Successful Pickup Request. Outlet ${newOrder.outletId} will take your order, and driver ${driver?.username} will pick up your laundry. Distance: ${distance} km`,
        data: new Date(pickupSchedule),
        orderId: newOrder.id,
      });
    } catch (error: any) {
      const errorMessage = error instanceof Error ? error.message : error as string;
      return res.status(500).send({ status: 'error',error: errorMessage });
    }
  }

  async updateOrder(req: Request, res: Response) {
    const { orderId } = req.params;
    const { addressId, packageName, pickupSchedule,totalWeight,totalItems,totalPrice,paymentStatus,status } = req.body;
    try {
      const updatedOrder = await prisma.order.update({
        where: { id: orderId },
        data: {
          addressId,
          package: packageName,
          pickupSchedule: pickupSchedule ? new Date(pickupSchedule) : undefined,
          totalWeight,
          totalItems,
          totalPrice,
          paymentStatus,
          status: status as OrderStatus,
        },
        include: {
          user: true,
          address: true,
          outlet: true,
        },
      });
      return res.status(200).send({status: 'ok', message: 'Order updated successfully', data: updatedOrder});
    } catch (error: any) {
      const errorMessage = error instanceof Error ? error.message : error as string;
      return res.status(500).send({ status: 'error',error: errorMessage });
    }
  }

  async updateOrderStatus(req: Request, res: Response) {
    const { orderId } = req.params;
    const { status, userId } = req.body;
    let readyForDelivery = false;
    try {
      if (status === 'waiting_for_payment') {
        const order = await existingOrderById(orderId);
        if (!order) {
          return res.status(404).send({ error: 'Order not found' });
        }
        if (
          order.paymentStatus === 'paid' &&
          order.pickupDeliveryRequests?.length
        ) {
          const pdrData = {
            orderId: +orderId,
            distance: order.pickupDeliveryRequests[0].distance,
            driverId: order.pickupDeliveryRequests[0].driverId,
            fromAddressId: order.pickupDeliveryRequests[0].toAddressId,
            toAddressId: order.pickupDeliveryRequests[0].fromAddressId,
            requestType: 'deliver',
            status: 'Wait to pick up at outlet',
          };

          const pdr = await axios.post(
            `${process.env.BACKEND_URL}/api/pdr`,
            pdrData,
          );

          if (pdr?.data) {
            readyForDelivery = true;
          }
        }
      }
      const statusToUpdate = readyForDelivery ? 'ready_for_delivery' : status;
      const updatedOrder = await prisma.order.update({
        where: { id: orderId },
        data: { status: statusToUpdate as OrderStatus },
      });
      await createNewNotification(userId, orderId, statusToUpdate);
      
      res.status(200).send({ status: 'ok', message: 'Order status updated successfully and notification sent', data: updatedOrder });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : error as string;
      return res.status(500).send({ status: 'error',error: errorMessage });
    }
  }

  async updateOrderPriceAndWeight(req: Request, res: Response) {
    const { orderId } = req.params;
    const { weight, distance, totalItems } = req.body;
    try {
      const calculatedPrice = weight * pricePerKg + distance * pricePerKm;
      const updatedOrder = await updatePriceWeight(orderId, weight, calculatedPrice, totalItems);
      return res.status(200).send({status: 'ok', message: 'Order price and weight updated successfully', data: updatedOrder});
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : error as string;
      return res.status(500).send({ status: 'error',error: errorMessage });
    }
  }

  async deleteOrder(req: Request, res: Response) {
    const { orderId } = req.params;
    try {
      const deleteOrder = await orderIsDeleted(orderId);
      return res.status(200).send({ status: 'ok', message: 'Order deleted successfully', deleteOrder });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : error as string;
      return res.status(500).send({ status: 'error',error: errorMessage });
    }
  }

  async confirmOrder(req: Request, res: Response) {
    try {
      const { orderId } = req.body;
      const confirmedOrder = await orderIsConfirmedStatus(orderId)
      if (!confirmedOrder) throw 'Order not found';
      return res.status(200).send({ status: 'ok', message: 'Order confirmed successfully', data: confirmedOrder });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : error as string;
      return res.status(500).send({ status: 'error',error: errorMessage });
    }
  }
}
