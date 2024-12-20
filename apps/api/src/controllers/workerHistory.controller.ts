import { Request, Response } from 'express';
import { exisistingJobHistoryByOrderId, existingAllJobHistories, existingJobHistoryById } from '@/services/existing-data/jobHistory.exist';
import { createJobHistory } from '@/services/create-data/jobHistory.create';
import { updateJobHistoryById } from '@/services/update-data/jobHistory.update';
import { deleteJobHistoryById } from '@/services/delete.data/jobHistory.delete';

export class WorkerJobHistoryController {
  async getAllWorkerJobHistory(req: Request, res: Response) {
    try {
      const jobHistories = await existingAllJobHistories();
      return res.status(200).send(jobHistories);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : error as string;
      return res.status(500).send({ error: errorMessage });
    }
  }

  async getWorkerJobHistoryById(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const jobHistory = await existingJobHistoryById(id);
      return res.status(200).send(jobHistory);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : error as string;
      return res.status(500).send({ error: errorMessage });
    }
  }

  async getWorkerJobHistoryByOrderId(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const jobHistory = await exisistingJobHistoryByOrderId(id);
      return res.status(200).send(jobHistory);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : error as string;
      return res.status(500).send({ error: errorMessage });
    }
  }

  async createWorkerJobHistory(req: Request, res: Response) {
    const { workerId, orderId, station, pickupDelivery } = req.body;
    try {
      const newJobHistory = await createJobHistory(workerId, orderId, station, pickupDelivery);
      return res.status(201).send(newJobHistory);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : error as string;
      return res.status(500).send({ error: errorMessage });
    }
  }

  async updateWorkerJobHistory(req: Request, res: Response) {
    const { id } = req.params;
    const { workerId, orderId, station, pickupDelivery } = req.body;
    try {
      const updatedJobHistory = await updateJobHistoryById(id, workerId, orderId, station, pickupDelivery);
      return res.status(200).send(updatedJobHistory);
    } catch (error:any) {
      const errorMessage = error instanceof Error ? error.message : error as string;
      return res.status(500).send({ error: errorMessage });
    }
  }

  async deleteWorkerJobHistory(req: Request, res: Response) {
    const { id } = req.params;
    try {
      await deleteJobHistoryById(id);
      return res.status(200).send({ message: 'WorkerJobHistory deleted successfully' });
    } catch (error:any) {
      const errorMessage = error instanceof Error ? error.message : error as string;
      return res.status(500).send({ error: errorMessage });
    }
  }
}
