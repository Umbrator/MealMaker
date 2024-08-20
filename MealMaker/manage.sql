-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 31, 2024 at 09:58 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `manage`
--

-- --------------------------------------------------------

--
-- Table structure for table `comments`
--

CREATE TABLE `comments` (
  `idComment` int(11) NOT NULL,
  `body` varchar(300) NOT NULL,
  `idRecipe` int(11) NOT NULL,
  `idUser` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `comments`
--

INSERT INTO `comments` (`idComment`, `body`, `idRecipe`, `idUser`) VALUES
(1, 'i really like this cake', 6, 9),
(2, 'I will try this one', 6, 10),
(3, 'it looks so good', 7, 10),
(4, 'Sounds good', 6, 11),
(5, 'i have to try it', 7, 11),
(6, 'Needs a lot of chocolate ', 8, 11),
(7, 'Needs A lot of effors', 6, 12),
(8, 'Not my type', 7, 12),
(9, 'I like it', 8, 12),
(10, 'it looks so dark', 9, 12),
(11, 'HHHHH', 6, 15);

-- --------------------------------------------------------

--
-- Table structure for table `rate`
--

CREATE TABLE `rate` (
  `idRate` int(11) NOT NULL,
  `value` int(11) NOT NULL,
  `idUser` int(11) NOT NULL,
  `idRecipe` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `rate`
--

INSERT INTO `rate` (`idRate`, `value`, `idUser`, `idRecipe`) VALUES
(1, 3, 9, 7),
(2, 4, 9, 6),
(3, 3, 8, 6);

-- --------------------------------------------------------

--
-- Table structure for table `recipes`
--

CREATE TABLE `recipes` (
  `recipeID` int(11) NOT NULL,
  `nom` varchar(30) NOT NULL,
  `steps` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`steps`)),
  `cookingTime` varchar(30) NOT NULL,
  `ingredient` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`ingredient`)),
  `img` varchar(100) NOT NULL,
  `userID` int(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `recipes`
--

INSERT INTO `recipes` (`recipeID`, `nom`, `steps`, `cookingTime`, `ingredient`, `img`, `userID`) VALUES
(6, 'Chocolate Cake', '\"{\\\"1\\\":\\\"Mix chocolate and milk\\\",\\\"2\\\":\\\"add sugar\\\",\\\"3\\\":\\\"put it in the fridge for 1 houre\\\"}\"', '90', '\"{\\\"1\\\":\\\"Black Chocolate\\\",\\\"2\\\":\\\"Milk\\\",\\\"3\\\":\\\"Sugar\\\"}\"', 'Best-Birthday-Cake-with-milk-chocolate-buttercream-SQUARE.webp', 8),
(7, 'White Cake', '\"{\\\"1\\\":\\\"Mix flower and milk\\\",\\\"2\\\":\\\"Add vanney\\\",\\\"3\\\":\\\"50 min in microwave\\\"}\"', '50', '\"{\\\"1\\\":\\\"Flower\\\",\\\"2\\\":\\\"Milk\\\",\\\"3\\\":\\\"Vanney\\\"}\"', 'CC0A7012-scaled.jpg', 9),
(8, 'Night Cake', '\"{\\\"1\\\":\\\"500g of chocolate with milk\\\",\\\"2\\\":\\\"Add 3 eggs\\\",\\\"3\\\":\\\"Add Flower\\\"}\"', '90', '\"{\\\"1\\\":\\\"3 Eggs\\\",\\\"2\\\":\\\"500g chocolate\\\",\\\"3\\\":\\\"Flower\\\",\\\"4\\\":\\\"Milk\\\"}\"', 'CHOCOLATE-CAKE-400x300.jpg', 10),
(9, 'Black Meal', '\"{\\\"1\\\":\\\"Mixt chocolate and milk\\\",\\\"2\\\":\\\"Add Flower\\\",\\\"3\\\":\\\"Add sugar\\\",\\\"4\\\":\\\"50min in fridge\\\"}\"', '100', '\"{\\\"1\\\":\\\"Chocolate\\\",\\\"2\\\":\\\"Milk\\\",\\\"3\\\":\\\"Flower\\\",\\\"4\\\":\\\"Sugar\\\"}\"', 'best-chocolate-cake-recipe-from-scratch-8.jpg', 11),
(10, 'Light meal', '\"{\\\"1\\\":\\\"Milk and flower\\\",\\\"2\\\":\\\"3 Eggs\\\",\\\"3\\\":\\\"1 hour in microwave\\\"}\"', '30', '\"{\\\"1\\\":\\\"Flower\\\",\\\"2\\\":\\\"Milk\\\",\\\"3\\\":\\\"Eggs\\\"}\"', 'Sage-green-and-pink-palette-knife-cake-The-Cake-Eating-Co-Christchurch-1.jpg', 12),
(11, 'New cake', '\"{\\\"1\\\":\\\"step 1\\\",\\\"2\\\":\\\"step 2\\\",\\\"3\\\":\\\"step 3\\\"}\"', '300', '\"{\\\"1\\\":\\\"ing 1\\\",\\\"2\\\":\\\"ing 2\\\",\\\"3\\\":\\\"ing 3\\\"}\"', 'CC0A7012-scaled.jpg', 8);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `code` int(11) NOT NULL,
  `nom` varchar(10) NOT NULL,
  `prenom` varchar(30) NOT NULL,
  `telephone` varchar(15) NOT NULL,
  `email` varchar(30) NOT NULL,
  `password` varchar(70) NOT NULL,
  `role` varchar(20) NOT NULL,
  `img` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`code`, `nom`, `prenom`, `telephone`, `email`, `password`, `role`, `img`) VALUES
(8, 'Argane', 'Mohamed', '+212 693423633', 'mohamed@gmail.com', '$2b$10$V4Hhe.uBhJ/VYw6/uFLgZe05mV1pt8SydnAUuAGOOQB28cUBaV2hS', 'admin', 'Screenshot 2023-12-05 230756.png'),
(9, 'Allaoui', 'Anass', '+212 669547823', 'anass@gmail.com', '$2b$10$Me719F/3RRjOxicsm/A8DOXbU1GIKN83s9YM9Yq1T0f1tdzMYUwya', 'user', 'anass.webp'),
(10, 'Saadaoui', 'Houda', '+212 689541235', 'houda@gmail.com', '$2b$10$rvNIDzHYI5B8umJ2lqtgjOZE5t1uPXGECAzdckUQS5suPaw4VwUJ.', 'user', 'Houda.jpg'),
(11, 'Benani', 'Mehdi', '+212 745821369', 'mehdi@gmail.com', '$2b$10$wTOfAapUYJRHa9BpD/rMTeFXX7SbEb9LOBeid61uvvjXMwuXK6LoO', 'user', 'Mehdi.jpg'),
(12, 'Hemdaoui', 'Yassmine', '+212 798541236', 'yass_min@gmail.com', '$2b$10$uKYqhYDZW.iFq.91oGzYx.p36Lg9hI.c/3vzk.cK9c4HAbm0DhfWW', 'user', 'yassmine.png'),
(13, 'Choukri', 'Salma', '+212 636251478', 'queen@gmail.com', '$2b$10$dCrUOcZ9bUwOghMITNVH4eoH9rP1SaRufQHUDR0jAXbGrJoDTMJi6', 'user', 'salma.png'),
(14, 'Berrada', 'Yassine', '+212 698741256', 'yass@gmail.com', '$2b$10$EV9OLj1pMq2IbNIrGma9GeYu6I9HcQ.AX6sD0mKxSJOC/LLeSRRiG', 'user', 'yassine.jpg'),
(15, 'Ennachoum', 'Zakaria', '+212693423633', 'zakaria@gmail.com', '$2b$10$MoTN1lZD2/mc0onBGZDk.eEOW6kmh7lMMZ6ViCcgZn.BAZM9nLQ6C', 'user', 'anass.webp');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`idComment`),
  ADD KEY `idRecipe` (`idRecipe`),
  ADD KEY `idUser` (`idUser`);

--
-- Indexes for table `rate`
--
ALTER TABLE `rate`
  ADD PRIMARY KEY (`idRate`),
  ADD KEY `idUser` (`idUser`),
  ADD KEY `idRecipe` (`idRecipe`);

--
-- Indexes for table `recipes`
--
ALTER TABLE `recipes`
  ADD PRIMARY KEY (`recipeID`),
  ADD KEY `userID` (`userID`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`code`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `comments`
--
ALTER TABLE `comments`
  MODIFY `idComment` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `rate`
--
ALTER TABLE `rate`
  MODIFY `idRate` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `recipes`
--
ALTER TABLE `recipes`
  MODIFY `recipeID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `code` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `comments`
--
ALTER TABLE `comments`
  ADD CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`idUser`) REFERENCES `users` (`code`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`idRecipe`) REFERENCES `recipes` (`recipeID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `rate`
--
ALTER TABLE `rate`
  ADD CONSTRAINT `rate_ibfk_1` FOREIGN KEY (`idRecipe`) REFERENCES `recipes` (`recipeID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `rate_ibfk_2` FOREIGN KEY (`idUser`) REFERENCES `users` (`code`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `recipes`
--
ALTER TABLE `recipes`
  ADD CONSTRAINT `recipes_ibfk_1` FOREIGN KEY (`userID`) REFERENCES `users` (`code`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
