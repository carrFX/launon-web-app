import prisma from "@/prisma";
import { existingDriverStatusByDriverId } from "../existing-data/driver-status.exist";

export const updateDataDriverStatus = async (driverId: string, status: string, PdrId: number | null) => {
    const existingDriverStatus = await existingDriverStatusByDriverId(driverId);
    if(!existingDriverStatus) throw new Error('Driver status not found');
    return await prisma.driverStatus.update({
        where: {
          driverId,
        },
        data: {
          status,
          PdrId,
        },
      });
}