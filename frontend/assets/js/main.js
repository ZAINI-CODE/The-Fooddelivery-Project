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

  // Initialize carousels
  initPromoCarousel();
  initDealsCarousel();

  // Load and display recent orders
  loadRecentOrders();
});

// Promo Carousel
function initPromoCarousel() {
  const promoSlides = document.querySelectorAll('.promo-slide');
  const leftArrow = document.getElementById('promo-arrow-left');
  const rightArrow = document.getElementById('promo-arrow-right');
  
  if (!promoSlides.length) return;
  
  let currentSlide = 0;
  
  function showSlide(index) {
    promoSlides.forEach((slide, i) => {
      slide.classList.toggle('active', i === index);
    });
  }
  
  function nextSlide() {
    currentSlide = (currentSlide + 1) % promoSlides.length;
    showSlide(currentSlide);
  }
  
  function prevSlide() {
    currentSlide = (currentSlide - 1 + promoSlides.length) % promoSlides.length;
    showSlide(currentSlide);
  }
  
  if (leftArrow) leftArrow.addEventListener('click', prevSlide);
  if (rightArrow) rightArrow.addEventListener('click', nextSlide);
  
  // Auto-advance every 5 seconds
  setInterval(nextSlide, 5000);
}

// Deals Carousel
function initDealsCarousel() {
  const dealsContainer = document.getElementById('deals-slides');
  const leftArrow = document.getElementById('deals-arrow-left');
  const rightArrow = document.getElementById('deals-arrow-right');
  
  if (!dealsContainer) return;
  
  if (leftArrow) {
    leftArrow.addEventListener('click', () => {
      dealsContainer.scrollBy({ left: -300, behavior: 'smooth' });
    });
  }
  
  if (rightArrow) {
    rightArrow.addEventListener('click', () => {
      dealsContainer.scrollBy({ left: 300, behavior: 'smooth' });
    });
  }
}

function loadRecentOrders() {
  const recentOrdersContainer = document.getElementById('recent-orders-container');
  if (!recentOrdersContainer) return;

  // Get orders from localStorage
  const orders = getRecentOrders();

  if (orders.length === 0) {
    recentOrdersContainer.innerHTML = `
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

  recentOrdersContainer.innerHTML = `
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