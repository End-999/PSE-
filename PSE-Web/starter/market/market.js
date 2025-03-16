document.addEventListener('DOMContentLoaded', () => {
  // Get all the "Add to Cart" buttons
  const addToCartButtons = document.querySelectorAll('.cart-js');

  // Iterate over each button and add click event listener
  addToCartButtons.forEach((button) => {
    button.addEventListener('click', (event) => {
      // Find the specific product card that was clicked
      const productCard = event.target.closest('.product-card');

      // Find the 'added' span inside the product card
      const addedText = productCard.querySelector('.added');

      // Change the text to "Added" to indicate the item was added to the cart
      addedText.textContent = '✅ Added';
    });
  });
});
