const cartPageItemsEl = document.getElementById('cart-page-items');

function renderCartPage() {
  const cart = getCart();

  if (cart.length === 0) {
    cartPageItemsEl.innerHTML = `
      <div class="empty-cart">
        <div class="empty-cart-icon">🛒</div>
        <p>Your cart is empty.</p>
        <a href="restaurants.html" class="btn btn-primary">Browse Restaurants</a>
      </div>
    `;
    return;
  }

  cartPageItemsEl.innerHTML = '';

  let subtotal = 0;

  cart.forEach((item) => {
    subtotal += item.price * item.qty;

    const row = document.createElement('div');
    row.className = 'cart-page-item';

    // Item image
    if (item.image) {
      const img = document.createElement('img');
      img.src = item.image;
      img.alt = item.name;
      img.className = 'cart-item-image';
      row.appendChild(img);
    }

    // Item details
    const details = document.createElement('div');
    details.className = 'cart-item-details';

    const name = document.createElement('div');
    name.className = 'cart-page-item-name';
    name.textContent = item.name;

    const price = document.createElement('div');
    price.className = 'cart-page-item-price';
    price.textContent = `Rs. ${item.price}`;

    details.appendChild(name);
    details.appendChild(price);
    row.appendChild(details);

    // Quantity controls
    const qtyControls = document.createElement('div');
    qtyControls.className = 'cart-qty-controls';

    const minusBtn = document.createElement('button');
    minusBtn.className = 'qty-btn';
    minusBtn.textContent = '−';
    minusBtn.onclick = () => {
      if (item.qty > 1) {
        updateCartItemQty(item.id, item.qty - 1);
        renderCartPage();
      }
    };

    const qtyDisplay = document.createElement('span');
    qtyDisplay.className = 'qty-display';
    qtyDisplay.textContent = item.qty;

    const plusBtn = document.createElement('button');
    plusBtn.className = 'qty-btn';
    plusBtn.textContent = '+';
    plusBtn.onclick = () => {
      updateCartItemQty(item.id, item.qty + 1);
      renderCartPage();
    };

    qtyControls.appendChild(minusBtn);
    qtyControls.appendChild(qtyDisplay);
    qtyControls.appendChild(plusBtn);
    row.appendChild(qtyControls);

    // Item total
    const total = document.createElement('div');
    total.className = 'cart-item-total';
    total.textContent = `Rs. ${(item.price * item.qty).toFixed(0)}`;
    row.appendChild(total);

    // Remove button
    const removeBtn = document.createElement('button');
    removeBtn.className = 'cart-remove-btn';
    removeBtn.innerHTML = '🗑️';
    removeBtn.title = 'Remove from cart';
    removeBtn.onclick = () => {
      removeFromCart(item.id);
      renderCartPage();
    };
    row.appendChild(removeBtn);

    cartPageItemsEl.appendChild(row);
  });

  // Summary
  const summary = document.createElement('div');
  summary.className = 'cart-page-summary';
  summary.innerHTML = `
    <div class="cart-summary-row">
      <span>Subtotal:</span>
      <span>Rs. ${subtotal.toFixed(0)}</span>
    </div>
    <div class="cart-summary-row">
      <span>Delivery Fee:</span>
      <span>Rs. 150</span>
    </div>
    <div class="cart-summary-row cart-total">
      <span>Total:</span>
      <span>Rs. ${(subtotal + 150).toFixed(0)}</span>
    </div>
  `;
  cartPageItemsEl.appendChild(summary);
}

document.addEventListener('DOMContentLoaded', renderCartPage);
