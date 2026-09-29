<?php
require_once __DIR__ . '/../core/Cors.php';
require_once __DIR__ . '/../core/Response.php';
require_once __DIR__ . '/../core/AuthMiddleware.php';

// Strict Admin Authentication Guard
$adminUser = AuthMiddleware::verifyAdmin();

$uploadDir = __DIR__ . '/../uploads/';
if (!is_dir($uploadDir)) {
    mkdir($uploadDir, 0755, true);
}

const MAX_FILE_SIZE = 5242880; // 5 MB
$allowedMimes = [
    'image/jpeg' => 'jpg',
    'image/png' => 'png',
    'image/webp' => 'webp',
    'application/pdf' => 'pdf'
];

// Check if file is sent via Multipart Form-Data
if (isset($_FILES['file']) || isset($_FILES['image'])) {
    $file = $_FILES['file'] ?? $_FILES['image'];

    if ($file['error'] !== UPLOAD_ERR_OK) {
        Response::error("File upload failed with error code: " . (int)$file['error'], 400);
    }

    if ($file['size'] > MAX_FILE_SIZE) {
        Response::error("File exceeds maximum allowed size of 5MB.", 400);
    }

    // Deep MIME-type verification
    $finfo = finfo_open(FILEINFO_MIME_TYPE);
    $realMime = finfo_file($finfo, $file['tmp_name']);
    finfo_close($finfo);

    if (!array_key_exists($realMime, $allowedMimes)) {
        Response::error("Invalid file format. Allowed types: JPG, PNG, WEBP, PDF.", 400);
    }

    $extension = $allowedMimes[$realMime];
    $newFileName = 'media_' . time() . '_' . bin2hex(random_bytes(6)) . '.' . $extension;
    $targetPath = $uploadDir . $newFileName;

    if (move_uploaded_file($file['tmp_name'], $targetPath)) {
        $protocol = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') ? "https://" : "http://";
        $host = $_SERVER['HTTP_HOST'] ?? 'localhost';
        $fullUrl = $protocol . $host . '/api/uploads/' . $newFileName;

        Response::json([
            "status" => "success",
            "message" => "File securely uploaded.",
            "url" => $fullUrl,
            "filename" => $newFileName
        ]);
    } else {
        Response::error("Failed to move uploaded file.", 500);
    }
}

// Check if sent via JSON Base64 Payload
$input = Response::getJsonInput();
if ($input && !empty($input['data'])) {
    $base64Data = $input['data'];

    if (preg_match('/^data:(image\/(jpeg|png|webp)|application\/pdf);base64,/', $base64Data, $type)) {
        $realMime = $type[1];
        $base64Data = substr($base64Data, strpos($base64Data, ',') + 1);
    } else {
        Response::error("Invalid base64 media header.", 400);
    }

    $decodedData = base64_decode($base64Data, true);
    if ($decodedData === false) {
        Response::error("Corrupted base64 payload.", 400);
    }

    if (strlen($decodedData) > MAX_FILE_SIZE) {
        Response::error("Decoded file exceeds 5MB limit.", 400);
    }

    $extension = $allowedMimes[$realMime] ?? 'png';
    $newFileName = 'media_' . time() . '_' . bin2hex(random_bytes(6)) . '.' . $extension;
    $targetPath = $uploadDir . $newFileName;

    if (file_put_contents($targetPath, $decodedData)) {
        $protocol = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') ? "https://" : "http://";
        $host = $_SERVER['HTTP_HOST'] ?? 'localhost';
        $fullUrl = $protocol . $host . '/api/uploads/' . $newFileName;

        Response::json([
            "status" => "success",
            "message" => "File securely saved.",
            "url" => $fullUrl,
            "filename" => $newFileName
        ]);
    } else {
        Response::error("Failed to write media to disk.", 500);
    }
}

Response::error("No valid file or data payload provided.", 400);
