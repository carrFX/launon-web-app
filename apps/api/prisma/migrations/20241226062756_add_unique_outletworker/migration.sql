/*
  Warnings:

  - A unique constraint covering the columns `[mail]` on the table `OutletWorker` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `OutletWorker_mail_key` ON `OutletWorker`(`mail`);
