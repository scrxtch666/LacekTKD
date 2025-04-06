CREATE TABLE `fighters` (
  `id` integer PRIMARY KEY,
  `name` varchar(255),
  `surname` varchar(255),
  `birth` timestamp,
  `belts_id` integer NOT NULL,
  `img_path` varchar(255),
  `best` bool,
  `legend` bool,
  `active` bool,
  `category_id` integer,
  `actual_weight_category` int
);

CREATE TABLE `event` (
  `id` integer PRIMARY KEY,
  `title` varchar(255),
  `body` text COMMENT 'Content of the post',
  `user_id` integer NOT NULL,
  `status` varchar(255),
  `created_at` timestamp,
  `date` timestamp,
  `photo` varchar(255)
);

CREATE TABLE `tournament_registration` (
  `id` integer PRIMARY KEY,
  `fighter_id` int,
  `tournament_id` int,
  `note` varchar(255),
  `status` varchar(255),
  `place` integer
);

CREATE TABLE `category` (
  `id` integer PRIMARY KEY,
  `name` varchar(255),
  `min` int,
  `max` int
);

CREATE TABLE `belts` (
  `id` integer PRIMARY KEY,
  `name` varchar(255),
  `cup` varchar(255),
  `price` varchar(255),
  `img_path` varchar(255),
  `info` varchar(255),
  `video_path` varchar(255)
);

CREATE TABLE `tournament` (
  `id` varchar(255) PRIMARY KEY,
  `name` varchar(255),
  `location` varchar(255),
  `price` integer,
  `type_id` varchar(255),
  `start_date` date,
  `end_date` date,
  `info` varchar(255),
  `img_path` varchar(255),
  `users_id` int,
  `registrable_date` date
);

CREATE TABLE `users` (
  `id` integer PRIMARY KEY,
  `login` varchar(255),
  `password` varchar(255),
  `emial` varchar(255),
  `phone` number,
  `fighter_id` integer,
  `role_id` integer
);

CREATE TABLE `role` (
  `id` integer PRIMARY KEY,
  `role_name` varchar(255)
);

CREATE TABLE `type` (
  `id` integer PRIMARY KEY,
  `name` varchar(255)
);

CREATE TABLE `sponsors` (
  `id` integer PRIMARY KEY,
  `sponsor_name` varchar(255),
  `url` varchar(255),
  `img_path` varchar(255)
);

CREATE TABLE `banner` (
  `id` integer PRIMARY KEY,
  `banner_name` varchar(255),
  `img_path` varchar(255)
);

CREATE TABLE `subscriber_email` (
  `id` integer PRIMARY KEY,
  `email` varchar(255),
  `active` bool,
  `news_id` int,
  `token` varchar(255)
);

CREATE TABLE `trainings` (
  `id` integer PRIMARY KEY,
  `day_start` date,
  `day_end` date,
  `type` varchar(255),
  `time_start` time,
  `time_end` time
);

ALTER TABLE `belts` ADD CONSTRAINT `fighter_belt` FOREIGN KEY (`id`) REFERENCES `fighters` (`belts_id`);

ALTER TABLE `fighters` ADD FOREIGN KEY (`category_id`) REFERENCES `category` (`id`);

ALTER TABLE `users` ADD CONSTRAINT `user_event` FOREIGN KEY (`id`) REFERENCES `event` (`user_id`);

ALTER TABLE `role` ADD CONSTRAINT `users_role` FOREIGN KEY (`id`) REFERENCES `users` (`role_id`);

ALTER TABLE `type` ADD FOREIGN KEY (`id`) REFERENCES `tournament` (`type_id`);

ALTER TABLE `users` ADD FOREIGN KEY (`fighter_id`) REFERENCES `fighters` (`id`);

ALTER TABLE `fighters` ADD CONSTRAINT `tournament_reg` FOREIGN KEY (`id`) REFERENCES `tournament_registration` (`fighter_id`);

ALTER TABLE `tournament` ADD CONSTRAINT `tournament_reg` FOREIGN KEY (`id`) REFERENCES `tournament_registration` (`tournament_id`);

ALTER TABLE `tournament` ADD CONSTRAINT `user_tournament` FOREIGN KEY (`users_id`) REFERENCES `users` (`id`);
