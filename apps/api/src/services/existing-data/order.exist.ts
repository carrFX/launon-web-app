import prisma from '@/prisma';

export const existingAllOrders = async () => {
    const order = await prisma.order.findMany({
        include: {
            pickupDeliveryRequests: true,
            user: true,
            outlet: true,
          },
    });
    if(!order) throw new Error("Order not found!");
    return order
}
export const existingOrderById = async (id: string) => {
    const order = await prisma.order.findUnique({ where: { id }, include: { pickupDeliveryRequests: true } });
    if(!order) throw new Error("Order not found!");
    return order
}
export const existingOrderByInvoice = async (invoice: string) => {
    const order =  await prisma.order.findUnique({ where: { invoice } });
    if(!order) throw new Error("Order not found!");
    return order
}
export const existingOrderByDate = async (startOfDay: number, endOfDay: number) => {
    const order = await prisma.order.findMany({
        where: { createdAt: { gte: new Date(startOfDay), lte: new Date(endOfDay) } },
    })
    if(!order) throw new Error("Order not found!");
    return order
}
export const existingAllOrdersByUserId = async (userId: string) => {
    const order = await prisma.order.findMany({ where: { userId }, orderBy: { createdAt: 'desc' } });
    if(!order) throw new Error("Order not found!");
    return order
}