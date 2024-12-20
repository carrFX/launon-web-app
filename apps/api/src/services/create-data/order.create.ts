import prisma from "@/prisma"

export const createNewOrder = async (userId: string, addressId:string, outletId: string, pickupSchedule: string) => {
    return await prisma.order.create({
        data: { userId, addressId, outletId,pickupSchedule }
    })
}