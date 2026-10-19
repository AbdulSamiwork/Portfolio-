<?php
require_once __DIR__ . '/../../core/Response.php';
require_once __DIR__ . '/../../core/AuthMiddleware.php';
require_once __DIR__ . '/CloudinaryService.php';
require_once __DIR__ . '/LocalStorageService.php';

class UploadController
{
    private const MAX_FILE_SIZE = 5242880; // 5 MB

    private const ALLOWED_MIMES = [
        'image/jpeg'      => 'jpg',
        'image/png'       => 'png',
        'image/webp'      => 'webp',
        'application/pdf' => 'pdf'
    ];

    public static function handle(): void
    {
        AuthMiddleware::verifyAdmin();

        if (isset($_FILES['file']) || isset($_FILES['image'])) {
            self::handleMultipartUpload($_FILES['file'] ?? $_FILES['image']);
            return;
        }

        $input = Response::getJsonInput();
        if ($input && (!empty($input['data']) || !empty($input['image']) || !empty($input['file']))) {
            self::handleBase64Upload($input);
            return;
        }

        Response::error("No valid file or data payload provided.", 400);
    }

    private static function handleMultipartUpload(array $file): void
    {
        if ($file['error'] !== UPLOAD_ERR_OK) {
            Response::error("File upload failed with error code: " . (int)$file['error'], 400);
        }

        if ($file['size'] > self::MAX_FILE_SIZE) {
            Response::error("File exceeds maximum allowed size of 5MB.", 400);
        }

        $finfo = finfo_open(FILEINFO_MIME_TYPE);
        $realMime = finfo_file($finfo, $file['tmp_name']);
        finfo_close($finfo);

        if (!array_key_exists($realMime, self::ALLOWED_MIMES)) {
            Response::error("Invalid file format. Allowed types: JPG, PNG, WEBP, PDF.", 400);
        }

        // 1. Primary: Cloudinary
        $cloudinaryUrl = CloudinaryService::upload(
            $file['tmp_name'],
            $realMime,
            $file['name'] ?? null
        );

        if ($cloudinaryUrl) {
            Response::json([
                "status"  => "success",
                "message" => "File uploaded to Cloudinary CDN.",
                "url"     => $cloudinaryUrl,
                "source"  => "cloudinary"
            ]);
        }

        // 2. Fallback: Local Storage
        $ext = self::ALLOWED_MIMES[$realMime];
        $localResult = LocalStorageService::saveUploadedFile($file['tmp_name'], $ext);

        $rawBytes = @file_get_contents($file['tmp_name']);
        $base64DataUrl = $rawBytes ? 'data:' . $realMime . ';base64,' . base64_encode($rawBytes) : null;

        if ($localResult) {
            Response::json([
                "status"   => "success",
                "message"  => "File saved to local storage.",
                "url"      => $localResult['url'],
                "viewUrl"  => $localResult['viewUrl'],
                "filename" => $localResult['filename'],
                "dataUrl"  => $base64DataUrl,
                "source"   => "local"
            ]);
        } elseif ($base64DataUrl) {
            Response::json([
                "status"  => "success",
                "message" => "File processed as data payload.",
                "url"     => $base64DataUrl,
                "dataUrl" => $base64DataUrl,
                "source"  => "dataurl"
            ]);
        } else {
            Response::error("Failed to store uploaded file on server disk.", 500);
        }
    }

    private static function handleBase64Upload(array $input): void
    {
        $base64Data = $input['data'] ?? $input['image'] ?? $input['file'];

        if (!preg_match('/^data:(image\/(jpeg|png|webp)|application\/pdf);base64,/', $base64Data, $type)) {
            Response::error("Invalid base64 media header.", 400);
        }

        $realMime = $type[1];
        $cleanBase64 = substr($base64Data, strpos($base64Data, ',') + 1);
        $decodedData = base64_decode($cleanBase64, true);

        if ($decodedData === false) {
            Response::error("Corrupted base64 payload.", 400);
        }

        if (strlen($decodedData) > self::MAX_FILE_SIZE) {
            Response::error("Decoded file exceeds 5MB limit.", 400);
        }

        $extMap = ['image/jpeg' => 'jpg', 'image/png' => 'png', 'image/webp' => 'webp', 'application/pdf' => 'pdf'];
        $properExt = $extMap[$realMime] ?? 'bin';

        // Write to temp file for Cloudinary upload
        $tempFile = tempnam(sys_get_temp_dir(), 'upload_');
        file_put_contents($tempFile, $decodedData);
        $properTempFile = $tempFile . '.' . $properExt;
        rename($tempFile, $properTempFile);

        $properFilename = 'upload_' . time() . '.' . $properExt;
        $cloudinaryUrl = CloudinaryService::upload(
            $properTempFile,
            $realMime,
            $properFilename
        );

        @unlink($properTempFile);

        if ($cloudinaryUrl) {
            Response::json([
                "status"  => "success",
                "message" => "File uploaded to Cloudinary CDN.",
                "url"     => $cloudinaryUrl,
                "source"  => "cloudinary"
            ]);
        }

        // Fallback: Local Storage
        $localResult = LocalStorageService::saveBinaryData($decodedData, $properExt);

        if ($localResult) {
            Response::json([
                "status"   => "success",
                "message"  => "File saved to local storage.",
                "url"      => $localResult['url'],
                "viewUrl"  => $localResult['viewUrl'],
                "filename" => $localResult['filename'],
                "dataUrl"  => $input['data'],
                "source"   => "local"
            ]);
        } else {
            Response::json([
                "status"  => "success",
                "message" => "File stored as data payload.",
                "url"     => $input['data'],
                "dataUrl" => $input['data'],
                "source"  => "dataurl"
            ]);
        }
    }
}
