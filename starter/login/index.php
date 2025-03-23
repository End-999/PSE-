<?php
session_start();
if (isset($_SESSION['signUpErrors']) && !empty($_SESSION['signUpErrors'])) {
  echo '<div class="error-messages">';
  foreach ($_SESSION['signUpErrors'] as $error) {
      echo "<p style='color: red;'>" . htmlspecialchars($error) . "</p>";
  }
  echo '</div>';
  unset($_SESSION['signUpErrors']); // Clear errors after displaying
}
if (isset($_SESSION['signInErrors']) && !empty($_SESSION['signInErrors'])) {
  echo '<div class="error-messages">';
  foreach ($_SESSION['signInErrors'] as $error) {
      echo "<p style='color: red;'>" . htmlspecialchars($error) . "</p>";
  }
  echo '</div>';
  unset($_SESSION['signInErrors']); // Clear errors after displaying
}
?>
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css"
    />
    <link rel="stylesheet" href="login.css" />
    <title>Modern Login Page | AsmrProg</title>
  </head>

  <body>
    <div class="container" id="container">
      <!-- Sign Up Form -->
      <div class="form-container sign-up">
        <form method="post" action="register.php">
          <h1>Create Account</h1>
          <input type="text" placeholder="Name" name="fullName" required/>
          <input
            type="email"
            class="signUp-check-email"
            placeholder="Email"
            name="email" required
          />
          <input
            type="password"
            class="signUp-check-password"
            placeholder="Password"
            name="password" required
          />
          <span class="error-signUp"></span>
          <button class="signUp" name="signUp">Sign Up</button>
          <span>or register with social media platform</span>
          <div class="social-icons">
            <a href="#" class="icon"
              ><i class="fa-brands fa-google-plus-g"></i
            ></a>
            <a href="#" class="icon"><i class="fa-brands fa-facebook-f"></i></a>
          </div>
        </form>
      </div>

      <!-- Sign In Form -->
      <div class="form-container sign-in">
        <form method="post" action="login.php">
          <h1>Sign In</h1>
          <input
            type="email"
            class="e-value"
            placeholder="Email"
            name="email"
          />
          <input
            type="password"
            class="p-value"
            placeholder="Password"
            name="password"
          />
          <span class="error-signIn"></span>
          <a href="#">Forget Your Password?</a>
          <button class="redirect signIn" name="signIn">Sign In</button>
          <span>or use other platform</span>
          <div class="social-icons">
            <a href="#" class="icon"
              ><i class="fa-brands fa-google-plus-g"></i
            ></a>
            <a href="#" class="icon"><i class="fa-brands fa-facebook-f"></i></a>
          </div>
        </form>
      </div>

      <!-- Toggle Container -->
      <div class="toggle-container">
        <div class="toggle">
          <div class="toggle-panel toggle-left">
            <h1>Welcome Back!</h1>
            <p>Enter your personal details to use all of site features</p>
            <button class="hidden" id="login">Sign In</button>
          </div>
          <div class="toggle-panel toggle-right">
            <h1>Hello, Friend!</h1>
            <p>
              The best day to join Hamro App was one year ago. The second best
              is today!
            </p>
            <button class="hidden" id="register">Sign Up</button>
          </div>
        </div>
      </div>
    </div>

    <script src="login.js"></script>
  </body>
</html>
