<?php
require_once __DIR__ . '/../config/cors.php';
require_once __DIR__ . '/../config/auth_middleware.php';

$user = verifyAdminAuth();

http_response_code(200);
echo json_encode([
    "status" => "success",
    "user" => $user
]);
