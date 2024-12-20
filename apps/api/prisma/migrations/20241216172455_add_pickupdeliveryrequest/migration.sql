-- CreateTable
CREATE TABLE `PickupDeliveryRequest` (
    `id` VARCHAR(191) NOT NULL,
    `orderId` VARCHAR(191) NOT NULL,
    `distance` INTEGER NOT NULL,
    `driverId` VARCHAR(191) NOT NULL,
    `fromAddressId` VARCHAR(191) NOT NULL,
    `toAddressId` VARCHAR(191) NOT NULL,
    `requestType` VARCHAR(191) NOT NULL DEFAULT '',
    `status` VARCHAR(191) NOT NULL DEFAULT 'Wait to pick up',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `PickupDeliveryRequest` ADD CONSTRAINT `PickupDeliveryRequest_orderId_fkey` FOREIGN KEY (`orderId`) REFERENCES `Order`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PickupDeliveryRequest` ADD CONSTRAINT `PickupDeliveryRequest_fromAddressId_fkey` FOREIGN KEY (`fromAddressId`) REFERENCES `Address`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PickupDeliveryRequest` ADD CONSTRAINT `PickupDeliveryRequest_toAddressId_fkey` FOREIGN KEY (`toAddressId`) REFERENCES `Address`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
