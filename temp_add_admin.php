//WELLAN'S NOTE: RUN THIS TO ADD AN ADMIN ACCOUNT TO THE DATABASE
//THIS IS A TEMPORARY FILE, DELETE AFTER RUNNING
//I WILL MODIFY THIS TO MANAGE ACCOUNT VIA THE WEBSITE

<?php
include 'connect.php'; // Database connection file
/*
// Define admin account details
$email = "admin@gmail.com";
$password = "Admin123"; // Change this to a secure password
$role = "Admin";
$status = "Active";


$hashed_password = password_hash($password, PASSWORD_DEFAULT);


$stmt = $conn->prepare("SELECT user_id FROM users WHERE email = ?");
$stmt->bind_param("s", $email);
$stmt->execute();
$stmt->store_result();

if ($stmt->num_rows > 0) {
    echo "Admin account already exists!";
} else {
    // Insert admin into users table
    $stmt = $conn->prepare("INSERT INTO users (email, password, role, status, created_at) VALUES (?, ?, ?, ?, NOW())");
    $stmt->bind_param("ssss", $email, $hashed_password, $role, $status);

    if ($stmt->execute()) {
        echo "Admin account created successfully!";
    } else {
        echo "Error: " . $stmt->error;
    }
}
*/
// Close the connection
$stmt->close();
$conn->close();
?>