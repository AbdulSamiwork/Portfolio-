<?php
require_once __DIR__ . '/../../core/Database.php';
require_once __DIR__ . '/../../core/Response.php';
require_once __DIR__ . '/../../core/AuthMiddleware.php';

class HeroController {
    public static function update() {
        $adminUser = AuthMiddleware::verifyAdmin();
        $data = Response::getJsonInput();

        if (empty($data)) {
            Response::error("Invalid or empty JSON payload.");
        }

        $db = Database::getInstance();
        if (!$db) {
            Response::error("Database connection unavailable.", 500);
        }

        try {
            // Check if row id = 1 exists
            $stmt = $db->query("SELECT * FROM portfolio_hero WHERE id = 1");
            $existing = $stmt ? $stmt->fetch(PDO::FETCH_ASSOC) : null;

            if (!$existing) {
                $seedQuery = "INSERT INTO portfolio_hero (
                    id, name, title_tag, headline, bio, profile_image,
                    metric1_value, metric1_label, metric2_value, metric2_label,
                    metric3_value, metric3_label, email, phone, location,
                    github_url, linkedin_url, resume_url
                ) VALUES (
                    1, 'Abdul Sami', 'Full-Stack & AI Practitioner',
                    'Building Scalable Web Apps & Intelligent AI Systems',
                    'Hi, I am Abdul Sami.', '/images/abdul_sami_profile.png',
                    '92%', 'ML Model Accuracy', '10+', 'AI/DS Tasks Solved',
                    'MERN + PHP', 'Full-Stack Core', 'sb850839@gmail.com',
                    '+92-3228483029', 'Pakistan (Available Worldwide Remote)',
                    'https://github.com/Abdul-Sami1122', 'https://linkedin.com/in/abdul-sami',
                    '/resume_abdul_sami.pdf'
                )";
                $db->exec($seedQuery);
                $existing = $db->query("SELECT * FROM portfolio_hero WHERE id = 1")->fetch(PDO::FETCH_ASSOC);
            }

            // Extract values, preserving existing database data for partial updates
            $name = array_key_exists('name', $data) ? $data['name'] : ($existing['name'] ?? '');
            $titleTag = $data['titleTag'] ?? $data['title_tag'] ?? ($existing['title_tag'] ?? '');
            $headline = array_key_exists('headline', $data) ? $data['headline'] : ($existing['headline'] ?? '');
            $bio = array_key_exists('bio', $data) ? $data['bio'] : ($existing['bio'] ?? '');
            $profileImage = $data['profileImage'] ?? $data['profile_image'] ?? ($existing['profile_image'] ?? '');

            // Metrics handling
            $m1v = isset($data['metric1']['value']) ? $data['metric1']['value'] : ($data['metric1_value'] ?? ($existing['metric1_value'] ?? '92%'));
            $m1l = isset($data['metric1']['label']) ? $data['metric1']['label'] : ($data['metric1_label'] ?? ($existing['metric1_label'] ?? 'ML Model Accuracy'));

            $m2v = isset($data['metric2']['value']) ? $data['metric2']['value'] : ($data['metric2_value'] ?? ($existing['metric2_value'] ?? '10+'));
            $m2l = isset($data['metric2']['label']) ? $data['metric2']['label'] : ($data['metric2_label'] ?? ($existing['metric2_label'] ?? 'AI/DS Tasks Solved'));

            $m3v = isset($data['metric3']['value']) ? $data['metric3']['value'] : ($data['metric3_value'] ?? ($existing['metric3_value'] ?? 'MERN + PHP'));
            $m3l = isset($data['metric3']['label']) ? $data['metric3']['label'] : ($data['metric3_label'] ?? ($existing['metric3_label'] ?? 'Full-Stack Core'));

            // Contact & Social channels
            $email = array_key_exists('email', $data) ? trim($data['email']) : ($existing['email'] ?? '');
            $phone = array_key_exists('phone', $data) ? trim($data['phone']) : ($existing['phone'] ?? '');
            $location = array_key_exists('location', $data) ? trim($data['location']) : ($existing['location'] ?? '');
            $githubUrl = isset($data['githubUrl']) ? trim($data['githubUrl']) : (isset($data['github_url']) ? trim($data['github_url']) : ($existing['github_url'] ?? 'https://github.com/Abdul-Sami1122'));
            $linkedinUrl = isset($data['linkedinUrl']) ? trim($data['linkedinUrl']) : (isset($data['linkedin_url']) ? trim($data['linkedin_url']) : ($existing['linkedin_url'] ?? 'https://linkedin.com/in/abdul-sami'));
            $resumeUrl = !empty($data['resumeUrl']) ? trim($data['resumeUrl']) : (!empty($data['resume_url']) ? trim($data['resume_url']) : ($existing['resume_url'] ?? '/resume_abdul_sami.pdf'));

            // CTA Buttons
            $primaryCtaText = $data['primaryCtaText'] ?? $data['primary_cta_text'] ?? ($existing['primary_cta_text'] ?? 'Explore Work');
            $primaryCtaLink = $data['primaryCtaLink'] ?? $data['primary_cta_link'] ?? ($existing['primary_cta_link'] ?? '#projects');
            $secondaryCtaText = $data['secondaryCtaText'] ?? $data['secondary_cta_text'] ?? ($existing['secondary_cta_text'] ?? 'Get In Touch');
            $secondaryCtaLink = $data['secondaryCtaLink'] ?? $data['secondary_cta_link'] ?? ($existing['secondary_cta_link'] ?? '#contact');

            $query = "UPDATE portfolio_hero SET 
                name = :name,
                title_tag = :title_tag,
                headline = :headline,
                bio = :bio,
                profile_image = :profile_image,
                metric1_value = :m1v,
                metric1_label = :m1l,
                metric2_value = :m2v,
                metric2_label = :m2l,
                metric3_value = :m3v,
                metric3_label = :m3l,
                email = :email,
                phone = :phone,
                location = :location,
                github_url = :github_url,
                linkedin_url = :linkedin_url,
                resume_url = :resume_url,
                primary_cta_text = :primary_cta_text,
                primary_cta_link = :primary_cta_link,
                secondary_cta_text = :secondary_cta_text,
                secondary_cta_link = :secondary_cta_link
                WHERE id = 1";
            
            $stmt = $db->prepare($query);
            $stmt->execute([
                ':name' => $name,
                ':title_tag' => $titleTag,
                ':headline' => $headline,
                ':bio' => $bio,
                ':profile_image' => $profileImage,
                ':m1v' => $m1v,
                ':m1l' => $m1l,
                ':m2v' => $m2v,
                ':m2l' => $m2l,
                ':m3v' => $m3v,
                ':m3l' => $m3l,
                ':email' => $email,
                ':phone' => $phone,
                ':location' => $location,
                ':github_url' => $githubUrl,
                ':linkedin_url' => $linkedinUrl,
                ':resume_url' => $resumeUrl,
                ':primary_cta_text' => $primaryCtaText,
                ':primary_cta_link' => $primaryCtaLink,
                ':secondary_cta_text' => $secondaryCtaText,
                ':secondary_cta_link' => $secondaryCtaLink,
            ]);

            Response::success([
                "name" => $name,
                "titleTag" => $titleTag,
                "headline" => $headline,
                "bio" => $bio,
                "profileImage" => $profileImage,
                "metric1" => ["value" => $m1v, "label" => $m1l],
                "metric2" => ["value" => $m2v, "label" => $m2l],
                "metric3" => ["value" => $m3v, "label" => $m3l],
                "email" => $email,
                "phone" => $phone,
                "location" => $location,
                "githubUrl" => $githubUrl,
                "linkedinUrl" => $linkedinUrl,
                "resumeUrl" => $resumeUrl,
                "primaryCtaText" => $primaryCtaText,
                "primaryCtaLink" => $primaryCtaLink,
                "secondaryCtaText" => $secondaryCtaText,
                "secondaryCtaLink" => $secondaryCtaLink,
            ], "Profile & Contact channels successfully updated in database by " . ($adminUser['username'] ?? 'admin'));

        } catch (PDOException $e) {
            Response::error("Database error: " . $e->getMessage(), 500);
        }
    }
}
