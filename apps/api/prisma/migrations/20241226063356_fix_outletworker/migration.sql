/*
  Warnings:

  - Added the required column `password` to the `OutletWorker` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `outletworker` ADD COLUMN `password` VARCHAR(191) NOT NULL,
    ADD COLUMN `refreshWorker` VARCHAR(255) NULL;
