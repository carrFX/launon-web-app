import prisma from '@/prisma';
import { existingAddressById, existingUserAddresses } from '../existing-data/address.exist';

export const unMainUserAddressees = async (userId: string) => {
  const existingAddress = await existingUserAddresses(userId);
  if (!existingAddress) throw new Error('No address found');
  return await prisma.address.updateMany({
    where: { userId, isMain: true },
    data: { isMain: false },
  });
};
export const setMainUserAddress = async (addressId: string) => {
  const existingAddress = await existingAddressById(addressId);
  if (!existingAddress) throw new Error('Address not found');
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