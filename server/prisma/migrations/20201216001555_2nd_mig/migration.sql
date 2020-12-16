/*
  Warnings:

  - You are about to drop the column `userUserId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `friendsFriendshipId` on the `User` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `User` DROP FOREIGN KEY `user_ibfk_2`;

-- DropForeignKey
ALTER TABLE `User` DROP FOREIGN KEY `user_ibfk_1`;

-- AlterTable
ALTER TABLE `User` DROP COLUMN `userUserId`,
    DROP COLUMN `friendsFriendshipId`;

-- CreateTable
CREATE TABLE `_FriendsToUser` (
    `A` INT NOT NULL,
    `B` INT NOT NULL,
UNIQUE INDEX `_FriendsToUser_AB_unique`(`A`, `B`),
INDEX `_FriendsToUser_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_FriendsToUser` ADD FOREIGN KEY (`A`) REFERENCES `Friends`(`friendshipId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_FriendsToUser` ADD FOREIGN KEY (`B`) REFERENCES `User`(`userId`) ON DELETE CASCADE ON UPDATE CASCADE;
