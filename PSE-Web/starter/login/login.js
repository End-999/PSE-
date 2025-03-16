const container = document.getElementById('container');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');

registerBtn.addEventListener('click', () => {
  container.classList.add('active');
});

loginBtn.addEventListener('click', () => {
  container.classList.remove('active');
});

// const redirect = document.querySelectorAll('.redirect');
// // console.log(redirect);

// redirect.forEach((btn) => {
//   btn.addEventListener('click', (e) => {
//     e.preventDefault();
//     window.location.href = '../pharmacy/Pharmacy.html';
//     // console.log('hel');
//   });
// });

document.addEventListener('DOMContentLoaded', () => {
  // Get form elements
  const signUpForm = document.querySelector('.sign-up form');
  const signInForm = document.querySelector('.sign-in form');

  // Get email and password input fields
  const signUpEmail = signUpForm.querySelector('.signUp-check-email');
  const signUpPassword = signUpForm.querySelector('.signUp-check-password');
  const signInEmail = signInForm.querySelector('.e-value');
  const signInPassword = signInForm.querySelector('.p-value');

  // Error display spans
  const signUpError = signUpForm.querySelector('.error-signUp');
  const signInError = signInForm.querySelector('.error-signIn');

  // Regular expression for email validation
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

  // Validate Sign Up form
  signUpForm.addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent form submission

    const email = signUpEmail.value;
    const password = signUpPassword.value;

    // Clear previous error message
    signUpError.textContent = '';

    // Email validation
    if (!email.match(emailPattern)) {
      signUpError.textContent = 'Please enter a valid email address.';
      return;
    }

    // Password validation
    if (password.length < 6) {
      signUpError.textContent =
        'Password should be at least 6 characters long.';
      return;
    }

    // Redirect to Pharmacy.html upon successful sign-up
    window.location.href = '../afterlogin/Pharmacy.html';
  });

  // Validate Sign In form
  signInForm.addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent form submission

    const email = signInEmail.value;
    const password = signInPassword.value;

    // Clear previous error message
    signInError.textContent = '';

    // Email validation
    if (!email.match(emailPattern)) {
      signInError.textContent = 'Please enter a valid email address.';
      return;
    }

    // Password validation
    if (password === '') {
      signInError.textContent = 'Password cannot be empty.';
      return;
    }

    // Redirect to Pharmacy.html upon successful sign-in
    window.location.href = '../afterlogin/Pharmacy.html';
  });
});
