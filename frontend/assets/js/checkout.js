// Checkout Page

const checkoutItemsEl = document.getElementById('checkout-items');
const checkoutTotalEl = document.getElementById('checkout-total');
const placeOrderBtn = document.getElementById('place-order-btn');
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
    if (placeOrderBtn) placeOrderBtn.style.display = 'none';
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

  if (placeOrderBtn) {
    placeOrderBtn.onclick = () => placeOrder(cart, subtotal, deliveryFee, total);
  }
}

function placeOrder(cart, subtotal, deliveryFee, total) {
  // Create order object
  const order = {
    orderId: Math.floor(Math.random() * 1000000),
    items: cart,
    subtotal: subtotal,
    deliveryFee: deliveryFee,
    total: total,
    timestamp: new Date().toISOString(),
    address: '123 Main Street, Islamabad', // Default address
    phone: '+92 300 1234567', // Default phone
    paymentMethod: 'Cash on Delivery'
  };

  // Save order to current order
  localStorage.setItem('fd_current_order', JSON.stringify(order));
  localStorage.setItem('fd_order_status', '0'); // Initial status

  // Add order to orders history
  try {
    const ordersJson = localStorage.getItem('fd_orders');
    let orders = [];
    if (ordersJson) {
      orders = JSON.parse(ordersJson);
    }
    orders.push(order);
    localStorage.setItem('fd_orders', JSON.stringify(orders));
  } catch (e) {
    console.warn('Failed to save order to history', e);
  }

  // Clear cart
  clearCart();

  // Show success message
  if (checkoutMessage) {
    checkoutMessage.textContent = 'Order placed successfully! Redirecting...';
    checkoutMessage.style.color = 'green';
  }

  // Redirect to tracking page
  setTimeout(() => {
    window.location.href = 'track-order.html?orderId=' + order.orderId;
  }, 1500);
}

document.addEventListener('DOMContentLoaded', renderCheckout);
