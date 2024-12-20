/*
  Warnings:

  - You are about to drop the column `workerId` on the `outletworker` table. All the data in the column will be lost.
  - The values [admin,worker] on the enum `User_role` will be removed. If these variants are still used in the database, this will fail.
  - Added the required column `mail` to the `OutletWorker` table without a default value. This is not possible if the table is not empty.
  - Added the required column `username` to the `OutletWorker` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `outletworker` DROP FOREIGN KEY `OutletWorker_workerId_fkey`;

-- AlterTable
ALTER TABLE `outletworker` DROP COLUMN `workerId`,
    ADD COLUMN `mail` VARCHAR(191) NOT NULL,
    ADD COLUMN `username` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `user` MODIFY `role` ENUM('customer', 'superAdmin') NOT NULL DEFAULT 'customer';

-- CreateTable
CREATE TABLE `Attendance` (
    `id` VARCHAR(191) NOT NULL,
    `workerId` VARCHAR(191) NOT NULL,
    `date` DATETIME(3) NOT NULL,
    `checkIn` DATETIME(3) NULL,
    `checkOut` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Attendance_workerId_date_key`(`workerId`, `date`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `WorkerJobHistory` (
    `id` VARCHAR(191) NOT NULL,
    `workerId` VARCHAR(191) NOT NULL,
    `orderId` VARCHAR(191) NOT NULL,
    `station` ENUM('ironer', 'washer', 'packer', 'driver') NOT NULL,
    `pickupDelivery` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `DriverStatus` (
    `id` VARCHAR(191) NOT NULL,
    `driverId` VARCHAR(191) NOT NULL,
    `status` VARCHAR(191) NOT NULL DEFAULT 'available',
    `PdrId` INTEGER NULL,

    UNIQUE INDEX `DriverStatus_driverId_key`(`driverId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `OrderHistory` (
    `id` VARCHAR(191) NOT NULL,
    `orderId` VARCHAR(191) NOT NULL,
    `status` VARCHAR(191) NOT NULL,
    `changeDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `PickupDeliveryRequest` ADD CONSTRAINT `PickupDeliveryRequest_driverId_fkey` FOREIGN KEY (`driverId`) REFERENCES `OutletWorker`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Attendance` ADD CONSTRAINT `Attendance_workerId_fkey` FOREIGN KEY (`workerId`) REFERENCES `OutletWorker`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `WorkerJobHistory` ADD CONSTRAINT `WorkerJobHistory_workerId_fkey` FOREIGN KEY (`workerId`) REFERENCES `OutletWorker`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `WorkerJobHistory` ADD CONSTRAINT `WorkerJobHistory_orderId_fkey` FOREIGN KEY (`orderId`) REFERENCES `Order`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `WorkerJobHistory` ADD CONSTRAINT `WorkerJobHistory_pickupDelivery_fkey` FOREIGN KEY (`pickupDelivery`) REFERENCES `PickupDeliveryRequest`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DriverStatus` ADD CONSTRAINT `DriverStatus_driverId_fkey` FOREIGN KEY (`driverId`) REFERENCES `OutletWorker`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OrderHistory` ADD CONSTRAINT `OrderHistory_orderId_fkey` FOREIGN KEY (`orderId`) REFERENCES `Order`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
