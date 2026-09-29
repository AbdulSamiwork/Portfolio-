-- ==========================================================
-- Abdul Sami Portfolio - Live Production Database Import Script
-- Target Database: if0_43031817_abdul_sami (InfinityFree MySQL)
-- Character Set: utf8mb4 / InnoDB
-- NOTE: Import directly into if0_43031817_abdul_sami in phpMyAdmin
-- ==========================================================

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

-- --------------------------------------------------------
-- 1. Users Table (Admin Authentication & Authorization)
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS `users` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `username` VARCHAR(50) NOT NULL UNIQUE,
  `email` VARCHAR(100) NOT NULL UNIQUE,
  `password_hash` VARCHAR(255) NOT NULL,
  `role` VARCHAR(20) DEFAULT 'admin',
  `auth_token` VARCHAR(255) DEFAULT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Admin Credentials: Username: admin, Password: Abdul@Sami$1122
INSERT INTO `users` (`username`, `email`, `password_hash`, `role`) 
VALUES ('admin', 'sb850839@gmail.com', '$2y$10$ruf2DOlZvOhyOE5enesLGu9bYLEdussG2Cpm8Gkes0U/DK5.ELbtm', 'admin')
ON DUPLICATE KEY UPDATE `password_hash`='$2y$10$ruf2DOlZvOhyOE5enesLGu9bYLEdussG2Cpm8Gkes0U/DK5.ELbtm';

-- --------------------------------------------------------
-- 2. Hero Section Table
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS `portfolio_hero` (
  `id` INT PRIMARY KEY DEFAULT 1,
  `name` VARCHAR(100) NOT NULL,
  `title_tag` VARCHAR(100) NOT NULL,
  `headline` VARCHAR(255) NOT NULL,
  `bio` TEXT NOT NULL,
  `profile_image` VARCHAR(255) NOT NULL,
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
  `resume_url` VARCHAR(500) DEFAULT '/resume_abdul_sami.pdf'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `portfolio_hero` (`id`, `name`, `title_tag`, `headline`, `bio`, `profile_image`, `metric1_value`, `metric1_label`, `metric2_value`, `metric2_label`, `metric3_value`, `metric3_label`, `email`, `phone`, `location`, `github_url`, `linkedin_url`, `resume_url`)
VALUES (1, 'Abdul Sami', 'Full-Stack & AI Practitioner', 'Building Scalable Web Apps & Intelligent AI Systems', 'Hi, I''m Abdul Sami. I design and develop high-performance web applications using the MERN stack & Core PHP, while engineering mathematical ML models and Deep Neural Networks to power next-generation digital products.', '/images/abdul_sami_profile.webp', '92%', 'ML Model Accuracy', '10+', 'AI/DS Tasks Solved', 'MERN + PHP', 'Full-Stack Core', 'sb850839@gmail.com', '+92-3228483029', 'Pakistan (Available Worldwide Remote)', 'https://github.com/Abdul-Sami1122', 'https://linkedin.com/in/abdul-sami', '/resume_abdul_sami.pdf')
ON DUPLICATE KEY UPDATE `id`=1;

-- --------------------------------------------------------
-- 3. About Section Table
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS `portfolio_about` (
  `id` INT PRIMARY KEY DEFAULT 1,
  `section_title` VARCHAR(255) NOT NULL,
  `section_subtitle` VARCHAR(255) NOT NULL,
  `card_heading` VARCHAR(255) NOT NULL,
  `paragraph1` TEXT NOT NULL,
  `paragraph2` TEXT NOT NULL,
  `paragraph3` TEXT NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `portfolio_about` (`id`, `section_title`, `section_subtitle`, `card_heading`, `paragraph1`, `paragraph2`, `paragraph3`)
VALUES (1, 'Architecting the Fusion of Web & Artificial Intelligence', 'Bridging software engineering precision with data-driven predictive modeling.', 'Engineering Beyond the Surface', 'I am a Full-Stack Web Developer and Machine Learning Practitioner holding a B.S. in Information Technology from the University of the Punjab. My expertise lies at the intersection of modern software architecture and intelligent predictive algorithms.', 'On the web, I construct scalable applications using the MERN Stack (MongoDB, Express, React, Node.js) and Core PHP & MySQL. Whether correcting complex logical inversions in order-processing systems or designing decoupled React architectures, I focus on clean code and reliable performance.', 'In AI, I dive deep into mathematical foundations—deriving loss functions, optimizing matrix dimensions, and building custom Deep Neural Networks. Certified in Microsoft Azure AI-900, I build intelligent systems ready to integrate seamlessly into web environments.')
ON DUPLICATE KEY UPDATE `id`=1;

-- --------------------------------------------------------
-- 4. Skills Table
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS `portfolio_skills` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `category` VARCHAR(50) NOT NULL,
  `name` VARCHAR(100) NOT NULL,
  `level` VARCHAR(50) NOT NULL,
  `description` VARCHAR(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `portfolio_skills` (`category`, `name`, `level`, `description`) VALUES
('web', 'React.js', 'Advanced', 'Component Architecture, Hooks, State Management'),
('web', 'Node.js & Express', 'Intermediate', 'REST APIs, Middleware, Backend Routing'),
('web', 'Core PHP', 'Advanced', 'Custom Backend Logic, Decoupled Architectures'),
('web', 'MySQL', 'Advanced', 'Relational Schema Design, Complex SQL Queries'),
('web', 'MongoDB', 'Intermediate', 'NoSQL Document Store, Aggregations'),
('web', 'HTML5 & CSS3', 'Advanced', 'Responsive UX, Glassmorphism, Animations'),
('ai', 'Python', 'Advanced', 'Custom Data Science Scripts, Algorithm Optimization'),
('ai', 'Deep Learning NNs', 'Advanced', 'Sequential Architectures, Loss Function Derivations'),
('ai', 'Scikit-Learn', 'Advanced', 'Binary Classification, Linear & Logistic Regression'),
('ai', 'NumPy & Pandas', 'Advanced', 'Matrix Dimensions, Feature Normalization, Wrangling'),
('ai', 'Microsoft Azure AI', 'Certified (AI-900)', 'Cloud ML, Vector Embeddings, Azure Studio'),
('ai', 'Matplotlib', 'Advanced', 'Loss Convergence Plots, Data Visualizations'),
('tools', 'Git & GitHub', 'Proficient', 'Version Control, Collaborative Repositories'),
('tools', 'Render', 'Proficient', 'Automated Web App & API Hosting'),
('tools', 'Vercel', 'Proficient', 'Frontend CI/CD & Serverless Deployment'),
('tools', 'Heroku', 'Proficient', 'Full-Stack PaaS Deployment'),
('tools', 'Jupyter Notebook', 'Advanced', 'Iterative Model Training & Analysis');

-- --------------------------------------------------------
-- 5. Experiences Table
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS `portfolio_experiences` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `role` VARCHAR(100) NOT NULL,
  `company` VARCHAR(100) NOT NULL,
  `period` VARCHAR(50) NOT NULL,
  `domain` VARCHAR(100) NOT NULL,
  `category` VARCHAR(50) NOT NULL,
  `achievements_json` TEXT NOT NULL,
  `skills_json` TEXT NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `portfolio_experiences` (`role`, `company`, `period`, `domain`, `category`, `achievements_json`, `skills_json`) VALUES
('Web Developer', 'Code3Byte / Independent Freelance', 'Jan 2026 – May 2026', 'Full-Stack Web Development', 'web', 
'[\"Diagnosed and corrected complex logical inversions in custom order-processing models, successfully resolving dynamic calculation bugs for undefined pickup weights versus known weights in standard shipping workflows.\", \"Configured and managed automated deployment pipelines for client web applications utilizing Render, Vercel, and Heroku, ensuring 99.9% uptime and zero-downtime releases.\", \"Built modular backend services in Core PHP & Node.js and dynamic React frontends, maintaining clean code architecture and optimized SQL database queries.\"]', 
'[\"React.js\", \"Core PHP\", \"MySQL\", \"Node.js\", \"Render\", \"Vercel\", \"Heroku\"]'),
('Machine Learning & AI Practitioner', 'Academic & Independent Data Science', 'Dec 2025 – Present', 'Machine Learning & Neural Networks', 'ai', 
'[\"Handled core mathematical optimization algorithms, custom loss function derivations, and matrix dimension alignment across 10+ end-to-end data science projects.\", \"Processed multi-feature regressions and built sequential Deep Learning Neural Networks using custom Python scripts and Jupyter Notebooks.\", \"Selected participant in Microsoft AI Skill 2026, continuously refining expertise in vector embeddings, neural network hyperparameter tuning, and Azure AI cloud workflows.\"]', 
'[\"Python\", \"Scikit-Learn\", \"Deep Neural Networks\", \"Microsoft Azure AI\", \"NumPy\", \"Pandas\", \"Matplotlib\"]');

-- --------------------------------------------------------
-- 6. Projects Table
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS `portfolio_projects` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `title` VARCHAR(100) NOT NULL,
  `subtitle` VARCHAR(150) NOT NULL,
  `category` VARCHAR(50) NOT NULL,
  `category_badge` VARCHAR(100) NOT NULL,
  `image` VARCHAR(255) NOT NULL,
  `tech_json` TEXT NOT NULL,
  `summary` TEXT NOT NULL,
  `highlights_json` TEXT NOT NULL,
  `github_url` VARCHAR(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicodeINSERT INTO `portfolio_projects` (`title`, `subtitle`, `category`, `category_badge`, `image`, `tech_json`, `summary`, `highlights_json`, `github_url`) VALUES
('Gristmill Management System', 'Decoupled Enterprise Management System', 'web', 'Full-Stack Web App', '/images/project_gristmill.webp', 
('[\"React.js\", \"Core PHP\", \"MySQL\", \"RESTful API\", \"CSS3\"]'), 
'Designed and executed a web-based enterprise management system utilizing a decoupled React frontend and Core PHP backend architecture.', 
'[\"Decoupled architecture separating client-side state from backend data operations.\", \"High-performance React interface communicating asynchronously with custom Core PHP endpoints.\", \"Complex data management for inventory, workflow tracking, and record keeping backed by MySQL.\"]', 
'https://github.com/Abdul-Sami1122'),
('Underpure E-Commerce Platform', 'Apparel E-Commerce Web Application', 'web', 'Full-Stack E-Commerce', '/images/project_underpure.webp', 
'[\"React.js\", \"Core PHP\", \"MySQL\", \"API Integration\", \"Responsive Design\"]', 
'Developed a modern web application for women''s apparel with a responsive React frontend and backend API integrations utilizing Core PHP and MySQL.', 
'[\"Intuitive, mobile-first React shopping UI with dynamic product filtering and cart state management.\", \"Custom Core PHP API backend handling order creation, inventory sync, and secure payloads.\", \"Optimized MySQL queries for fast catalog rendering and payload transmission.\"]', 
'https://github.com/Abdul-Sami1122'),
('Heart Attack Prediction System', '92% Accurate Diagnostic Neural Network', 'ai', 'AI & Deep Learning', '/images/project_heart_attack.webp', 
'[\"Python\", \"Scikit-Learn\", \"Deep Neural Networks\", \"Pandas\", \"NumPy\"]', 
'Engineered a binary classification predictive model achieving 92% accuracy, successfully re-implementing the architecture using Deep Learning Neural Networks.', 
'[\"Achieved 92% classification accuracy on multidimensional cardiovascular patient indicators.\", \"Re-architected traditional ML baseline into a custom multi-layer Deep Neural Network.\", \"Rigorous normalization, feature scaling, and model evaluation metrics (ROC-AUC, Precision, Recall).\"]', 
'https://github.com/Abdul-Sami1122'),
('Height Prediction Model', 'Linear Regression & Deep Neural Network Comparison', 'ai', 'Data Science & Neural Networks', '/images/project_height_prediction.webp',.png', 
'[\"Python\", \"NumPy\", \"Pandas\", \"Matplotlib\", \"Scikit-Learn\", \"Deep Learning\"]', 
'Built a linear regression predictive model and re-implemented it using Deep Learning Neural Networks for comprehensive accuracy comparison.', 
'[\"Developed multi-feature linear regression model to predict physical height metrics.\", \"Re-implemented neural network architecture to evaluate non-linear feature transformation vs linear baseline.\", \"Visualized loss convergence curves across training epochs using custom Matplotlib scripts.\"]', 
'https://github.com/Abdul-Sami1122');

-- --------------------------------------------------------
-- 7. Certifications Table
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS `portfolio_certifications` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `type` VARCHAR(50) NOT NULL,
  `title` VARCHAR(150) NOT NULL,
  `institution` VARCHAR(150) NOT NULL,
  `period` VARCHAR(50) NOT NULL,
  `badge` VARCHAR(50) DEFAULT NULL,
  `category` VARCHAR(50) DEFAULT 'web',
  `description` TEXT NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `portfolio_certifications` (`type`, `title`, `institution`, `period`, `badge`, `category`, `description`) VALUES
('degree', 'B.S. Information Technology', 'University of the Punjab', 'Dec 2022 – Nov 2026', 'Graduate', 'web', 'Core degree foundation covering software engineering, algorithms, database management systems, web technologies, and computational mathematics.'),
('certification', 'Tevta Microsoft Azure AI-900 (Batch-2)', 'Microsoft Azure AI Credential Track', 'Feb 2026 – May 2026', 'Azure AI Certified', 'ai', 'Hands-on qualification in Cloud AI infrastructure, Azure ML Studio, vector embeddings, Computer Vision, and NLP workloads.'),
('certification', 'NAVTTC Full Stack Web Development (MERN)', 'National Vocational and Technical Training Commission', 'March 2025 – June 2025', 'MERN Certified', 'web', 'Specialized full-stack track covering MongoDB schema architecture, Express.js API design, React.js UI state management, and Node.js servers.');

-- --------------------------------------------------------
-- 8. Messages Table (Contact Us Submissions)
-- --------------------------------------------------------
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

INSERT INTO `portfolio_messages` (`name`, `email`, `subject`, `message`, `created_at`, `is_read`, `is_starred`) VALUES
('Sarah Jenkins', 'sarah.j@techrecruiter.com', 'Full-Stack Web & AI Engineer Role Inquiry', 'Hi Abdul Sami, I saw your portfolio project on Decoupled React + Core PHP and the 92% accurate Neural Network. We have an open Senior Full-Stack role and would love to connect!', NOW(), 0, 1),
('David Chen', 'david@startupstudio.io', 'Freelance E-Commerce API & ML Consulting', 'Hey Abdul! Great portfolio. Are you available for freelance consulting on a MERN + PyTorch project?', NOW(), 0, 0);

-- --------------------------------------------------------
-- 9. Testimonials Table
-- --------------------------------------------------------
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

INSERT INTO `portfolio_testimonials` (`name`, `role`, `company`, `avatar`, `rating`, `content`, `date`, `verified`) VALUES
('Sarah Jenkins', 'CTO at HealthTech AI Solutions', 'HealthTech AI (USA)', 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200', 5, 'Abdul Sami transformed our medical diagnostic workflow with a custom deep learning CNN model that achieved 98.4% accuracy. His ability to deliver production-ready full-stack applications with elegant UI is exceptional.', 'July 2026', 1),
('David Miller', 'VP of Product at CloudScale Commerce', 'CloudScale Inc (UK)', 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=200', 5, 'Working with Sami on our decoupled Core PHP & React e-commerce engine was a seamless experience. He optimized database queries, reducing response times by 65%. Highly recommended for complex full-stack web architecture!', 'June 2026', 1),
('Dr. Elena Rostova', 'Lead Data Scientist at Neural Analytics', 'Neural Analytics (Germany)', 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=200', 5, 'Sami''s expertise in PyTorch, Scikit-Learn, and Azure ML pipelines is top tier. He built a high-throughput time-series forecasting model that exceeded our benchmark standards.', 'May 2026', 1);
