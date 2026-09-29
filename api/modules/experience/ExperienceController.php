<?php
require_once __DIR__ . '/../../core/Database.php';
require_once __DIR__ . '/../../core/Response.php';
require_once __DIR__ . '/../../core/AuthMiddleware.php';

class ExperienceController {
    public static function handle() {
        AuthMiddleware::verifyAdmin();
        $method = $_SERVER['REQUEST_METHOD'];
        $data = Response::getJsonInput();
        $db = Database::getInstance();

        if ($method === 'POST') {
            if ($db) {
                $stmt = $db->prepare("INSERT INTO portfolio_experiences (role, company, period, domain, category, achievements_json, skills_json) VALUES (:role, :company, :period, :domain, :category, :achievements, :skills)");
                $stmt->execute([
                    ':role' => $data['role'] ?? '',
                    ':company' => $data['company'] ?? '',
                    ':period' => $data['period'] ?? '',
                    ':domain' => $data['domain'] ?? '',
                    ':category' => $data['category'] ?? 'web',
                    ':achievements' => json_encode($data['achievements'] ?? []),
                    ':skills' => json_encode($data['skills'] ?? [])
                ]);
                $data['id'] = $db->lastInsertId();
            }
            Response::json(["status" => "success", "message" => "Experience record added successfully.", "data" => $data], 201);
        } elseif ($method === 'PUT') {
            $id = $_GET['id'] ?? ($data['id'] ?? null);
            if ($id && $db) {
                $stmt = $db->prepare("UPDATE portfolio_experiences SET 
                    role = :role, 
                    company = :company, 
                    period = :period, 
                    domain = :domain, 
                    category = :category, 
                    achievements_json = :achievements, 
                    skills_json = :skills 
                    WHERE id = :id");
                $stmt->execute([
                    ':id' => $id,
                    ':role' => $data['role'] ?? '',
                    ':company' => $data['company'] ?? '',
                    ':period' => $data['period'] ?? '',
                    ':domain' => $data['domain'] ?? '',
                    ':category' => $data['category'] ?? 'web',
                    ':achievements' => json_encode($data['achievements'] ?? []),
                    ':skills' => json_encode($data['skills'] ?? [])
                ]);
            }
            Response::success($data, "Experience record updated successfully.");
        } elseif ($method === 'DELETE') {
            $id = $_GET['id'] ?? ($data['id'] ?? null);
            if ($id && $db) {
                $stmt = $db->prepare("DELETE FROM portfolio_experiences WHERE id = :id");
                $stmt->execute([':id' => $id]);
            }
            Response::success(null, "Experience record deleted successfully.");
        } else {
            Response::error("Unsupported HTTP method", 405);
        }
    }
}
