import prisma from "@/prisma";
import { WorkerRoles } from "@prisma/client";

export const createJobHistory = async (workerId: string, orderId: string, station: WorkerRoles, pickupDelivery: string) => {
    const newJobHistory = await prisma.workerJobHistory.create({
        data: {
            workerId,
            orderId,
            station,
            pickupDelivery,
        },
    });
    return newJobHistory;
}