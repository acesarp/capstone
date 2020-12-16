-- AlterTable
ALTER TABLE `User` ADD COLUMN     `friendsFriendshipId` INT;

-- CreateTable
CREATE TABLE `Friends` (
    `friendshipId` INT NOT NULL AUTO_INCREMENT,

    PRIMARY KEY (`friendshipId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `User` ADD FOREIGN KEY (`friendsFriendshipId`) REFERENCES `Friends`(`friendshipId`) ON DELETE SET NULL ON UPDATE CASCADE;
