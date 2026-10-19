-- ==============================================================================
-- ABDUL SAMI PORTFOLIO - LIVE DATABASE MIGRATION SCRIPT
-- Use this file to update your EXISTING LIVE database without deleting existing data.
-- Run this in phpMyAdmin -> Select your Database -> Go to SQL tab -> Paste & Execute.
-- ==============================================================================

-- 1. PORTFOLIO PROJECTS: Add Live Demo URL, Show Demo Toggle, and In Progress Status
ALTER TABLE `portfolio_projects` 
  ADD COLUMN IF NOT EXISTS `demo_url` VARCHAR(255) DEFAULT 'https://github.com/Abdul-Sami1122',
  ADD COLUMN IF NOT EXISTS `show_demo` TINYINT(1) DEFAULT 1,
  ADD COLUMN IF NOT EXISTS `is_in_progress` TINYINT(1) DEFAULT 0;

-- Optional: Update existing project 1 with Live Demo URL & In Progress status
UPDATE `portfolio_projects` 
SET 
  `demo_url` = 'https://suchi-chakki.vercel.app/',
  `show_demo` = 1,
  `is_in_progress` = 1
WHERE `id` = 1;


-- 2. PORTFOLIO ABOUT: Add Philosophy, Education Stats, and Experience Metrics
ALTER TABLE `portfolio_about`
  ADD COLUMN IF NOT EXISTS `philosophy` VARCHAR(255) DEFAULT 'Bridging software engineering precision with data-driven predictive modeling.',
  ADD COLUMN IF NOT EXISTS `degree` VARCHAR(150) DEFAULT 'B.S. Information Technology',
  ADD COLUMN IF NOT EXISTS `institution` VARCHAR(150) DEFAULT 'University of the Punjab',
  ADD COLUMN IF NOT EXISTS `years_exp` VARCHAR(50) DEFAULT '2+',
  ADD COLUMN IF NOT EXISTS `projects_completed` VARCHAR(50) DEFAULT '15+',
  ADD COLUMN IF NOT EXISTS `tech_mastered` VARCHAR(50) DEFAULT '20+',
  ADD COLUMN IF NOT EXISTS `highlights_json` TEXT DEFAULT NULL;

-- Seed default about highlights if NULL
UPDATE `portfolio_about`
SET 
  `philosophy` = IFNULL(`philosophy`, 'Bridging software engineering precision with data-driven predictive modeling.'),
  `degree` = IFNULL(`degree`, 'B.S. Information Technology'),
  `institution` = IFNULL(`institution`, 'University of the Punjab'),
  `years_exp` = IFNULL(`years_exp`, '2+'),
  `projects_completed` = IFNULL(`projects_completed`, '15+'),
  `tech_mastered` = IFNULL(`tech_mastered`, '20+'),
  `highlights_json` = IFNULL(`highlights_json`, '[
    {"title": "Decoupled Architecture", "desc": "Designing cleanly decoupled React frontends backed by custom, secure Core PHP and Node.js RESTful API endpoints."},
    {"title": "Mathematical AI Foundations", "desc": "Deriving custom loss functions, aligning tensor and matrix dimensions, and building deep multi-layer neural networks."},
    {"title": "End-to-End Execution", "desc": "From relational schema design in MySQL to cloud deployment and continuous monitoring across modern hosting stacks."}
  ]')
WHERE `id` = 1;


-- 3. PORTFOLIO HERO: Ensure Resume & CTA Link Fields Exist
ALTER TABLE `portfolio_hero`
  ADD COLUMN IF NOT EXISTS `resume_url` VARCHAR(500) DEFAULT '/resume_abdul_sami.pdf',
  ADD COLUMN IF NOT EXISTS `primary_cta_text` VARCHAR(100) DEFAULT 'Explore Work',
  ADD COLUMN IF NOT EXISTS `primary_cta_link` VARCHAR(255) DEFAULT '#projects',
  ADD COLUMN IF NOT EXISTS `secondary_cta_text` VARCHAR(100) DEFAULT 'Get In Touch',
  ADD COLUMN IF NOT EXISTS `secondary_cta_link` VARCHAR(255) DEFAULT '#contact';


-- 4. PORTFOLIO EXPERIENCES: Add Domain and Category
ALTER TABLE `portfolio_experiences`
  ADD COLUMN IF NOT EXISTS `domain` VARCHAR(100) NOT NULL DEFAULT 'Full-Stack Web',
  ADD COLUMN IF NOT EXISTS `category` VARCHAR(50) NOT NULL DEFAULT 'web';


-- 5. PORTFOLIO CERTIFICATIONS: Add Category Column
ALTER TABLE `portfolio_certifications`
  ADD COLUMN IF NOT EXISTS `category` VARCHAR(50) DEFAULT 'web';


-- 6. PORTFOLIO TESTIMONIALS: Create Table if it does not exist
CREATE TABLE IF NOT EXISTS `portfolio_testimonials` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(100) NOT NULL,
  `role` VARCHAR(150) NOT NULL,
  `company` VARCHAR(150) NOT NULL,
  `avatar` VARCHAR(255) NOT NULL,
  `rating` INT DEFAULT 5,
  `content` TEXT NOT NULL,
  `date` VARCHAR(50) DEFAULT NULL,
  `verified` TINYINT(1) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Seed default testimonials if table is empty
INSERT IGNORE INTO `portfolio_testimonials` (`id`, `name`, `role`, `company`, `avatar`, `rating`, `content`, `date`, `verified`) VALUES
(1, 'Sarah Jenkins', 'CTO at HealthTech AI Solutions', 'HealthTech AI (USA)', 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200', 5, 'Abdul Sami transformed our medical diagnostic workflow with a custom deep learning CNN model that achieved 98.4% accuracy. His ability to deliver production-ready full-stack applications with elegant UI is exceptional.', 'July 2026', 1),
(2, 'David Miller', 'VP of Product at CloudScale Commerce', 'CloudScale Inc (UK)', 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=200', 5, 'Working with Sami on our decoupled Core PHP & React e-commerce engine was a seamless experience. He optimized database queries, reducing response times by 65%. Highly recommended for complex full-stack web architecture!', 'June 2026', 1),
(3, 'Dr. Elena Rostova', 'Lead Data Scientist at Neural Analytics', 'Neural Analytics (Germany)', 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=200', 5, 'Sami''s expertise in PyTorch, Scikit-Learn, and Azure ML pipelines is top tier. He built a high-throughput time-series forecasting model that exceeded our benchmark standards.', 'May 2026', 1);

-- 7. MESSAGES TABLE (Contact Form Submissions)
CREATE TABLE IF NOT EXISTS `portfolio_messages` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(100) NOT NULL,
  `email` VARCHAR(150) NOT NULL,
  `subject` VARCHAR(255) NOT NULL,
  `message` TEXT NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `is_read` TINYINT(1) DEFAULT 0,
  `is_starred` TINYINT(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- 8. CLOUDINARY CDN: Widen URL columns to support long Cloudinary secure_url values
ALTER TABLE `portfolio_hero` MODIFY `profile_image` VARCHAR(1000) NOT NULL;
ALTER TABLE `portfolio_hero` MODIFY `resume_url` VARCHAR(1000) DEFAULT '/resume_abdul_sami.pdf';
ALTER TABLE `portfolio_projects` MODIFY `image` VARCHAR(1000) NOT NULL;
ALTER TABLE `portfolio_testimonials` MODIFY `avatar` VARCHAR(1000) NOT NULL;

-- 9. Fix existing project image: Replace localhost URL with Cloudinary CDN URL
UPDATE `portfolio_projects`
SET `image` = 'https://res.cloudinary.com/topin8es/image/upload/v1791374793/zna9bwh0wwfwcfhylktj.png'
WHERE `id` = 1 AND `image` LIKE '%localhost%';
