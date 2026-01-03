// Checkout Page - Updated to redirect to payment page

const checkoutItemsEl = document.getElementById('checkout-items');
const checkoutTotalEl = document.getElementById('checkout-total');
const proceedToPaymentBtn = document.getElementById('proceed-to-payment-btn');
const checkoutMessage = document.getElementById('checkout-message');

function renderCheckout() {
  const cart = getCart();

  if (cart.length === 0) {
    checkoutItemsEl.innerHTML = `
      <div class="empty-cart">
        <div class="empty-cart-icon">🛒</div>
        <p>Your cart is empty.</p>
        <a href="restaurants.html" class="btn btn-primary">Browse Restaurants</a>
      </div>
    `;
    if (proceedToPaymentBtn) proceedToPaymentBtn.style.display = 'none';
    return;
  }

  let subtotal = 0;

  const itemsHTML = cart
    .map((item) => {
      subtotal += item.price * item.qty;
      return `
        <div class="cart-page-item">
          ${
            item.image
              ? `<img src="${item.image}" alt="${item.name}" class="cart-item-image" />`
              : ''
          }
          <div class="cart-item-details">
            <div class="cart-page-item-name">${item.name}</div>
            <div class="cart-page-item-price">Rs. ${item.price} × ${item.qty}</div>
          </div>
          <div class="cart-item-total">Rs. ${(item.price * item.qty).toFixed(0)}</div>
        </div>
      `;
    })
    .join('');

  checkoutItemsEl.innerHTML = itemsHTML;

  const deliveryFee = 150;
  const total = subtotal + deliveryFee;

  if (checkoutTotalEl) {
    checkoutTotalEl.innerHTML = `
      <div class="cart-summary-row">
        <span>Subtotal:</span>
        <span>Rs. ${subtotal.toFixed(0)}</span>
      </div>
      <div class="cart-summary-row">
        <span>Delivery Fee:</span>
        <span>Rs. ${deliveryFee.toFixed(0)}</span>
      </div>
      <div class="cart-summary-row cart-total">
        <span>Total:</span>
        <span>Rs. ${total.toFixed(0)}</span>
      </div>
    `;
  }

  if (proceedToPaymentBtn) {
    proceedToPaymentBtn.onclick = () => proceedToPayment();
  }
}

function proceedToPayment() {
  // Check if user is logged in
  const user = localStorage.getItem('fd_user');
  if (!user) {
    // Redirect to login with return URL
    window.location.href = 'login.html?redirect=payment.html';
    return;
  }
  
  // Proceed to payment page
  window.location.href = 'payment.html';
}

document.addEventListener('DOMContentLoaded', renderCheckout);
