import { Request, Response } from 'express';
import prisma from '@/prisma';
import { existingAllWorkers, existingWorkerById, existingWorkerByMail, exsistingWorkersByOutletId } from '@/services/existing-data/worker.exist';
import { compare, hash } from 'bcrypt';
import { generateAccessToken, generateRefreshToken } from '@/helpers/jwtToken';
import { updateDataWorker, updateRefreshWorker } from '@/services/update-data/worker.update';
import { createNewWorker } from '@/services/create-data/worker.create';
import { existingOutletById } from '@/services/existing-data/outlet.exist';
import { updateDataDriverStatus } from '@/services/update-data/driver-status.update';

export class OutletWorkerController {
  async registerWorker(req: Request, res: Response){
    const { username, mail, password, outletId, role } = req.body;
    try {
      const existingMail = await existingWorkerByMail(mail);
      if(existingMail) throw new Error('Email already exists!');
      const existingOutlet = await existingOutletById(outletId);
      if(!existingOutlet) throw new Error('Outlet not found!');
      const hashPassword = await hash(password, 10);
      const outletWorker = await createNewWorker(username, mail, hashPassword, outletId, role);
      res.status(200).send({ status: 'ok', message: 'Register Worker Successfully', data: outletWorker });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : error as string;
      res.status(500).send({ error: errorMessage });
    }
  }
  async loginWorker(req: Request, res: Response): Promise<Response> {
    const { mail, password } = req.body;
    try {
      const outletWorker = await existingWorkerByMail(mail);
      if(!outletWorker) throw 'user not found !';
      const isValidPass = await compare(password, outletWorker.password);
      if (!isValidPass) throw new Error('incorrect password !');
      const refreshWorker = await generateRefreshToken(outletWorker.id, outletWorker.role);
      const accessWorker = await generateAccessToken(outletWorker.id, outletWorker.role);
      await updateRefreshWorker(outletWorker.mail, refreshWorker);
      return res
        .cookie('refreshWorker', refreshWorker, {
          httpOnly: true,
          maxAge: 30 * 24 * 60 * 60 * 1000,
        })
        .status(200)
        .send({ message: 'Login successful', outletWorker, data: { outletWorker, accessWorker } });
    } catch (error) {
      console.error('Error during login:', error);
      return res.status(500).send({ error: 'Error logging in' });
    }
  }

  async getAllOutletWorkers(req: Request, res: Response): Promise<Response> {
    try {
      const outletWorkers = await existingAllWorkers();
      if (!outletWorkers.length) throw new Error('No outlet workers found');
      return res.status(200).send({ status: 'ok', message: 'Get All Outlet Workers Successfully', data: outletWorkers });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : error as string;
      return res.status(500).send({ status: 'error', message: errorMessage });
    }
  }

  async getOutletWorkerById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    try {
      const outletWorker = await exsistingWorkersByOutletId(id);
      if (!outletWorker) throw new Error('Outlet worker not found');
      return res.status(200).send({ status: 'ok', message: 'Get Outlet Worker Successfully', data: outletWorker });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : error as string;
      return res.status(500).send({ status: 'error', message: errorMessage });
    }
  }

  async updateOutletWorker(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { outletId, username, password, mail, role } = req.body;
    try {
      const existingWorker = await existingWorkerById(id);
      if(!existingWorker) throw new Error('Outlet worker not found');
      const workerUpdated = await updateDataWorker(id, outletId, username, password, mail, role);

      return res.status(200).send({status: "ok", message: 'Update Outlet Worker Successfully', data: workerUpdated});
    } catch (error: any) {
      const errorMessage = error instanceof Error ? error.message : error as string;
      return res.status(500).send({ stattus: 'error', error: errorMessage });
    }
  }

  async deleteOutletWorker(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    try {
      const deletedWorker = await prisma.$transaction([
        prisma.driverStatus.deleteMany({
          where: { driverId: id },
        }),
        prisma.outletWorker.delete({
          where: { id: id },
        }),
      ]);
      return res.status(200).send({ status: 'ok', message: 'Outlet worker and related driver status deleted successfully', data: deletedWorker,      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : error as string;
      return res.status(500).send({ status:'error', message: errorMessage });
    }
  }

  async updateDriverStatus(req: Request, res: Response): Promise<Response> {
    const { driverId } = req.params;
    const { status, PdrId } = req.body;
    if (!driverId) throw new Error('Driver ID is required');
    try {
      const updatedDriverStatus = await updateDataDriverStatus(driverId, status, PdrId === null ? null : PdrId);
      return res.status(200).send({status: 'ok', message: 'Update Driver Status Successfully', data: updatedDriverStatus});
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : error as string;
      return res.status(500).send({ status: 'error', message: errorMessage });
    }
  }
}
