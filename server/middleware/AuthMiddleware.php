<?php

include_once "../models/User.php";
include_once "../models/Session.php";

class AuthMiddleware
{
    public static function authenticate()
    {
        $authorization = self::getAuthorizationHeader();

        if (!$authorization || !preg_match('/Bearer\s(\S+)/', $authorization, $matches)) {
            return false;
        }

        $token = $matches[1];
        $session = new Session();
        $sessionData = $session->findByToken($token);

        if (!$sessionData) {
            return false;
        }

        $user = new User();
        return $user->findById($sessionData['user_id']);
    }

    private static function getAuthorizationHeader()
    {
        if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
            return trim($_SERVER['HTTP_AUTHORIZATION']);
        }

        if (isset($_SERVER['REDIRECT_HTTP_AUTHORIZATION'])) {
            return trim($_SERVER['REDIRECT_HTTP_AUTHORIZATION']);
        }

        if (function_exists('apache_request_headers')) {
            $headers = apache_request_headers();
            if (isset($headers['Authorization'])) {
                return trim($headers['Authorization']);
            }
            if (isset($headers['authorization'])) {
                return trim($headers['authorization']);
            }
        }

        if (function_exists('getallheaders')) {
            $headers = getallheaders();
            if (isset($headers['Authorization'])) {
                return trim($headers['Authorization']);
            }
            if (isset($headers['authorization'])) {
                return trim($headers['authorization']);
            }
        }

        return null;
    }
}
