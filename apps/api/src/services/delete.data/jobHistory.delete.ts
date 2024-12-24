import prisma from '@/prisma';
import { existingJobHistoryById } from '../existing-data/jobHistory.exist';

export const deleteJobHistoryById = async (id: string) => {
  const existingJobHistory = await existingJobHistoryById(id);
  if (!existingJobHistory) throw new Error('Job History not found!');
  return await prisma.workerJobHistory.delete({
    where: { id },
  });
};