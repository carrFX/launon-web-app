import prisma from "@/prisma"
import { existingUserById, existingUserByMail, existingUserByUserToken, existingVerifiedUser, existingVerifiedUserByVerifiedToken } from "../existing-data/user.exist";

export const setDataPassUser = async (userToken: string, password: string) => {
  existingUserByUserToken(userToken);
  return await prisma.user.update({
            where: { userToken },
            data: {
              password,
              userToken: null,
              userTokenExp: null,
            },
          });
}
export const updateVerifyUserByUserId = async (userId: string, verifyToken: string, tokenExp: Date) => {
  await existingUserById(userId);
  return await prisma.verifyUser.updateMany({
            where: {userId},
            data: {
              verifyToken,
              tokenExp
            }
          })
}
export const updateVerifyUserByVerifyToken = async (verifyToken: string) => {
  await existingVerifiedUserByVerifiedToken(verifyToken);
  return await prisma.verifyUser.updateMany({
            where: {verifyToken},
            data: {
              verified : true,
              verifyToken : null,
              tokenExp : null
            }
          })
}
export const updateMailUserByOldMail = async (oldMail: string, newMail: string) => {
  await existingUserByMail(oldMail);
  return await prisma.user.update({
          where: { mail: oldMail },
          data: {
            mail: newMail,
            userToken: null,
            userTokenExp: null,
          },
        });
}
export const unVerifiedUser = async (userId: string) => {
  await existingVerifiedUser(userId);
  return await prisma.verifyUser.updateMany({
    where: {userId},
    data: {verified: false}
  })
}
export const updatePassUser = async (id: string, password: string) => {
  await existingUserById(id);
  return await prisma.user.update({
    where: {id},
    data: { password }
  })
}
export const updateUserToken = async (mail: string, userToken: string, userTokenExp: Date) => {
  await existingUserByMail(mail);
  return await prisma.user.update({
          where: { mail },
          data: {
            userToken,
            userTokenExp,
          },
        });
}
export const updateUsernameById = async (id: string, username: string) => {
  await existingUserById(id);
  return await prisma.user.update({
    where: { id },
    data: {
      username
    }
  })
}
export const updateAvaByUserId = async (id: string, avatar: string) => {
  await existingUserById(id);
  const user = await prisma.user.update({ 
      where: { id },
      data: { avatar }
  })
  return user
}