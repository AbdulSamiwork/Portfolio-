<?php
// Core PHP Database Connection Helper via PDO
class Database {
    public $conn;

    public function getConnection() {
        $this->conn = null;

        $httpHost = $_SERVER['HTTP_HOST'] ?? '';
        $isLocal = ($httpHost === 'localhost' || strpos($httpHost, '127.0.0.1') !== false || strpos($httpHost, '192.168.') !== false || php_sapi_name() === 'cli');

        if ($isLocal) {
            $host = "localhost";
            $port = "3306";
            $db_name = "abdul_sami_portfolio";
            $username = "root";
            $password = "";
        } else {
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
        return $this->conn;
    }
}
