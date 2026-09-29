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
        if ($db) {
            $query = "UPDATE portfolio_hero SET 
                name = :name, title_tag = :title_tag, headline = :headline, bio = :bio,
                profile_image = :profile_image, metric1_value = :m1v, metric1_label = :m1l,
                metric2_value = :m2v, metric2_label = :m2l, metric3_value = :m3v, metric3_label = :m3l,
                email = :email, phone = :phone, location = :location,
                github_url = :github_url, linkedin_url = :linkedin_url,
                resume_url = COALESCE(:resume_url, resume_url) WHERE id = 1";
            
            $stmt = $db->prepare($query);
            $stmt->execute([
                ':name' => $data['name'] ?? '',
                ':title_tag' => $data['titleTag'] ?? '',
                ':headline' => $data['headline'] ?? '',
                ':bio' => $data['bio'] ?? '',
                ':profile_image' => $data['profileImage'] ?? '',
                ':m1v' => $data['metric1']['value'] ?? '',
                ':m1l' => $data['metric1']['label'] ?? '',
                ':m2v' => $data['metric2']['value'] ?? '',
                ':m2l' => $data['metric2']['label'] ?? '',
                ':m3v' => $data['metric3']['value'] ?? '',
                ':m3l' => $data['metric3']['label'] ?? '',
                ':email' => $data['email'] ?? '',
                ':phone' => $data['phone'] ?? '',
                ':location' => $data['location'] ?? '',
                ':github_url' => $data['githubUrl'] ?? '',
                ':linkedin_url' => $data['linkedinUrl'] ?? '',
                ':resume_url' => !empty($data['resumeUrl']) ? $data['resumeUrl'] : (!empty($data['resume_url']) ? $data['resume_url'] : null)
            ]);
        }

        Response::success(null, "Hero section updated successfully by Admin " . ($adminUser['username'] ?? 'admin'));
    }
}
