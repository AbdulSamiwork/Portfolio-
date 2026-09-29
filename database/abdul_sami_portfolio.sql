-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Sep 28, 2026 at 03:10 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `abdul_sami_portfolio`
--

-- --------------------------------------------------------

--
-- Table structure for table `portfolio_about`
--

CREATE TABLE `portfolio_about` (
  `id` int(11) NOT NULL DEFAULT 1,
  `section_title` varchar(255) NOT NULL,
  `section_subtitle` varchar(255) NOT NULL,
  `card_heading` varchar(255) NOT NULL,
  `paragraph1` text NOT NULL,
  `paragraph2` text NOT NULL,
  `paragraph3` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `portfolio_about`
--

INSERT INTO `portfolio_about` (`id`, `section_title`, `section_subtitle`, `card_heading`, `paragraph1`, `paragraph2`, `paragraph3`) VALUES
(1, 'Architecting the Fusion of Web & Artificial Intelligence', 'Bridging software engineering precision with data-driven predictive modeling.', 'Engineering Beyond the Surface', 'I am a Full-Stack Web Developer and Machine Learning Practitioner holding a B.S. in Information Technology from the University of the Punjab. My expertise lies at the intersection of modern software architecture and intelligent predictive algorithms.', 'On the web, I construct scalable applications using the MERN Stack (MongoDB, Express, React, Node.js) and Core PHP & MySQL. Whether correcting complex logical inversions in order-processing systems or designing decoupled React architectures, I focus on clean code and reliable performance.', 'In AI, I dive deep into mathematical foundations—deriving loss functions, optimizing matrix dimensions, and building custom Deep Neural Networks. Certified in Microsoft Azure AI-900, I build intelligent systems ready to integrate seamlessly into web environments.');

-- --------------------------------------------------------

--
-- Table structure for table `portfolio_certifications`
--

CREATE TABLE `portfolio_certifications` (
  `id` int(11) NOT NULL,
  `type` varchar(50) NOT NULL,
  `title` varchar(150) NOT NULL,
  `institution` varchar(150) NOT NULL,
  `period` varchar(50) NOT NULL,
  `badge` varchar(50) DEFAULT NULL,
  `category` varchar(50) DEFAULT 'web',
  `description` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `portfolio_experiences`
--

CREATE TABLE `portfolio_experiences` (
  `id` int(11) NOT NULL,
  `role` varchar(100) NOT NULL,
  `company` varchar(100) NOT NULL,
  `period` varchar(50) NOT NULL,
  `domain` varchar(100) NOT NULL,
  `category` varchar(50) NOT NULL,
  `achievements_json` text NOT NULL,
  `skills_json` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `portfolio_hero`
--

CREATE TABLE `portfolio_hero` (
  `id` int(11) NOT NULL DEFAULT 1,
  `name` varchar(100) NOT NULL,
  `title_tag` varchar(100) NOT NULL,
  `headline` varchar(255) NOT NULL,
  `bio` text NOT NULL,
  `profile_image` varchar(255) NOT NULL,
  `metric1_value` varchar(50) DEFAULT NULL,
  `metric1_label` varchar(50) DEFAULT NULL,
  `metric2_value` varchar(50) DEFAULT NULL,
  `metric2_label` varchar(50) DEFAULT NULL,
  `metric3_value` varchar(50) DEFAULT NULL,
  `metric3_label` varchar(50) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `phone` varchar(50) DEFAULT NULL,
  `location` varchar(100) DEFAULT NULL,
  `github_url` varchar(255) DEFAULT NULL,
  `linkedin_url` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `portfolio_hero`
--

INSERT INTO `portfolio_hero` (`id`, `name`, `title_tag`, `headline`, `bio`, `profile_image`, `metric1_value`, `metric1_label`, `metric2_value`, `metric2_label`, `metric3_value`, `metric3_label`, `email`, `phone`, `location`, `github_url`, `linkedin_url`) VALUES
(1, 'Abdul Sami', 'Full-Stack & AI Practitioner', 'Building Scalable Web Apps & Intelligent AI Systems', 'Hi, I\'m Abdul Sami. I design and develop high-performance web applications using the MERN stack & Core PHP, while engineering mathematical ML models and Deep Neural Networks to power next-generation digital products.', '/images/abdul_sami_profile.png', '92%', 'ML Model Accuracy', '10+', 'AI/DS Tasks Solved', 'MERN + PHP', 'Full-Stack Core', 'sb850839@gmail.com', '+92-3228483029', 'Pakistan (Available Worldwide Remote)', 'https://github.com/Abdul-Sami1122', 'https://linkedin.com/in/abdul-sami');

-- --------------------------------------------------------

--
-- Table structure for table `portfolio_projects`
--

CREATE TABLE `portfolio_projects` (
  `id` int(11) NOT NULL,
  `title` varchar(100) NOT NULL,
  `subtitle` varchar(150) NOT NULL,
  `category` varchar(50) NOT NULL,
  `category_badge` varchar(100) NOT NULL,
  `image` varchar(255) NOT NULL,
  `tech_json` text NOT NULL,
  `summary` text NOT NULL,
  `highlights_json` text NOT NULL,
  `github_url` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `portfolio_skills`
--

CREATE TABLE `portfolio_skills` (
  `id` int(11) NOT NULL,
  `category` varchar(50) NOT NULL,
  `name` varchar(100) NOT NULL,
  `level` varchar(50) NOT NULL,
  `description` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `role` varchar(20) DEFAULT 'admin',
  `auth_token` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `password_hash`, `role`, `auth_token`, `created_at`) VALUES
(1, 'admin', 'sb850839@gmail.com', '$2y$10$0SgnADVDcY.QebDMnHrO2eHLOzODHzmh23KdUuQpUIW0xPREiweeC', 'admin', NULL, '2026-09-25 12:42:30');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `portfolio_about`
--
ALTER TABLE `portfolio_about`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `portfolio_certifications`
--
ALTER TABLE `portfolio_certifications`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `portfolio_experiences`
--
ALTER TABLE `portfolio_experiences`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `portfolio_hero`
--
ALTER TABLE `portfolio_hero`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `portfolio_projects`
--
ALTER TABLE `portfolio_projects`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `portfolio_skills`
--
ALTER TABLE `portfolio_skills`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `portfolio_certifications`
--
ALTER TABLE `portfolio_certifications`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `portfolio_experiences`
--
ALTER TABLE `portfolio_experiences`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `portfolio_projects`
--
ALTER TABLE `portfolio_projects`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `portfolio_skills`
--
ALTER TABLE `portfolio_skills`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
