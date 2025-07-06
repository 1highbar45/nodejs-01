/*
  Warnings:

  - You are about to alter the column `sold` on the `products` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `Int`.
  - Made the column `name` on table `products` required. This step will fail if there are existing NULL values in that column.
  - Made the column `detailDesc` on table `products` required. This step will fail if there are existing NULL values in that column.
  - Made the column `shortDesc` on table `products` required. This step will fail if there are existing NULL values in that column.
  - Made the column `factory` on table `products` required. This step will fail if there are existing NULL values in that column.
  - Made the column `target` on table `products` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `products` MODIFY `name` VARCHAR(255) NOT NULL,
    MODIFY `detailDesc` VARCHAR(255) NOT NULL,
    MODIFY `shortDesc` VARCHAR(255) NOT NULL,
    MODIFY `sold` INTEGER NULL DEFAULT 0,
    MODIFY `factory` VARCHAR(50) NOT NULL,
    MODIFY `target` VARCHAR(255) NOT NULL;
