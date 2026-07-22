<?php

include_once "../models/Student.php";

class StudentController
{
    private $student;

    public function __construct()
    {
        $this->student = new Student();
    }

    public function checkDuplicate($phone_number, $email, $id = null)
{
    return $this->student->checkDuplicate($phone_number, $email, $id);
}

    // CREATE
    public function createStudent($firstname, $middlename, $lastname, $course, $year_level, $phone_number, $email)
    {
        return $this->student->create(
            $firstname,
            $middlename,
            $lastname,
            $course,
            $year_level,
            $phone_number,
            $email
        );
    }

    // READ ALL
    public function getStudents()
    {
        return $this->student->read();
    }

    // READ ONE
    public function getStudent($id)
    {
        return $this->student->readOne($id);
    }

    // UPDATE
    public function updateStudent($id, $firstname, $middlename, $lastname, $course, $year_level, $phone_number, $email)
    {
        return $this->student->update(
            $id,
            $firstname,
            $middlename,
            $lastname,
            $course,
            $year_level,
            $phone_number,
            $email
        );
    }

    // DELETE
    public function deleteStudent($id)
    {
        return $this->student->delete($id);
    }
}