import prisma from "@/prisma"
import { OrderStatus, PaymentStatus } from "@prisma/client"
import { existingOrderById } from "../existing-data/order.exist"

export const orderIsDeleted = async (id: string) => {
    const orderExist = await existingOrderById(id);
    if (!orderExist) throw new Error('Order not found');
    return await prisma.order.update({ where: { id }, data: { isDeleted: true } })
}
export const orderIsConfirmedStatus = async (id: string) => {
    const orderExist = await existingOrderById(id);
    if (!orderExist) throw new Error('Order not found');
    return await prisma.order.update({ where: { id }, data: { status: 'confirmed' } })
}
export const updatePriceWeight = async (id: string, weight: number, totalPrice: number, totalItems: number) => {
    const orderExist = await existingOrderById(id);
    if (!orderExist) throw new Error('Order not found');
    return await prisma.order.update({
            where: { id },
            data: {
              totalWeight: weight,
              totalPrice,
              totalItems,
              paymentStatus: 'unpaid',
            },
            include: {
              user: true,
              address: true,
              outlet: true,
            },
          });
}
export const updateStatusPaymentAndOrderStatus = async (id:string, paymentStatus: PaymentStatus, status: OrderStatus) => {
  const orderExist = await existingOrderById(id);
  if (!orderExist) throw new Error('Order not found');
  return await prisma.order.update({
        where: { id },
        data: {paymentStatus, status}
    })
}
export const updatePaymentStatus = async (id:string, paymentStatus: PaymentStatus) => {
  const orderExist = await existingOrderById(id);
  if (!orderExist) throw new Error('Order not found');
  return await prisma.order.update({
        where: { id },
        data: {paymentStatus}
    })
}