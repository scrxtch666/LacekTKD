-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Počítač: 127.0.0.1
-- Vytvořeno: Ned 08. úno 2026, 18:11
-- Verze serveru: 10.4.32-MariaDB
-- Verze PHP: 8.3.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Databáze: `lacektkd_test`
--

-- --------------------------------------------------------

--
-- Struktura tabulky `banner`
--

CREATE TABLE `banner` (
  `id` int(11) NOT NULL,
  `banner_name` varchar(255) DEFAULT NULL,
  `img_path` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Vypisuji data pro tabulku `banner`
--

INSERT INTO `banner` (`id`, `banner_name`, `img_path`) VALUES
(1, 'agrostroj', '../src/assets/Partners/FullColor/agrostroj.png'),
(2, 'hodina-h', '../src/assets/Partners/FullColor/hodina-h.png'),
(3, 'js', '../src/assets/Partners/FullColor/js.png'),
(4, 'logo_humpolec', '../src/assets/Partners/FullColor/logo_humpolec.gif'),
(5, 'obec-komorovice', '../src/assets/Partners/FullColor/obec-komorovice.jpg');

-- --------------------------------------------------------

--
-- Struktura tabulky `belts`
--

CREATE TABLE `belts` (
  `id` int(11) NOT NULL,
  `belt_name` varchar(255) DEFAULT NULL,
  `cup` varchar(255) DEFAULT NULL,
  `price` varchar(255) DEFAULT NULL,
  `img_path` varchar(255) DEFAULT NULL,
  `info` varchar(255) DEFAULT NULL,
  `video_path` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Vypisuji data pro tabulku `belts`
--

INSERT INTO `belts` (`id`, `belt_name`, `cup`, `price`, `img_path`, `info`, `video_path`) VALUES
(1, 'Chon-Ji', '8. CUP', '250', '../src/assets/Belts/blt_yellow.gif', NULL, NULL),
(2, 'Dan-Gun', ' 6. CUP', '350', '../src/assets/Belts/blt_green.gif', NULL, NULL),
(3, 'Do-San', '4. CUP', '450', '../src/assets/Belts/blt_blue.gif', NULL, NULL),
(4, 'Won-Hyo', '2. CUP', '550', '../src/assets/Belts/blt_red.gif', NULL, NULL),
(5, 'Choong-Moo', '1. DAN', '1000', '../src/assets/Belts/blt_black_1.gif', NULL, NULL),
(6, 'Kwang-Gae', '2. DAN', '2000', '../src/assets/Belts/blt_black_2.gif', NULL, NULL),
(7, 'Choong-Jang', '3. DAN', '3000', '../src/assets/Belts/blt_black_3.gif', NULL, NULL),
(8, 'Yon-Gae', '4. DAN', '4000', '../src/assets/Belts/blt_black_4.gif', NULL, NULL),
(9, 'Ul-Ji', '5. DAN', '5000', '../src/assets/Belts/blt_black_5.gif', NULL, NULL);

-- --------------------------------------------------------

--
-- Struktura tabulky `category`
--

CREATE TABLE `category` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `min` int(11) DEFAULT NULL,
  `max` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Vypisuji data pro tabulku `category`
--

INSERT INTO `category` (`id`, `name`, `min`, `max`) VALUES
(1, 'Youth', 10, 11),
(2, 'Cadet', 12, 14),
(3, 'Junior', 15, 17),
(4, 'Senior', 18, 32),
(5, 'Ultra', 33, NULL);

-- --------------------------------------------------------

--
-- Struktura tabulky `event`
--

CREATE TABLE `event` (
  `id` int(11) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `body` text DEFAULT NULL COMMENT 'Content of the post',
  `user_id` int(11) NOT NULL,
  `status` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `date_start` timestamp NULL DEFAULT NULL,
  `photo` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Vypisuji data pro tabulku `event`
--

INSERT INTO `event` (`id`, `title`, `body`, `user_id`, `status`, `created_at`, `date_start`, `photo`) VALUES
(3, 'Bratislava OPEN', 'BRATISLAVA OPEN - největší turnaj', 1, 'Availible', '2025-04-21 22:00:00', '2025-04-23 14:48:14', '/src/assets/Events/BT_open.jpg\r\n'),
(4, 'Prague Taekwondo Cup', 'Mezinárodní turnaj v Praze', 1, 'Availible', '2025-04-22 20:58:00', '2025-05-12 08:00:00', '/src/assets/Events/BT_open2.jpg\r\n'),
(5, 'Brno Open 2025', 'Otevřený turnaj pro všechny věkové kategorie', 1, 'Availible', '2025-04-22 20:58:00', '2025-06-05 07:00:00', '/src/assets/Events/BT_open3.webp\r\n'),
(6, 'Letní soustředění', 'Týdenní tréninkové soustředění v přírodě', 1, 'Availible', '2025-04-22 20:58:00', '2025-07-15 06:00:00', '/src/assets/Events/BT_open3.webp\r\n'),
(7, 'Zkoušky na technické stupně', 'Oficiální zkoušky pod vedením mistrů', 1, 'Availible', '2025-04-22 20:58:00', '2025-06-20 12:30:00', '/src/assets/Events/BT_open.jpg\r\n'),
(8, 'Exhibice na náměstí', 'Veřejná exhibice pro propagaci oddílu', 1, 'Availible', '2025-04-22 20:58:00', '2025-05-30 14:00:00', '/src/assets/Events/BT_open2.jpg\r\n');

-- --------------------------------------------------------

--
-- Struktura tabulky `fighters`
--

CREATE TABLE `fighters` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `surname` varchar(255) DEFAULT NULL,
  `birth` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `belts_id` int(11) NOT NULL,
  `img_path` varchar(255) DEFAULT NULL,
  `best` tinyint(1) DEFAULT NULL,
  `legend` tinyint(1) DEFAULT NULL,
  `active` tinyint(1) DEFAULT NULL,
  `category_id` int(11) DEFAULT NULL,
  `actual_weight_category` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Vypisuji data pro tabulku `fighters`
--

INSERT INTO `fighters` (`id`, `name`, `surname`, `birth`, `belts_id`, `img_path`, `best`, `legend`, `active`, `category_id`, `actual_weight_category`) VALUES
(1, 'Josef ', 'Med', '2003-03-29 15:09:53', 7, '/src/assets/Fighters/med_josef.jpg', 1, 1, 1, 4, 72),
(2, 'Matěj', 'Kaman', '0000-00-00 00:00:00', 7, '/src/assets/Fighters/kaman_matej.jpg', 0, 1, 1, 4, 83),
(3, 'Adéla', 'Pejcalová', '0000-00-00 00:00:00', 6, '/src/assets/Fighters/pejcalova_adela.jpg  ', 1, 0, 1, 4, 12),
(4, 'Alice', 'Bínová', '0000-00-00 00:00:00', 6, '/src/assets/Fighters/binova_alice.jpg  ', 0, 1, 1, 3, 46),
(5, 'Dominika', 'Hronová', '0000-00-00 00:00:00', 6, '/src/assets/Fighters/hronova_dominika.jpg  ', 0, 1, 1, 3, 63),
(6, 'Iveta ', 'Jiránková', '0000-00-00 00:00:00', 6, '/src/assets/Fighters/jirankova_iveta.jpg  ', 1, 1, 1, 3, 25),
(7, 'Jiří', 'Šťastný', '0000-00-00 00:00:00', 6, '/src/assets/Fighters/stastny_jiri.jpg  ', 1, 0, 1, 2, 63),
(8, 'Marek', 'Šmarda', '0000-00-00 00:00:00', 6, '/src/assets/Fighters/smarda_marek.jpg  ', 1, 1, 1, 2, 73),
(9, 'Petr', 'Hostička', '0000-00-00 00:00:00', 6, '/src/assets/Fighters/hosticka_petr.jpg  ', 0, 0, 1, 3, 46),
(10, 'Alea Lin', 'Mocek', '0000-00-00 00:00:00', 5, '/src/assets/Fighters/mocek_alea_lin.jpg  ', 0, 0, 0, 1, 74),
(11, 'Anna', 'Špinarová', '0000-00-00 00:00:00', 5, '/src/assets/Fighters/spinarova_anna.jpg  ', 0, 1, 1, 2, 34),
(12, 'Natálie ', 'Šikýřová', '0000-00-00 00:00:00', 5, '/src/assets/Fighters/sikyrova_natalie.jpg  ', 1, 1, 1, 3, 63),
(13, 'Pavla', 'Brambůrková', '0000-00-00 00:00:00', 5, '/src/assets/Fighters/bramburkova_pavla.jpg  ', 1, 0, 1, 2, 83),
(14, 'Tereza', 'Urbánková', '0000-00-00 00:00:00', 5, '/src/assets/Fighters/urbankova_tereza.jpg  ', 0, 1, 1, 3, 73),
(15, 'Tomáš', 'Neshyba', '0000-00-00 00:00:00', 5, '/src/assets/Fighters/neshyba_tomas.jpg  ', 0, 0, 0, 3, 37),
(16, 'Viktorie', 'Maršáková', '0000-00-00 00:00:00', 5, '/src/assets/Fighters/marsakova_viktorie.jpg  ', 0, 1, 1, 2, 25),
(17, 'Zuzana', 'Válková', '0000-00-00 00:00:00', 5, '/src/assets/Fighters/valkova_zuzana.jpg  ', 1, 0, 1, 1, 63),
(18, 'Aleš Lin', 'Mocek', '0000-00-00 00:00:00', 4, '/src/assets/Fighters/mocek_ales_lin.jpg  ', 1, 0, 1, 1, 73),
(19, 'Michal', 'Pohan', '0000-00-00 00:00:00', 4, '/src/assets/Fighters/pohan_michal.jpg  ', 1, 0, 1, 4, 33),
(20, 'Nicolas', 'Tarljovski', '0000-00-00 00:00:00', 4, '/src/assets/Fighters/tarjovskij_nicolas.jpg', 1, 0, 1, 5, 99);

-- --------------------------------------------------------

--
-- Struktura tabulky `role`
--

CREATE TABLE `role` (
  `id` int(11) NOT NULL,
  `role_name` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Vypisuji data pro tabulku `role`
--

INSERT INTO `role` (`id`, `role_name`) VALUES
(1, 'admin'),
(2, 'trainer'),
(3, 'user'),
(4, 'hlavní trenér, II. trenérská třída'),
(5, 'zástup trenéra, I. trenérská třída'),
(6, 'zástup trenéra, II. trenérská třída');

-- --------------------------------------------------------

--
-- Struktura tabulky `sponsors`
--

CREATE TABLE `sponsors` (
  `id` int(11) NOT NULL,
  `sponsor_name` varchar(255) DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL,
  `img_path` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Vypisuji data pro tabulku `sponsors`
--

INSERT INTO `sponsors` (`id`, `sponsor_name`, `url`, `img_path`) VALUES
(1, 'agrostroj', NULL, '../src/assets/Partners/FullColor/agrostroj.png'),
(2, 'hodina-h', NULL, '../src/assets/Partners/FullColor/hodina-h.png'),
(3, 'js', NULL, '../src/assets/Partners/FullColor/js.png'),
(4, 'logo_humpolec', NULL, '../src/assets/Partners/FullColor/logo_humpolec.gif'),
(5, 'obec-komorovice', NULL, '../src/assets/Partners/FullColor/obec-komorovice.jpg');

-- --------------------------------------------------------

--
-- Struktura tabulky `subscriber_email`
--

CREATE TABLE `subscriber_email` (
  `id` int(11) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `active` tinyint(1) DEFAULT NULL,
  `news_id` int(11) DEFAULT NULL,
  `token` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktura tabulky `tournament`
--

CREATE TABLE `tournament` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `price` int(11) DEFAULT NULL,
  `type_id` int(11) DEFAULT NULL,
  `start_date` date DEFAULT NULL,
  `end_date` date DEFAULT NULL,
  `info` varchar(255) DEFAULT NULL,
  `img_path` varchar(255) DEFAULT NULL,
  `users_id` int(11) DEFAULT NULL,
  `registrable_date` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Vypisuji data pro tabulku `tournament`
--

INSERT INTO `tournament` (`id`, `name`, `location`, `price`, `type_id`, `start_date`, `end_date`, `info`, `img_path`, `users_id`, `registrable_date`) VALUES
(1, 'SCRXTCH turnaj', 'Humpolec', 500, 1, '2025-04-25', '2025-04-26', 'Test turnaje', '/src/assets/Tournaments/lacek.png', 1, '2025-04-23');

-- --------------------------------------------------------

--
-- Struktura tabulky `tournament_registration`
--

CREATE TABLE `tournament_registration` (
  `id` int(11) NOT NULL,
  `fighter_id` int(11) DEFAULT NULL,
  `tournament_id` int(11) DEFAULT NULL,
  `note` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `place` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktura tabulky `trainings`
--

CREATE TABLE `trainings` (
  `id` int(11) NOT NULL,
  `day_start` date DEFAULT NULL,
  `day_end` date DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `time_start` time DEFAULT NULL,
  `time_end` time DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktura tabulky `type`
--

CREATE TABLE `type` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Vypisuji data pro tabulku `type`
--

INSERT INTO `type` (`id`, `name`) VALUES
(1, 'Turnaj'),
(2, 'Soustředění');

-- --------------------------------------------------------

--
-- Struktura tabulky `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `login` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `fighter_id` int(11) DEFAULT NULL,
  `role_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Vypisuji data pro tabulku `users`
--

INSERT INTO `users` (`id`, `login`, `password`, `email`, `phone`, `fighter_id`, `role_id`) VALUES
(1, 'lacek.petr', 'admin', 'lacek.petr@seznam.cz', '721643937', 9, 2),
(2, 'scrxtch', 'heslo', 'scrxtch@seznam.cz', '123456789', 3, 2),
(3, 'Danielktnt', 'svoboda', 'urbankova.daniela@seznam.cz', '123', 9, 3),
(4, 'awd', 'awd', 'awd', NULL, NULL, NULL),
(5, 'test_uzivatel', '$2b$10$IC1XvqIRjquxZ.2wiAjEw.ux3LdxoRbO51plgOeDJmxUQ6d5KED2O', NULL, NULL, NULL, NULL),
(6, 'scrxtch666', '$2b$10$odtBqhOeYqz9OYEPDhVNHebeHJrnjHR5W9uV14nPqGV5HlommInky', NULL, NULL, NULL, 1);

--
-- Indexy pro exportované tabulky
--

--
-- Indexy pro tabulku `banner`
--
ALTER TABLE `banner`
  ADD PRIMARY KEY (`id`);

--
-- Indexy pro tabulku `belts`
--
ALTER TABLE `belts`
  ADD PRIMARY KEY (`id`);

--
-- Indexy pro tabulku `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`id`);

--
-- Indexy pro tabulku `event`
--
ALTER TABLE `event`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexy pro tabulku `fighters`
--
ALTER TABLE `fighters`
  ADD PRIMARY KEY (`id`),
  ADD KEY `belts_id` (`belts_id`),
  ADD KEY `category_id` (`category_id`);

--
-- Indexy pro tabulku `role`
--
ALTER TABLE `role`
  ADD PRIMARY KEY (`id`);

--
-- Indexy pro tabulku `sponsors`
--
ALTER TABLE `sponsors`
  ADD PRIMARY KEY (`id`);

--
-- Indexy pro tabulku `subscriber_email`
--
ALTER TABLE `subscriber_email`
  ADD PRIMARY KEY (`id`);

--
-- Indexy pro tabulku `tournament`
--
ALTER TABLE `tournament`
  ADD PRIMARY KEY (`id`),
  ADD KEY `type_id` (`type_id`),
  ADD KEY `users_id` (`users_id`);

--
-- Indexy pro tabulku `tournament_registration`
--
ALTER TABLE `tournament_registration`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fighter_id` (`fighter_id`),
  ADD KEY `tournament_id` (`tournament_id`);

--
-- Indexy pro tabulku `trainings`
--
ALTER TABLE `trainings`
  ADD PRIMARY KEY (`id`);

--
-- Indexy pro tabulku `type`
--
ALTER TABLE `type`
  ADD PRIMARY KEY (`id`);

--
-- Indexy pro tabulku `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD KEY `role_id` (`role_id`),
  ADD KEY `fighter_id` (`fighter_id`);

--
-- AUTO_INCREMENT pro tabulky
--

--
-- AUTO_INCREMENT pro tabulku `banner`
--
ALTER TABLE `banner`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT pro tabulku `belts`
--
ALTER TABLE `belts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT pro tabulku `category`
--
ALTER TABLE `category`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT pro tabulku `event`
--
ALTER TABLE `event`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT pro tabulku `fighters`
--
ALTER TABLE `fighters`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT pro tabulku `role`
--
ALTER TABLE `role`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT pro tabulku `sponsors`
--
ALTER TABLE `sponsors`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT pro tabulku `subscriber_email`
--
ALTER TABLE `subscriber_email`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pro tabulku `tournament`
--
ALTER TABLE `tournament`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT pro tabulku `tournament_registration`
--
ALTER TABLE `tournament_registration`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pro tabulku `trainings`
--
ALTER TABLE `trainings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pro tabulku `type`
--
ALTER TABLE `type`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pro tabulku `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Omezení pro exportované tabulky
--

--
-- Omezení pro tabulku `event`
--
ALTER TABLE `event`
  ADD CONSTRAINT `event_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Omezení pro tabulku `fighters`
--
ALTER TABLE `fighters`
  ADD CONSTRAINT `fighters_ibfk_1` FOREIGN KEY (`belts_id`) REFERENCES `belts` (`id`),
  ADD CONSTRAINT `fighters_ibfk_2` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`);

--
-- Omezení pro tabulku `tournament`
--
ALTER TABLE `tournament`
  ADD CONSTRAINT `tournament_ibfk_1` FOREIGN KEY (`type_id`) REFERENCES `type` (`id`),
  ADD CONSTRAINT `tournament_ibfk_2` FOREIGN KEY (`users_id`) REFERENCES `users` (`id`);

--
-- Omezení pro tabulku `tournament_registration`
--
ALTER TABLE `tournament_registration`
  ADD CONSTRAINT `tournament_registration_ibfk_1` FOREIGN KEY (`fighter_id`) REFERENCES `fighters` (`id`),
  ADD CONSTRAINT `tournament_registration_ibfk_2` FOREIGN KEY (`tournament_id`) REFERENCES `tournament` (`id`);

--
-- Omezení pro tabulku `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `role` (`id`),
  ADD CONSTRAINT `users_ibfk_2` FOREIGN KEY (`fighter_id`) REFERENCES `fighters` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
