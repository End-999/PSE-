<?php
session_start();
include("../connect.php");

// Enable error reporting for debugging (remove in production)
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['signIn'])) {
    // Get form data
    $email = trim($_POST['email']);
    $password = $_POST['password'];

    $_SESSION['signUpErrors'] = [];
    $_SESSION['signInErrors'] = [];

  

    // Validate email
    if (empty($email)) {
        $_SESSION['signInErrors'][] = "Email is required!";
    } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $_SESSION['signInErrors'][] = "Invalid email format!";
    }

    // Validate password
    if (empty($password)) {
        $_SESSION['signInErrors'][] = "Password is required!";
    } elseif (strlen($password) < 6) {
        $_SESSION['signInErrors'][] = "Password must be at least 6 characters!";
    }

    if (!empty($_SESSION['signInErrors'])) {
      header("Location: index.php");
      exit();
  }
    // Fetch user data from the database
    $query = "SELECT * FROM users WHERE email = ?";
    $stmt = $conn->prepare($query);
    if (!$stmt) {
        die("Prepare failed: " . $conn->error);
    }
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows === 1) {
        $user = $result->fetch_assoc();

        // Verify password
        if (password_verify($password, $user['password'])) {
            // Set session variables and redirect to homepage
            $_SESSION['email'] = $user['email'];
            header("Location: ../afterlogin/pharmacy.html");
            exit;
        } else {
          $_SESSION['signInErrors'][] = "Invalid Password or Email!";
          header("Location: index.php");
        }
    } else {
      $_SESSION['signInErrors'][] = "Invalid Password or Email!";
      header("Location: index.php");
    }
}
?>