CREATE TABLE `belts` (
  `id` INTEGER PRIMARY KEY,
  `name` VARCHAR(255),
  `cup` VARCHAR(255),
  `price` VARCHAR(255),
  `img_path` VARCHAR(255),
  `info` VARCHAR(255),
  `video_path` VARCHAR(255)
);

CREATE TABLE `category` (
  `id` INTEGER PRIMARY KEY,
  `name` VARCHAR(255),
  `min` INT,
  `max` INT
);

CREATE TABLE `fighters` (
  `id` INTEGER PRIMARY KEY,
  `name` VARCHAR(255),
  `surname` VARCHAR(255),
  `birth` TIMESTAMP,
  `belts_id` INTEGER NOT NULL,
  `img_path` VARCHAR(255),
  `best` BOOLEAN,
  `legend` BOOLEAN,
  `active` BOOLEAN,
  `category_id` INTEGER,
  `actual_weight_category` INT,
  FOREIGN KEY (`belts_id`) REFERENCES `belts` (`id`),
  FOREIGN KEY (`category_id`) REFERENCES `category` (`id`)
);

CREATE TABLE `role` (
  `id` INTEGER PRIMARY KEY,
  `role_name` VARCHAR(255)
);

CREATE TABLE `users` (
  `id` INTEGER PRIMARY KEY,
  `login` VARCHAR(255),
  `password` VARCHAR(255),
  `emial` VARCHAR(255),
  `phone` VARCHAR(255),
  `fighter_id` INTEGER,
  `role_id` INTEGER,
  FOREIGN KEY (`fighter_id`) REFERENCES `fighters` (`id`),
  FOREIGN KEY (`role_id`) REFERENCES `role` (`id`)
);

CREATE TABLE `event` (
  `id` INTEGER PRIMARY KEY,
  `title` VARCHAR(255),
  `body` TEXT COMMENT 'Content of the post',
  `user_id` INTEGER NOT NULL,
  `status` VARCHAR(255),
  `created_at` TIMESTAMP,
  `event_date` TIMESTAMP NULL,
  `photo` VARCHAR(255),
  FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
);

CREATE TABLE `type` (
  `id` INTEGER PRIMARY KEY,
  `name` VARCHAR(255)
);

CREATE TABLE `tournament` (
  `id` VARCHAR(255) PRIMARY KEY,
  `name` VARCHAR(255),
  `location` VARCHAR(255),
  `price` INTEGER,
  `type_id` INTEGER,
  `start_date` DATE,
  `end_date` DATE,
  `info` VARCHAR(255),
  `img_path` VARCHAR(255),
  `users_id` INTEGER,
  `registrable_date` DATE,
  FOREIGN KEY (`type_id`) REFERENCES `type` (`id`),
  FOREIGN KEY (`users_id`) REFERENCES `users` (`id`)
);

CREATE TABLE `tournament_registration` (
  `id` INTEGER PRIMARY KEY,
  `fighter_id` INTEGER,
  `tournament_id` VARCHAR(255),
  `note` VARCHAR(255),
  `status` VARCHAR(255),
  `place` INTEGER,
  FOREIGN KEY (`fighter_id`) REFERENCES `fighters` (`id`),
  FOREIGN KEY (`tournament_id`) REFERENCES `tournament` (`id`)
);

CREATE TABLE `sponsors` (
  `id` INTEGER PRIMARY KEY,
  `sponsor_name` VARCHAR(255),
  `url` VARCHAR(255),
  `img_path` VARCHAR(255)
);

CREATE TABLE `banner` (
  `id` INTEGER PRIMARY KEY,
  `banner_name` VARCHAR(255),
  `img_path` VARCHAR(255)
);

CREATE TABLE `subscriber_email` (
  `id` INTEGER PRIMARY KEY,
  `email` VARCHAR(255),
  `active` BOOLEAN,
  `news_id` INTEGER,
  `token` VARCHAR(255)
  -- Pokud bude `news_id` odkazovat na nějakou tabulku s aktualitami, přidej zde FOREIGN KEY
);

CREATE TABLE `trainings` (
  `id` INTEGER PRIMARY KEY,
  `day_start` DATE,
  `day_end` DATE,
  `type` VARCHAR(255),
  `time_start` TIME,
  `time_end` TIME
);
