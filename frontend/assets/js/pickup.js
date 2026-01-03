// Pick-up page: fetch pickup restaurants, filter, add to cart + toast

const pickupRestaurantsRowEl = document.getElementById('pickup-restaurants-row');
const pickupProductsRowEl = document.getElementById('pickup-products-row');
const pickupSearchInput = document.getElementById('pickup-search');
const pickupSearchBtn = document.getElementById('pickup-search-btn');
const mealTypeRadios = document.querySelectorAll('input[name="meal-type"]');
const ratingRadios = document.querySelectorAll('input[name="rating"]');

const cartItemsEl = document.getElementById('cart-items');
const cartEmptyTextEl = document.getElementById('cart-empty-text');
const cartSubtotalEl = document.getElementById('cart-subtotal');
const cartTotalEl = document.getElementById('cart-total');
const checkoutBtn = document.getElementById('checkout-btn');

const toastEl = document.getElementById('toast');

let pickupRestaurants = [];
let cart = [];
let toastTimeoutId = null;

// ------- Toast helper -------
function showToast(message) {
  if (!toastEl) return;
  toastEl.textContent = message;
  toastEl.classList.add('show');

  if (toastTimeoutId) clearTimeout(toastTimeoutId);
  toastTimeoutId = setTimeout(() => {
    toastEl.classList.remove('show');
  }, 2000);
}

// ------- Render helpers -------
function createRestaurantCard(restaurant) {
  const card = document.createElement('div');
  card.className = 'card restaurant-card';

  const img = document.createElement('div');
  img.className = 'card-image';
  img.style.backgroundImage = `url(${restaurant.image})`;

  const body = document.createElement('div');
  body.className = 'card-body';

  const badge = document.createElement('span');
  badge.className = 'open-badge';
  badge.textContent = restaurant.open ? 'Open' : 'Closed';

  const title = document.createElement('div');
  title.className = 'card-title';
  title.textContent = restaurant.name;

  const subtitle = document.createElement('div');
  subtitle.className = 'card-subtitle';
  subtitle.textContent = `${restaurant.cuisine} • ${restaurant.type}`;

  const meta = document.createElement('div');
  meta.className = 'card-meta';
  meta.textContent = `★ ${restaurant.rating.toFixed(1)} • ${restaurant.city}`;

  body.appendChild(badge);
  body.appendChild(title);
  body.appendChild(subtitle);
  body.appendChild(meta);

  card.appendChild(img);
  card.appendChild(body);

  return card;
}

function createProductCard(product) {
  const card = document.createElement('div');
  card.className = 'product-card';

  const img = document.createElement('div');
  img.className = 'product-image';
  img.style.backgroundImage = `url(${product.image})`;

  const name = document.createElement('div');
  name.className = 'product-name';
  name.textContent = product.name;

  const price = document.createElement('div');
  price.className = 'product-price';
  price.textContent = `Rs. ${product.price.toFixed(0)}`;

  const category = document.createElement('div');
  category.className = 'product-category';
  category.textContent = product.category;

  const addBtn = document.createElement('button');
  addBtn.className = 'product-add-btn';
  addBtn.textContent = '+';
  addBtn.title = 'Add to cart';
  addBtn.addEventListener('click', () => addToCart(product));

  card.appendChild(img);
  card.appendChild(name);
  card.appendChild(price);
  card.appendChild(category);
  card.appendChild(addBtn);

  return card;
}

// ------- Cart logic -------
function addToCart(product) {
  const existing = cart.find((item) => item.id === product.id);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ id: product.id, name: product.name, price: product.price, qty: 1 });
  }
  renderCart();
  showToast('Item added to cart');
}

function renderCart() {
  cartItemsEl.innerHTML = '';

  if (cart.length === 0) {
    cartEmptyTextEl.style.display = 'block';
    checkoutBtn.disabled = true;
    checkoutBtn.classList.add('btn-disabled');
    checkoutBtn.classList.remove('btn-primary');
    checkoutBtn.onclick = null;
  } else {
    cartEmptyTextEl.style.display = 'none';
    checkoutBtn.disabled = false;
    checkoutBtn.classList.remove('btn-disabled');
    checkoutBtn.classList.add('btn-primary');
    checkoutBtn.onclick = () => window.location.href = 'cart.html';
  }

  let subtotal = 0;

  cart.forEach((item) => {
    subtotal += item.price * item.qty;

    const row = document.createElement('div');
    row.className = 'cart-item';

    const name = document.createElement('span');
    name.textContent = `${item.qty} × ${item.name}`;

    const price = document.createElement('span');
    price.textContent = `Rs. ${(item.price * item.qty).toFixed(2)}`;

    row.appendChild(name);
    row.appendChild(price);

    cartItemsEl.appendChild(row);
  });

  cartSubtotalEl.textContent = `Rs. ${subtotal.toFixed(2)}`;
  cartTotalEl.textContent = `Rs. ${subtotal.toFixed(2)}`;

  localStorage.setItem('fd_cart', JSON.stringify(cart));
}

// ------- Initial load -------
async function loadPickupRestaurants() {
  try {
    // Fetch pickup-specific restaurants
    const response = await fetch('../backend/data/pickup-restaurants.json');
    pickupRestaurants = await response.json();
    applyFilters();
  } catch (err) {
    console.error('Error loading pickup restaurants:', err);
  }
}

function applyFilters() {
  const searchTerm = pickupSearchInput ? pickupSearchInput.value.trim().toLowerCase() : '';
  const selectedMealType = Array.from(mealTypeRadios).find((r) => r.checked);
  const mealType = selectedMealType && selectedMealType.value ? selectedMealType.value : '';
  const selectedRating = Array.from(ratingRadios).find((r) => r.checked);
  const minRating = selectedRating && selectedRating.value ? parseFloat(selectedRating.value) : 0;

  let filteredRestaurants = pickupRestaurants;

  if (mealType) {
    filteredRestaurants = filteredRestaurants.filter((r) => r.type === mealType);
  }

  if (minRating > 0) {
    filteredRestaurants = filteredRestaurants.filter((r) => r.rating >= minRating);
  }

  if (searchTerm) {
    filteredRestaurants = filteredRestaurants.filter((r) =>
      r.name.toLowerCase().includes(searchTerm) ||
      r.cuisine.toLowerCase().includes(searchTerm)
    );
  }

  renderRestaurantsAndProducts(filteredRestaurants);
}

function renderRestaurantsAndProducts(restaurants) {
  pickupRestaurantsRowEl.innerHTML = '';
  pickupProductsRowEl.innerHTML = '';

  restaurants.forEach((restaurant) => {
    pickupRestaurantsRowEl.appendChild(createRestaurantCard(restaurant));

    // Add products from this restaurant
    if (restaurant.products && Array.isArray(restaurant.products)) {
      restaurant.products.forEach((product) => {
        pickupProductsRowEl.appendChild(createProductCard(product));
      });
    }
  });
}

// Search event listeners
if (pickupSearchInput) {
  pickupSearchInput.addEventListener('input', applyFilters);
  pickupSearchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      applyFilters();
    }
  });
}

if (pickupSearchBtn) {
  pickupSearchBtn.addEventListener('click', applyFilters);
}

// Filter event listeners
mealTypeRadios.forEach((radio) => {
  radio.addEventListener('change', applyFilters);
});

ratingRadios.forEach((radio) => {
  radio.addEventListener('change', applyFilters);
});

document.addEventListener('DOMContentLoaded', () => {
  const stored = localStorage.getItem('fd_cart');
  if (stored) {
    try {
      cart = JSON.parse(stored);
    } catch {
      cart = [];
    }
  }
  renderCart();
  loadPickupRestaurants();
});
