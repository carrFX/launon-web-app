import prisma from "@/prisma";

export const existingAddressById = async (id: string) => {
    const address =  await prisma.address.findUnique({ where: { id } });
    if (!address) throw new Error("Address not found!");
    return address
}
export const existingUserAddresses = async (userId: string) => {
    const address =  await prisma.address.findMany({ where: { userId } })
    if (!address) throw new Error("Address not found!");
    return address
}
export const existingOutletAddresses = async (outletId: string) => {
    const address =  await prisma.address.findMany({ where: { outletId } })
    if (!address) throw new Error("Address not found!");
    return address
}
export const existingAllOutletAddress = async () => {
    const address =  await prisma.address.findMany({ where: { outletId: { not: null } } })
    if (!address) throw new Error("Address not found!");
    return address
}
export const existingAllUserAddress = async () => {
    const address =  await prisma.address.findMany({ where: { userId: { not: null } } })
    if (!address) throw new Error("Address not found!");
    return address
}