<?php
require_once __DIR__ . '/../../core/Database.php';
require_once __DIR__ . '/../../core/Response.php';
require_once __DIR__ . '/../../core/AuthMiddleware.php';

class TestimonialsController {
    public static function handle() {
        AuthMiddleware::verifyAdmin();
        $method = $_SERVER['REQUEST_METHOD'];
        $data = Response::getJsonInput();
        $db = Database::getInstance();

        if ($method === 'POST') {
            if ($db) {
                $stmt = $db->prepare("INSERT INTO portfolio_testimonials (name, role, company, avatar, rating, content, date, verified) VALUES (:name, :role, :company, :avatar, :rating, :content, :date, :verified)");
                $stmt->execute([
                    ':name'     => $data['name'] ?? '',
                    ':role'     => $data['role'] ?? '',
                    ':company'  => $data['company'] ?? '',
                    ':avatar'   => $data['avatar'] ?? '',
                    ':rating'   => (int)($data['rating'] ?? 5),
                    ':content'  => $data['content'] ?? ($data['quote'] ?? ''),
                    ':date'     => $data['date'] ?? date('M Y'),
                    ':verified' => isset($data['verified']) ? ($data['verified'] ? 1 : 0) : 1,
                ]);
                $data['id'] = $db->lastInsertId();
            }
            Response::json(["status" => "success", "message" => "Testimonial added successfully.", "data" => $data], 201);
        } elseif ($method === 'PUT') {
            $id = $_GET['id'] ?? ($data['id'] ?? null);
            if ($id && $db) {
                $stmt = $db->prepare("UPDATE portfolio_testimonials SET 
                    name = :name, role = :role, company = :company, 
                    avatar = :avatar, rating = :rating, content = :content, 
                    date = :date, verified = :verified
                    WHERE id = :id");
                $stmt->execute([
                    ':id'       => $id,
                    ':name'     => $data['name'] ?? '',
                    ':role'     => $data['role'] ?? '',
                    ':company'  => $data['company'] ?? '',
                    ':avatar'   => $data['avatar'] ?? '',
                    ':rating'   => (int)($data['rating'] ?? 5),
                    ':content'  => $data['content'] ?? ($data['quote'] ?? ''),
                    ':date'     => $data['date'] ?? date('M Y'),
                    ':verified' => isset($data['verified']) ? ($data['verified'] ? 1 : 0) : 1,
                ]);
            }
            Response::success($data, "Testimonial updated successfully.");
        } elseif ($method === 'DELETE') {
            $id = $_GET['id'] ?? ($data['id'] ?? null);
            if ($id && $db) {
                $stmt = $db->prepare("DELETE FROM portfolio_testimonials WHERE id = :id");
                $stmt->execute([':id' => $id]);
            }
            Response::success(null, "Testimonial deleted successfully.");
        } else {
            Response::error("Unsupported HTTP method", 405);
        }
    }
}
