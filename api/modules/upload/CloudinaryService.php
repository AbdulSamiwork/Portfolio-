<?php
require_once __DIR__ . '/../../core/EnvLoader.php';

class CloudinaryService
{
    /**
     * Upload a file to Cloudinary via server-side PHP cURL.
     * Returns the secure_url on success, or null on failure.
     */
    public static function upload(string $filePath, string $mimeType, ?string $originalFilename = null): ?string
    {
        if (!function_exists('curl_init')) {
            error_log('[CloudinaryService] cURL extension not available');
            return null;
        }

        EnvLoader::load();
        $cloudName = EnvLoader::get('CLOUDINARY_CLOUD_NAME', 'topin8es');
        $uploadPreset = EnvLoader::get('CLOUDINARY_UPLOAD_PRESET', 'portfolio_uploads');

        if (empty($cloudName) || empty($uploadPreset)) {
            error_log('[CloudinaryService] Missing cloud name or upload preset in environment');
            return null;
        }

        // 'auto' resource type handles images, webp, and pdfs properly
        $resourceType = 'auto';
        $url = "https://api.cloudinary.com/v1_1/{$cloudName}/{$resourceType}/upload";

        $mimeToExt = [
            'image/jpeg'      => 'jpg',
            'image/png'       => 'png',
            'image/webp'      => 'webp',
            'application/pdf' => 'pdf'
        ];
        $ext = $mimeToExt[$mimeType] ?? 'bin';
        $postName = $originalFilename ?: ('upload_' . time() . '.' . $ext);

        if (pathinfo($postName, PATHINFO_EXTENSION) !== $ext) {
            $postName = pathinfo($postName, PATHINFO_FILENAME) . '.' . $ext;
        }

        $postFields = [
            'file'          => new CURLFile($filePath, $mimeType, $postName),
            'upload_preset' => $uploadPreset,
        ];

        $ch = curl_init();
        curl_setopt_array($ch, [
            CURLOPT_URL            => $url,
            CURLOPT_POST           => true,
            CURLOPT_POSTFIELDS     => $postFields,
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_TIMEOUT        => 30,
            CURLOPT_SSL_VERIFYPEER => false,
        ]);

        $response = curl_exec($ch);
        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        $curlError = curl_error($ch);
        curl_close($ch);

        if ($curlError) {
            error_log("[CloudinaryService] cURL Error: {$curlError}");
            return null;
        }

        if ($httpCode !== 200) {
            error_log("[CloudinaryService] HTTP {$httpCode} Response: {$response}");
            return null;
        }

        $data = json_decode($response, true);
        if ($data && !empty($data['secure_url'])) {
            return $data['secure_url'];
        }

        error_log("[CloudinaryService] No secure_url in response: {$response}");
        return null;
    }
}
