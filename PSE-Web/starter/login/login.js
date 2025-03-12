const container = document.getElementById('container');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');

registerBtn.addEventListener('click', () => {
  container.classList.add('active');
});

loginBtn.addEventListener('click', () => {
  container.classList.remove('active');
});

const redirect = document.querySelectorAll('.redirect');
// console.log(redirect);

redirect.forEach((btn) => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    window.location.href = '../pharmacy/Pharmacy.html';
    // console.log('hel');
  });
});
