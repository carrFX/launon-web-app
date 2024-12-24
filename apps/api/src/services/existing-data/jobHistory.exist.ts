import prisma from '@/prisma';

export const existingAllJobHistories = async () => {
  return await prisma.workerJobHistory.findMany({
    include: {
      worker: true,
      order: true,
      pickupDeliveryRequest: true,
    },
  });
};
export const existingJobHistoryById = async (id: string) => {
  return await prisma.workerJobHistory.findFirst({
    where: { id },
    include: {
      worker: true,
      order: true,
      pickupDeliveryRequest: true,
    },
  });
};
export const exisistingJobHistoryByOrderId = async (orderId: string) => {
  return await prisma.workerJobHistory.findMany({
    where: { orderId },
    include: {
      order: true,
    },
  });
};