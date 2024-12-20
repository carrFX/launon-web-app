import prisma from "@/prisma";
import { WorkerRoles } from "@prisma/client";
import { existingJobHistoryById } from "../existing-data/jobHistory.exist";

export const updateJobHistoryById = async (id: string, workerId: string, orderId: string, station: WorkerRoles, pickupDelivery: string) => {
  const existingJobHistory = await existingJobHistoryById(id);
  if(!existingJobHistory) throw new Error('Job History not found!');
  return await prisma.workerJobHistory.update({
          where: { id },
          data: {
            workerId,
            orderId,
            station,
            pickupDelivery,
          },
        });
};