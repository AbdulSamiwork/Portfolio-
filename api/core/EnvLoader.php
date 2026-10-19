<?php
/**
 * Lightweight .env file loader for Core PHP (no Composer dependencies needed).
 * Parses KEY=VALUE pairs from .env file and loads them into $_ENV and getenv().
 * 
 * Usage: require_once __DIR__ . '/EnvLoader.php'; EnvLoader::load();
 * Then:  EnvLoader::get('DB_HOST_LOCAL', 'localhost');
 */
class EnvLoader {
    private static $loaded = false;
    private static $vars = [];

    /**
     * Load .env file from the API root directory.
     * Safe to call multiple times — only loads once.
     */
    public static function load($path = null) {
        if (self::$loaded) return;

        $envPath = $path ?? __DIR__ . '/../.env';

        if (!file_exists($envPath)) {
            error_log("[EnvLoader] WARNING: .env file not found at {$envPath}. Using fallback defaults.");
            self::$loaded = true;
            return;
        }

        $lines = file($envPath, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
        foreach ($lines as $line) {
            $line = trim($line);

            // Skip comments and empty lines
            if ($line === '' || $line[0] === '#') continue;

            // Parse KEY=VALUE (supports optional quotes around value)
            if (strpos($line, '=') === false) continue;

            list($key, $value) = explode('=', $line, 2);
            $key = trim($key);
            $value = trim($value);

            // Strip surrounding quotes if present
            if (
                (strlen($value) >= 2) &&
                (($value[0] === '"' && $value[strlen($value)-1] === '"') ||
                 ($value[0] === "'" && $value[strlen($value)-1] === "'"))
            ) {
                $value = substr($value, 1, -1);
            }

            self::$vars[$key] = $value;

            // Also set in PHP's environment for getenv() compatibility
            if (!array_key_exists($key, $_ENV)) {
                $_ENV[$key] = $value;
            }
            if (getenv($key) === false) {
                putenv("{$key}={$value}");
            }
        }

        self::$loaded = true;
    }

    /**
     * Get an environment variable value.
     * Priority: $_ENV > putenv > .env file > default
     */
    public static function get($key, $default = '') {
        // Check if already set in real environment (server-level override)
        $envVal = getenv($key);
        if ($envVal !== false) return $envVal;

        if (isset($_ENV[$key])) return $_ENV[$key];

        // Fall back to parsed .env values
        return self::$vars[$key] ?? $default;
    }
}
