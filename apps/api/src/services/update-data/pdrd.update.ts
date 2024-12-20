import prisma from "@/prisma";
import { getPdrdById } from "../existing-data/pdrd.exist";

export const updatePdrdStatus = async (id: string, status: string) => {
  await getPdrdById(id);
  return await prisma.pickupDeliveryRequest.update({
    where: { id },
    data: { status },
  });
};