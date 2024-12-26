import prisma from "@/prisma"

export const existingAllWorkers = async () => {
    return await prisma.outletWorker.findMany({ include: { jobHistory: true, pickupDeliveries: true } });
}
export const existingWorkerById = async (id: string) => {
    return await prisma.outletWorker.findFirst({ where: { id }, include: { jobHistory: true, pickupDeliveries: true } })
}
export const existingWorkerByMail = async (mail: string) => {
    return await prisma.outletWorker.findUnique({ where: { mail }, include: { outlet: true, jobHistory: true, pickupDeliveries: true } })
}
export const exsistingWorkersByOutletId = async (outletId: string) => {
    return await prisma.outletWorker.findMany({ where: { outletId } })
}
export const existingDriverByOutletId = async (outletId: string) => {
    return await prisma.outletWorker.findFirst({ where: { outletId, role: 'driver' } })
}