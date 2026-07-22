<?php

include_once "../config/database.php";

class Session
{
    private $conn;
    private $table = "sessions";

    public function __construct()
    {
        global $pdo;
        $this->conn = $pdo;
    }

    public function create($userId, $token)
    {
        $sql = "INSERT INTO {$this->table} (user_id, token, expires_at) VALUES (?, ?, DATE_ADD(NOW(), INTERVAL 2 HOUR))";
        $stmt = $this->conn->prepare($sql);
        return $stmt->execute([$userId, $token]);
    }

    public function findByToken($token)
    {
        // Reintroduce expiry verification to ensure only active sessions are accepted.
        $sql = "SELECT * FROM {$this->table} WHERE token = ? AND expires_at > CURRENT_TIMESTAMP LIMIT 1";
        $stmt = $this->conn->prepare($sql);
        $stmt->execute([$token]);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public function deleteByToken($token)
    {
        $sql = "DELETE FROM {$this->table} WHERE token = ?";
        $stmt = $this->conn->prepare($sql);
        return $stmt->execute([$token]);
    }
}
