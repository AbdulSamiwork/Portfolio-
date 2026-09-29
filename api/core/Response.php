<?php
/**
 * Unified JSON Response Helper
 * Standardizes API output across all modules and eliminates boilerplate code.
 */
class Response {
    public static function json($data, $statusCode = 200) {
        http_response_code($statusCode);
        header('Content-Type: application/json; charset=utf-8');
        echo json_encode($data, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
        exit();
    }

    public static function success($data = null, $message = "Operation completed successfully.", $statusCode = 200) {
        $payload = [
            "status" => "success",
            "message" => $message
        ];
        if ($data !== null) {
            $payload["data"] = $data;
        }
        self::json($payload, $statusCode);
    }

    public static function error($message = "An error occurred.", $statusCode = 400, $errors = null) {
        $payload = [
            "status" => "error",
            "message" => $message
        ];
        if ($errors !== null) {
            $payload["errors"] = $errors;
        }
        self::json($payload, $statusCode);
    }

    public static function unauthorized($message = "Unauthorized access. Valid Bearer token required.") {
        self::error($message, 401);
    }

    public static function notFound($message = "Resource not found.") {
        self::error($message, 404);
    }

    public static function getJsonInput() {
        $raw = file_get_contents("php://input");
        $data = json_decode($raw, true);
        return is_array($data) ? $data : [];
    }
}
