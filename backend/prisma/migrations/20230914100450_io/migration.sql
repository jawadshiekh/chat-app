-- DropForeignKey
ALTER TABLE `messages` DROP FOREIGN KEY `Messages_fileId_fkey`;

-- AlterTable
ALTER TABLE `messages` MODIFY `fileId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Messages` ADD CONSTRAINT `Messages_fileId_fkey` FOREIGN KEY (`fileId`) REFERENCES `Files`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
