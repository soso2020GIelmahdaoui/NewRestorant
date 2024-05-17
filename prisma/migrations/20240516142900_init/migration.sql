/*
  Warnings:

  - You are about to drop the column `restorantId` on the `newsletter` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `newsletter` DROP FOREIGN KEY `Newsletter_restorantId_fkey`;

-- AlterTable
ALTER TABLE `newsletter` DROP COLUMN `restorantId`;
