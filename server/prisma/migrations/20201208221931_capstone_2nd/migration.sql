-- CreateTable
CREATE TABLE `Activity` (
    `activityId` INT NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(70) NOT NULL,
    `description` VARCHAR(300) NOT NULL,
    `location` VARCHAR(70) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `eventId` INT NOT NULL,

    PRIMARY KEY (`activityId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Comment` (
    `commentId` INT NOT NULL AUTO_INCREMENT,
    `authorId` INT NOT NULL,
    `title` VARCHAR(60) NOT NULL,
    `text` VARCHAR(600) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`commentId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Event` (
    `eventId` INT NOT NULL AUTO_INCREMENT,
    `ownerId` INT NOT NULL,
    `name` VARCHAR(40) NOT NULL,
    `address` VARCHAR(60) NOT NULL,
    `description` VARCHAR(600) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`eventId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Reaction` (
    `reactionId` INT NOT NULL AUTO_INCREMENT,
    `ownerId` INT NOT NULL,
    `likeDislike` BOOLEAN NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `commentCommentId` INT NOT NULL,

    PRIMARY KEY (`reactionId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User` (
    `userId` INT NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(60) NOT NULL,
    `password` VARCHAR(60) NOT NULL,
    `firstName` VARCHAR(60) NOT NULL,
    `lastName` VARCHAR(60) NOT NULL,
    `dob` DATETIME(3) NOT NULL,
    `phone` VARCHAR(60),
    `email` VARCHAR(60) NOT NULL,
    `street` VARCHAR(191) NOT NULL,
    `city` VARCHAR(191) NOT NULL,
    `province_state` VARCHAR(191) NOT NULL,
    `country` VARCHAR(191) NOT NULL,
    `userFolderPath` VARCHAR(191) NOT NULL,
    `displayName` VARCHAR(191),
    `displayBirthday` DATETIME(3),
    `about` VARCHAR(600),
    `gender` VARCHAR(15),
    `avatar` VARCHAR(191),
    `picture_med` VARCHAR(191),
    `picture_large` VARCHAR(191),
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`userId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_EventToUser` (
    `A` INT NOT NULL,
    `B` INT NOT NULL,
UNIQUE INDEX `_EventToUser_AB_unique`(`A`, `B`),
INDEX `_EventToUser_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Activity` ADD FOREIGN KEY (`eventId`) REFERENCES `Event`(`eventId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Comment` ADD FOREIGN KEY (`authorId`) REFERENCES `User`(`userId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Event` ADD FOREIGN KEY (`ownerId`) REFERENCES `User`(`userId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Reaction` ADD FOREIGN KEY (`ownerId`) REFERENCES `User`(`userId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Reaction` ADD FOREIGN KEY (`commentCommentId`) REFERENCES `Comment`(`commentId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_EventToUser` ADD FOREIGN KEY (`A`) REFERENCES `Event`(`eventId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_EventToUser` ADD FOREIGN KEY (`B`) REFERENCES `User`(`userId`) ON DELETE CASCADE ON UPDATE CASCADE;
