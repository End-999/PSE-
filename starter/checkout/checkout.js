document.addEventListener('DOMContentLoaded', () => {
  const orderSummaryContainer = document.querySelector('.order-summary');
  const itemsTotalElement = document.querySelector('.js-items-total');
  const shippingCostElement = document.querySelector('.js-shipping-cost');
  const subtotalElement = document.querySelector('.js-subtotal');
  const taxElement = document.querySelector('.js-tax');
  const totalElement = document.querySelector('.js-total');

  // Load cart from localStorage
  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  function renderCartSummary() {
    let cartHTML = '';
    let itemsTotal = 0;

    cart.forEach((item, index) => {
      const priceValue = parseFloat(item.price.replace('Rs ', ''));
      itemsTotal += priceValue * (item.quantity || 1);

      cartHTML += `
        <div class="cart-item-container" data-index="${index}">
          <div class="delivery-date">Delivery date: Tuesday, June 21</div>

          <div class="cart-item-details-grid">
            <img class="product-image" src="${item.image}" alt="${item.name}" />

            <div class="cart-item-details">
              <div class="product-name">${item.name}</div>
              <div class="product-price">${item.price}</div>
              <div class="product-quantity">
                <span> Quantity: </span>
                <input 
                  type="number" 
                  class="quantity-input js-quantity-input" 
                  value="${item.quantity || 1}" 
                  min="1" 
                  data-index="${index}"
                />
                <span class="delete-quantity-link link-primary js-delete-link" data-index="${index}">
                  Delete
                </span>
              </div>
            </div>

            <div class="delivery-options">
              <div class="delivery-options-title">Choose a delivery option:</div>
              <div class="delivery-option">
                <input type="radio" checked class="delivery-option-input" name="delivery-option-${index}" />
                <div>
                  <div class="delivery-option-date">Tuesday, June 21</div>
                  <div class="delivery-option-price">FREE Shipping</div>
                </div>
              </div>
              <div class="delivery-option">
                <input type="radio" class="delivery-option-input" name="delivery-option-${index}" />
                <div>
                  <div class="delivery-option-date">Wednesday, June 15</div>
                  <div class="delivery-option-price">$4.99 - Shipping</div>
                </div>
              </div>
              <div class="delivery-option">
                <input type="radio" class="delivery-option-input" name="delivery-option-${index}" />
                <div>
                  <div class="delivery-option-date">Monday, June 13</div>
                  <div class="delivery-option-price">$9.99 - Shipping</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      `;
    });

    orderSummaryContainer.innerHTML = cartHTML;

    // Add event listeners to delete buttons
    document.querySelectorAll('.js-delete-link').forEach((link) => {
      link.addEventListener('click', (event) => {
        const index = event.target.dataset.index;
        cart.splice(index, 1); // Remove item from cart
        localStorage.setItem('cart', JSON.stringify(cart)); // Save updated cart
        renderCartSummary(); // Re-render the cart summary
      });
    });

    // Add event listeners to quantity inputs
    document.querySelectorAll('.js-quantity-input').forEach((input) => {
      input.addEventListener('change', (event) => {
        const index = event.target.dataset.index;
        const newQuantity = parseInt(event.target.value, 10);

        if (newQuantity > 0) {
          cart[index].quantity = newQuantity; // Update quantity in cart
          localStorage.setItem('cart', JSON.stringify(cart)); // Save updated cart
          renderCartSummary(); // Re-render the cart summary
        } else {
          event.target.value = cart[index].quantity || 1; // Reset invalid input
        }
      });
    });

    // Update totals
    updateTotals(itemsTotal);
  }

  function updateTotals(itemsTotal) {
    const shippingCost = 4.99; // Fixed shipping cost
    const taxRate = 0.1; // 10% tax

    const subtotal = itemsTotal + shippingCost;
    const tax = subtotal * taxRate;
    const total = subtotal + tax;

    itemsTotalElement.textContent = `Rs ${itemsTotal.toFixed(2)}`;
    shippingCostElement.textContent = `Rs ${shippingCost.toFixed(2)}`;
    subtotalElement.textContent = `Rs ${subtotal.toFixed(2)}`;
    taxElement.textContent = `Rs ${tax.toFixed(2)}`;
    totalElement.textContent = `Rs ${total.toFixed(2)}`;
  }

  // Render the cart summary on page load
  renderCartSummary();
});
