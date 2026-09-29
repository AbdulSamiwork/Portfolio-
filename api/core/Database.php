<?php
/**
 * Unified Database Singleton with PDO Connection Pool
 */
class Database {
    private static $instance = null;
    public $conn;

    public function __construct() {
        $this->conn = null;

        // Auto-detect environment: Localhost vs Live InfinityFree
        $httpHost = $_SERVER['HTTP_HOST'] ?? '';
        $isLocal = ($httpHost === 'localhost' || strpos($httpHost, '127.0.0.1') !== false || strpos($httpHost, '192.168.') !== false || php_sapi_name() === 'cli');

        if ($isLocal) {
            // Local Development (XAMPP)
            $host = "localhost";
            $port = "3306";
            $db_name = "abdul_sami_portfolio";
            $username = "root";
            $password = "";
        } else {
            // Live InfinityFree Production
            $host = "sql200.infinityfree.com";
            $port = "3306";
            $db_name = "if0_43031817_abdul_sami";
            $username = "if0_43031817";
            $password = "A7T2Zf4okpzh";
        }

        try {
            $dsn = "mysql:host={$host};port={$port};dbname={$db_name};charset=utf8mb4";
            $this->conn = new PDO(
                $dsn,
                $username,
                $password,
                [
                    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                    PDO::ATTR_EMULATE_PREPARES => false
                ]
            );
        } catch(PDOException $exception) {
            error_log("Database Connection Error: " . $exception->getMessage());
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
