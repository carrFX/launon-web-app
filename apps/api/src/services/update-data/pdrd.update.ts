import prisma from "@/prisma";
import { getPdrdById } from "../existing-data/pdrd.exist";

export const updatePdrdStatus = async (id: string, status: string) => {
  const existingPdrd = await getPdrdById(id);
  if (!existingPdrd) throw new Error("Pickup Delivery Request not found!");
  return await prisma.pickupDeliveryRequest.update({
    where: { id },
    data: { status },
  });
};