<?php
/**
 * Unified Database Singleton with PDO Connection Pool
 */
require_once __DIR__ . '/EnvLoader.php';

class Database {
    private static $instance = null;
    public $conn;

    public function __construct() {
        $this->conn = null;
        EnvLoader::load();

        // Auto-detect environment: Localhost vs Live InfinityFree
        $httpHost = $_SERVER['HTTP_HOST'] ?? '';
        $isLocal = ($httpHost === 'localhost' || strpos($httpHost, '127.0.0.1') !== false || strpos($httpHost, '192.168.') !== false || php_sapi_name() === 'cli');

        if ($isLocal) {
            // Local Development (XAMPP)
            $host = EnvLoader::get('DB_HOST_LOCAL', 'localhost');
            $port = EnvLoader::get('DB_PORT_LOCAL', '3306');
            $db_name = EnvLoader::get('DB_NAME_LOCAL', 'abdul_sami_portfolio');
            $username = EnvLoader::get('DB_USER_LOCAL', 'root');
            $password = EnvLoader::get('DB_PASS_LOCAL', '');
        } else {
            // Live InfinityFree Production
            $host = EnvLoader::get('DB_HOST_LIVE', '');
            $port = EnvLoader::get('DB_PORT_LIVE', '3306');
            $db_name = EnvLoader::get('DB_NAME_LIVE', '');
            $username = EnvLoader::get('DB_USER_LIVE', '');
            $password = EnvLoader::get('DB_PASS_LIVE', '');
        }

        $hosts = [$host];
        if (!$isLocal && strpos($host, 'infinityfree.com') !== false) {
            $hosts[] = str_replace('infinityfree.com', 'epizy.com', $host);
        }

        foreach ($hosts as $h) {
            try {
                $dsn = "mysql:host={$h};port={$port};dbname={$db_name};charset=utf8mb4";
                $this->conn = new PDO(
                    $dsn,
                    $username,
                    $password,
                    [
                        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                        PDO::ATTR_EMULATE_PREPARES => false,
                        PDO::ATTR_TIMEOUT => 4
                    ]
                );
                break;
            } catch(PDOException $exception) {
                error_log("Database Connection Error on [{$h}]: " . $exception->getMessage());
            }
        }
    }

    public function getConnection() {
        return $this->conn;
    }

    public static function getInstance() {
        if (self::$instance === null) {
            self::$instance = new self();
        }
        return self::$instance->getConnection();
    }
}
