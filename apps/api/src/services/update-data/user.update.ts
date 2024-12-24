import prisma from "@/prisma"
import { existingUserById, existingUserByMail, existingUserByUserToken, existingVerifiedUser, existingVerifiedUserByVerifiedToken } from "../existing-data/user.exist";

export const setDataPassUser = async (userToken: string, password: string) => {
  const user = await existingUserByUserToken(userToken);
  if (!user) throw new Error("User not found!");
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
  const user = await existingUserById(userId);
  if (!user) throw new Error("User not found!");
  return await prisma.verifyUser.updateMany({
            where: {userId},
            data: {
              verifyToken,
              tokenExp
            }
          })
}
export const updateVerifyUserByVerifyToken = async (verifyToken: string) => {
  const verifiedUser = await existingVerifiedUserByVerifiedToken(verifyToken);
  if (!verifiedUser) throw new Error("User not verified!");
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
  const user = await existingUserByMail(oldMail);
  if (!user) throw new Error("User not found!");
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
  const verifiedUser = await existingVerifiedUser(userId);
  if (!verifiedUser) throw new Error("User not verified!");
  return await prisma.verifyUser.updateMany({
    where: {userId},
    data: {verified: false}
  })
}
export const updatePassUser = async (id: string, password: string) => {
  const user = await existingUserById(id);
  if(!user) throw new Error("User not found!");
  return await prisma.user.update({
    where: {id},
    data: { password }
  })
}
export const updateUserToken = async (mail: string, userToken: string, userTokenExp: Date) => {
  const user = await existingUserByMail(mail);
  if (!user) throw new Error("User not found!");
  return await prisma.user.update({
          where: { mail },
          data: {
            userToken,
            userTokenExp,
          },
        });
}
export const updateUsernameById = async (id: string, username: string) => {
  const user = await existingUserById(id);
  if (!user) throw new Error("User not found!");
  return await prisma.user.update({
    where: { id },
    data: {
      username
    }
  })
}
export const updateAvaByUserId = async (id: string, avatar: string) => {
  const userExist = await existingUserById(id);
  if (!userExist) throw new Error("User not found!");
  return await prisma.user.update({ 
      where: { id },
      data: { avatar }
  })
}