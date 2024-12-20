import prisma from "@/prisma"

export const existingUserByMail = async (mail: string) => {
    const user = await prisma.user.findUnique({ where: { mail } });
    if (!user) throw new Error("User not found!");
    return user
}
export const existingUserByUserToken = async (userToken: string) => {
    const user = await prisma.user.findUnique({ where: { userToken } });
    if (!user) throw new Error("User not found!");
    return user
}
export const existingUserById = async (id: string) => {
    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) throw new Error("User not found!");
    return user
}
export const profileUserById = async (id: string) => {
    const user = await prisma.user.findUnique({
        where: { id },
        include: { verifyUser: true }
    })
    if (!user) throw new Error("User not found!");
    return user
}
export const existingVerifiedUser = async (userId: string) => {
    const verified = await prisma.verifyUser.findFirst({ where: { userId } });
    if (!verified) throw new Error("User not found!");
    return verified
}
export const existingVerifiedUserByVerifiedToken = async (verifyToken: string) => {
    const verified = await prisma.verifyUser.findUnique({ where: { verifyToken } });
    if (!verified) throw new Error("User not found!");
    return verified
}