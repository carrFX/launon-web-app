import prisma from '@/prisma';
import { existingAddressById, existingUserAddresses } from '../existing-data/address.exist';

export const unMainUserAddressees = async (userId: string) => {
  await existingUserAddresses(userId);
  return await prisma.address.updateMany({
    where: { userId, isMain: true },
    data: { isMain: false },
  });
};
export const setMainUserAddress = async (addressId: string) => {
  await existingAddressById(addressId);
  return await prisma.address.update({
      where: { id: addressId },
      data: { isMain: true },
  });
};
export const isDeletedAddress = async (id: string) => {
  const existingAddress = await existingAddressById(id);
  return await prisma.address.update({
    where: { id },
    data: { isDeleted: true },
  });
};
