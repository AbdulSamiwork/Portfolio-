<?php
require_once __DIR__ . '/../../core/Database.php';
require_once __DIR__ . '/../../core/Response.php';
require_once __DIR__ . '/../../core/AuthMiddleware.php';

class AboutController {
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
            // Check if row 1 exists
            $stmt = $db->query("SELECT * FROM portfolio_about WHERE id = 1");
            $existing = $stmt ? $stmt->fetch(PDO::FETCH_ASSOC) : null;

            if (!$existing) {
                $seedQuery = "INSERT INTO portfolio_about (
                    id, section_title, section_subtitle, card_heading,
                    paragraph1, paragraph2, paragraph3, philosophy,
                    degree, institution, years_exp, projects_completed, tech_mastered
                ) VALUES (
                    1,
                    'Architecting the Fusion of Web & Artificial Intelligence',
                    'Bridging software engineering precision with data-driven predictive modeling.',
                    'Engineering Beyond the Surface',
                    'I am a Full-Stack Web Developer and Machine Learning Practitioner.',
                    'On the web, I construct scalable applications using the MERN Stack and Core PHP & MySQL.',
                    'In AI, I dive deep into mathematical foundations and Deep Neural Networks.',
                    'Engineering Beyond the Surface',
                    'B.S. Information Technology',
                    'University of the Punjab',
                    '2+', '15+', '20+'
                )";
                $db->exec($seedQuery);
                $existing = $db->query("SELECT * FROM portfolio_about WHERE id = 1")->fetch(PDO::FETCH_ASSOC);
            }

            // Extract values supporting both camelCase and snake_case or legacy aliases
            $sectionTitle = $data['sectionTitle'] ?? $data['title'] ?? $data['section_title'] ?? ($existing['section_title'] ?? '');
            $sectionSubtitle = $data['sectionSubtitle'] ?? $data['subtitle'] ?? $data['section_subtitle'] ?? ($existing['section_subtitle'] ?? '');
            $cardHeading = $data['cardHeading'] ?? $data['card_heading'] ?? ($existing['card_heading'] ?? '');
            
            $paragraph1 = array_key_exists('paragraph1', $data) ? $data['paragraph1'] : ($existing['paragraph1'] ?? '');
            $paragraph2 = array_key_exists('paragraph2', $data) ? $data['paragraph2'] : ($existing['paragraph2'] ?? '');
            $paragraph3 = array_key_exists('paragraph3', $data) ? $data['paragraph3'] : ($existing['paragraph3'] ?? '');
            
            $philosophy = array_key_exists('philosophy', $data) ? $data['philosophy'] : ($existing['philosophy'] ?? '');
            $degree = $data['degree'] ?? ($existing['degree'] ?? 'B.S. Information Technology');
            $institution = $data['institution'] ?? ($existing['institution'] ?? 'University of the Punjab');

            // Stats handling
            $stats = $data['stats'] ?? [];
            $yearsExp = $stats['yearsExp'] ?? $data['years_exp'] ?? ($existing['years_exp'] ?? '2+');
            $projectsCompleted = $stats['projectsCompleted'] ?? $data['projects_completed'] ?? ($existing['projects_completed'] ?? '15+');
            $techMastered = $stats['techMastered'] ?? $data['tech_mastered'] ?? ($existing['tech_mastered'] ?? '20+');

            // Highlights cards handling
            $highlightsJson = null;
            if (isset($data['highlights'])) {
                $highlightsJson = is_array($data['highlights']) ? json_encode($data['highlights'], JSON_UNESCAPED_UNICODE) : $data['highlights'];
            } else {
                $highlightsJson = $existing['highlights_json'] ?? null;
            }

            $query = "UPDATE portfolio_about SET 
                section_title = :st,
                section_subtitle = :ss,
                card_heading = :ch,
                paragraph1 = :p1,
                paragraph2 = :p2,
                paragraph3 = :p3,
                philosophy = :phi,
                degree = :deg,
                institution = :inst,
                years_exp = :ye,
                projects_completed = :pc,
                tech_mastered = :tm,
                highlights_json = :hj
                WHERE id = 1";
            
            $stmt = $db->prepare($query);
            $stmt->execute([
                ':st' => $sectionTitle,
                ':ss' => $sectionSubtitle,
                ':ch' => $cardHeading,
                ':p1' => $paragraph1,
                ':p2' => $paragraph2,
                ':p3' => $paragraph3,
                ':phi' => $philosophy,
                ':deg' => $degree,
                ':inst' => $institution,
                ':ye' => $yearsExp,
                ':pc' => $projectsCompleted,
                ':tm' => $techMastered,
                ':hj' => $highlightsJson,
            ]);

            Response::success([
                "sectionTitle" => $sectionTitle,
                "title" => $sectionTitle,
                "sectionSubtitle" => $sectionSubtitle,
                "subtitle" => $sectionSubtitle,
                "cardHeading" => $cardHeading,
                "paragraph1" => $paragraph1,
                "paragraph2" => $paragraph2,
                "paragraph3" => $paragraph3,
                "philosophy" => $philosophy,
                "degree" => $degree,
                "institution" => $institution,
                "stats" => [
                    "yearsExp" => $yearsExp,
                    "projectsCompleted" => $projectsCompleted,
                    "techMastered" => $techMastered
                ],
                "highlights" => $highlightsJson ? json_decode($highlightsJson, true) : null
            ], "About section updated successfully in database by " . ($adminUser['username'] ?? 'admin'));

        } catch (PDOException $e) {
            Response::error("Database error: " . $e->getMessage(), 500);
        }
    }
}
