import prisma from "@/prisma";

export const createNewNotification = async (userId: string, orderId: string, statusToUpdate: string) => {
    await prisma.notification.create({
            data: {
              userId,
              title: `Order ${orderId} Status Updated`,
              message: `The status of your order has been updated to ${statusToUpdate}.`,
            },
          });
}