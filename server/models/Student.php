<?php

include_once "../config/database.php";

class Student
{
    private $conn;
    private $table = "students";

    public function __construct()
    {
        global $pdo;
        $this->conn = $pdo;
    }

    // CREATE
    public function create($firstname, $middlename, $lastname, $course, $year_level, $phone_number, $email)
    {
        $sql = "INSERT INTO {$this->table}
                (firstname, middlename, lastname, course, year_level, phone_number, email)
                VALUES (?, ?, ?, ?, ?, ?, ?)";

        $stmt = $this->conn->prepare($sql);

        return $stmt->execute([
            $firstname,
            $middlename,
            $lastname,
            $course,
            $year_level,
            $phone_number,
            $email
        ]);
    }

    // READ ALL
    public function read()
    {
        $sql = "SELECT * FROM {$this->table} ORDER BY created_at DESC";

        $stmt = $this->conn->prepare($sql);
        $stmt->execute();

        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    // READ ONE
    public function readOne($id)
    {
        $sql = "SELECT * FROM {$this->table} WHERE id = ?";

        $stmt = $this->conn->prepare($sql);
        $stmt->execute([$id]);

        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    // UPDATE
    public function update($id, $firstname, $middlename, $lastname, $course, $year_level, $phone_number, $email)
    {
        $sql = "UPDATE {$this->table}
                SET firstname = ?,
                    middlename = ?,
                    lastname = ?,
                    course = ?,
                    year_level = ?,
                    phone_number = ?,
                    email = ?
                WHERE id = ?";

        $stmt = $this->conn->prepare($sql);

        return $stmt->execute([
            $firstname,
            $middlename,
            $lastname,
            $course,
            $year_level,
            $phone_number,
            $email,
            $id
        ]);
    }

    // DELETE
    public function delete($id)
    {
        $sql = "DELETE FROM {$this->table} WHERE id = ?";

        $stmt = $this->conn->prepare($sql);

        return $stmt->execute([$id]);
    }

    // CHECK DUPLICATE PHONE OR EMAIL
public function checkDuplicate($phone_number, $email, $id = null)
{
    if ($id) {
        $sql = "SELECT * FROM {$this->table}
                WHERE (phone_number = ? OR email = ?)
                AND id != ?";

        $stmt = $this->conn->prepare($sql);
        $stmt->execute([$phone_number, $email, $id]);
    } else {
        $sql = "SELECT * FROM {$this->table}
                WHERE phone_number = ? OR email = ?";

        $stmt = $this->conn->prepare($sql);
        $stmt->execute([$phone_number, $email]);
    }

    return $stmt->fetch(PDO::FETCH_ASSOC);
}
}