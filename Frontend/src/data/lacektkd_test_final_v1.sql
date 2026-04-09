-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Počítač: 127.0.0.1
-- Vytvořeno: Čtv 09. dub 2026, 20:08
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
  `img_path` varchar(255) DEFAULT NULL,
  `active` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Vypisuji data pro tabulku `banner`
--

INSERT INTO `banner` (`id`, `banner_name`, `img_path`, `active`) VALUES
(17, 'main1', '/uploads/banners/banners-1775739890854-451221423.jpg', 1),
(18, 'main2', '/uploads/banners/banners-1775739901270-289475184.jpg', 1),
(19, 'main3', '/uploads/banners/banners-1775739913241-774388909.jpg', 1),
(20, 'main4', '/uploads/banners/banners-1775739922381-983482893.jpg', 0);

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
(1, 'Chon-Ji', '8. CUP', '250', '../src/assets/Belts/blt_yellow.gif', '8. kup (žlutý pás)\n\nZákladní postoje:\n- Ap Seogi (krátký krok)\n- Narani Seogi (paralelní postoj)\n\nTechniky:\n- Arae Makki (dolní blok)\n- Ap Chagi (přední kop)\n\nDůraz:\n- rovnováha\n- správné držení těla\n- koordinace pohybů', 'https://www.youtube.com/watch?v=OIjMWGM5wkQ&list=PL_IlyM5-dT-kCGRfq3EItDJSmbg6S7dtX'),
(2, 'Dan-Gun', ' 6. CUP', '350', '../src/assets/Belts/blt_green.gif', '1. Dan – mistr\n\nTechniky:\n- Pokročilé kombinace\n- Sparring strategie\n\nSestavy:\n- Hwa-Rang Tul\n\nDůraz:\n- vedení ostatních\n- technická dokonalost', 'https://www.youtube.com/watch?v=CfRfaFe-yFw&list=PL_IlyM5-dT-kCGRfq3EItDJSmbg6S7dtX&index=4'),
(3, 'Do-San', '4. CUP', '450', '../src/assets/Belts/blt_blue.gif', '4. kup (modročervený pás)\n\nTechniky:\n- Bandae Dollyo Chagi\n- Dvojité bloky\n\nSestavy:\n- Won-Hyo Tul\n\nDůraz:\n- plynulost\n- správné dýchání', 'https://www.youtube.com/embed/OIjMWGM5wkQ'),
(4, 'Won-Hyo', '2. CUP', '550', '../src/assets/Belts/blt_red.gif', '2. kup (červený pás s proužkem)\n\nTechniky:\n- Pokročilé kombinace\n- Skokové kopy\n\nSestavy:\n- Joong-Gun Tul\n\nDůraz:\n- kontrola\n- přesnost', 'https://www.youtube.com/embed/OIjMWGM5wkQ'),
(5, 'Choong-Moo', '1. DAN', '1000', '../src/assets/Belts/blt_black_1.gif', '1. kup (černý proužek)\n\nTechniky:\n- Kombinace všech kopů\n- Sparring\n\nSestavy:\n- Toi-Gye Tul\n\nDůraz:\n- připravenost na dan\n- mentální disciplína', NULL),
(6, 'Kwang-Gae', '2. DAN', '2000', '../src/assets/Belts/blt_black_2.gif', '2. kup (červený pás s proužkem)\n\nTechniky:\n- Pokročilé kombinace\n- Skokové kopy\n\nSestavy:\n- Joong-Gun Tul\n\nDůraz:\n- kontrola\n- přesnost', NULL),
(7, 'Choong-Jang', '3. DAN', '3000', '../src/assets/Belts/blt_black_3.gif', '3. kup (červený pás)\n\nTechniky:\n- Tornado kick\n- Kombinace kopů\n\nSestavy:\n- Yul-Gok Tul\n\nDůraz:\n- dynamika\n- síla a rychlost', NULL),
(8, 'Yon-Gae', '4. DAN', '4000', '../src/assets/Belts/blt_black_4.gif', '4. kup (modročervený pás)\n\nTechniky:\n- Bandae Dollyo Chagi\n- Dvojité bloky\n\nSestavy:\n- Won-Hyo Tul\n\nDůraz:\n- plynulost\n- správné dýchání', NULL),
(9, 'Ul-Ji', '5. DAN', '5000', '../src/assets/Belts/blt_black_5.gif', '5. kup (modrý pás)\n\nTechniky:\n- Dwit Chagi (zadní kop)\n- Sonnal Makki (kryt rukou)\n\nSestavy:\n- Do-San Tul\n\nDůraz:\n- kombinace technik\n- rychlost', 'https://www.youtube.com/embed=CfRfaFe-yFw&list=PL_IlyM5-dT-kCGRfq3EItDJSmbg6S7dtX&index=4');

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
(5, 'Ultra', 33, 99);

-- --------------------------------------------------------

--
-- Struktura tabulky `event`
--

CREATE TABLE `event` (
  `id` int(11) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `body` text DEFAULT NULL COMMENT 'Content of the post',
  `user_id` int(11) NOT NULL,
  `status` enum('Availible','Hidden') NOT NULL DEFAULT 'Availible',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `date_start` date DEFAULT NULL,
  `photo` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Vypisuji data pro tabulku `event`
--

INSERT INTO `event` (`id`, `title`, `body`, `user_id`, `status`, `created_at`, `date_start`, `photo`) VALUES
(3, 'Bratislava OPEN', 'BRATISLAVA OPEN - největší turnaj', 1, 'Availible', '2026-04-09 13:16:25', '2025-04-23', '/uploads/events/events-1775740585776-356122537.jpg'),
(4, 'Prague Taekwondo Cup', 'Mezinárodní turnaj v Praze', 1, 'Availible', '2026-04-09 13:16:05', '2025-05-12', '/uploads/events/events-1775740565421-400784708.jpg'),
(5, 'Brno Open 2025', 'Otevřený turnaj pro všechny věkové kategorie', 1, 'Availible', '2026-04-09 13:15:51', '2025-06-05', '/uploads/events/events-1775740551914-726086382.jpg'),
(6, 'Letní soustředění', 'Týdenní tréninkové soustředění v přírodě', 1, 'Availible', '2026-04-09 13:15:31', '2025-07-14', '/uploads/events/events-1775740531397-352118765.jpg'),
(7, 'Zkoušky na technické stupně', 'Oficiální zkoušky pod vedením mistrů', 1, 'Availible', '2026-04-09 15:03:31', '2025-05-19', '/uploads/events/events-1775740515233-127252468.jpg'),
(8, 'Exhibice na náměstí', 'Veřejná exhibice pro propagaci oddílu', 1, 'Hidden', '2026-04-09 15:55:55', '2025-05-28', '/uploads/events/events-1775740501351-518965211.jpg');

-- --------------------------------------------------------

--
-- Struktura tabulky `event_photos`
--

CREATE TABLE `event_photos` (
  `id` int(11) NOT NULL,
  `event_id` int(11) NOT NULL,
  `img_path` varchar(255) NOT NULL,
  `sort_order` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Vypisuji data pro tabulku `event_photos`
--

INSERT INTO `event_photos` (`id`, `event_id`, `img_path`, `sort_order`) VALUES
(3, 7, '/uploads/events/event-1774803888544-380771462.jpg', 0),
(4, 7, '/uploads/events/event-1774803888546-558824259.jpg', 1),
(5, 7, '/uploads/events/event-1774803888546-252397380.jpg', 2),
(6, 7, '/uploads/events/event-1774803888546-811724663.jpg', 3),
(7, 7, '/uploads/events/event-1774803888546-818429991.jpg', 4),
(35, 8, '/uploads/events/events-1775740501351-424788723.jpg', 0),
(36, 8, '/uploads/events/events-1775740501351-802710193.jpg', 1),
(37, 8, '/uploads/events/events-1775740501352-9968118.jpg', 2),
(38, 8, '/uploads/events/events-1775740501352-200025319.jpg', 3),
(39, 6, '/uploads/events/events-1775740531398-142628118.jpg', 0),
(40, 6, '/uploads/events/events-1775740531398-996598304.jpg', 1),
(41, 6, '/uploads/events/events-1775740531398-304843972.jpg', 2),
(42, 5, '/uploads/events/events-1775740551915-609385064.jpg', 0),
(43, 5, '/uploads/events/events-1775740551915-796104304.jpg', 1),
(44, 5, '/uploads/events/events-1775740551915-906298846.jpg', 2),
(45, 5, '/uploads/events/events-1775740551915-252969788.jpg', 3),
(46, 4, '/uploads/events/events-1775740565421-37935875.jpg', 0),
(47, 4, '/uploads/events/events-1775740565421-62023208.jpg', 1),
(48, 3, '/uploads/events/events-1775740585776-516216.jpg', 0),
(49, 3, '/uploads/events/events-1775740585776-853621066.jpg', 1),
(50, 3, '/uploads/events/events-1775740585776-811085711.jpg', 2);

-- --------------------------------------------------------

--
-- Struktura tabulky `exam`
--

CREATE TABLE `exam` (
  `id` int(11) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `date` date DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `registrable_date` date DEFAULT NULL,
  `price` int(11) DEFAULT NULL,
  `status` enum('active','hidden') DEFAULT 'hidden',
  `created_by` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Vypisuji data pro tabulku `exam`
--

INSERT INTO `exam` (`id`, `title`, `description`, `date`, `location`, `registrable_date`, `price`, `status`, `created_by`, `created_at`) VALUES
(1, 'Zkoušky na technické stupně', 'Zkoušky probíhají standartně v Pelhřimově v tělocvičně, kde trénujeme. Pokud při zkoušce neuspějete, získáte mezistupeň pásku na který jste zkoušku absolvovali. Zkouška proběhne 22. 12. 2024\nNa zkoušky si s sebou vezměte celý dobok, svazový průkaz případně na místě za 150 Kč. Pakliže vaše dítě dělá první zkoušky a vše umí na žlutý pásek tzn. 8.kup. Musíte zaplatit: poplatek za komisaře - 100 Kč + 9.kup - 150 Kč + 8.kup - 250 Kč = 500 Kč\n\nDále se platí poplatek za komisaře - 100 Kč, oddílové poplatky - 4 000 Kč/rok, roční svazová známka - 300 Kč. Případně si můžete za 150 Kč zakoupit svazovou knížečku.', '2026-05-19', 'TKD Lacek', '2026-04-09', 500, 'active', 10, '2026-04-02 10:29:22');

-- --------------------------------------------------------

--
-- Struktura tabulky `exam_registration`
--

CREATE TABLE `exam_registration` (
  `id` int(11) NOT NULL,
  `exam_id` int(11) DEFAULT NULL,
  `fighter_id` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Vypisuji data pro tabulku `exam_registration`
--

INSERT INTO `exam_registration` (`id`, `exam_id`, `fighter_id`, `created_at`) VALUES
(52, 1, 25, '2026-04-09 08:15:35'),
(53, 1, 9, '2026-04-09 08:31:07'),
(54, 1, 26, '2026-04-09 08:40:07'),
(60, 1, 17, '2026-04-09 08:52:47'),
(62, 1, 6, '2026-04-09 09:34:22'),
(63, 1, 32, '2026-04-09 09:51:13'),
(64, 1, 38, '2026-04-09 09:51:18'),
(66, 1, 15, '2026-04-09 13:28:46');

-- --------------------------------------------------------

--
-- Struktura tabulky `fighters`
--

CREATE TABLE `fighters` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `surname` varchar(255) DEFAULT NULL,
  `birth` date DEFAULT NULL,
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
(1, 'Josef ', 'Med', '2003-03-29', 7, '/uploads/fighters/med_josef.jpg', 1, 1, 1, 4, 72),
(2, 'Matěj', 'Kaman', '2025-02-19', 7, '/uploads/fighters/kaman_matej.jpg', 1, 1, 0, 4, 83),
(3, 'Adéla', 'Pejcalová', '2009-04-14', 6, '/uploads/fighters/fighters-1775737818800-626509769.jpg', 1, 0, 1, 4, 12),
(4, 'Alice', 'Bínová', '2006-03-15', 6, '/uploads/fighters/fighters-1775737829281-383768901.jpg', 0, 1, 0, 3, 46),
(6, 'Iveta ', 'Jiránková', '1999-04-01', 6, '/uploads/fighters/fighters-1775737847597-341958928.jpg', 1, 1, 1, 3, 25),
(7, 'Jiří \"Happy\"', 'Šťastný', '2000-04-01', 2, '/uploads/fighters/fighters-1775737721897-780148401.jpg', 1, 1, 1, 5, 120),
(8, 'Marek', 'Šmarda', '2002-04-01', 6, '/uploads/fighters/fighters-1775737866426-770526857.jpg', 1, 1, 1, 2, 73),
(9, 'Petr', 'Hostička', '2019-04-11', 6, '/uploads/fighters/fighters-1775737876132-373447514.jpg', 0, 0, 1, 3, 46),
(10, 'Alea Lin', 'Mocek', '2017-10-20', 5, '/uploads/fighters/fighters-1775737748792-67706914.jpg', 0, 0, 0, 1, 74),
(12, 'Natálie ', 'Šikýřová', '2000-02-21', 5, '/uploads/fighters/fighters-1775737764933-865276787.jpg', 1, 1, 0, 3, 63),
(13, 'Pavla', 'Brambůrková', '2008-04-01', 5, '/uploads/fighters/fighters-1775737786720-79735976.jpg', 1, 0, 1, 2, 83),
(14, 'Tereza', 'Urbánková', '2016-06-08', 5, '/uploads/fighters/fighters-1775735413386-1573386.jpg', 0, 1, 1, 3, 78),
(15, 'Tomáš', 'Neshyba', '2003-02-20', 5, '/uploads/fighters/fighters-1775737793750-165206181.jpg', 0, 0, 1, 3, 37),
(17, 'Zuzana', 'Válková', '2000-12-04', 5, '/uploads/fighters/fighters-1775737802871-379081174.jpg', 1, 0, 1, 1, 3),
(22, 'Pepa', 'Hála Hális', '2000-02-02', 4, '/uploads/fighters/fighters-1775737730612-846078984.png', 1, 1, 1, 4, 100),
(24, 'Petr', 'Svoboda', '2026-04-03', 4, '/uploads/fighters/fighter-1775563560166-514953769.png', 0, 0, 1, NULL, 90),
(25, 'Ilia', 'Topuria', '2003-03-25', 9, '/uploads/fighters/fighters-1775734391104-306758698.jpg', 1, 1, 1, 4, 72),
(26, 'Ondřej', 'Liška', '2012-12-12', 9, '/uploads/fighters/fighters-1775734597773-410953826.png', 1, 1, 1, 4, 70),
(27, 'Jisturška', 'NevimVole', '2011-05-20', 4, '/uploads/fighters/fighter-1775588224620-516639107.jpg', 0, 0, 1, 3, 76),
(32, 'Jisek', 'Nivak', '2003-03-29', 1, '/uploads/fighters/fighters-1775734604251-683480923.png', 1, 1, 1, NULL, NULL),
(33, 'Admin', 'Test', '2000-03-29', 2, NULL, 0, 0, 1, NULL, NULL),
(37, 'JOSEF', 'aiwdawd', '2002-03-31', 2, NULL, 0, 0, 1, 3, 123432),
(38, 'Josef', 'Novaj', '2000-04-10', 1, '/uploads/fighters/fighters-1775735264004-863917649.jpg', 0, 0, 1, NULL, 23),
(39, 'TestFotky', 'xd', '2004-04-08', 9, '/uploads/fighters/fighters-1775733403898-624192480.jpg', 0, 0, 1, 2, 12);

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
(12, 'Agrostroj', 'https://www.agrostroj.cz/uvod/', '/uploads/sponsors/sponsors-1775739740575-529173592.png'),
(13, 'HodinaH', 'https://www.hodinah.cz/', '/uploads/sponsors/sponsors-1775739780142-590036148.png'),
(14, 'Humpolec', 'https://humpolec.cz/', '/uploads/sponsors/sponsors-1775739810589-225836773.gif'),
(15, 'Komorovice', 'https://www.komorovice.cz/', '/uploads/sponsors/sponsors-1775739836637-929725677.jpg');

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
  `registrable_date` date DEFAULT NULL,
  `google_event_id` varchar(255) DEFAULT NULL,
  `status` enum('uncompleted','completed') DEFAULT 'uncompleted'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Vypisuji data pro tabulku `tournament`
--

INSERT INTO `tournament` (`id`, `name`, `location`, `price`, `type_id`, `start_date`, `end_date`, `info`, `img_path`, `users_id`, `registrable_date`, `google_event_id`, `status`) VALUES
(3, 'Prague Winter Cup', 'Praha', 3998, 1, '2026-04-13', '2026-04-15', 'Zimní turnaj', '/uploads/tournaments/tournaments-1775741988405-39024595.jpg', 1, '2026-04-12', 'km7ma2uthaj3si215le4ngqs9g', 'completed'),
(4, 'Ostrava Open 2026', 'Ostrava sportovní hala', 150, 1, '2026-04-29', '2026-04-30', 'Regionální soutěž v ostravě', '/uploads/tournaments/tournaments-1775741994890-448004625.jpg', 2, '2026-04-28', 'tvjgqgdo05uobu4aqf520i6gg8', 'completed'),
(5, 'Brno Cup', 'Brno', 200, 2, '2026-02-05', '2026-02-05', 'Menší turnaj', '/uploads/tournaments/tournaments-1775742002296-162950912.jpg', 1, '2025-12-10', 'mttqoo9cl23096lft25aij02e4', 'completed'),
(6, 'Plzen Taekwondo Open', 'Plzeň', 450, 1, '2026-02-08', '2026-02-09', 'Otevřený turnaj', '/uploads/tournaments/tournaments-1775742030614-200513573.jpg', 3, '2025-12-20', NULL, 'uncompleted'),
(7, 'Liberec Challenge', 'Liberec', 320, 2, '2026-02-11', '2026-02-11', 'Lokální soutěž', '/uploads/tournaments/tournaments-1775742037216-320974177.jpg', 2, '2026-01-05', NULL, 'completed'),
(8, 'Hradec Cup', 'Hradec Králové', 280, 2, '2026-02-13', '2026-02-13', 'Turnaj pro začátečníky', '/uploads/tournaments/tournaments-1775742044404-679180479.jpg', 1, '2026-01-10', NULL, 'uncompleted'),
(9, 'Zlin Open', 'Zlín', 360, 1, '2026-02-18', '2026-02-19', 'Regionální otevřený turnaj', '/uploads/tournaments/tournaments-1775742020669-922691032.jpg', 3, '2026-01-15', NULL, 'uncompleted'),
(10, 'Pardubice Cup', 'Pardubice', 250, 2, '2026-02-22', '2026-02-22', 'Jednodenní soutěž', '/uploads/tournaments/tournaments-1775742015353-110021549.jpg', 1, '2026-01-20', NULL, 'uncompleted'),
(11, 'Karlovy Vary Open', 'Karlovy Vary', 330, 2, '2026-02-25', '2026-02-25', 'Lázeňský turnaj', '/uploads/tournaments/tournaments-1775742009857-563512062.jpg', 2, '2026-01-25', NULL, 'uncompleted'),
(12, 'Olomouc Grand Prix', 'Olomouc', 500, 1, '2026-03-01', '2026-03-02', 'Velký turnaj', '/uploads/tournaments/tournaments-1775741967353-359298824.jpg', 3, '2026-02-01', NULL, 'uncompleted'),
(13, 'Ceske Budejovice Cup', 'České Budějovice', 270, 2, '2026-03-05', '2026-03-05', 'Regionální akce', '/uploads/tournaments/tournaments-1775741954960-687849851.jpg', 1, '2026-02-05', NULL, 'uncompleted'),
(14, 'Jihlava Open', 'Jihlava', 310, 2, '2026-03-08', '2026-03-08', 'Menší soutěž', '/uploads/tournaments/tournaments-1775741944810-87326497.jpg', 2, '2026-02-10', NULL, 'uncompleted'),
(15, 'Kladno Cup', 'Kladno', 290, 2, '2026-03-12', '2026-03-12', 'Lokální turnaj', '/uploads/tournaments/tournaments-1775741918291-238706831.jpg', 1, '2026-02-15', NULL, 'uncompleted'),
(16, 'Czech Taekwondo Cup', 'Praha', 500, 1, '2026-01-10', '2026-01-11', 'Velký otevřený turnaj', '/uploads/tournaments/tournaments-1775741981776-334846228.jpg', 1, '2025-11-01', NULL, 'uncompleted'),
(17, 'Brno Open', 'Brno', 450, 1, '2026-02-14', '2026-02-15', 'Regionální soutěž', '/uploads/tournaments/tournaments-1775742050963-384743406.jpg', 1, '2025-12-10', NULL, 'uncompleted'),
(18, 'Moravia Cup', 'Olomouc', 350, 2, '2026-03-12', '2026-03-12', 'Jednodenní turnaj', '/uploads/tournaments/tournaments-1775741925018-721926690.jpg', 1, '2026-01-05', NULL, 'uncompleted'),
(19, 'Prague Spring Tournament', 'Praha', 550, 1, '2026-04-13', '2026-04-16', 'Jarní turnaj', '/uploads/tournaments/tournaments-1775741911993-517159162.jpg', 2, '2026-04-12', NULL, 'completed'),
(20, 'Liberec Taekwondo Cup', 'Liberec', 300, 2, '2026-04-20', '2026-04-20', 'Menší regionální soutěž', '/uploads/tournaments/tournaments-1775741517926-968296081.jpg', 2, '2026-02-15', NULL, 'completed'),
(21, 'Plzen Open', 'Plzeň', 400, 1, '2026-05-10', '2026-05-11', 'Turnaj pro všechny věkové kategorie', '/uploads/tournaments/tournaments-1775741510604-576967164.jpg', 1, '2026-03-01', NULL, 'completed'),
(22, 'Ostrava Taekwondo Challenge', 'Ostrava', 450, 1, '2026-06-07', '2026-06-08', 'Mezinárodní účast', '/uploads/tournaments/tournaments-1775741502923-141558378.jpg', 3, '2026-04-01', NULL, 'uncompleted'),
(23, 'Summer Taekwondo Cup', 'Karlovy Vary', 350, 2, '2026-07-12', '2026-07-12', 'Letní soutěž', '/uploads/tournaments/tournaments-1775741495796-910213080.jpg', 2, '2026-05-01', NULL, 'uncompleted'),
(24, 'Czech Junior Cup', 'Hradec Králové', 300, 2, '2026-08-20', '2026-08-20', 'Turnaj pro juniory', '/uploads/tournaments/tournaments-1775741488236-452691088.jpg', 1, '2026-06-10', NULL, 'uncompleted'),
(25, 'Autumn Taekwondo Open', 'Zlín', 500, 1, '2026-09-18', '2026-09-19', 'Podzimní velký turnaj', '/uploads/tournaments/tournaments-1775741481465-137312357.jpg', 3, '2026-07-01', NULL, 'completed'),
(27, 'Winter Taekwondo Cup', 'Praha', 400, 1, '2026-11-25', '2026-11-30', 'Zimní turnajdwa', '/uploads/tournaments/tournaments-1775741474821-270128178.jpg', 2, '2026-09-20', NULL, 'completed'),
(28, 'Students Taekwondo Cup', 'Pardubice', -1, 2, '2026-12-01', '2026-12-01', 'Studentská soutěž', '/uploads/tournaments/tournaments-1775741466271-937331436.jpg', 1, '2026-04-09', NULL, 'completed'),
(45, 'Ja', 'nevim', 200, 1, '2026-04-20', '2026-04-30', 'wad', '/uploads/tournaments/tournaments-1775756172882-919947805.jpg', NULL, '2026-04-10', 'aie8i8278q8m7housq171fr7ds', 'completed'),
(46, 'Testovací Turnaj 2026', 'Humpolec Open', 67, 1, '2026-04-04', NULL, 'Informace ', '/uploads/tournaments/tournaments-1775757172512-593307702.jpg', NULL, '2026-04-01', 'l2dlkj971a50h9b2i35qb1bebg', 'completed');

-- --------------------------------------------------------

--
-- Struktura tabulky `tournament_registration`
--

CREATE TABLE `tournament_registration` (
  `id` int(11) NOT NULL,
  `fighter_id` int(11) DEFAULT NULL,
  `tournament_id` int(11) DEFAULT NULL,
  `place` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Vypisuji data pro tabulku `tournament_registration`
--

INSERT INTO `tournament_registration` (`id`, `fighter_id`, `tournament_id`, `place`) VALUES
(61, 1, 3, 1),
(62, 1, 5, 1),
(63, 1, 7, 2),
(65, 2, 4, 1),
(66, 2, 8, 3),
(68, 3, 6, 2),
(69, 3, 9, 1),
(76, 6, 4, 1),
(77, 6, 8, 1),
(78, 6, 13, 3),
(79, 7, 5, 1),
(80, 7, 9, 2),
(81, 7, 14, 1),
(82, 8, 6, 1),
(84, 8, 15, 1),
(86, 9, 11, 3),
(87, 9, 16, 1),
(88, 10, 8, 1),
(89, 10, 12, 2),
(90, 10, 17, 1),
(95, 12, 14, 2),
(96, 12, 19, 1),
(97, 13, 11, 1),
(98, 13, 15, 3),
(99, 13, 20, 1),
(100, 14, 12, 1),
(101, 14, 16, 2),
(102, 14, 21, 1),
(104, 15, 17, 2),
(109, 17, 15, 1),
(110, 17, 19, 3),
(111, 17, 24, 1),
(201, 3, 22, NULL),
(206, 3, 18, NULL),
(210, 3, 14, NULL),
(211, 3, 13, NULL),
(213, 15, 22, NULL),
(227, 15, 25, NULL),
(230, 15, 28, 12),
(235, 25, 28, NULL),
(241, 6, 24, 12),
(244, 7, 28, NULL),
(245, 24, 28, NULL),
(247, 32, 28, 12),
(249, 14, 28, NULL),
(251, 38, 28, NULL),
(254, 25, 24, 12),
(255, 38, 27, NULL);

-- --------------------------------------------------------

--
-- Struktura tabulky `trainings`
--

CREATE TABLE `trainings` (
  `id` int(11) NOT NULL,
  `day_start` text DEFAULT NULL,
  `day_end` text DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `time_start` time DEFAULT NULL,
  `time_end` time DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Vypisuji data pro tabulku `trainings`
--

INSERT INTO `trainings` (`id`, `day_start`, `day_end`, `type`, `time_start`, `time_end`) VALUES
(1, 'Pondělí', 'Středa', 'začátečníci', '16:00:00', '18:00:00'),
(2, 'Pondělí', 'Středa', 'pokročilí', '18:00:00', '20:00:00');

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
  `role_id` int(11) DEFAULT 3,
  `status` enum('pending','approved','rejected') DEFAULT 'pending'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Vypisuji data pro tabulku `users`
--

INSERT INTO `users` (`id`, `login`, `password`, `email`, `phone`, `fighter_id`, `role_id`, `status`) VALUES
(1, 'lacek.petr', 'admin', 'lacek.petr@seznam.cz', '721643937', NULL, 4, 'rejected'),
(2, 'scrxtch', '$2b$10$C4.gAnTADXEl5kYzpqKBrug/wX8N/.AU.Y/Oskqdtgr9BsGNNHV/e', 'scrxtch@seznam.cz', '721 642 937', 38, 3, 'approved'),
(10, 'admin', '$2b$10$2q.P/HApqlMkttjF2G.zmu7vmGw/7jdrZUKI2Igwlx2bwqfLOTfPS', 'peetr.svosboda@seznam.cz', '721 354 831', 22, 1, 'approved'),
(14, 'ufo361', '$2b$10$oANu4vfcsp6TcVja1J/bfutyFf.4Y8gHYTJf4Aq88VR3EwpAzvCze', NULL, NULL, NULL, 5, 'rejected'),
(22, 'trener', '$2b$10$0DBSwqJIXFtigCp83myB2.DoKJ5Ht8zG4g6SfZvjdwsRm9m1mvV8i', 'trener@seznam.cz', '123 456 789', 1, 2, 'approved'),
(26, 'testZadosti', '$2b$10$4BlJ9sY/AXcvAL7wqq7teOD9nksULNG3DyJh.aCWFJzdmPsRN9we.', 'tetszadosti@seznam.cz', NULL, NULL, 3, 'rejected'),
(37, 'uzivatel', '$2b$10$xxZuDXE2VVfI5NwcUkm4xePq9mxkbtAL671W3RD0ecyest5VirFOm', 'uzivatel@seznam.cz', '', 8, 2, 'approved'),
(40, 'tester', '$2b$10$XwT8JnE2.qh0lmdIRBFuHeZpDzsGfnnbT1DepKm2Xlf9eK1bTL03S', 'tester@seznam.cz', NULL, 7, 2, 'approved'),
(46, 'aezakmi123', '$2b$10$6cK9DXTFy/2higY7nSzUveDXLc3vOrOfNaz3FqS3PeZlPQhYija7O', 'aezakmi123@seznam.cz', NULL, NULL, 3, 'pending');

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
-- Indexy pro tabulku `event_photos`
--
ALTER TABLE `event_photos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `event_id` (`event_id`);

--
-- Indexy pro tabulku `exam`
--
ALTER TABLE `exam`
  ADD PRIMARY KEY (`id`),
  ADD KEY `created_by` (`created_by`);

--
-- Indexy pro tabulku `exam_registration`
--
ALTER TABLE `exam_registration`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `exam_id` (`exam_id`,`fighter_id`),
  ADD KEY `fighter_id` (`fighter_id`);

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
  ADD UNIQUE KEY `tournament_id_2` (`tournament_id`,`fighter_id`),
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
  ADD UNIQUE KEY `unique_fighter` (`fighter_id`),
  ADD KEY `role_id` (`role_id`),
  ADD KEY `fighter_id` (`fighter_id`);

--
-- AUTO_INCREMENT pro tabulky
--

--
-- AUTO_INCREMENT pro tabulku `banner`
--
ALTER TABLE `banner`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT pro tabulku `event_photos`
--
ALTER TABLE `event_photos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

--
-- AUTO_INCREMENT pro tabulku `exam`
--
ALTER TABLE `exam`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT pro tabulku `exam_registration`
--
ALTER TABLE `exam_registration`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=67;

--
-- AUTO_INCREMENT pro tabulku `fighters`
--
ALTER TABLE `fighters`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;

--
-- AUTO_INCREMENT pro tabulku `role`
--
ALTER TABLE `role`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT pro tabulku `sponsors`
--
ALTER TABLE `sponsors`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT pro tabulku `tournament`
--
ALTER TABLE `tournament`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=47;

--
-- AUTO_INCREMENT pro tabulku `tournament_registration`
--
ALTER TABLE `tournament_registration`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=256;

--
-- AUTO_INCREMENT pro tabulku `trainings`
--
ALTER TABLE `trainings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pro tabulku `type`
--
ALTER TABLE `type`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pro tabulku `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=47;

--
-- Omezení pro exportované tabulky
--

--
-- Omezení pro tabulku `event`
--
ALTER TABLE `event`
  ADD CONSTRAINT `event_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Omezení pro tabulku `event_photos`
--
ALTER TABLE `event_photos`
  ADD CONSTRAINT `event_photos_ibfk_1` FOREIGN KEY (`event_id`) REFERENCES `event` (`id`) ON DELETE CASCADE;

--
-- Omezení pro tabulku `exam`
--
ALTER TABLE `exam`
  ADD CONSTRAINT `exam_ibfk_1` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`);

--
-- Omezení pro tabulku `exam_registration`
--
ALTER TABLE `exam_registration`
  ADD CONSTRAINT `exam_registration_ibfk_1` FOREIGN KEY (`exam_id`) REFERENCES `exam` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `exam_registration_ibfk_2` FOREIGN KEY (`fighter_id`) REFERENCES `fighters` (`id`);

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
  ADD CONSTRAINT `tournament_registration_ibfk_1` FOREIGN KEY (`fighter_id`) REFERENCES `fighters` (`id`) ON DELETE CASCADE,
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
