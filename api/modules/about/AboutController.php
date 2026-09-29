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
        if ($db) {
            $query = "UPDATE portfolio_about SET 
                section_title = :st, section_subtitle = :ss, card_heading = :ch,
                paragraph1 = :p1, paragraph2 = :p2, paragraph3 = :p3 WHERE id = 1";
            
            $stmt = $db->prepare($query);
            $stmt->execute([
                ':st' => $data['sectionTitle'] ?? '',
                ':ss' => $data['sectionSubtitle'] ?? '',
                ':ch' => $data['cardHeading'] ?? '',
                ':p1' => $data['paragraph1'] ?? '',
                ':p2' => $data['paragraph2'] ?? '',
                ':p3' => $data['paragraph3'] ?? ''
            ]);
        }

        Response::success(null, "About section updated successfully.");
    }
}
