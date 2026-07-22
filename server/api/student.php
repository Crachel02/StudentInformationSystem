<?php

header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Authorization is handled by middleware; temporary debug logging removed.

include_once "../controllers/StudentController.php";
include_once "../middleware/AuthMiddleware.php";

$user = AuthMiddleware::authenticate();

if (!$user) {
    http_response_code(401);
    echo json_encode([
        "success" => false,
        "message" => "Unauthorized. Please login.",
    ]);
    exit();
}

$controller = new StudentController();

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {

    // GET
    case "GET":

        if (isset($_GET['id'])) {
            $result = $controller->getStudent($_GET['id']);
            echo json_encode($result);
        } else {
            $result = $controller->getStudents();
            echo json_encode($result);
        }

        break;

    // CREATE
    case "POST":

    $data = json_decode(file_get_contents("php://input"), true);
    if (!is_array($data)) {
        http_response_code(400);
        echo json_encode([
            "success" => false,
            "message" => "Invalid JSON payload.",
        ]);
        exit();
    }

    $duplicate = $controller->checkDuplicate(
        $data['phone_number'],
        $data['email']
    );

    if ($duplicate) {
        echo json_encode([
            "success" => false,
            "message" => $duplicate['phone_number'] == $data['phone_number']
                ? "Phone number already exists."
                : "Email already exists."
        ]);
        break;
    }

    $success = $controller->createStudent(
        $data['firstname'],
        $data['middlename'],
        $data['lastname'],
        $data['course'],
        $data['year_level'],
        $data['phone_number'],
        $data['email']
    );

    echo json_encode([
        "success" => $success
    ]);

    break;

    // UPDATE
    case "PUT":

    $data = json_decode(file_get_contents("php://input"), true);
    if (!is_array($data)) {
        http_response_code(400);
        echo json_encode([
            "success" => false,
            "message" => "Invalid JSON payload.",
        ]);
        exit();
    }

    $duplicate = $controller->checkDuplicate(
        $data['phone_number'],
        $data['email'],
        $data['id']
    );

    if ($duplicate) {
        echo json_encode([
            "success" => false,
            "message" => $duplicate['phone_number'] == $data['phone_number']
                ? "Phone number already exists."
                : "Email already exists."
        ]);
        break;
    }

    $success = $controller->updateStudent(
        $data['id'],
        $data['firstname'],
        $data['middlename'],
        $data['lastname'],
        $data['course'],
        $data['year_level'],
        $data['phone_number'],
        $data['email']
    );

    echo json_encode([
        "success" => $success
    ]);

    break;

    // DELETE
    case "DELETE":

        $data = json_decode(file_get_contents("php://input"), true);
        if (!is_array($data) || !isset($data['id'])) {
            http_response_code(400);
            echo json_encode([
                "success" => false,
                "message" => "Invalid or missing id.",
            ]);
            exit();
        }

        $success = $controller->deleteStudent($data['id']);

        echo json_encode([
            "success" => $success
        ]);

        break;

    default:

        echo json_encode([
            "message" => "Invalid Request"
        ]);

        break;
}