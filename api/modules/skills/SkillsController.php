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
                    ':desc' => $data['desc'] ?? ($data['description'] ?? '')
                ]);
                $data['id'] = $db->lastInsertId();
            }
            Response::json(["status" => "success", "message" => "Skill added successfully.", "data" => $data], 201);
        } elseif ($method === 'PUT') {
            $id = $_GET['id'] ?? ($data['id'] ?? null);
            if ($db) {
                $updated = false;
                $cat = $data['category'] ?? 'web';
                $name = $data['name'] ?? '';
                $level = $data['level'] ?? 'Intermediate';
                $desc = $data['desc'] ?? ($data['description'] ?? '');

                if ($id && is_numeric($id)) {
                    $stmt = $db->prepare("UPDATE portfolio_skills SET category = :cat, name = :name, level = :level, description = :desc WHERE id = :id");
                    $stmt->execute([
                        ':id' => $id,
                        ':cat' => $cat,
                        ':name' => $name,
                        ':level' => $level,
                        ':desc' => $desc
                    ]);
                    if ($stmt->rowCount() > 0) {
                        $updated = true;
                    }
                }

                // Fallback: update by name if id was non-numeric or not found
                if (!$updated && !empty($name)) {
                    $stmt = $db->prepare("UPDATE portfolio_skills SET category = :cat, level = :level, description = :desc WHERE name = :name");
                    $stmt->execute([
                        ':cat' => $cat,
                        ':level' => $level,
                        ':desc' => $desc,
                        ':name' => $name
                    ]);
                    if ($stmt->rowCount() > 0) {
                        $updated = true;
                    }
                }

                // If still not updated, insert as new entry
                if (!$updated && !empty($name)) {
                    $stmt = $db->prepare("INSERT INTO portfolio_skills (category, name, level, description) VALUES (:cat, :name, :level, :desc)");
                    $stmt->execute([
                        ':cat' => $cat,
                        ':name' => $name,
                        ':level' => $level,
                        ':desc' => $desc
                    ]);
                    $data['id'] = $db->lastInsertId();
                }
            }
            Response::success($data, "Skill updated successfully.");
        } elseif ($method === 'DELETE') {
            $id = $_GET['id'] ?? ($data['id'] ?? null);
            $name = $data['name'] ?? '';
            if ($db) {
                if ($id && is_numeric($id)) {
                    $stmt = $db->prepare("DELETE FROM portfolio_skills WHERE id = :id");
                    $stmt->execute([':id' => $id]);
                } elseif (!empty($name)) {
                    $stmt = $db->prepare("DELETE FROM portfolio_skills WHERE name = :name");
                    $stmt->execute([':name' => $name]);
                }
            }
            Response::success(null, "Skill deleted successfully.");
        } else {
            Response::error("Unsupported HTTP method", 405);
        }
    }
}
