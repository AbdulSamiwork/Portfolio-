<?php
require_once __DIR__ . '/Database.php';
require_once __DIR__ . '/Response.php';

class AuthMiddleware {
    public static function verifyAdmin() {
        $headers = function_exists('getallheaders') ? getallheaders() : [];
        $authHeader = $headers['Authorization'] ?? $headers['authorization'] ?? '';
        
        $token = null;
        if (preg_match('/Bearer\s(\S+)/', $authHeader, $matches)) {
            $token = $matches[1];
        } elseif (isset($_SERVER['HTTP_X_AUTH_TOKEN'])) {
            $token = $_SERVER['HTTP_X_AUTH_TOKEN'];
        }

        if (!$token) {
            Response::unauthorized("Unauthorized access. Auth token missing.");
        }

        $db = Database::getInstance();

        if (!$db) {
            // Development fallback token if MySQL server is currently offline
            if ($token === 'demo_admin_session_token_12345') {
                return ["username" => "admin", "role" => "admin"];
            }
            Response::error("Database connection unavailable.", 500);
        }

        $query = "SELECT id, username, email, role FROM users WHERE auth_token = :token AND role = 'admin' LIMIT 1";
        $stmt = $db->prepare($query);
        $stmt->bindParam(":token", $token);
        $stmt->execute();

        if ($stmt->rowCount() > 0) {
            return $stmt->fetch(PDO::FETCH_ASSOC);
        } else {
            Response::unauthorized("Unauthorized: Invalid or expired admin token.");
        }
    }
}

// Global convenience function for backward compatibility
function verifyAdminAuth() {
    return AuthMiddleware::verifyAdmin();
}
