import { Request, Response } from 'express';
import prisma from '@/prisma';

export class NotificationController {
  // async createNotification(req: Request, res: Response): Promise<Response> {
  //   const { userId, outletId, title, message } = req.body;

  //   try {
  //     const notification = await prisma.notification.create({
  //       data: {
  //         userId,
  //         outletId,
  //         title,
  //         message,
  //       },
  //     });
  //     return res.status(201).send(notification);
  //   } catch (error) {
  //     console.error('Error creating notification:', error);
  //     return res.status(500).send({ error: 'Error creating notification' });
  //   }
  // }

  // async getNotifications(req: Request, res: Response): Promise<Response> {
  //   const { userId, outletId } = req.query;

  //   try {
  //     const notifications = await prisma.notification.findMany({
  //       where: {
  //         OR: [
  //           { userId: userId ? Number(userId) : undefined },
  //           { outletId: outletId ? Number(outletId) : undefined },
  //         ],
  //       },
  //     });
  //     return res.status(200).send(notifications);
  //   } catch (error) {
  //     console.error('Error fetching notifications:', error);
  //     return res.status(500).send({ error: 'Error fetching notifications' });
  //   }
  // }

  // async updateNotification(req: Request, res: Response): Promise<Response> {
  //   const { id } = req.params;
  //   const { title, message, read } = req.body;

  //   try {
  //     const notification = await prisma.notification.update({
  //       where: { id: Number(id) },
  //       data: {
  //         title,
  //         message,
  //         read,
  //       },
  //     });
  //     return res.status(200).send(notification);
  //   } catch (error) {
  //     console.error('Error updating notification:', error);
  //     return res.status(500).send({ error: 'Error updating notification' });
  //   }
  // }

 
  // async deleteNotification(req: Request, res: Response): Promise<Response> {
  //   const { id } = req.params;

  //   try {
  //     await prisma.notification.delete({
  //       where: { id: Number(id) },
  //     });
  //     return res.status(200).send({ message: 'Notification deleted successfully' });
  //   } catch (error) {
  //     console.error('Error deleting notification:', error);
  //     return res.status(500).send({ error: 'Error deleting notification' });
  //   }
  // }
}
