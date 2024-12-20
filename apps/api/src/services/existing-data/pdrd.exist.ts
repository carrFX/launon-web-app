import prisma from '@/prisma';

export const allPickupDeliveryRequest = async () => {
  const pdrd =  await prisma.pickupDeliveryRequest.findMany({
    include: {
      order: true,
      driver: true,
      fromAddress: true,
      toAddress: true,
      history: true,
    },
  });
  if(!pdrd) throw new Error("Pickup Delivery Request not found!");
  return pdrd
};
export const getPdrdById = async (id: string) => {
  const pdrd = await prisma.pickupDeliveryRequest.findUnique({
    where: { id },
    include: {
      order: true,
      driver: true,
      fromAddress: true,
      toAddress: true,
      history: true,
    },
  });
  if(!pdrd) throw new Error("Pickup Delivery Request not found!");
  return pdrd
};
export const getPdrdByDriverId = async (id: string) => {
  const pdrd = await prisma.pickupDeliveryRequest.findMany({
    where: { driverId: id },
    include: {
      order: true,
      driver: true,
      fromAddress: true,
      toAddress: true,
      history: true,
    },
  });
  if(!pdrd) throw new Error("Pickup Delivery Request not found!");
  return pdrd
};