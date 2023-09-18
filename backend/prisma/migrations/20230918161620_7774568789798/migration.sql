-- AlterTable
ALTER TABLE `messages` MODIFY `content` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `users` MODIFY `bio` VARCHAR(191) NULL DEFAULT 'Hey there, i am using Krlete hain, phir krega?';
