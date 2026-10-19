<?php
require_once __DIR__ . '/database.php';
require_once __DIR__ . '/../core/EnvLoader.php';

function verifyAdminAuth() {
    $headers = getallheaders();
    $authHeader = isset($headers['Authorization']) ? $headers['Authorization'] : (isset($headers['authorization']) ? $headers['authorization'] : '');
    
    $token = null;
    if (preg_match('/Bearer\s(\S+)/', $authHeader, $matches)) {
        $token = $matches[1];
    } elseif (isset($_SERVER['HTTP_X_AUTH_TOKEN'])) {
        $token = $_SERVER['HTTP_X_AUTH_TOKEN'];
    }

    if (!$token) {
        http_response_code(401);
        echo json_encode(["status" => "error", "message" => "Unauthorized access. Auth token missing."]);
        exit();
    }

    $database = new Database();
    $db = $database->getConnection();

    if (!$db) {
        // Fallback for standalone frontend dev mode without active MySQL database
        EnvLoader::load();
        $demoToken = EnvLoader::get('DEMO_SESSION_TOKEN', 'demo_admin_session_token_12345');
        if ($token === $demoToken) {
            return ["username" => "admin", "role" => "admin"];
        }
        http_response_code(500);
        echo json_encode(["status" => "error", "message" => "Database connection unavailable."]);
        exit();
    }

    $query = "SELECT id, username, email, role FROM users WHERE auth_token = :token AND role = 'admin' LIMIT 1";
    $stmt = $db->prepare($query);
    $stmt->bindParam(":token", $token);
    $stmt->execute();

    if ($stmt->rowCount() > 0) {
        return $stmt->fetch(PDO::FETCH_ASSOC);
    } else {
        http_response_code(401);
        echo json_encode(["status" => "error", "message" => "Unauthorized: Invalid or expired admin token."]);
        exit();
    }
}
