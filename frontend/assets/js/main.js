// Home/dashboard page script
// Currently simple – can be extended later if you add dynamic content.

document.addEventListener('DOMContentLoaded', () => {
  // Example: if user is logged in, show greeting
  try {
    const rawUser = localStorage.getItem('fd_user');
    if (rawUser) {
      const user = JSON.parse(rawUser);
      const locationText = document.getElementById('header-location-text');
      if (locationText) {
        locationText.textContent = `Welcome back, ${user.name}`;
      }
    }
  } catch (e) {
    console.warn('Failed to read user from storage', e);
  }

  // Load and display recent orders
  loadRecentOrders();
});

function loadRecentOrders() {
  const recentOrdersSection = document.querySelector('.dashboard-section:nth-child(2)');
  if (!recentOrdersSection) return;

  // Get orders from localStorage
  const orders = getRecentOrders();

  if (orders.length === 0) {
    recentOrdersSection.innerHTML = `
      <h2>Your recent orders</h2>
      <p class="muted">
        You don't have any orders yet. Start by exploring restaurants or shops.
      </p>
    `;
    return;
  }

  // Display recent orders
  const ordersHTML = orders.map(order => {
    const date = new Date(order.timestamp);
    const formattedDate = date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
    
    return `
      <div class="order-card">
        <div class="order-header">
          <div class="order-id">Order #${order.orderId}</div>
          <div class="order-date">${formattedDate}</div>
        </div>
        <div class="order-items">
          ${order.items.slice(0, 3).map(item => `<span>${item.name} × ${item.qty}</span>`).join(', ')}
          ${order.items.length > 3 ? ` and ${order.items.length - 3} more` : ''}
        </div>
        <div class="order-footer">
          <div class="order-total">Rs. ${order.total.toFixed(0)}</div>
          <a href="track-order.html?orderId=${order.orderId}" class="btn btn-ghost btn-sm">Track Order</a>
        </div>
      </div>
    `;
  }).join('');

  recentOrdersSection.innerHTML = `
    <h2>Your recent orders</h2>
    <div class="orders-grid">
      ${ordersHTML}
    </div>
  `;
}

function getRecentOrders() {
  try {
    const ordersJson = localStorage.getItem('fd_orders');
    if (ordersJson) {
      const orders = JSON.parse(ordersJson);
      // Return last 5 orders, sorted by most recent
      return orders.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)).slice(0, 5);
    }
  } catch (e) {
    console.warn('Failed to read orders from storage', e);
  }
  return [];
}