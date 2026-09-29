<?php
require_once __DIR__ . '/../../core/Database.php';
require_once __DIR__ . '/../../core/Response.php';
require_once __DIR__ . '/../../core/AuthMiddleware.php';

class SkillsController {
    public static function handle() {
        AuthMiddleware::verifyAdmin();
        $method = $_SERVER['REQUEST_METHOD'];
        $data = Response::getJsonInput();
        $db = Database::getInstance();

        if ($method === 'POST') {
            if ($db) {
                $stmt = $db->prepare("INSERT INTO portfolio_skills (category, name, level, description) VALUES (:cat, :name, :level, :desc)");
                $stmt->execute([
                    ':cat' => $data['category'] ?? 'web',
                    ':name' => $data['name'] ?? '',
                    ':level' => $data['level'] ?? 'Intermediate',
                    ':desc' => $data['desc'] ?? ''
                ]);
                $data['id'] = $db->lastInsertId();
            }
            Response::json(["status" => "success", "message" => "Skill added successfully.", "data" => $data], 201);
        } elseif ($method === 'DELETE') {
            $id = $_GET['id'] ?? ($data['id'] ?? null);
            if ($id && $db) {
                $stmt = $db->prepare("DELETE FROM portfolio_skills WHERE id = :id");
                $stmt->execute([':id' => $id]);
            }
            Response::success(null, "Skill deleted successfully.");
        } else {
            Response::error("Unsupported HTTP method", 405);
        }
    }
}
