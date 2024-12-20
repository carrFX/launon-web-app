import prisma from "@/prisma"

export const createNewUser = async (username: string, mail: string) => {
  return await prisma.user.create({ data: { username, mail, } })
}
export const createVerifyUser = async (userId: string, verifyToken: string, tokenExp: Date) => {
  return await prisma.verifyUser.create({
        data: {
          userId,
          verifyToken,
          tokenExp,
        }
      })
}
export const createVerifyGoogleAccount = async (userId: string) => {
  return await prisma.verifyUser.create({
        data: {
          userId,
          verified: true,
          verifyToken: null,
          tokenExp: null
        }
      })
}
export const createNewUserWithGoogle = async (username: string, email: string, picture: string) => {
  return await prisma.user.create({
        data: {
          username,
          mail: email,
          avatar: picture,
        },
      });
}