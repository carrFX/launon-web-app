import prisma from "@/prisma"
import { existingUserById } from "../existing-data/user.exist"

export const deleteUserById = async (id: string) => {
    const user = await existingUserById(id);
    if (!user) throw new Error("User not found!");
    return await prisma.user.delete({ where: { id } })
}