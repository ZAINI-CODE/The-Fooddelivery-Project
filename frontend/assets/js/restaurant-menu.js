// Restaurant Menu Page

const restaurantId = new URLSearchParams(window.location.search).get('id');
const restaurantInfoEl = document.getElementById('restaurant-info');
const menuItemsEl = document.getElementById('menu-items');
const categoryFiltersEl = document.getElementById('category-filters');
const toastEl = document.getElementById('toast');

let restaurant = null;
let menuItems = [];
let selectedCategory = 'all';
let toastTimeout = null;

// Show toast notification
function showToast(message) {
  if (!toastEl) return;
  
  clearTimeout(toastTimeout);
  toastEl.textContent = message;
  toastEl.classList.add('show');
  
  toastTimeout = setTimeout(() => {
    toastEl.classList.remove('show');
  }, 2500);
}

// Render restaurant info
function renderRestaurantInfo(r) {
  restaurantInfoEl.innerHTML = `
    <div class="restaurant-info">
      <img src="${r.image}" alt="${r.name}" class="restaurant-info-image" />
      <div class="restaurant-info-details">
        <h1>${r.name}</h1>
        <p style="opacity: 0.9; margin: 4px 0 8px 0;">${r.cuisine}</p>
        <div class="restaurant-info-meta">
          <span>⭐ ${r.rating.toFixed(1)}</span>
          <span>🕒 ${r.deliveryTime}</span>
          <span>🚚 Rs. ${r.deliveryFee} delivery</span>
          <span>📍 ${r.city}</span>
          <span>💰 Min order Rs. ${r.minOrder}</span>
        </div>
        <span class="restaurant-badge ${r.open ? 'open' : 'closed'}">
          ${r.open ? 'Open Now' : 'Closed'}
        </span>
      </div>
    </div>
  `;
}

// Get unique categories from menu items
function getCategories(items) {
  const categories = [...new Set(items.map((item) => item.category))];
  return categories.sort();
}

// Render category filters
function renderCategoryFilters(categories) {
  categoryFiltersEl.innerHTML = categories
    .map(
      (cat) =>
        `<button class="filter-btn" data-category="${cat}">${cat}</button>`
    )
    .join('');

  // Add click handlers
  document.querySelectorAll('.filter-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      selectedCategory = btn.dataset.category;
      document.querySelectorAll('.filter-btn').forEach((b) => {
        b.classList.remove('active');
      });
      btn.classList.add('active');
      renderMenuItems(filterItems());
    });
  });
}

// Filter items by category
function filterItems() {
  if (selectedCategory === 'all') {
    return menuItems;
  }
  return menuItems.filter((item) => item.category === selectedCategory);
}

// Render menu items
function renderMenuItems(items) {
  if (items.length === 0) {
    menuItemsEl.innerHTML = `
      <div class="empty-menu">
        <div class="empty-menu-icon">🍽️</div>
        <p>No items found in this category.</p>
      </div>
    `;
    return;
  }

  menuItemsEl.innerHTML = items
    .map(
      (item) => `
        <div class="menu-item-card">
          <img src="${item.image}" alt="${item.name}" class="menu-item-image" />
          <div class="menu-item-body">
            <span class="menu-item-category">${item.category}</span>
            <div class="menu-item-header">
              <h3 class="menu-item-name">${item.name}</h3>
              ${item.popular ? '<span class="popular-badge">Popular</span>' : ''}
            </div>
            <p class="menu-item-description">${item.description}</p>
            <div class="menu-item-footer">
              <span class="menu-item-price">Rs. ${item.price}</span>
              <button 
                class="add-to-cart-btn" 
                data-item='${JSON.stringify(item).replace(/'/g, '&apos;')}'
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      `
    )
    .join('');

  // Add click handlers for add to cart buttons
  document.querySelectorAll('.add-to-cart-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const item = JSON.parse(btn.dataset.item);
      addToCart(item);
      showToast(`${item.name} added to cart!`);
    });
  });
}

// Load restaurant and menu
async function loadRestaurantMenu() {
  if (!restaurantId) {
    menuItemsEl.innerHTML = '<p class="muted">Restaurant not found.</p>';
    return;
  }

  try {
    // Load restaurant info
    restaurant = await window.api.getRestaurantById(restaurantId);
    renderRestaurantInfo(restaurant);

    // Load menu items
    menuItems = await window.api.getRestaurantMenu(restaurantId);

    if (menuItems.length === 0) {
      menuItemsEl.innerHTML = `
        <div class="empty-menu">
          <div class="empty-menu-icon">🍽️</div>
          <p>Menu coming soon!</p>
        </div>
      `;
      return;
    }

    // Render categories and items
    const categories = getCategories(menuItems);
    renderCategoryFilters(categories);
    renderMenuItems(menuItems);
  } catch (err) {
    console.error('Error loading restaurant menu:', err);
    menuItemsEl.innerHTML =
      '<p class="muted">Error loading menu. Please try again later.</p>';
  }
}

// Initialize
document.addEventListener('DOMContentLoaded', loadRestaurantMenu);
