<?php
session_start();
include("../connect.php");

// Enable error reporting for debugging (remove in production)
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Handle Registration Form Submission
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['signUp'])) {
    // Get form data
    $fullName = trim($_POST['fullName']);
    $email = trim($_POST['email']);
    $password = $_POST['password'];

    // Debug: Print received data
    echo "<pre>";
    print_r($_POST);
    echo "</pre>";

    $_SESSION['signUpErrors'] = [];

    // Validate name
    if (empty($fullName)) {
        $_SESSION['signUpErrors'][] = "Name is required!";
    }

    // Validate email
    if (empty($email)) {
        $_SESSION['signUpErrors'][] = "Email is required!";
    } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $_SESSION['signUpErrors'][] = "Invalid email format!";
    }

    // Validate password
    if (empty($password)) {
        $_SESSION['signUpErrors'][] = "Password is required!";
    } elseif (strlen($password) < 6) {
        $_SESSION['signUpErrors'][] = "Password must be at least 6 characters!";
    }

    // If there are errors, redirect back to index.php
    if (!empty($_SESSION['signUpErrors'])) {
        $_SESSION['formActive'] = "active"; // Set active form to Sign Up
        header("Location: index.php");
        exit();
    }
    // Check if email already exists in the database
    $checkEmailQuery = "SELECT * FROM users WHERE email = ?";
    $stmt = $conn->prepare($checkEmailQuery);
    if (!$stmt) {
        die("Prepare failed: " . $conn->error);
    }
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        echo "Email already exists. Please use a different email.";
        exit;
    }

    // Hash the password for security
    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

    // Insert data into the database
    $insertQuery = "INSERT INTO users (fullName, email, password) VALUES (?, ?, ?)";
    $stmt = $conn->prepare($insertQuery); //to prevent from sql injection
    if (!$stmt) {
        die("Prepare failed: " . $conn->error);
    }
    $stmt->bind_param("sss", $fullName, $email, $hashedPassword);

    if ($stmt->execute()) {
        echo "User registered successfully!";
        $_SESSION['email'] = $email; // Set session variable
        header("Location: ../afterlogin/pharmacy.html"); // Redirect to homepage
        exit;
    } else {
        echo "Error inserting user: " . $stmt->error;
    }
}


// Handle Login Form Submission
// if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['signIn'])) {
//     // Get form data
//     $email = trim($_POST['email']);
//     $password = $_POST['password'];

//     // Validate input
//     if (empty($email) || empty($password)) {
//         echo "Email and password are required.";
//         exit;
//     }

//     // Fetch user data from the database
//     $query = "SELECT * FROM users WHERE email = ?";
//     $stmt = $conn->prepare($query);
//     if (!$stmt) {
//         die("Prepare failed: " . $conn->error);
//     }
//     $stmt->bind_param("s", $email);
//     $stmt->execute();
//     $result = $stmt->get_result();

//     if ($result->num_rows === 1) {
//         $user = $result->fetch_assoc();

//         // Verify password
//         if (password_verify($password, $user['password'])) {
//             // Set session variables and redirect to homepage
//             $_SESSION['email'] = $user['email'];
//             header("Location: homepage.php");
//             exit;
//         } else {
//             echo "Invalid password.";
//         }
//     } else {
//         echo "User not found.";
//     }
// }
?>