-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Počítač: 127.0.0.1
-- Vytvořeno: Sob 15. bře 2025, 17:13
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
-- Databáze: `lacektkd`
--

-- --------------------------------------------------------

--
-- Struktura tabulky `belt`
--

CREATE TABLE `belt` (
  `ID` int(11) NOT NULL,
  `czech_name` varchar(255) NOT NULL,
  `korean_name` varchar(255) NOT NULL,
  `cup` varchar(255) NOT NULL,
  `price` varchar(255) NOT NULL,
  `img_path` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Vypisuji data pro tabulku `belt`
--

INSERT INTO `belt` (`ID`, `czech_name`, `korean_name`, `cup`, `price`, `img_path`) VALUES
(1, 'Žlutý pásek', 'Chon-Ji', '8th CUP', '250', '../src/assets/Belts/blt_yellow.gif'),
(2, 'Zelený pásek', 'Dan-Gun', ' 6th CUP', '350', '../src/assets/Belts/blt_green.gif'),
(3, 'Modrý pásek', 'Do-San', '4th CUP', '450', '../src/assets/Belts/blt_blue.gif'),
(4, 'Červený pásek', 'Won-Hyo', '2th CUP', '550', '../src/assets/Belts/blt_red.gif'),
(5, 'Žlutý pásek', 'Chon-Ji', '8th CUP', '250', '../src/assets/Belts/blt_yellow.gif'),
(6, 'Zelený pásek', 'Dan-Gun', ' 6th CUP', '350', '../src/assets/Belts/blt_green.gif'),
(7, 'Modrý pásek', 'Do-San', '4th CUP', '450', '../src/assets/Belts/blt_blue.gif'),
(8, 'Červený pásek', 'Won-Hyo', '2th CUP', '550', '../src/assets/Belts/blt_red.gif'),
(9, 'Černý pásek - 1. DAN', 'Choong-Moo', '1th DAN', '1000', '../src/assets/Belts/blt_black_1.gif'),
(10, 'Černý pásek - 2. DAN', 'Kwang-Gae', '2th DAN', '2000', '../src/assets/Belts/blt_black_2.gif');

-- --------------------------------------------------------

--
-- Struktura tabulky `coach`
--

CREATE TABLE `coach` (
  `ID` int(11) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `belt` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone_number` varchar(255) NOT NULL,
  `img_path` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Vypisuji data pro tabulku `coach`
--

INSERT INTO `coach` (`ID`, `first_name`, `last_name`, `belt`, `email`, `phone_number`, `img_path`) VALUES
(1, 'Petr', 'Lacek', '5. DAN', 'lecaf@seznam.cz', '724209910', '/src/assets/Fighters/lacek_petr.jpg  '),
(2, 'Matěj', 'Kaman', '3.DAN', 'kaman.matej@seznam.cz', '725234097', '/src/assets/Fighters/kaman_matej.jpg'),
(3, 'Marek', 'Šmarda', '2.DAN', 'smarda.marek@seznam.cz', '721642937', '/src/assets/Fighters/smarda_marek.jpg  ');

-- --------------------------------------------------------

--
-- Struktura tabulky `fighters`
--

CREATE TABLE `fighters` (
  `ID` int(11) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `belt` varchar(255) NOT NULL,
  `login` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` varchar(255) NOT NULL,
  `active_user` tinyint(1) NOT NULL,
  `best_of` tinyint(1) NOT NULL,
  `legend` tinyint(1) NOT NULL,
  `profile_pic_path` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Vypisuji data pro tabulku `fighters`
--

INSERT INTO `fighters` (`ID`, `first_name`, `last_name`, `belt`, `login`, `password`, `role`, `active_user`, `best_of`, `legend`, `profile_pic_path`) VALUES
(1, 'Josef ', 'Med', '3.DAN', 'med_josef', 'test', '1', 1, 1, 1, '/src/assets/Fighters/med_josef.jpg'),
(2, 'Matěj', 'Kaman', '3.DAN', 'kaman_matej', 'test1', '2', 1, 0, 1, '/src/assets/Fighters/kaman_matej.jpg'),
(3, 'Adéla', 'Pejcalová', '2.DAN', 'pejcalova_adela', 'test2', '1', 1, 1, 0, '/src/assets/Fighters/pejcalova_adela.jpg  '),
(4, 'Alice', 'Bínová', '2.DAN', 'binova_alice', 'test3', '1', 1, 0, 1, '/src/assets/Fighters/binova_alice.jpg  '),
(5, 'Dominika', 'Hronová', '2.DAN', 'hronova_dominika', 'test4', '1', 1, 0, 1, '/src/assets/Fighters/hronova_dominika.jpg  '),
(6, 'Iveta ', 'Jiránková', '2.DAN', 'jirankova_iveta', 'test5', '1', 1, 1, 1, '/src/assets/Fighters/jirankova_iveta.jpg  '),
(7, 'Jiří', 'Šťastný', '2.DAN', 'stastny_jiri', 'test6', '1', 1, 1, 0, '/src/assets/Fighters/stastny_jiri.jpg  '),
(8, 'Marek', 'Šmarda', '2.DAN', 'smarda_marek', 'test7', '2', 1, 1, 1, '/src/assets/Fighters/smarda_marek.jpg  '),
(9, 'Petr', 'Hostička', '2.DAN', 'hosticka_petr', 'test8', '1', 1, 0, 0, '/src/assets/Fighters/hosticka_petr.jpg  '),
(10, 'Alea Lin', 'Mocek', '1.DAN', 'mocek_alealin', 'test9', '1', 1, 0, 0, '/src/assets/Fighters/mocek_alea_lin.jpg  '),
(11, 'Anna', 'Špinarová', '1.DAN', 'spinarova_anna', 'test10', '1', 1, 0, 1, '/src/assets/Fighters/spinarova_anna.jpg  '),
(12, 'Natálie ', 'Šikýřová', '1.DAN', 'sikyrova_natalie', 'test11', '1', 1, 1, 1, '/src/assets/Fighters/sikyrova_natalie.jpg  '),
(13, 'Pavla', 'Brambůrková', '1.DAN', 'bramburkova_pavla', 'test12', '1', 1, 1, 0, '/src/assets/Fighters/bramburkova_pavla.jpg  '),
(14, 'Tereza', 'Urbánková', '1.DAN', 'urbankova_tereza', 'test13', '1', 1, 0, 1, '/src/assets/Fighters/urbankova_tereza.jpg  '),
(15, 'Tomáš', 'Neshyba', '1.DAN', 'neshyba_tomas', 'test14', '1', 1, 0, 0, '/src/assets/Fighters/neshyba_tomas.jpg  '),
(16, 'Viktorie', 'Maršáková', '1.DAN', 'marsakova_viktorie', 'test15', '1', 1, 0, 1, '/src/assets/Fighters/marsakova_viktorie.jpg  '),
(17, 'Zuzana', 'Válková', '1.DAN', 'valkova_zuzana', 'test16', '1', 1, 1, 0, '/src/assets/Fighters/valkova_zuzana.jpg  '),
(18, 'Aleš Lin', 'Mocek', '2. CUP', 'mocek_aleslin', 'test17', '1', 1, 1, 0, '/src/assets/Fighters/mocek_ales_lin.jpg  '),
(19, 'Michal', 'Pohan', '2. CUP', 'pohan_michal', 'test18', '1', 1, 1, 0, '/src/assets/Fighters/pohan_michal.jpg  '),
(20, 'Nicolas', 'Tarljovski', '2. CUP', 'tarljovski_nicolas', 'test19', '1', 1, 1, 0, '/src/assets/Fighters/tarjovskij_nicolas.jpg');

-- --------------------------------------------------------

--
-- Struktura tabulky `news`
--

CREATE TABLE `news` (
  `ID` int(11) NOT NULL,
  `news_name` varchar(255) NOT NULL,
  `date_start` date NOT NULL,
  `date_end` date NOT NULL,
  `text` varchar(255) NOT NULL,
  `img_path` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Vypisuji data pro tabulku `news`
--

INSERT INTO `news` (`ID`, `news_name`, `date_start`, `date_end`, `text`, `img_path`) VALUES
(1, 'Bratislava OPEN', '2025-03-16', '2025-03-18', 'AAA', '/src/assets/Events/BT_open.jpg'),
(2, 'Czech OPEN', '2025-03-18', '2025-03-22', 'BBB', '/src/assets/Events/BT_open2.jpg'),
(3, 'Dutch open G2', '2025-04-01', '2025-04-03', 'CCC', '/src/assets/Events/BT_open3.webp');

-- --------------------------------------------------------

--
-- Struktura tabulky `tournaments`
--

CREATE TABLE `tournaments` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `location` varchar(255) NOT NULL,
  `price` int(255) NOT NULL,
  `type` varchar(255) NOT NULL,
  `date_start` date NOT NULL,
  `date_end` date NOT NULL,
  `info` text NOT NULL,
  `pic` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Vypisuji data pro tabulku `tournaments`
--

INSERT INTO `tournaments` (`id`, `name`, `location`, `price`, `type`, `date_start`, `date_end`, `info`, `pic`) VALUES
(1, 'Czech Taekwondo Open', 'Praha', 500, 'turnaj', '2025-05-10', '2025-05-12', 'Prestižní turnaj s účastí zahraničních závodníků.', ''),
(2, 'Brno Championship', 'Brno', 300, 'turnaj', '2025-06-15', '2025-06-16', 'Mistrovství ČR v taekwondo.', ''),
(3, 'Prague Masters', 'Praha', 700, 'turnaj', '2025-07-20', '2025-07-22', 'Turnaj s vysokými cenami a top závodníky.', ''),
(4, 'Winter Taekwondo Clash', 'Ostrava', 250, 'turnaj', '2025-12-05', '2025-12-06', 'Zimní turnaj pro všechny úrovně.', ''),
(5, 'Summer Taekwondo Camp', 'Bratislava', 600, 'soustředění', '2025-08-15', '2025-08-17', 'Letní soustředění pro juniory i dospělé.', ''),
(6, 'European Taekwondo Cup', 'Vídeň', 900, 'turnaj', '2025-09-10', '2025-09-12', 'Jedna z největších soutěží v Evropě.', ''),
(7, 'Online Taekwondo Challenge', 'Online', 400, 'turnaj', '2025-04-20', '2025-04-21', 'Virtuální turnaj s online přenosy.', ''),
(8, 'National Finals', 'Brno', 550, 'turnaj', '2025-10-30', '2025-11-01', 'Finále celoroční ligy v ČR.', ''),
(9, 'Youth Taekwondo Camp', 'Plzeň', 200, 'soustředění', '2025-03-25', '2025-03-25', 'Soustředění zaměřené na mladé naděje.', ''),
(10, 'Final Showdown', 'Praha', 1000, 'turnaj', '2025-11-20', '2025-11-22', 'Vrchol sezóny pro nejlepší závodníky.', '');

--
-- Indexy pro exportované tabulky
--

--
-- Indexy pro tabulku `belt`
--
ALTER TABLE `belt`
  ADD PRIMARY KEY (`ID`);

--
-- Indexy pro tabulku `coach`
--
ALTER TABLE `coach`
  ADD PRIMARY KEY (`ID`);

--
-- Indexy pro tabulku `fighters`
--
ALTER TABLE `fighters`
  ADD PRIMARY KEY (`ID`);

--
-- Indexy pro tabulku `news`
--
ALTER TABLE `news`
  ADD PRIMARY KEY (`ID`);

--
-- Indexy pro tabulku `tournaments`
--
ALTER TABLE `tournaments`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pro tabulky
--

--
-- AUTO_INCREMENT pro tabulku `belt`
--
ALTER TABLE `belt`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT pro tabulku `coach`
--
ALTER TABLE `coach`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT pro tabulku `fighters`
--
ALTER TABLE `fighters`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT pro tabulku `news`
--
ALTER TABLE `news`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT pro tabulku `tournaments`
--
ALTER TABLE `tournaments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
