<?php
// Secure Public Media Streamer with Universal CORS & Inline Display
require_once __DIR__ . '/../core/Cors.php';

// Allow universal GET / HEAD for media streaming
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, HEAD, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

$fileName = isset($_GET['file']) ? basename($_GET['file']) : '';

if (empty($fileName)) {
    http_response_code(400);
    echo "Filename parameter is required.";
    exit;
}

$searchDirs = [
    __DIR__ . '/../uploads/',
    __DIR__ . '/../../public/',
    __DIR__ . '/../../public/images/'
];

$filePath = null;
foreach ($searchDirs as $dir) {
    $candidate = $dir . $fileName;
    if (file_exists($candidate) && is_file($candidate)) {
        $filePath = $candidate;
        break;
    }
}

// Allowed MIME mappings
$mimeMap = [
    'pdf'  => 'application/pdf',
    'png'  => 'image/png',
    'jpg'  => 'image/jpeg',
    'jpeg' => 'image/jpeg',
    'webp' => 'image/webp',
    'svg'  => 'image/svg+xml'
];

$ext = strtolower(pathinfo($fileName, PATHINFO_EXTENSION));
$mimeType = $mimeMap[$ext] ?? 'application/octet-stream';

if ($filePath && file_exists($filePath)) {
    header("Content-Type: " . $mimeType);
    header("Content-Length: " . filesize($filePath));
    header("Content-Disposition: inline; filename=\"" . $fileName . "\"");
    header("Cache-Control: public, max-age=86400, stale-while-revalidate=604800");
    header_remove("X-Frame-Options");
    header("X-Content-Type-Options: nosniff");
    
    // Clear output buffering for binary stream
    if (ob_get_level()) {
        ob_end_clean();
    }
    readfile($filePath);
    exit;
}

// File Not Found Fallback: Return clean lightweight fallback instead of hosting 404 HTML
http_response_code(404);
if ($ext === 'pdf') {
    // If PDF not found, redirect or stream fallback bundled resume if present
    $defaultResume = __DIR__ . '/../uploads/resume_abdul_sami.pdf';
    if (file_exists($defaultResume)) {
        header("Content-Type: application/pdf");
        header("Content-Disposition: inline; filename=\"resume_abdul_sami.pdf\"");
        readfile($defaultResume);
        exit;
    }
    echo "Requested PDF document was not found on the server.";
} else {
    // Return 1x1 transparent PNG placeholder for broken images
    header("Content-Type: image/png");
    echo base64_decode('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=');
}
exit;
