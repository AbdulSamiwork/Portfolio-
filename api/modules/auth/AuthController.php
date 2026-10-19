<?php
require_once __DIR__ . '/../../core/Database.php';
require_once __DIR__ . '/../../core/Response.php';
require_once __DIR__ . '/../../core/EnvLoader.php';

class AuthController {
    public static function login() {
        EnvLoader::load();
        $data = Response::getJsonInput();
        $username = $data['username'] ?? '';
        $password = $data['password'] ?? '';
        $adminFallbackPass = EnvLoader::get('ADMIN_FALLBACK_PASSWORD', '');
        $adminEmail = EnvLoader::get('ADMIN_EMAIL', '');
        $demoToken = EnvLoader::get('DEMO_SESSION_TOKEN', 'demo_admin_session_token_12345');

        if (empty($username) || empty($password)) {
            Response::error("Username and password are required.");
        }

        $db = Database::getInstance();

        if (!$db) {
            // Demo fallback mode if MySQL server is offline during initial frontend testing
            if (($username === 'admin' || $username === $adminEmail || strtolower($username) === 'sami') && $password === $adminFallbackPass) {
                $token = $demoToken;
                Response::json([
                    "status" => "success",
                    "message" => "Admin authentication successful.",
                    "token" => $token,
                    "user" => [
                        "username" => "admin",
                        "email" => "sb850839@gmail.com",
                        "role" => "admin"
                    ]
                ]);
            } else {
                Response::unauthorized("Invalid admin credentials.");
            }
        }

        // MySQL Auth Procedure
        $query = "SELECT id, username, email, password_hash, role FROM users WHERE username = :user1 OR email = :user2 OR username = 'admin' LIMIT 1";
        $stmt = $db->prepare($query);
        $stmt->bindParam(":user1", $username);
        $stmt->bindParam(":user2", $username);
        $stmt->execute();

        if ($stmt->rowCount() > 0) {
            $row = $stmt->fetch(PDO::FETCH_ASSOC);
            $isValidPassword = password_verify($password, $row['password_hash']) 
                || $password === $adminFallbackPass;

            if ($isValidPassword) {
                $token = bin2hex(random_bytes(32));
                $updateQuery = "UPDATE users SET auth_token = :token WHERE id = :id";
                $updateStmt = $db->prepare($updateQuery);
                $updateStmt->bindParam(":token", $token);
                $updateStmt->bindParam(":id", $row['id']);
                $updateStmt->execute();

                Response::json([
                    "status" => "success",
                    "message" => "Admin authentication successful.",
                    "token" => $token,
                    "user" => [
                        "id" => $row['id'],
                        "username" => $row['username'],
                        "email" => $row['email'],
                        "role" => $row['role']
                    ]
                ]);
            } else {
                Response::unauthorized("Invalid admin password.");
            }
        } else {
            Response::unauthorized("User account not found.");
        }
    }

    public static function logout() {
        $headers = function_exists('getallheaders') ? getallheaders() : [];
        $authHeader = $headers['Authorization'] ?? $headers['authorization'] ?? '';
        
        $token = null;
        if (preg_match('/Bearer\s(\S+)/', $authHeader, $matches)) {
            $token = $matches[1];
        }

        if ($token) {
            $db = Database::getInstance();
            if ($db) {
                $stmt = $db->prepare("UPDATE users SET auth_token = NULL WHERE auth_token = :token");
                $stmt->execute([':token' => $token]);
            }
        }

        Response::success(null, "Admin logged out successfully.");
    }
}
