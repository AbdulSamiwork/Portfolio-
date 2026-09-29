<?php
require_once __DIR__ . '/../core/Cors.php';
require_once __DIR__ . '/../core/Database.php';
require_once __DIR__ . '/../core/Response.php';
require_once __DIR__ . '/../core/AuthMiddleware.php';

$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';

$db = Database::getInstance();
if (!$db) {
    Response::error("Database connection unavailable", 500);
}

if ($method === 'GET') {
    try {
        $stmt = $db->query("SELECT resume_url FROM portfolio_hero WHERE id = 1");
        $row = $stmt ? $stmt->fetch() : null;
        $resumeUrl = !empty($row['resume_url']) ? $row['resume_url'] : '/resume_abdul_sami.pdf';
        Response::json([
            "status" => "success",
            "data" => [
                "resumeUrl" => $resumeUrl
            ]
        ]);
    } catch (PDOException $e) {
        Response::error($e->getMessage(), 500);
    }
}

if ($method === 'PUT' || $method === 'POST') {
    $adminUser = AuthMiddleware::verifyAdmin();
    $data = Response::getJsonInput();

    $resumeUrl = trim($data['resumeUrl'] ?? $data['resume_url'] ?? '');

    try {
        $stmt = $db->prepare("UPDATE portfolio_hero SET resume_url = :resume_url WHERE id = 1");
        $stmt->execute([':resume_url' => $resumeUrl]);

        Response::json([
            "status" => "success",
            "message" => "Resume URL updated successfully in database by " . ($adminUser['username'] ?? 'admin'),
            "data" => [
                "resumeUrl" => $resumeUrl
            ]
        ]);
    } catch (PDOException $e) {
        Response::error($e->getMessage(), 500);
    }
}

Response::error("Method Not Allowed", 405);
