import { Request, Response } from 'express';
import prisma from '@/prisma';
import { OutletWorker, WorkerRoles } from '@prisma/client';

export class OutletWorkerController {
  // async loginWorker(req: Request, res: Response): Promise<Response> {
  //   const { email, password } = req.body;

  //   try {
  //     const outletWorker: OutletWorker | null =
  //       await prisma.outletWorker.findUnique({
  //         where: { email },
  //       });

  //     if (!outletWorker || outletWorker.password !== password) {
  //       return res.status(401).send({ error: 'Invalid email or password' });
  //     }

  //     return res
  //       .status(200)
  //       .send({ message: 'Login successful', outletWorker });
  //   } catch (error) {
  //     console.error('Error during login:', error);
  //     return res.status(500).send({ error: 'Error logging in' });
  //   }
  // }

  // async getAllOutletWorkers(req: Request, res: Response): Promise<Response> {
  //   try {
  //     const outletWorkers: OutletWorker[] =
  //       await prisma.outletWorker.findMany({
  //         include: {
  //           jobHistory: true,
  //           pickupDeliveries: true
  //         }
  //       });

  //     if (!outletWorkers.length) {
  //       return res.status(404).send({ error: 'No outlet workers found' });
  //     }

  //     return res.status(200).send(outletWorkers);
  //   } catch (error) {
  //     return res.status(500).send({ error: 'Error fetching outlet workers' });
  //   }
  // }

  // async getOutletWorkerById(req: Request, res: Response): Promise<Response> {
  //   const { id } = req.params;

  //   try {
  //     const outletWorker = await prisma.outletWorker.findUnique({
  //       where: { id: Number(id) },
  //     });

  //     if (!outletWorker) {
  //       return res.status(404).send({ error: 'Outlet worker not found' });
  //     }

  //     return res.status(200).send(outletWorker);
  //   } catch (error) {
  //     return res.status(500).send({ error: 'Error fetching outlet worker' });
  //   }
  // }

  // async createOutletWorker(req: Request, res: Response): Promise<Response> {
  //   const { outletId, name, password, email, role } = req.body;

  //   try {
  //     const result = await prisma.$transaction(async (prisma) => {
  //       const newOutletWorker = await prisma.outletWorker.create({
  //         data: {
  //           outletId,
  //           name,
  //           password,
  //           email,
  //           role,
  //         },
  //       });

  //       return newOutletWorker;
  //     });

  //     return res.status(201).send(result);
  //   } catch (error) {
  //     console.error('Error creating outlet worker:', error);
  //     return res.status(500).send({ error: 'Error creating outlet worker' });
  //   }
  // }

  // async updateOutletWorker(req: Request, res: Response): Promise<Response> {
  //   const { id } = req.params;
  //   const { outletId, name, password, email, role } = req.body;

  //   try {
  //     const updatedOutletWorker = await prisma.outletWorker.update({
  //       where: { id: Number(id) },
  //       data: {
  //         outletId,
  //         name,
  //         password,
  //         email,
  //         role,
  //       },
  //     });

  //     return res.status(200).send(updatedOutletWorker);
  //   } catch (error: any) {
  //     if (error.code === 'P2025') {
  //       return res.status(404).send({ error: 'Outlet worker not found' });
  //     }
  //     return res.status(500).send({ error: 'Error updating outlet worker' });
  //   }
  // }

  // async deleteOutletWorker(req: Request, res: Response): Promise<Response> {
  //   const { id } = req.params;

  //   try {
  //     await prisma.$transaction([
  //       prisma.driverStatus.deleteMany({
  //         where: { driverId: parseInt(id) },
  //       }),
  //       prisma.outletWorker.delete({
  //         where: { id: parseInt(id) },
  //       }),
  //     ]);

  //     return res.status(200).send({
  //       message: 'Outlet worker and related driver status deleted successfully',
  //     });
  //   } catch (error) {
  //     console.error('Error deleting outlet worker:', error);
  //     return res.status(500).send({ error: 'Error deleting outlet worker' });
  //   }
  // }

  // async updateDriverStatus(req: Request, res: Response): Promise<Response> {
  //   const { driverId } = req.params;
  //   const { status, PdrId } = req.body;

  //   if (!driverId) {
  //     return res.status(400).send({ error: 'Driver ID is required' });
  //   }

  //   try {
  //     const updatedDriverStatus = await prisma.driverStatus.update({
  //       where: {
  //         driverId: parseInt(driverId),
  //       },
  //       data: {
  //         status,
  //         PdrId: PdrId === null ? null : PdrId,
  //       },
  //     });

  //     return res.status(200).send(updatedDriverStatus);
  //   } catch (error) {
  //     console.error('Error updating driver status:', error);
  //     return res.status(500).send({ error: 'Error updating driver status' });
  //   }
  // }
}
