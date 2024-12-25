import prisma from "@/prisma"

export const existingUserByMail = async (mail: string) => {
    return await prisma.user.findUnique({ where: { mail } });
}
export const existingUserByUserToken = async (userToken: string) => {
    return await prisma.user.findUnique({ where: { userToken }, include: { verifyUser: true } });
}
export const existingUserById = async (id: string) => {
    return await prisma.user.findUnique({ where: { id }, include: { verifyUser: true } });
}
export const existingVerifiedUser = async (userId: string) => {
    return await prisma.verifyUser.findFirst({ where: { userId } });
}
export const existingVerifiedUserByVerifiedToken = async (verifyToken: string) => {
    return await prisma.verifyUser.findUnique({ where: { verifyToken } });
}