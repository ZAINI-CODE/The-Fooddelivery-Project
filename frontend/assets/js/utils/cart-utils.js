// Cart utility functions for managing cart across pages

function getCart() {
  const stored = localStorage.getItem('fd_cart');
  if (!stored) return [];
  try {
    return JSON.parse(stored);
  } catch (e) {
    return [];
  }
}

function saveCart(cart) {
  localStorage.setItem('fd_cart', JSON.stringify(cart));
  updateCartBadge();
}

function addToCart(item) {
  const cart = getCart();
  
  // Check if item already exists
  const existingIndex = cart.findIndex(
    (cartItem) => cartItem.id === item.id
  );

  if (existingIndex >= 0) {
    // Increase quantity
    cart[existingIndex].qty += 1;
  } else {
    // Add new item with qty 1
    cart.push({
      id: item.id,
      name: item.name,
      price: item.price,
      qty: 1,
      image: item.image || ''
    });
  }

  saveCart(cart);
  return cart;
}

function removeFromCart(itemId) {
  let cart = getCart();
  cart = cart.filter((item) => item.id !== itemId);
  saveCart(cart);
  return cart;
}

function updateCartItemQty(itemId, qty) {
  const cart = getCart();
  const item = cart.find((item) => item.id === itemId);
  if (item) {
    item.qty = Math.max(1, qty);
    saveCart(cart);
  }
  return cart;
}

function getCartTotal() {
  const cart = getCart();
  return cart.reduce((total, item) => total + item.price * item.qty, 0);
}

function getCartCount() {
  const cart = getCart();
  return cart.reduce((count, item) => count + item.qty, 0);
}

function clearCart() {
  localStorage.removeItem('fd_cart');
  updateCartBadge();
}

function updateCartBadge() {
  const cartBadge = document.getElementById('cart-badge');
  const cartCount = document.getElementById('cart-count');
  
  if (!cartBadge || !cartCount) return;

  const count = getCartCount();
  
  if (count > 0) {
    cartBadge.style.display = 'flex';
    cartCount.textContent = count;
  } else {
    cartBadge.style.display = 'none';
  }
}

// Initialize cart badge on page load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', updateCartBadge);
} else {
  updateCartBadge();
}
