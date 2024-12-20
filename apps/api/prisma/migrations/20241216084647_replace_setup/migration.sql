-- CreateTable
CREATE TABLE `User` (
    `id` VARCHAR(191) NOT NULL,
    `mail` VARCHAR(191) NOT NULL,
    `username` VARCHAR(191) NOT NULL DEFAULT '',
    `avatar` VARCHAR(191) NOT NULL DEFAULT 'https://cdn.pixabay.com/photo/2018/11/13/21/43/avatar-3814049_960_720.png',
    `password` VARCHAR(191) NULL,
    `role` ENUM('customer', 'admin', 'superAdmin', 'worker') NOT NULL DEFAULT 'customer',
    `userToken` VARCHAR(191) NULL,
    `userTokenExp` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `User_mail_key`(`mail`),
    UNIQUE INDEX `User_userToken_key`(`userToken`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `VerifyUser` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `verified` BOOLEAN NOT NULL DEFAULT false,
    `verifyToken` VARCHAR(191) NULL,
    `tokenExp` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `VerifyUser_verifyToken_key`(`verifyToken`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Address` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NULL,
    `outletId` VARCHAR(191) NULL,
    `street` VARCHAR(191) NOT NULL,
    `city` VARCHAR(191) NOT NULL,
    `state` VARCHAR(191) NOT NULL,
    `postalCode` VARCHAR(191) NOT NULL,
    `country` VARCHAR(191) NOT NULL,
    `isMain` BOOLEAN NOT NULL DEFAULT false,
    `phone` VARCHAR(191) NULL,
    `latitude` DOUBLE NULL,
    `longitude` DOUBLE NULL,
    `isDeleted` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Outlet` (
    `id` VARCHAR(191) NOT NULL,
    `outletName` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Outlet_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `OutletWorker` (
    `id` VARCHAR(191) NOT NULL,
    `outletId` VARCHAR(191) NOT NULL,
    `workerId` VARCHAR(191) NOT NULL,
    `role` ENUM('ironer', 'washer', 'packer', 'driver') NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Order` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `addressId` VARCHAR(191) NOT NULL,
    `outletId` VARCHAR(191) NOT NULL,
    `package` VARCHAR(191) NULL,
    `status` ENUM('waiting_for_pickup', 'on_the_way_to_outlet', 'arrived_at_outlet', 'weighed', 'washed', 'ironed', 'packed', 'waiting_for_payment', 'ready_for_delivery', 'on_the_way_to_customer', 'delivered_to_customer', 'confirmed', 'recalculate') NOT NULL DEFAULT 'waiting_for_pickup',
    `pickupSchedule` DATETIME(3) NOT NULL,
    `totalWeight` DOUBLE NULL,
    `totalItems` INTEGER NOT NULL DEFAULT 0,
    `totalPrice` DOUBLE NULL,
    `paymentStatus` ENUM('pending', 'unpaid', 'paid') NOT NULL DEFAULT 'pending',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `VerifyUser` ADD CONSTRAINT `VerifyUser_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Address` ADD CONSTRAINT `Address_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Address` ADD CONSTRAINT `Address_outletId_fkey` FOREIGN KEY (`outletId`) REFERENCES `Outlet`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OutletWorker` ADD CONSTRAINT `OutletWorker_outletId_fkey` FOREIGN KEY (`outletId`) REFERENCES `Outlet`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OutletWorker` ADD CONSTRAINT `OutletWorker_workerId_fkey` FOREIGN KEY (`workerId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_addressId_fkey` FOREIGN KEY (`addressId`) REFERENCES `Address`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_outletId_fkey` FOREIGN KEY (`outletId`) REFERENCES `Outlet`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
