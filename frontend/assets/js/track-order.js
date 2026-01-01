// Track Order Page

const orderDetailsEl = document.getElementById('order-details');

// Get order from URL or localStorage
const urlParams = new URLSearchParams(window.location.search);
const orderId = urlParams.get('orderId');

function getOrder() {
  const stored = localStorage.getItem('fd_current_order');
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch (e) {
      return null;
    }
  }
  return null;
}

function getOrderStatus() {
  const stored = localStorage.getItem('fd_order_status');
  if (stored) {
    return parseInt(stored, 10);
  }
  return 0; // Default to first status
}

function setOrderStatus(status) {
  localStorage.setItem('fd_order_status', status.toString());
}

function renderOrder(order) {
  if (!order) {
    orderDetailsEl.innerHTML = `
      <div class="no-order">
        <div class="no-order-icon">📦</div>
        <p>No active order found.</p>
        <a href="restaurants.html" class="btn btn-primary">Browse Restaurants</a>
      </div>
    `;
    return;
  }

  const currentStatus = getOrderStatus();

  const statuses = [
    {
      id: 0,
      label: 'Order Placed',
      description: 'Your order has been received',
      icon: '✓'
    },
    {
      id: 1,
      label: 'Order Confirmed',
      description: 'Restaurant is preparing your food',
      icon: '✓'
    },
    {
      id: 2,
      label: 'Food Ready',
      description: 'Your food is ready for pickup',
      icon: '✓'
    },
    {
      id: 3,
      label: 'Out for Delivery',
      description: 'Rider is on the way to you',
      icon: '🛵'
    },
    {
      id: 4,
      label: 'Delivered',
      description: 'Enjoy your meal!',
      icon: '🎉'
    }
  ];

  const statusHTML = statuses
    .map((status) => {
      const isCompleted = status.id < currentStatus;
      const isActive = status.id === currentStatus;
      const statusClass = isCompleted
        ? 'completed'
        : isActive
        ? 'active'
        : 'pending';

      return `
        <div class="status-step ${statusClass}">
          <div class="status-icon">${status.icon}</div>
          <div class="status-label">${status.label}</div>
          <div class="status-description">${status.description}</div>
          ${
            isCompleted || isActive
              ? `<div class="status-time">${new Date().toLocaleTimeString()}</div>`
              : ''
          }
        </div>
      `;
    })
    .join('');

  const itemsHTML = order.items
    .map(
      (item) => `
      <div class="order-item">
        ${
          item.image
            ? `<img src="${item.image}" alt="${item.name}" class="order-item-image" />`
            : ''
        }
        <div class="order-item-details">
          <div class="order-item-name">${item.name}</div>
          <div class="order-item-qty">Quantity: ${item.qty}</div>
        </div>
        <div class="order-item-price">Rs. ${(item.price * item.qty).toFixed(0)}</div>
      </div>
    `
    )
    .join('');

  orderDetailsEl.innerHTML = `
    <div class="order-header">
      <div class="order-number">
        Order ID: <strong>#${order.orderId || '12345'}</strong>
      </div>
      <div class="order-time">
        Placed on: ${new Date(order.timestamp).toLocaleString()}
      </div>
    </div>

    <div class="order-status">
      <div class="status-title">Order Status</div>
      <div class="status-timeline">
        ${statusHTML}
      </div>
    </div>

    <div class="order-items">
      <div class="items-title">Order Items</div>
      ${itemsHTML}
    </div>

    <div class="order-summary">
      <div class="summary-row">
        <span>Subtotal:</span>
        <span>Rs. ${order.subtotal.toFixed(0)}</span>
      </div>
      <div class="summary-row">
        <span>Delivery Fee:</span>
        <span>Rs. ${order.deliveryFee.toFixed(0)}</span>
      </div>
      <div class="summary-row total">
        <span>Total:</span>
        <span>Rs. ${order.total.toFixed(0)}</span>
      </div>
    </div>

    <div class="delivery-info">
      <div class="delivery-info-title">Delivery Information</div>
      <p><strong>Address:</strong> ${order.address || '123 Main St, Islamabad'}</p>
      <p><strong>Phone:</strong> ${order.phone || '+92 300 1234567'}</p>
      <p><strong>Payment:</strong> ${order.paymentMethod || 'Cash on Delivery'}</p>
    </div>

    <div class="action-buttons">
      ${
        currentStatus < 4
          ? '<button class="btn btn-outline" onclick="simulateStatusUpdate()">Simulate Next Status</button>'
          : ''
      }
      <a href="restaurants.html" class="btn btn-primary">Order Again</a>
    </div>
  `;
}

// Simulate status update (for demo purposes)
function simulateStatusUpdate() {
  const currentStatus = getOrderStatus();
  if (currentStatus < 4) {
    setOrderStatus(currentStatus + 1);
    location.reload();
  }
}

// Make simulateStatusUpdate available globally
window.simulateStatusUpdate = simulateStatusUpdate;

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  const order = getOrder();
  renderOrder(order);
});
