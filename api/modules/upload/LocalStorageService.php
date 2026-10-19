<?php

class LocalStorageService
{
    private static function getUploadDir(): string
    {
        $dir = __DIR__ . '/../../uploads/';
        if (!is_dir($dir)) {
            @mkdir($dir, 0777, true);
        }
        @chmod($dir, 0777);
        return $dir;
    }

    public static function getPublicFileUrl(string $filename): string
    {
        $protocol = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') ? "https://" : "http://";
        $host = $_SERVER['HTTP_HOST'] ?? $_SERVER['SERVER_NAME'] ?? 'localhost';
        return $protocol . $host . '/api/uploads/' . $filename;
    }

    public static function saveUploadedFile(string $tmpPath, string $extension): ?array
    {
        $uploadDir = self::getUploadDir();
        $newFileName = 'media_' . time() . '_' . bin2hex(random_bytes(6)) . '.' . $extension;
        $targetPath = $uploadDir . $newFileName;

        $rawBytes = @file_get_contents($tmpPath);
        $moved = @move_uploaded_file($tmpPath, $targetPath);
        if (!$moved && $rawBytes) {
            $moved = @file_put_contents($targetPath, $rawBytes) !== false;
        }

        if ($moved) {
            @chmod($targetPath, 0666);
            return [
                'filename' => $newFileName,
                'url'      => self::getPublicFileUrl($newFileName),
                'viewUrl'  => self::getPublicFileUrl('endpoints/view_media.php?file=' . $newFileName),
            ];
        }

        return null;
    }

    public static function saveBinaryData(string $decodedBytes, string $extension): ?array
    {
        $uploadDir = self::getUploadDir();
        $newFileName = 'media_' . time() . '_' . bin2hex(random_bytes(6)) . '.' . $extension;
        $targetPath = $uploadDir . $newFileName;

        if (@file_put_contents($targetPath, $decodedBytes) !== false) {
            @chmod($targetPath, 0666);
            return [
                'filename' => $newFileName,
                'url'      => self::getPublicFileUrl($newFileName),
                'viewUrl'  => self::getPublicFileUrl('endpoints/view_media.php?file=' . $newFileName),
            ];
        }

        return null;
    }
}
