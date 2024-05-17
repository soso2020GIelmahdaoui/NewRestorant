-- CreateTable
CREATE TABLE `Restorant` (
    `id_resto` INTEGER NOT NULL AUTO_INCREMENT,
    `manager_restorant` VARCHAR(80) NOT NULL,
    `city` VARCHAR(100) NOT NULL,
    `address` TEXT NOT NULL,
    `telephone_restorant` VARCHAR(12) NOT NULL,
    `email_restorant` VARCHAR(100) NOT NULL,
    `branch` VARCHAR(100) NOT NULL,

    UNIQUE INDEX `Restorant_branch_key`(`branch`),
    PRIMARY KEY (`id_resto`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Newsletter` (
    `id_News` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(45) NOT NULL,
    `date_inscription` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `restorantId` INTEGER NOT NULL,

    PRIMARY KEY (`id_News`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Repas` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nom` VARCHAR(255) NOT NULL,
    `description` TEXT NULL,
    `prix` DECIMAL(10, 2) NOT NULL,
    `image_url` VARCHAR(255) NULL,
    `categorie_id` INTEGER NULL,
    `restaurant_id` INTEGER NULL,

    INDEX `categorie_id`(`categorie_id`),
    INDEX `restaurant_id`(`restaurant_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Categories` (
    `id_category` INTEGER NOT NULL AUTO_INCREMENT,
    `type_category` VARCHAR(20) NOT NULL,
    `description_category` VARCHAR(45) NOT NULL,

    UNIQUE INDEX `Categories_type_category_key`(`type_category`),
    PRIMARY KEY (`id_category`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Chefs` (
    `id_chef` INTEGER NOT NULL AUTO_INCREMENT,
    `name_chef` VARCHAR(80) NOT NULL,
    `designation` TEXT NOT NULL,
    `image` TEXT NOT NULL,
    `facebook` TEXT NOT NULL,
    `twitter` TEXT NOT NULL,
    `instagram` TEXT NOT NULL,
    `id_restorant_fk` INTEGER NOT NULL,

    PRIMARY KEY (`id_chef`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Newsletter` ADD CONSTRAINT `Newsletter_restorantId_fkey` FOREIGN KEY (`restorantId`) REFERENCES `Restorant`(`id_resto`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Repas` ADD CONSTRAINT `repas_ibfk_1` FOREIGN KEY (`categorie_id`) REFERENCES `Categories`(`id_category`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `Repas` ADD CONSTRAINT `repas_ibfk_2` FOREIGN KEY (`restaurant_id`) REFERENCES `Restorant`(`id_resto`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `Chefs` ADD CONSTRAINT `Chefs_id_restorant_fk_fkey` FOREIGN KEY (`id_restorant_fk`) REFERENCES `Restorant`(`id_resto`) ON DELETE RESTRICT ON UPDATE CASCADE;
