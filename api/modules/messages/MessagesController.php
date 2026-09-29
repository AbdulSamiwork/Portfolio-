<?php
require_once __DIR__ . '/../../core/Database.php';
require_once __DIR__ . '/../../core/Response.php';
require_once __DIR__ . '/../../core/AuthMiddleware.php';

class MessagesController {
    public static function handle() {
        $method = $_SERVER['REQUEST_METHOD'];
        $data = Response::getJsonInput();
        $db = Database::getInstance();

        if ($method === 'POST') {
            // Public message submission
            $name = htmlspecialchars(strip_tags(trim($data['name'] ?? '')), ENT_QUOTES, 'UTF-8');
            $email = filter_var(trim($data['email'] ?? ''), FILTER_SANITIZE_EMAIL);
            $subject = htmlspecialchars(strip_tags(trim($data['subject'] ?? 'General Inquiry')), ENT_QUOTES, 'UTF-8');
            $message = htmlspecialchars(strip_tags(trim($data['message'] ?? '')), ENT_QUOTES, 'UTF-8');

            if (empty($name) || empty($email) || empty($message)) {
                Response::error("Name, email, and message are required.", 400);
            }

            if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
                Response::error("Please provide a valid email address.", 400);
            }

            if (strlen($name) > 100 || strlen($email) > 150 || strlen($message) > 5000) {
                Response::error("Input exceeds permitted length.", 400);
            }

            if ($db) {
                try {
                    $stmt = $db->prepare("INSERT INTO portfolio_messages (name, email, subject, message, created_at, is_read, is_starred) VALUES (:name, :email, :subject, :message, NOW(), 0, 0)");
                    $stmt->execute([
                        ':name' => $name,
                        ':email' => $email,
                        ':subject' => $subject,
                        ':message' => $message
                    ]);
                    $data['id'] = $db->lastInsertId();
                } catch (Exception $e) {
                    // Fallback graceful
                }
            }

            Response::json([
                "status" => "success",
                "message" => "Message transmitted securely.",
                "data" => [
                    "name" => $name,
                    "email" => $email,
                    "date" => date('Y-m-d H:i:s')
                ]
            ], 201);

        } elseif ($method === 'GET') {
            // Admin only
            AuthMiddleware::verifyAdmin();
            $messages = [];
            if ($db) {
                try {
                    $stmt = $db->query("SELECT id, name, email, subject, message, created_at as date, is_read as `read`, is_starred as starred FROM portfolio_messages ORDER BY created_at DESC");
                    $messages = $stmt->fetchAll(PDO::FETCH_ASSOC);
                } catch (Exception $e) {
                    $messages = [];
                }
            }
            Response::success($messages);

        } elseif ($method === 'DELETE') {
            // Admin only
            AuthMiddleware::verifyAdmin();
            $id = $_GET['id'] ?? ($data['id'] ?? null);
            if ($id && $db) {
                $stmt = $db->prepare("DELETE FROM portfolio_messages WHERE id = :id");
                $stmt->execute([':id' => $id]);
            }
            Response::success(null, "Message deleted successfully.");

        } elseif ($method === 'PUT') {
            // Admin only: toggle read or starred
            AuthMiddleware::verifyAdmin();
            $id = $_GET['id'] ?? ($data['id'] ?? null);
            if ($id && $db) {
                $isRead = isset($data['read']) ? (int)$data['read'] : null;
                $isStarred = isset($data['starred']) ? (int)$data['starred'] : null;

                if ($isRead !== null) {
                    $stmt = $db->prepare("UPDATE portfolio_messages SET is_read = :r WHERE id = :id");
                    $stmt->execute([':r' => $isRead, ':id' => $id]);
                }
                if ($isStarred !== null) {
                    $stmt = $db->prepare("UPDATE portfolio_messages SET is_starred = :s WHERE id = :id");
                    $stmt->execute([':s' => $isStarred, ':id' => $id]);
                }
            }
            Response::success(null, "Message status updated.");
        } else {
            Response::error("Unsupported HTTP method", 405);
        }
    }
}
