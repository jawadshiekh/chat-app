/*
  Warnings:

  - Added the required column `profile` to the `Chats` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `chats` ADD COLUMN `profile` VARCHAR(191) NOT NULL;
