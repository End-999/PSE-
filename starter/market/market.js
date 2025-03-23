document.addEventListener('DOMContentLoaded', () => {
  const addToCartButtons = document.querySelectorAll('.cart-js');
  const cartQuantityElement = document.querySelector('.js-cart-quantity');

  // Load cart from localStorage or initialize an empty array
  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  function updateCartQuantity() {
    // Calculate the total number of items in the cart (sum of quantities)
    let totalQuantity = 0;
    cart.forEach((item) => {
      totalQuantity += item.quantity || 1; // Default to 1 if quantity is undefined
    });
    cartQuantityElement.textContent = totalQuantity;
  }
  updateCartQuantity();

  addToCartButtons.forEach((button) => {
    button.addEventListener('click', (event) => {
      const productCard = event.target.closest('.product-card');

      const product = {
        name: productCard.querySelector('h3').textContent,
        price: productCard.querySelector('.price').textContent,
        image: productCard.querySelector('img').src,
        quantity: 1, // Default quantity is 1
      };

      // Check if the product already exists in the cart
      const existingProduct = cart.find((item) => item.name === product.name);
      if (existingProduct) {
        existingProduct.quantity += 1; // Increment quantity if product already exists
      } else {
        cart.push(product); // Add new product to the cart
      }

      // Save updated cart to localStorage
      localStorage.setItem('cart', JSON.stringify(cart));

      // Update UI
      productCard.querySelector('.added').textContent = '✅ Added';
      updateCartQuantity(); // Update the cart quantity in the header
    });
  });
});
