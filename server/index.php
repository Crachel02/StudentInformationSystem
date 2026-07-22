<?php
/**
 * Student Information System - Backend Entry Point
 * 
 * This is the main entry point for the PHP backend.
 * The actual API endpoints are located in the /api directory.
 * 
 * API Endpoints:
 * - /api/student.php - Handles all student CRUD operations
 */

header("Content-Type: application/json");

echo json_encode([
    "message" => "Student Information System API",
    "version" => "1.0.0",
    "endpoints" => [
        "GET /api/student.php - Get all students",
        "GET /api/student.php?id={id} - Get single student",
        "POST /api/student.php - Create new student",
        "PUT /api/student.php - Update student",
        "DELETE /api/student.php - Delete student"
    ]
]);
