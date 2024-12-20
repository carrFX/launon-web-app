import prisma from "@/prisma";
import { getPdrdById } from "../existing-data/pdrd.exist";

export const deletePdrdById = async (id: string) => {
    await getPdrdById(id);
    return await prisma.pickupDeliveryRequest.delete({
      where: { id },
    });
  };
  