/*
  Warnings:

  - A unique constraint covering the columns `[invoice]` on the table `Order` will be added. If there are existing duplicate values, this will fail.
  - The required column `invoice` was added to the `Order` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE `order` ADD COLUMN `invoice` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Order_invoice_key` ON `Order`(`invoice`);
