<?php

include_once "../config/database.php";

class User
{
    private $conn;
    private $table = "users";

    public function __construct()
    {
        global $pdo;
        $this->conn = $pdo;
    }

    public function findByUsernameOrEmail($identifier)
    {
        $sql = "SELECT * FROM {$this->table} WHERE username = ? OR email = ? LIMIT 1";
        $stmt = $this->conn->prepare($sql);
        $stmt->execute([$identifier, $identifier]);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public function findById($id)
    {
        $sql = "SELECT * FROM {$this->table} WHERE id = ? LIMIT 1";
        $stmt = $this->conn->prepare($sql);
        $stmt->execute([$id]);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public function create($username, $email, $passwordHash, $full_name, $role = 'admin')
    {
        $sql = "INSERT INTO {$this->table} (username, email, password, full_name, role) VALUES (?, ?, ?, ?, ?)";
        $stmt = $this->conn->prepare($sql);
        return $stmt->execute([
            $username,
            $email,
            $passwordHash,
            $full_name,
            $role,
        ]);
    }
}
