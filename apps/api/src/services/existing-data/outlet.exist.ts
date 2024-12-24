import prisma from "@/prisma";

export const existingAllOutlets = async () => {
    return prisma.outlet.findMany();
}
export const existingOutletById = async (id: string) => {
    return prisma.outlet.findUnique({ where: { id } });
}