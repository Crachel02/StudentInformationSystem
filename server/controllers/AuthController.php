<?php

include_once "../models/User.php";
include_once "../models/Session.php";

class AuthController
{
    private $user;
    private $session;

    public function __construct()
    {
        $this->user = new User();
        $this->session = new Session();
    }

    public function login($identifier, $password)
    {
        $user = $this->user->findByUsernameOrEmail($identifier);

        if (!$user || !password_verify($password, $user['password'])) {
            return [
                'success' => false,
                'message' => 'Invalid credentials.',
            ];
        }

        $token = bin2hex(random_bytes(32));
        $this->session->create($user['id'], $token);

        return [
            'success' => true,
            'token' => $token,
            'user' => [
                'id' => $user['id'],
                'username' => $user['username'],
                'email' => $user['email'],
                'full_name' => $user['full_name'],
                'role' => $user['role'],
            ],
        ];
    }

    public function logout($token)
    {
        if (!$token) {
            return [
                'success' => false,
                'message' => 'Missing token.',
            ];
        }

        $deleted = $this->session->deleteByToken($token);

        return [
            'success' => $deleted,
            'message' => $deleted ? 'Logged out successfully.' : 'Unable to log out.',
        ];
    }

    public function register($username, $email, $password, $full_name, $role = 'staff')
    {
        $passwordHash = password_hash($password, PASSWORD_DEFAULT);

        $created = $this->user->create($username, $email, $passwordHash, $full_name, $role);

        return [
            'success' => $created,
            'message' => $created ? 'User registered successfully.' : 'Failed to register user.',
        ];
    }
}
