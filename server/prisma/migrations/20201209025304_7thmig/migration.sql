-- AlterTable
ALTER TABLE `Comment` ADD COLUMN     `activityActivityId` INT,
    ADD COLUMN     `eventEventId` INT;

-- AlterTable
ALTER TABLE `User` ADD COLUMN     `userUserId` INT;

-- AddForeignKey
ALTER TABLE `Comment` ADD FOREIGN KEY (`activityActivityId`) REFERENCES `Activity`(`activityId`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Comment` ADD FOREIGN KEY (`eventEventId`) REFERENCES `Event`(`eventId`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `User` ADD FOREIGN KEY (`userUserId`) REFERENCES `User`(`userId`) ON DELETE SET NULL ON UPDATE CASCADE;
