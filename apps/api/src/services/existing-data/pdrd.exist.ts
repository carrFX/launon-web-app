import prisma from '@/prisma';

export const allPickupDeliveryRequest = async () => {
  return await prisma.pickupDeliveryRequest.findMany({
    include: {
      order: true,
      driver: true,
      fromAddress: true,
      toAddress: true,
      history: true,
    },
  });
};
export const getPdrdById = async (id: string) => {
  return await prisma.pickupDeliveryRequest.findUnique({
    where: { id },
    include: {
      order: true,
      driver: true,
      fromAddress: true,
      toAddress: true,
      history: true,
    },
  });
};
export const getPdrdByDriverId = async (id: string) => {
  return await prisma.pickupDeliveryRequest.findMany({
    where: { driverId: id },
    include: {
      order: true,
      driver: true,
      fromAddress: true,
      toAddress: true,
      history: true,
    },
  });
};