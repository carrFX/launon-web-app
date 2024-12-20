import prisma from "@/prisma";

export const existingAllOutlets = async () => {
    const outlets = prisma.outlet.findMany();
    if(!outlets) throw new Error('No outlets found');
    return outlets
}
export const existingOutletById = async (id: string) => {
    const outlet = prisma.outlet.findUnique({ where: { id } });
    if(!outlet) throw new Error('Outlet not found');
    return outlet
}