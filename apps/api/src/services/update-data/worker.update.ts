import prisma from "@/prisma";
import { existingWorkerByMail } from "../existing-data/worker.exist";
import { WorkerRoles } from "@prisma/client";

export const updateRefreshWorker = async (mail: string, refreshWorker: string | null) => {
  const workerExist = await existingWorkerByMail(mail);
  if (!workerExist) throw new Error("User not found!");
  return await prisma.outletWorker.update({ 
      where: { mail },
      data: { refreshWorker }
  })
}
export const updateDataWorker = async (id: string, outletId:string, username:string, password:string, mail:string, role:WorkerRoles) => {
  return await prisma.outletWorker.update({
          where: { id },
          data: {
            outletId,
            username,
            password,
            mail,
            role,
          },
        });
}