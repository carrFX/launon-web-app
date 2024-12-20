import prisma from '@/prisma';

export const existingAllJobHistories = async () => {
  const jobHistories = await prisma.workerJobHistory.findMany({
    include: {
      worker: true,
      order: true,
      pickupDeliveryRequest: true,
    },
  });
  if (!jobHistories) throw new Error('Job History not found!');
  return jobHistories;
};
export const existingJobHistoryById = async (id: string) => {
  const jobHistories = await prisma.workerJobHistory.findFirst({
    where: { id },
    include: {
      worker: true,
      order: true,
      pickupDeliveryRequest: true,
    },
  });
  if (!jobHistories) throw new Error('Job History not found!');
  return jobHistories;
};
export const exisistingJobHistoryByOrderId = async (orderId: string) => {
  const jobHistory = await prisma.workerJobHistory.findMany({
    where: { orderId },
    include: {
      order: true,
    },
  });
  if (!jobHistory) throw new Error('Job History not found!');
  return jobHistory;
};