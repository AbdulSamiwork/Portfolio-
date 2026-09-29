<?php
require_once __DIR__ . '/../../core/Database.php';
require_once __DIR__ . '/../../core/Response.php';
require_once __DIR__ . '/../../core/AuthMiddleware.php';

class CertificationsController {
    public static function handle() {
        AuthMiddleware::verifyAdmin();
        $method = $_SERVER['REQUEST_METHOD'];
        $data = Response::getJsonInput();
        $db = Database::getInstance();

        if ($method === 'POST') {
            if ($db) {
                $stmt = $db->prepare("INSERT INTO portfolio_certifications (type, title, institution, period, badge, category, description) VALUES (:type, :title, :inst, :period, :badge, :cat, :desc)");
                $stmt->execute([
                    ':type' => $data['type'] ?? 'certification',
                    ':title' => $data['title'] ?? '',
                    ':inst' => $data['institution'] ?? '',
                    ':period' => $data['period'] ?? '',
                    ':badge' => $data['badge'] ?? 'Certified',
                    ':cat' => $data['category'] ?? 'web',
                    ':desc' => $data['desc'] ?? ''
                ]);
                $data['id'] = $db->lastInsertId();
            }
        } elseif ($method === 'PUT') {
            $id = $_GET['id'] ?? ($data['id'] ?? null);
            if ($id && $db) {
                $stmt = $db->prepare("UPDATE portfolio_certifications SET 
                    type = :type, 
                    title = :title, 
                    institution = :inst, 
                    period = :period, 
                    badge = :badge, 
                    category = :cat, 
                    description = :desc 
                    WHERE id = :id");
                $stmt->execute([
                    ':id' => $id,
                    ':type' => $data['type'] ?? 'certification',
                    ':title' => $data['title'] ?? '',
                    ':inst' => $data['institution'] ?? '',
                    ':period' => $data['period'] ?? '',
                    ':badge' => $data['badge'] ?? 'Certified',
                    ':cat' => $data['category'] ?? 'web',
                    ':desc' => $data['desc'] ?? ($data['description'] ?? '')
                ]);
            }
            Response::success($data, "Certification record updated successfully.");
        } elseif ($method === 'DELETE') {
            $id = $_GET['id'] ?? ($data['id'] ?? null);
            if ($id && $db) {
                $stmt = $db->prepare("DELETE FROM portfolio_certifications WHERE id = :id");
                $stmt->execute([':id' => $id]);
            }
            Response::success(null, "Certification record deleted successfully.");
        } else {
            Response::error("Unsupported HTTP method", 405);
        }
    }
}
