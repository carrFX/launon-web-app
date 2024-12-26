import prisma from "@/prisma"

export const existingDriverStatusByDriverId = async (driverId : string) => {
    return await prisma.driverStatus.findFirst({ where: { driverId } })
}