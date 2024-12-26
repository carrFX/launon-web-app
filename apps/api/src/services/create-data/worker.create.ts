import prisma from "@/prisma";
import { WorkerRoles } from "@prisma/client";

export const createNewWorker = async (username: string, mail: string, password: string, outletId: string, role: WorkerRoles) => {
    return await prisma.outletWorker.create({
        data: { username, mail, password, outletId, role }
    })
}