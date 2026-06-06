-- CreateTable
CREATE TABLE `games` (
    `game_id` VARCHAR(36) NOT NULL,
    `game_name` VARCHAR(255) NOT NULL,
    `description` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`game_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `run_categories` (
    `run_category_id` VARCHAR(36) NOT NULL,
    `game_id` VARCHAR(36) NOT NULL,
    `run_category_name` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`run_category_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `run_categories` ADD CONSTRAINT `run_categories_game_id_fkey` FOREIGN KEY (`game_id`) REFERENCES `games`(`game_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
