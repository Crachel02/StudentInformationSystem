<?php

header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

include_once "../controllers/AuthController.php";

$controller = new AuthController();
$method = $_SERVER['REQUEST_METHOD'];
$action = $_GET['action'] ?? '';

if ($method === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);

    switch ($action) {
        case 'login':
            $username = $data['username'] ?? '';
            $password = $data['password'] ?? '';
            echo json_encode($controller->login($username, $password));
            break;

        case 'logout':
            $authorization = $_SERVER['HTTP_AUTHORIZATION'] ?? null;
            $token = null;

            if ($authorization && preg_match('/Bearer\s(\S+)/', $authorization, $matches)) {
                $token = $matches[1];
            }

            echo json_encode($controller->logout($token));
            break;

        case 'register':
            $username = $data['username'] ?? '';
            $email = $data['email'] ?? '';
            $password = $data['password'] ?? '';
            $full_name = $data['full_name'] ?? '';
            $role = $data['role'] ?? 'staff';
            echo json_encode($controller->register($username, $email, $password, $full_name, $role));
            break;

        default:
            http_response_code(400);
            echo json_encode([
                'success' => false,
                'message' => 'Invalid auth action.',
            ]);
            break;
    }
    exit();
}

http_response_code(405);
echo json_encode([
    'success' => false,
    'message' => 'Method not allowed.',
]);
