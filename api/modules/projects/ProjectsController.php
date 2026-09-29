<?php
require_once __DIR__ . '/../../core/Database.php';
require_once __DIR__ . '/../../core/Response.php';
require_once __DIR__ . '/../../core/AuthMiddleware.php';

class ProjectsController {
    public static function handle() {
        AuthMiddleware::verifyAdmin();
        $method = $_SERVER['REQUEST_METHOD'];
        $data = Response::getJsonInput();
        $db = Database::getInstance();

        if ($method === 'POST') {
            if ($db) {
                $stmt = $db->prepare("INSERT INTO portfolio_projects (title, subtitle, category, category_badge, image, tech_json, summary, highlights_json, github_url) VALUES (:title, :subtitle, :category, :badge, :image, :tech, :summary, :highlights, :github)");
                $stmt->execute([
                    ':title' => $data['title'] ?? '',
                    ':subtitle' => $data['subtitle'] ?? '',
                    ':category' => $data['category'] ?? 'web',
                    ':badge' => $data['categoryBadge'] ?? 'Full-Stack Web',
                    ':image' => $data['image'] ?? '/images/project_gristmill.webp',
                    ':tech' => json_encode($data['tech'] ?? []),
                    ':summary' => $data['summary'] ?? '',
                    ':highlights' => json_encode($data['highlights'] ?? []),
                    ':github' => $data['github'] ?? 'https://github.com/Abdul-Sami1122'
                ]);
                $data['id'] = $db->lastInsertId();
            }
            Response::json(["status" => "success", "message" => "Project card added successfully.", "data" => $data], 201);
        } elseif ($method === 'PUT') {
            $id = $_GET['id'] ?? ($data['id'] ?? null);
            if ($id && $db) {
                $stmt = $db->prepare("UPDATE portfolio_projects SET 
                    title = :title, subtitle = :subtitle, category = :category, 
                    category_badge = :badge, image = :image, tech_json = :tech, 
                    summary = :summary, highlights_json = :highlights, github_url = :github 
                    WHERE id = :id");
                $stmt->execute([
                    ':id' => $id,
                    ':title' => $data['title'] ?? '',
                    ':subtitle' => $data['subtitle'] ?? '',
                    ':category' => $data['category'] ?? 'web',
                    ':badge' => $data['categoryBadge'] ?? 'Full-Stack Web',
                    ':image' => $data['image'] ?? '',
                    ':tech' => json_encode($data['tech'] ?? []),
                    ':summary' => $data['summary'] ?? '',
                    ':highlights' => json_encode($data['highlights'] ?? []),
                    ':github' => $data['github'] ?? 'https://github.com/Abdul-Sami1122'
                ]);
            }
            Response::success($data, "Project card updated successfully.");
        } elseif ($method === 'DELETE') {
            $id = $_GET['id'] ?? ($data['id'] ?? null);
            if ($id && $db) {
                $stmt = $db->prepare("DELETE FROM portfolio_projects WHERE id = :id");
                $stmt->execute([':id' => $id]);
            }
            Response::success(null, "Project card deleted successfully.");
        } else {
            Response::error("Unsupported HTTP method", 405);
        }
    }
}
