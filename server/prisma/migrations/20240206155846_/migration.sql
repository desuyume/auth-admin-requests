/*
  Warnings:

  - You are about to alter the column `refreshToken` on the `tokens` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(100)`.

*/
-- AlterTable
ALTER TABLE `tokens` MODIFY `refreshToken` VARCHAR(100) NOT NULL;
