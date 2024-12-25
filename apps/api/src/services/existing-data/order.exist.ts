import prisma from '@/prisma';

export const existingAllOrders = async () => {
    return await prisma.order.findMany({
        include: {
            pickupDeliveryRequests: true,
            user: true,
            outlet: true,
          },
    });
}
export const existingOrderById = async (id: string) => {
    return await prisma.order.findUnique({ where: { id }, include: { pickupDeliveryRequests: true } });
}
export const existingOrderByInvoice = async (invoice: string) => {
    return  await prisma.order.findUnique({ where: { invoice } , select: { addressId: true, pickupSchedule: true, outletId: true }});
}
export const existingOrderByDate = async (startOfDay: number, endOfDay: number) => {
    return await prisma.order.findMany({
        where: { createdAt: { gte: new Date(startOfDay), lte: new Date(endOfDay) } },
    })
}
export const existingAllOrdersByUserId = async (userId: string) => {
    return await prisma.order.findMany({ where: { userId }, orderBy: { createdAt: 'desc' } });
}