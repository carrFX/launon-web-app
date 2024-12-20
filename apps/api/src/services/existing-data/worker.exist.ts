import prisma from "@/prisma"

export const exsistingWorkersByOutletId = async (outletId: string) => {
    const workers = await prisma.outletWorker.findMany({ where: { outletId } })
    if (!workers) throw new Error("Workers not found!");
    return workers
}
export const existingDriverByOutletId = async (outletId: string) => {
    const driver = await prisma.outletWorker.findFirst({ where: { outletId, role: 'driver' } })
    if (!driver) throw new Error("Driver not found!");
    return driver
}