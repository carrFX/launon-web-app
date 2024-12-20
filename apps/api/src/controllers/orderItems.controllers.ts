import { Request, Response } from 'express';
import prisma from '@/prisma';

export class OrderItemController {
  // async getOrderItems(req: Request, res: Response) {
  //   try {
  //     const orderItems = await prisma.orderItem.findMany();
  //     return res.status(200).send(orderItems);
  //   } catch (error) {
  //     console.error('Error fetching order items:', error);
  //     return res.status(500).send({ error: 'Failed to fetch order items' });
  //   }
  // }

  // async getOrderItemById(req: Request, res: Response) {
  //   const { id } = req.params;

  //   try {
  //     const orderItem = await prisma.orderItem.findUnique({
  //       where: { id: Number(id) },
  //     });

  //     if (!orderItem) {
  //       return res.status(404).send({ error: 'Order item not found' });
  //     }

  //     return res.status(200).send(orderItem);
  //   } catch (error) {
  //     console.error(`Error fetching order item with id ${id}:`, error);
  //     return res.status(500).send({ error: 'Failed to fetch order item' });
  //   }
  // }

  // async getOrderItemsByOrderId(req: Request, res: Response) {
  //   const { orderId } = req.params;

  //   try {
  //     const orderItems = await prisma.orderItem.findMany({
  //       where: { orderId: Number(orderId) },
  //     });

  //     if (orderItems.length === 0) {
  //       return res.status(404).send({ error: 'No order items found for this order' });
  //     }

  //     return res.status(200).send(orderItems);
  //   } catch (error) {
  //     console.error(`Error fetching order items for order id ${orderId}:`, error);
  //     return res.status(500).send({ error: 'Failed to fetch order items for this order' });
  //   }
  // }

  // // Membuat OrderItem baru
  // async createOrderItem(req: Request, res: Response) {
  //   const {
  //     orderId,
  //     shirt = 0,
  //     longShirt = 0,
  //     pants = 0,
  //     longPant = 0,
  //     veil = 0,
  //     underwear = 0,
  //     bedsheet = 0,
  //     pillowCase = 0,
  //     blanket = 0,
  //     towel = 0,
  //     curtain = 0,
  //   } = req.body;

  //   try {
  //     const newOrderItem = await prisma.orderItem.create({
  //       data: {
  //         orderId,
  //         shirt,
  //         longShirt,
  //         pants,
  //         longPant,
  //         veil,
  //         underwear,
  //         bedsheet,
  //         pillowCase,
  //         blanket,
  //         towel,
  //         curtain,
  //       },
  //     });

  //     return res.status(201).send(newOrderItem);
  //   } catch (error) {
  //     console.error('Error creating order item:', error);
  //     return res.status(500).send({ error: 'Failed to create order item' });
  //   }
  // }
}