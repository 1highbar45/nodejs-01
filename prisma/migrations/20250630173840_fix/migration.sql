/*
  Warnings:

  - You are about to drop the column `username` on the `roles` table. All the data in the column will be lost.
  - Added the required column `name` to the `roles` table without a default value. This is not possible if the table is not empty.
  - Made the column `description` on table `roles` required. This step will fail if there are existing NULL values in that column.
  - Made the column `username` on table `users` required. This step will fail if there are existing NULL values in that column.
  - Made the column `password` on table `users` required. This step will fail if there are existing NULL values in that column.
  - Made the column `accountType` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `roles` DROP COLUMN `username`,
    ADD COLUMN `name` VARCHAR(255) NOT NULL,
    MODIFY `description` VARCHAR(255) NOT NULL;

-- AlterTable
ALTER TABLE `users` MODIFY `username` VARCHAR(255) NOT NULL,
    MODIFY `password` VARCHAR(255) NOT NULL,
    MODIFY `accountType` VARCHAR(50) NOT NULL;
