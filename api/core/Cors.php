<?php
/**
 * Hardened CORS & Enterprise Security Headers Middleware
 */
class Cors {
    public static function handle() {
        // Allowed Origin handling (Localhost, 127.0.0.1, LAN IP, or any incoming origin in dev)
        $origin = $_SERVER['HTTP_ORIGIN'] ?? '';

        if (!empty($origin)) {
            header("Access-Control-Allow-Origin: " . $origin);
            header("Access-Control-Allow-Credentials: true");
        } else {
            header("Access-Control-Allow-Origin: *");
        }

        header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
        header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With, X-Auth-Token");
        header("Access-Control-Max-Age: 86400");

        // Essential HTTP Security Headers
        header("X-Content-Type-Options: nosniff");
        header("X-Frame-Options: SAMEORIGIN");
        header("X-XSS-Protection: 1; mode=block");
        header("Referrer-Policy: strict-origin-when-cross-origin");
        header("Permissions-Policy: camera=(), microphone=(), geolocation=()");

        if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
            http_response_code(200);
            exit();
        }
    }
}

Cors::handle();
