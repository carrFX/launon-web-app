import prisma from "@/prisma"

export const exsistingWorkersByOutletId = async (outletId: string) => {
    return await prisma.outletWorker.findMany({ where: { outletId } })
}
export const existingDriverByOutletId = async (outletId: string) => {
    return await prisma.outletWorker.findFirst({ where: { outletId, role: 'driver' } })
}