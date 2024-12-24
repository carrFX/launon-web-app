import prisma from "@/prisma";

export const existingAddressById = async (id: string) => {
    return await prisma.address.findUnique({ where: { id } });
}
export const existingUserAddresses = async (userId: string) => {
    return await prisma.address.findMany({ where: { userId } })
}
export const existingOutletAddresses = async (outletId: string) => {
    return await prisma.address.findMany({ where: { outletId } })
}
export const existingAllOutletAddress = async () => {
    return await prisma.address.findMany({ where: { outletId: { not: null } } })
}
export const existingAllUserAddress = async () => {
    return await prisma.address.findMany({ where: { userId: { not: null } } })
}