-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Počítač: 127.0.0.1
-- Vytvořeno: Stř 08. dub 2026, 18:54
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
(8, 'main banner1', '/uploads/banners/banner-1771092642542-545768501.jpg', 1),
(10, 'main3', '/uploads/banners/banner-1771092665123-553558382.jpg', 1),
(14, 'wut', '/uploads/banners/banner-1775588151846-812656990.png', 1);

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
(3, 'Bratislava OPEN', 'BRATISLAVA OPEN - největší turnaj', 1, 'Availible', '2026-04-06 11:55:01', '2025-04-23', '/src/assets/Events/BT_open.jpg\r\n'),
(4, 'Prague Taekwondo Cup', 'Mezinárodní turnaj v Praze', 1, 'Availible', '2026-04-06 11:55:05', '2025-05-12', '/src/assets/Events/BT_open2.jpg\r\n'),
(5, 'Brno Open 2025', 'Otevřený turnaj pro všechny věkové kategorie', 1, 'Availible', '2026-04-06 11:55:07', '2025-06-05', '/src/assets/Events/BT_open3.webp\r\n'),
(6, 'Letní soustředění', 'Týdenní tréninkové soustředění v přírodě', 1, 'Availible', '2026-04-06 13:01:56', '2025-07-14', '/src/assets/Events/BT_open3.webp\r\n'),
(7, 'Zkoušky na technické stupně', 'Oficiální zkoušky pod vedením mistrů', 1, 'Availible', '2026-04-07 18:44:37', '2025-06-19', '/src/assets/Events/BT_open.jpg\r\n'),
(8, 'Exhibice na náměstí', 'Veřejná exhibice pro propagaci oddílu', 1, 'Hidden', '2026-04-07 16:56:17', '2025-05-28', '/src/assets/Events/BT_open2.jpg\r\n'),
(9, 'Test', 'awd', 10, 'Availible', '2026-04-06 11:55:27', '2026-05-03', NULL),
(10, 'TestViditelnosti', 'adawd', 10, 'Availible', '2026-04-08 13:55:18', '2026-04-19', NULL),
(13, 'TetsAktuality', 'adawd', 22, 'Availible', '2026-04-08 11:45:28', '2026-04-08', '/uploads/events/event-1775648728611-560752015.png'),
(14, 'DneskaSeZabiju', 'DneskaSeZabiju', 22, 'Availible', '2026-04-08 18:05:03', '2026-04-11', '/uploads/events/event-1775660209002-897840854.png'),
(17, 'awdawd', 'awdawd', 22, 'Availible', '2026-04-08 18:28:23', '2026-04-08', NULL);

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
(13, 13, '/uploads/events/event-1775648728612-855297216.png', 0),
(14, 13, '/uploads/events/event-1775648728614-117713248.png', 1),
(15, 13, '/uploads/events/event-1775648728617-295407720.png', 2),
(16, 13, '/uploads/events/event-1775648728617-174961862.png', 3),
(17, 14, '/uploads/events/event-1775660209003-118296816.png', 0),
(18, 14, '/uploads/events/event-1775660209003-369321185.png', 1),
(19, 14, '/uploads/events/event-1775660209005-685688130.png', 2);

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
  `note` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Vypisuji data pro tabulku `exam_registration`
--

INSERT INTO `exam_registration` (`id`, `exam_id`, `fighter_id`, `note`, `created_at`) VALUES
(50, 1, 17, NULL, '2026-04-08 18:24:36');

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
(1, 'Josef ', 'Med', '2003-03-29', 7, '/src/assets/Fighters/med_josef.jpg', 1, 1, 1, 4, 72),
(2, 'Matěj', 'Kaman', '2025-02-19', 7, '/src/assets/Fighters/kaman_matej.jpg', 1, 1, 0, 4, 83),
(3, 'Adéla', 'Pejcalová', '2026-04-14', 6, '/src/assets/Fighters/pejcalova_adela.jpg  ', 1, 0, 1, 4, 12),
(4, 'Alice', 'Bínová', '2026-03-15', 6, '/src/assets/Fighters/binova_alice.jpg  ', 0, 1, 0, 3, 46),
(6, 'Iveta ', 'Jiránková', '2026-04-01', 6, '/src/assets/Fighters/jirankova_iveta.jpg  ', 1, 1, 1, 3, 25),
(7, 'Jiří', 'Šťastný', '2026-04-01', 6, '/src/assets/Fighters/stastny_jiri.jpg  ', 1, 0, 1, 2, 63),
(8, 'Marek', 'Šmarda', '2026-04-01', 6, '/src/assets/Fighters/smarda_marek.jpg  ', 1, 1, 1, 2, 73),
(9, 'Petr', 'Hostička', '2019-04-11', 6, '/src/assets/Fighters/hosticka_petr.jpg  ', 0, 0, 1, 3, 46),
(10, 'Alea Lin', 'Mocek', '2025-10-20', 5, NULL, 0, 0, 0, 1, 74),
(12, 'Natálie ', 'Šikýřová', '2026-02-21', 5, '/src/assets/Fighters/sikyrova_natalie.jpg  ', 1, 1, 0, 3, 63),
(13, 'Pavla', 'Brambůrková', '2026-04-01', 5, '/src/assets/Fighters/bramburkova_pavla.jpg  ', 1, 0, 1, 2, 83),
(14, 'Tereza', 'Urbánková', NULL, 5, '/src/assets/Fighters/urbankova_tereza.jpg  ', 0, 1, 1, 3, NULL),
(15, 'Tomáš', 'Neshyba', '2003-02-20', 5, '/src/assets/Fighters/neshyba_tomas.jpg  ', 0, 0, 1, 3, 37),
(17, 'Zuzana', 'Válková', '2000-12-04', 5, '/src/assets/Fighters/valkova_zuzana.jpg  ', 1, 0, 1, 1, 3),
(22, 'Pepa', 'Hála Hális', NULL, 4, '/uploads/fighters/fighter-1771590823127-855309316.png', 1, 1, 1, 4, 100),
(24, 'Petr', 'Svoboda', '2026-04-03', 4, '/uploads/fighters/fighter-1775563560166-514953769.png', 0, 0, 1, NULL, 90),
(25, 'Ilia', 'Topuria', '2003-03-25', 9, '/uploads/fighters/fighter-1775485855977-121719064.jpg', 1, 1, 1, 4, 72),
(26, 'Foxmen', 'Pičo', '2012-12-12', 1, '/uploads/fighters/fighter-1775486746256-472124173.png', 1, 1, 1, 3, 65),
(27, 'Jisturška', 'NevimVole', '2011-05-20', 4, '/uploads/fighters/fighter-1775588224620-516639107.jpg', 0, 0, 1, 3, 76),
(32, 'Jisek', 'Nivak', '2003-03-29', 1, '/uploads/fighters/fighter-1775663400342-206721297.png', 1, 1, 1, NULL, NULL),
(33, 'Admin', 'Test', '2000-03-29', 2, NULL, 0, 0, 1, NULL, NULL),
(37, 'JOSEF', 'aiwdawd', '2002-03-31', 2, NULL, 0, 0, 1, 3, 123432),
(38, 'Josef', 'Novaj', '2000-04-10', 1, NULL, 0, 0, 1, NULL, NULL);

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
(1, 'agrostroj', 'https://www.tkdlacek.cz/slovenia-open/detail-aktuality.php?aid=1400', '../src/assets/Partners/FullColor/agrostroj.png'),
(2, 'hodina-h', NULL, '../src/assets/Partners/FullColor/hodina-h.png'),
(4, 'Humpolec', 'https://www.youtube.com/watch?v=O4irXQhgMqg&list=RDVhVLyeXwTlY&index=4', '../src/assets/Partners/FullColor/logo_humpolec.gif'),
(5, 'obec-komorovice', NULL, '../src/assets/Partners/FullColor/obec-komorovice.jpg'),
(8, 'wad', 'https://github.com/scrxtch666?tab=overview&from=2026-04-01&to=2026-04-06', '/uploads/sponsors/sponsor-1775490603076-659813876.png'),
(11, 'fdfdb', NULL, '/uploads/sponsors/sponsor-1775672974012-233834641.png');

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
  `registrable_date` date DEFAULT NULL,
  `google_event_id` varchar(255) DEFAULT NULL,
  `status` enum('uncompleted','completed') DEFAULT 'uncompleted'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Vypisuji data pro tabulku `tournament`
--

INSERT INTO `tournament` (`id`, `name`, `location`, `price`, `type_id`, `start_date`, `end_date`, `info`, `img_path`, `users_id`, `registrable_date`, `google_event_id`, `status`) VALUES
(1, 'SCRXTCH turnaj', 'Humpolec', 500, 1, '2026-02-09', '2026-02-10', 'Test turnaje', NULL, 1, '2025-04-23', NULL, 'completed'),
(2, 'TEST 2', 'PRAHA', 13, 2, '2026-02-16', '2026-02-17', 'zadne neni ', '/src/assets/Tournaments/lacek.png', NULL, NULL, NULL, 'uncompleted'),
(3, 'Prague Winter Cup', 'Praha', 400, 1, '2026-01-20', '2026-01-21', 'Zimní turnaj', '/src/assets/Tournaments/lacek.png', 1, '2025-11-15', NULL, 'uncompleted'),
(4, 'Ostrava Open', 'Ostrava', 350, 2, '2026-02-01', '2026-02-01', 'Regionální soutěž', '/src/assets/Tournaments/lacek.png', 2, '2025-12-01', NULL, 'uncompleted'),
(5, 'Brno Cup', 'Brno', 300, 2, '2026-02-05', '2026-02-05', 'Menší turnaj', '/src/assets/Tournaments/lacek.png', 1, '2025-12-10', NULL, 'completed'),
(6, 'Plzen Taekwondo Open', 'Plzeň', 450, 1, '2026-02-08', '2026-02-09', 'Otevřený turnaj', '/src/assets/Tournaments/lacek.png', 3, '2025-12-20', NULL, 'uncompleted'),
(7, 'Liberec Challenge', 'Liberec', 320, 2, '2026-02-11', '2026-02-11', 'Lokální soutěž', '/src/assets/Tournaments/lacek.png', 2, '2026-01-05', NULL, 'completed'),
(8, 'Hradec Cup', 'Hradec Králové', 280, 2, '2026-02-13', '2026-02-13', 'Turnaj pro začátečníky', '/src/assets/Tournaments/lacek.png', 1, '2026-01-10', NULL, 'uncompleted'),
(9, 'Zlin Open', 'Zlín', 360, 1, '2026-02-18', '2026-02-19', 'Regionální otevřený turnaj', '/src/assets/Tournaments/lacek.png', 3, '2026-01-15', NULL, 'uncompleted'),
(10, 'Pardubice Cup', 'Pardubice', 250, 2, '2026-02-22', '2026-02-22', 'Jednodenní soutěž', '/src/assets/Tournaments/lacek.png', 1, '2026-01-20', NULL, 'uncompleted'),
(11, 'Karlovy Vary Open', 'Karlovy Vary', 330, 2, '2026-02-25', '2026-02-25', 'Lázeňský turnaj', '/src/assets/Tournaments/lacek.png', 2, '2026-01-25', NULL, 'uncompleted'),
(12, 'Olomouc Grand Prix', 'Olomouc', 500, 1, '2026-03-01', '2026-03-02', 'Velký turnaj', '/src/assets/Tournaments/lacek.png', 3, '2026-02-01', NULL, 'uncompleted'),
(13, 'Ceske Budejovice Cup', 'České Budějovice', 270, 2, '2026-03-05', '2026-03-05', 'Regionální akce', '/src/assets/Tournaments/lacek.png', 1, '2026-02-05', NULL, 'uncompleted'),
(14, 'Jihlava Open', 'Jihlava', 310, 2, '2026-03-08', '2026-03-08', 'Menší soutěž', '/src/assets/Tournaments/lacek.png', 2, '2026-02-10', NULL, 'uncompleted'),
(15, 'Kladno Cup', 'Kladno', 290, 2, '2026-03-12', '2026-03-12', 'Lokální turnaj', '/src/assets/Tournaments/lacek.png', 1, '2026-02-15', NULL, 'uncompleted'),
(16, 'Czech Taekwondo Cup', 'Praha', 500, 1, '2026-01-10', '2026-01-11', 'Velký otevřený turnaj', '/src/assets/Tournaments/lacek.png', 1, '2025-11-01', NULL, 'uncompleted'),
(17, 'Brno Open', 'Brno', 450, 1, '2026-02-14', '2026-02-15', 'Regionální soutěž', '/src/assets/Tournaments/lacek.png', 1, '2025-12-10', NULL, 'uncompleted'),
(18, 'Moravia Cup', 'Olomouc', 350, 2, '2026-03-12', '2026-03-12', 'Jednodenní turnaj', '/src/assets/Tournaments/lacek.png', 1, '2026-01-05', NULL, 'uncompleted'),
(19, 'Prague Spring Tournament', 'Praha', 550, 1, '2026-04-05', '2026-04-06', 'Jarní turnaj', '/src/assets/Tournaments/lacek.png', 2, '2026-02-01', NULL, 'uncompleted'),
(20, 'Liberec Taekwondo Cup', 'Liberec', 300, 2, '2026-04-20', '2026-04-20', 'Menší regionální soutěž', '/src/assets/Tournaments/lacek.png', 2, '2026-02-15', NULL, 'completed'),
(21, 'Plzen Open', 'Plzeň', 400, 1, '2026-05-10', '2026-05-11', 'Turnaj pro všechny věkové kategorie', '/src/assets/Tournaments/lacek.png', 1, '2026-03-01', NULL, 'completed'),
(22, 'Ostrava Taekwondo Challenge', 'Ostrava', 450, 1, '2026-06-07', '2026-06-08', 'Mezinárodní účast', '/src/assets/Tournaments/lacek.png', 3, '2026-04-01', NULL, 'uncompleted'),
(23, 'Summer Taekwondo Cup', 'Karlovy Vary', 350, 2, '2026-07-12', '2026-07-12', 'Letní soutěž', '/src/assets/Tournaments/lacek.png', 2, '2026-05-01', NULL, 'uncompleted'),
(24, 'Czech Junior Cup', 'Hradec Králové', 300, 2, '2026-08-20', '2026-08-20', 'Turnaj pro juniory', '/src/assets/Tournaments/lacek.png', 1, '2026-06-10', NULL, 'uncompleted'),
(25, 'Autumn Taekwondo Open', 'Zlín', 500, 1, '2026-09-18', '2026-09-19', 'Podzimní velký turnaj', '/src/assets/Tournaments/lacek.png', 3, '2026-07-01', NULL, 'completed'),
(26, 'Moravian Taekwondo League', 'Brno', 250, 2, '2026-10-10', '2026-10-10', 'Ligová soutěž', '/src/assets/Tournaments/lacek.png', 1, '2026-08-01', NULL, 'completed'),
(27, 'Winter Taekwondo Cup', 'Praha', 400, 1, '2026-11-25', '2026-11-30', 'Zimní turnajdwa', '/src/assets/Tournaments/lacek.png', 2, '2026-09-20', NULL, 'completed'),
(28, 'Students Taekwondo Cup', 'Pardubice', -1, 2, '2026-12-01', '2026-12-01', 'Studentská soutěž', '/src/assets/Tournaments/lacek.png', 1, '2026-04-09', NULL, 'completed'),
(29, '3 turnaj na 12.3', 'Humpolec', 123, 1, '2026-03-11', NULL, 'Tets 3 turnaje', '/uploads/tournaments/tournament-1774537625038-562906494.png', NULL, '2026-04-08', '96ug79l3747bbu2icfe0lqo5po', 'completed'),
(30, 'TetsTurnaje', 'IDK', 200, 1, '2026-04-14', '2026-04-16', 'awd', NULL, NULL, '2026-04-13', 'ppdijv652p17na75fm3bheun5g', 'completed'),
(32, 'TestTurnaje', 'TestTurnaje', 23, 1, '2026-04-09', NULL, 'TestTurnaje', '/uploads/tournaments/tournament-1775643891482-16223454.png', NULL, '2026-04-08', 'p9f4jjmq38jjo5314d7jvm2gk4', 'uncompleted'),
(34, 'UwUPiučoUwUPiučo', 'UwUPiučo', 5, 1, '2026-04-15', NULL, NULL, NULL, NULL, '2026-04-10', '82s89v3k003l9rcs5nl5an5l8s', 'uncompleted'),
(35, 'AAAA', 'AAAa', 3, 1, '2026-04-17', NULL, NULL, NULL, NULL, '2026-04-11', '6509k82cpshbp855qqkf26i0eo', 'completed'),
(36, 'VOLEVOLEawd', 'VOLEVOLEawd', 23, 1, '2026-04-10', '2026-04-15', 'VOLEVOLEwadawdawd', NULL, NULL, '2026-04-09', NULL, 'completed'),
(37, 'Nevím vole1232', 'Nevím vole1232', 20087, 1, '2026-04-09', '2026-04-12', 'Nevím vole1232', NULL, NULL, '2026-04-08', 'pc0e593e4hia405rm1gf3shprg', 'uncompleted'),
(38, 'Humpolec CUP 2026', 'Humpolec', 1500, 1, '2026-04-21', '2026-04-22', 'Humpoleckej CUP ', '/uploads/tournaments/tournament-1775646647552-494005044.png', NULL, '2026-04-20', 'c4595prcg37po19av010lbg6dc', 'completed'),
(40, 'Já nevim vole', 'Já nevim vole', 123, 2, '2026-04-08', NULL, 'Já nevim vole', '/uploads/tournaments/tournament-1775663765462-247421786.png', NULL, '2026-04-10', '0k1hoidnnfsufftplvhnl92kfg', 'uncompleted'),
(41, 'BUBU', 'BUBU', 500, 1, '2026-04-20', '2026-04-30', 'BUBU', NULL, NULL, '2026-04-10', 'i35rm13qvte6gdd989u6uhssh4', 'completed'),
(42, 'Huhawd', 'HUhawd', 200, 2, '2026-04-21', '2026-05-01', 'HUHwad', '/uploads/tournaments/tournament-1775669146435-216616511.png', NULL, '2026-04-11', 'onnqt1r8eb7dakpsan6hb7nq7o', 'completed'),
(43, 'xd', 'xd', 211, 2, '2026-04-13', '2026-04-19', 'awdawd', NULL, NULL, '2026-04-10', 're11pabqa2c5jcus80nhqi9lrs', 'completed');

-- --------------------------------------------------------

--
-- Struktura tabulky `tournament_registration`
--

CREATE TABLE `tournament_registration` (
  `id` int(11) NOT NULL,
  `fighter_id` int(11) DEFAULT NULL,
  `tournament_id` int(11) DEFAULT NULL,
  `note` varchar(255) DEFAULT NULL,
  `place` int(11) DEFAULT NULL,
  `status` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Vypisuji data pro tabulku `tournament_registration`
--

INSERT INTO `tournament_registration` (`id`, `fighter_id`, `tournament_id`, `note`, `place`, `status`) VALUES
(61, 1, 3, 'Dominant performance', 1, NULL),
(62, 1, 5, 'TKO victory', 1, NULL),
(63, 1, 7, 'Close fight', 2, NULL),
(64, 2, 2, 'Submission win', 1, NULL),
(65, 2, 4, 'Unanimous decision', 1, NULL),
(66, 2, 8, 'Tough final', 3, NULL),
(67, 3, 1, 'Knockout in round 1', 1, NULL),
(68, 3, 6, 'Split decision', 2, NULL),
(69, 3, 9, 'Technical submission', 1, NULL),
(70, 4, 2, 'Fast finish', 1, NULL),
(76, 6, 4, 'Quick submission', 1, NULL),
(77, 6, 8, 'Decision win', 1, NULL),
(78, 6, 13, 'Bronze match', 3, NULL),
(79, 7, 5, 'Round 2 KO', 1, NULL),
(80, 7, 9, 'Finalist', 2, NULL),
(81, 7, 14, 'Strong performance', 1, NULL),
(82, 8, 6, 'Unanimous decision', 1, NULL),
(84, 8, 15, 'Submission win', 1, NULL),
(86, 9, 11, 'Lost semifinal', 3, NULL),
(87, 9, 16, 'Dominant grappling', 1, NULL),
(88, 10, 8, 'Technical KO', 1, NULL),
(89, 10, 12, 'Final loss', 2, NULL),
(90, 10, 17, 'Strong comeback', 1, NULL),
(95, 12, 14, 'Close final', 2, NULL),
(96, 12, 19, 'Round 1 finish', 1, NULL),
(97, 13, 11, 'Fast armbar', 1, NULL),
(98, 13, 15, 'Semifinal loss', 3, NULL),
(99, 13, 20, 'Unstoppable run', 1, NULL),
(100, 14, 12, 'Dominant win', 1, NULL),
(101, 14, 16, 'Close match', 2, NULL),
(102, 14, 21, 'Submission finish', 1, NULL),
(104, 15, 17, 'Lost final', 2, NULL),
(109, 17, 15, 'Submission victory', 1, NULL),
(110, 17, 19, 'Bronze finish', 3, NULL),
(111, 17, 24, 'Dominant performance', 1, NULL),
(201, 3, 22, NULL, NULL, NULL),
(205, 3, 24, NULL, NULL, NULL),
(206, 3, 18, NULL, NULL, NULL),
(209, 3, 29, NULL, NULL, NULL),
(210, 3, 14, NULL, NULL, NULL),
(211, 3, 13, NULL, NULL, NULL),
(213, 15, 22, NULL, NULL, NULL),
(227, 15, 25, NULL, NULL, NULL),
(230, 15, 28, NULL, 12, NULL),
(233, 15, 27, NULL, NULL, NULL),
(235, 25, 28, NULL, NULL, NULL),
(241, 6, 24, NULL, 12, NULL),
(244, 7, 28, NULL, NULL, NULL),
(245, 24, 28, NULL, NULL, NULL);

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
(1, 'lacek.petr', 'admin', 'lacek.petr@seznam.cz', '721643937', 7, 4, 'rejected'),
(2, 'scrxtch123', '$2b$10$PqdAlP1vmnQpTMMvXSiHSOvlNgMgzZPSAOjNpNM9j7ftcsaD4iLnW', 'scrxtch@seznam.cz', '721642937', NULL, 2, 'approved'),
(10, 'admin', '$2b$10$2q.P/HApqlMkttjF2G.zmu7vmGw/7jdrZUKI2Igwlx2bwqfLOTfPS', 'peetr.svosboda@seznam.cz', '721 354 831', 22, 1, 'approved'),
(14, 'ufo361', '$2b$10$oANu4vfcsp6TcVja1J/bfutyFf.4Y8gHYTJf4Aq88VR3EwpAzvCze', NULL, NULL, NULL, 5, 'rejected'),
(22, 'trener', '$2b$10$0DBSwqJIXFtigCp83myB2.DoKJ5Ht8zG4g6SfZvjdwsRm9m1mvV8i', 'trener@seznam.cz', '123 456 789', 14, 2, 'approved'),
(26, 'testZadosti', '$2b$10$4BlJ9sY/AXcvAL7wqq7teOD9nksULNG3DyJh.aCWFJzdmPsRN9we.', 'tetszadosti@seznam.cz', NULL, NULL, 3, 'rejected'),
(33, 'foxic', '$2b$10$A66sGktH28rBro46Y2AFVeZshM3arTdUCa3TNhMdPHSIaW4qHSvZG', 'foxic@seznam.cz', '725 562 561', NULL, 2, 'approved'),
(37, 'uzivatel', '$2b$10$xxZuDXE2VVfI5NwcUkm4xePq9mxkbtAL671W3RD0ecyest5VirFOm', 'uzivatel@seznam.cz', '', 15, 3, 'approved'),
(39, 'testovaci', '$2b$10$CjgUTTKGeJSp5/6J2MOg5.6KvpSh6dtkvy80vgWvq9uW9rSUxAzVq', 'testovaci@seznam.cz', NULL, 6, 3, 'approved'),
(40, 'tester', '$2b$10$XwT8JnE2.qh0lmdIRBFuHeZpDzsGfnnbT1DepKm2Xlf9eK1bTL03S', 'tester@seznam.cz', NULL, 26, 3, 'approved'),
(41, 'test123', '$2b$10$0S1Uu2yaHF7/a6m.E816je6gL/fhTDxayXRz7HrGaPAlonyt1viBO', 'test123@seznam.cz', NULL, NULL, 3, 'approved'),
(42, 'novak30', '$2b$10$t9OPeHdGk03NKkSFLN3FdOQF66Oj/gBodFSOzIFXNXhSJr2Yjic6i', 'novak@seznma.cz', NULL, NULL, 2, 'approved'),
(43, 'testx', '$2b$10$dNR07usy5wHl1KlxogyD.eSA0kKrk/QurMGkPocvKWM/Yd2TMK852', 'testx@seznam.cz', '', 17, 3, 'approved');

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
  ADD KEY `exam_id` (`exam_id`),
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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT pro tabulku `event_photos`
--
ALTER TABLE `event_photos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT pro tabulku `exam`
--
ALTER TABLE `exam`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT pro tabulku `exam_registration`
--
ALTER TABLE `exam_registration`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

--
-- AUTO_INCREMENT pro tabulku `fighters`
--
ALTER TABLE `fighters`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;

--
-- AUTO_INCREMENT pro tabulku `role`
--
ALTER TABLE `role`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT pro tabulku `sponsors`
--
ALTER TABLE `sponsors`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT pro tabulku `subscriber_email`
--
ALTER TABLE `subscriber_email`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pro tabulku `tournament`
--
ALTER TABLE `tournament`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=44;

--
-- AUTO_INCREMENT pro tabulku `tournament_registration`
--
ALTER TABLE `tournament_registration`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=246;

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=44;

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
