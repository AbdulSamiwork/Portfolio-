-- Abdul Sami Portfolio - Core PHP MySQL Schema
CREATE DATABASE IF NOT EXISTS `abdul_sami_portfolio` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `abdul_sami_portfolio`;

-- 1. Users Table (Admin Authentication & Authorization)
CREATE TABLE IF NOT EXISTS `users` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `username` VARCHAR(50) NOT NULL UNIQUE,
  `email` VARCHAR(100) NOT NULL UNIQUE,
  `password_hash` VARCHAR(255) NOT NULL,
  `role` VARCHAR(20) DEFAULT 'admin',
  `auth_token` VARCHAR(255) DEFAULT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Default Admin User (Username: admin, Password: Abdul@Sami$1122)
-- Hash generated via password_hash('Abdul@Sami$1122', PASSWORD_BCRYPT)
INSERT INTO `users` (`username`, `email`, `password_hash`, `role`) 
VALUES ('admin', 'sb850839@gmail.com', '$2y$10$ruf2DOlZvOhyOE5enesLGu9bYLEdussG2Cpm8Gkes0U/DK5.ELbtm', 'admin')
ON DUPLICATE KEY UPDATE `password_hash`='$2y$10$ruf2DOlZvOhyOE5enesLGu9bYLEdussG2Cpm8Gkes0U/DK5.ELbtm';

-- 2. Hero Section Table
CREATE TABLE IF NOT EXISTS `portfolio_hero` (
  `id` INT PRIMARY KEY DEFAULT 1,
  `name` VARCHAR(100) NOT NULL,
  `title_tag` VARCHAR(100) NOT NULL,
  `headline` VARCHAR(255) NOT NULL,
  `bio` TEXT NOT NULL,
  `profile_image` VARCHAR(1000) NOT NULL,
  `metric1_value` VARCHAR(50),
  `metric1_label` VARCHAR(50),
  `metric2_value` VARCHAR(50),
  `metric2_label` VARCHAR(50),
  `metric3_value` VARCHAR(50),
  `metric3_label` VARCHAR(50),
  `email` VARCHAR(100),
  `phone` VARCHAR(50),
  `location` VARCHAR(100),
  `github_url` VARCHAR(255),
  `linkedin_url` VARCHAR(255),
  `resume_url` VARCHAR(1000) DEFAULT '/resume_abdul_sami.pdf',
  `primary_cta_text` VARCHAR(100) DEFAULT 'Explore Work',
  `primary_cta_link` VARCHAR(255) DEFAULT '#projects',
  `secondary_cta_text` VARCHAR(100) DEFAULT 'Get In Touch',
  `secondary_cta_link` VARCHAR(255) DEFAULT '#contact'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Seed Hero Section
INSERT INTO `portfolio_hero` (`id`, `name`, `title_tag`, `headline`, `bio`, `profile_image`, `metric1_value`, `metric1_label`, `metric2_value`, `metric2_label`, `metric3_value`, `metric3_label`, `email`, `phone`, `location`, `github_url`, `linkedin_url`, `resume_url`, `primary_cta_text`, `primary_cta_link`, `secondary_cta_text`, `secondary_cta_link`)
VALUES (1, 'Abdul Sami', 'Full-Stack & AI Practitioner', 'Building Scalable Web Apps & Intelligent AI Systems', 'Hi, I''m Abdul Sami. I design and develop high-performance web applications using the MERN stack & Core PHP, while engineering mathematical ML models and Deep Neural Networks to power next-generation digital products.', '/images/abdul_sami_profile.png', '92%', 'ML Model Accuracy', '10+', 'AI/DS Tasks Solved', 'MERN + PHP', 'Full-Stack Core', 'sb850839@gmail.com', '+92-3228483029', 'Pakistan (Available Worldwide Remote)', 'https://github.com/Abdul-Sami1122', 'https://linkedin.com/in/abdul-sami', '/resume_abdul_sami.pdf', 'Explore Work', '#projects', 'Get In Touch', '#contact')
ON DUPLICATE KEY UPDATE `id`=`id`;

-- 3. About Section Table
CREATE TABLE IF NOT EXISTS `portfolio_about` (
  `id` INT PRIMARY KEY DEFAULT 1,
  `section_title` VARCHAR(255) NOT NULL,
  `section_subtitle` VARCHAR(255) NOT NULL,
  `card_heading` VARCHAR(255) NOT NULL,
  `paragraph1` TEXT NOT NULL,
  `paragraph2` TEXT NOT NULL,
  `paragraph3` TEXT NOT NULL,
  `philosophy` VARCHAR(255) DEFAULT '',
  `degree` VARCHAR(150) DEFAULT 'B.S. Information Technology',
  `institution` VARCHAR(150) DEFAULT 'University of the Punjab',
  `years_exp` VARCHAR(50) DEFAULT '2+',
  `projects_completed` VARCHAR(50) DEFAULT '15+',
  `tech_mastered` VARCHAR(50) DEFAULT '20+',
  `highlights_json` TEXT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Seed About Section
INSERT INTO `portfolio_about` (`id`, `section_title`, `section_subtitle`, `card_heading`, `paragraph1`, `paragraph2`, `paragraph3`, `philosophy`, `degree`, `institution`, `years_exp`, `projects_completed`, `tech_mastered`)
VALUES (1, 'Architecting the Fusion of Web & Artificial Intelligence', 'Bridging software engineering precision with data-driven predictive modeling.', 'Engineering Beyond the Surface', 'I am a Full-Stack Web Developer and Machine Learning Practitioner holding a B.S. in Information Technology from the University of the Punjab. My expertise lies at the intersection of modern software architecture and intelligent predictive algorithms.', 'On the web, I construct scalable applications using the MERN Stack (MongoDB, Express, React, Node.js) and Core PHP & MySQL. Whether correcting complex logical inversions in order-processing systems or designing decoupled React architectures, I focus on clean code and reliable performance.', 'In AI, I dive deep into mathematical foundations—deriving loss functions, optimizing matrix dimensions, and building custom Deep Neural Networks. Certified in Microsoft Azure AI-900, I build intelligent systems ready to integrate seamlessly into web environments.', 'Bridging software engineering precision with data-driven predictive modeling.', 'B.S. Information Technology', 'University of the Punjab', '2+', '15+', '20+')
ON DUPLICATE KEY UPDATE `id`=`id`;

-- 4. Skills Table
CREATE TABLE IF NOT EXISTS `portfolio_skills` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `category` VARCHAR(50) NOT NULL,
  `name` VARCHAR(100) NOT NULL,
  `level` VARCHAR(50) NOT NULL,
  `description` VARCHAR(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 5. Experiences Table
CREATE TABLE IF NOT EXISTS `portfolio_experiences` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `role` VARCHAR(100) NOT NULL,
  `company` VARCHAR(100) NOT NULL,
  `period` VARCHAR(50) NOT NULL,
  `domain` VARCHAR(100) NOT NULL,
  `category` VARCHAR(50) NOT NULL,
  `achievements_json` TEXT NOT NULL,
  `skills_json` TEXT NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 6. Projects Table
CREATE TABLE IF NOT EXISTS `portfolio_projects` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `title` VARCHAR(100) NOT NULL,
  `subtitle` VARCHAR(150) NOT NULL,
  `category` VARCHAR(50) NOT NULL,
  `category_badge` VARCHAR(100) NOT NULL,
  `image` VARCHAR(1000) NOT NULL,
  `tech_json` TEXT NOT NULL,
  `summary` TEXT NOT NULL,
  `highlights_json` TEXT NOT NULL,
  `github_url` VARCHAR(255) DEFAULT 'https://github.com/Abdul-Sami1122',
  `demo_url` VARCHAR(255) DEFAULT 'https://github.com/Abdul-Sami1122',
  `show_demo` TINYINT(1) DEFAULT 1,
  `is_in_progress` TINYINT(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 7. Certifications Table
CREATE TABLE IF NOT EXISTS `portfolio_certifications` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `type` VARCHAR(50) NOT NULL,
  `title` VARCHAR(150) NOT NULL,
  `institution` VARCHAR(150) NOT NULL,
  `period` VARCHAR(50) NOT NULL,
  `badge` VARCHAR(50) DEFAULT NULL,
  `category` VARCHAR(50) DEFAULT 'web',
  `description` TEXT NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 8. Messages Table
CREATE TABLE IF NOT EXISTS `portfolio_messages` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(100) NOT NULL,
  `email` VARCHAR(150) NOT NULL,
  `subject` VARCHAR(255) NOT NULL,
  `message` TEXT NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `is_read` TINYINT(1) DEFAULT 0,
  `is_starred` TINYINT(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 9. Testimonials Table
CREATE TABLE IF NOT EXISTS `portfolio_testimonials` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(100) NOT NULL,
  `role` VARCHAR(150) NOT NULL,
  `company` VARCHAR(150) NOT NULL,
  `avatar` VARCHAR(1000) NOT NULL,
  `rating` INT DEFAULT 5,
  `content` TEXT NOT NULL,
  `date` VARCHAR(50) DEFAULT NULL,
  `verified` TINYINT(1) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
