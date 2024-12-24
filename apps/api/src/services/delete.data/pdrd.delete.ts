import prisma from '@/prisma';
import { getPdrdById } from '../existing-data/pdrd.exist';

export const deletePdrdById = async (id: string) => {
  const existingPdrd = await getPdrdById(id);
  if (!existingPdrd) throw new Error('Pickup Delivery Request not found!');
  return await prisma.pickupDeliveryRequest.delete({
    where: { id },
  });
};
