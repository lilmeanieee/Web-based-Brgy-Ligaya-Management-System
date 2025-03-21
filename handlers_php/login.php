<?php
session_start();
require 'connect.php'; // Database connection file

// Debugging code removed to ensure script execution continues


if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = trim($_POST["email"]);
    $password = trim($_POST["password"]);

    // Check if fields are empty
    if (empty($email) || empty($password)) {
        $_SESSION['error'] = "Both fields are required.";
        header("Location: ../html/login.html");
        exit();
    }

    // Prepare SQL query
    $stmt = $conn->prepare("SELECT user_id, password, role FROM users WHERE email = ? AND status = 'Active'");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $stmt->store_result();

    // Check if email exists
    if ($stmt->num_rows > 0) {
        $stmt->bind_result($user_id, $hashed_password, $role);
        $stmt->fetch();

        // Verify password
        if (password_verify($password, $hashed_password)) {
            $_SESSION['user_id'] = $user_id;
            $_SESSION['role'] = $role;

            // Redirect based on role
            if ($role == "Admin" || $role == "Sub-Admin") {
                header("Location: ../html/admin/announcements/news-and-updates.html");
            } else {
                header("Location: ../html/home.php");
            }
            exit();
        } else {
            $_SESSION['error'] = "Invalid email or password.";
        }
    } else {
        $_SESSION['error'] = "No active account found.";
    }

    // Redirect back to login page with error
    header("Location: ../html/login.html");
    exit();
}
