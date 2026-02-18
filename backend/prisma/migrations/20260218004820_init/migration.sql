-- CreateTable
CREATE TABLE `Sorteo` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `description` TEXT NULL,
    `prize` VARCHAR(191) NOT NULL,
    `prizeValue` DECIMAL(12, 2) NULL,
    `image` VARCHAR(191) NULL,
    `ticketPrice` DECIMAL(12, 2) NOT NULL,
    `totalTickets` INTEGER NOT NULL,
    `ticketsSold` INTEGER NOT NULL DEFAULT 0,
    `drawDate` DATETIME(3) NULL,
    `endDate` DATETIME(3) NULL,
    `status` ENUM('ACTIVE', 'CLOSED', 'CANCELLED') NOT NULL DEFAULT 'ACTIVE',
    `category` VARCHAR(191) NULL,
    `winners` INTEGER NOT NULL DEFAULT 1,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `Sorteo_status_idx`(`status`),
    INDEX `Sorteo_category_idx`(`category`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TarjetaIlustracion` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `image` VARCHAR(191) NULL,
    `metadata` JSON NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `sorteoId` INTEGER NOT NULL,

    INDEX `TarjetaIlustracion_sorteoId_idx`(`sorteoId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `OrdenCompra` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `orderNumber` INTEGER NOT NULL,
    `preferenceId` VARCHAR(191) NULL,
    `providerPaymentId` VARCHAR(191) NULL,
    `sorteoId` INTEGER NOT NULL,
    `raffleName` VARCHAR(191) NOT NULL,
    `buyerName` VARCHAR(191) NOT NULL,
    `buyerEmail` VARCHAR(191) NOT NULL,
    `buyerPhone` VARCHAR(191) NULL,
    `ticketCount` INTEGER NOT NULL,
    `ticketPrice` DECIMAL(12, 2) NOT NULL,
    `total` DECIMAL(12, 2) NOT NULL,
    `status` ENUM('PENDING', 'CONFIRMED', 'CANCELLED', 'FAILED') NOT NULL DEFAULT 'PENDING',
    `paymentProvider` ENUM('MERCADOPAGO', 'OTHER') NULL,
    `ticketNumbers` JSON NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `confirmedAt` DATETIME(3) NULL,

    UNIQUE INDEX `OrdenCompra_orderNumber_key`(`orderNumber`),
    UNIQUE INDEX `OrdenCompra_preferenceId_key`(`preferenceId`),
    UNIQUE INDEX `OrdenCompra_providerPaymentId_key`(`providerPaymentId`),
    INDEX `OrdenCompra_sorteoId_idx`(`sorteoId`),
    INDEX `OrdenCompra_status_idx`(`status`),
    INDEX `OrdenCompra_buyerEmail_idx`(`buyerEmail`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Ticket` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `sorteoId` INTEGER NOT NULL,
    `tarjetaId` INTEGER NOT NULL,
    `ordenId` INTEGER NULL,
    `ticketNumber` INTEGER NOT NULL,
    `status` ENUM('AVAILABLE', 'ASSIGNED', 'USED') NOT NULL DEFAULT 'ASSIGNED',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `Ticket_tarjetaId_idx`(`tarjetaId`),
    INDEX `Ticket_sorteoId_idx`(`sorteoId`),
    UNIQUE INDEX `Ticket_sorteoId_ticketNumber_key`(`sorteoId`, `ticketNumber`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `TarjetaIlustracion` ADD CONSTRAINT `TarjetaIlustracion_sorteoId_fkey` FOREIGN KEY (`sorteoId`) REFERENCES `Sorteo`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OrdenCompra` ADD CONSTRAINT `OrdenCompra_sorteoId_fkey` FOREIGN KEY (`sorteoId`) REFERENCES `Sorteo`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Ticket` ADD CONSTRAINT `Ticket_sorteoId_fkey` FOREIGN KEY (`sorteoId`) REFERENCES `Sorteo`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Ticket` ADD CONSTRAINT `Ticket_ordenId_fkey` FOREIGN KEY (`ordenId`) REFERENCES `OrdenCompra`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Ticket` ADD CONSTRAINT `Ticket_tarjetaId_fkey` FOREIGN KEY (`tarjetaId`) REFERENCES `TarjetaIlustracion`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
