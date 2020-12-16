/*
  Warnings:

  - You are about to drop the `_FriendsToUser` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `userId` to the `Friends` table without a default value. This is not possible if the table is not empty.
  - Added the required column `friendId` to the `Friends` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `_FriendsToUser` DROP FOREIGN KEY `_friendstouser_ibfk_1`;

-- DropForeignKey
ALTER TABLE `_FriendsToUser` DROP FOREIGN KEY `_friendstouser_ibfk_2`;

-- AlterTable
ALTER TABLE `Friends` ADD COLUMN     `userId` INT NOT NULL,
    ADD COLUMN     `friendId` INT NOT NULL;

-- DropTable
DROP TABLE `_FriendsToUser`;

-- AddForeignKey
ALTER TABLE `Friends` ADD FOREIGN KEY (`userId`) REFERENCES `User`(`userId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Friends` ADD FOREIGN KEY (`friendId`) REFERENCES `User`(`userId`) ON DELETE CASCADE ON UPDATE CASCADE;
