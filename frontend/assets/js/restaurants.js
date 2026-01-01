// Restaurants page: fetch and display restaurants list, with filters + toast

const restaurantListEl = document.getElementById('restaurant-list');
const searchInputEl = document.getElementById('restaurant-search');
const citySelectEl = document.getElementById('filter-city');
const ratingRadios = document.querySelectorAll('input[name="rating"]');
const toastEl = document.getElementById('toast');

let restaurants = [];
let toastTimeoutId = null;

// Toast helper (same style as shops)
function showToast(message) {
  if (!toastEl) return;
  toastEl.textContent = message;
  toastEl.classList.add('show');

  if (toastTimeoutId) clearTimeout(toastTimeoutId);
  toastTimeoutId = setTimeout(() => {
    toastEl.classList.remove('show');
  }, 2000);
}

function createRestaurantCard(r) {
  const card = document.createElement('div');
  card.className = 'card restaurant-card';

  const img = document.createElement('div');
  img.className = 'card-image';
  img.style.backgroundImage = `url(${r.image})`;
  img.style.backgroundSize = 'cover';
  img.style.backgroundPosition = 'center';

  const body = document.createElement('div');
  body.className = 'card-body';

  const badge = document.createElement('div');
  badge.className = 'restaurant-badge';
  badge.textContent = r.open ? 'Open' : 'Closed';

  const title = document.createElement('div');
  title.className = 'card-title';
  title.textContent = r.name;

  const subtitle = document.createElement('div');
  subtitle.className = 'card-subtitle';
  subtitle.textContent = `${r.cuisine} • ${r.city}`;

  const meta = document.createElement('div');
  meta.className = 'card-meta';
  meta.textContent = `${r.deliveryTime} • Rs. ${r.deliveryFee} delivery • ★ ${r.rating.toFixed(
    1
  )} • Min order Rs. ${r.minOrder}`;

  body.appendChild(badge);
  body.appendChild(title);
  body.appendChild(subtitle);
  body.appendChild(meta);

  card.appendChild(img);
  card.appendChild(body);

  card.addEventListener('click', () => {
    window.location.href = `restaurant-menu.html?id=${r.id}`;
  });

  return card;
}

function renderRestaurants(list) {
  restaurantListEl.innerHTML = '';

  if (!list.length) {
    const p = document.createElement('p');
    p.className = 'muted';
    p.textContent = 'No restaurants matched your filters.';
    restaurantListEl.appendChild(p);
    return;
  }

  list.forEach((r) => {
    restaurantListEl.appendChild(createRestaurantCard(r));
  });
}

async function loadRestaurants() {
  try {
    restaurants = await window.api.getRestaurants();
    applyFilters();
  } catch (err) {
    console.error('Error loading restaurants:', err);
  }
}

function applyFilters() {
  const searchTerm = searchInputEl.value.trim().toLowerCase();
  const city = citySelectEl.value;
  const selectedRatingRadio = Array.from(ratingRadios).find((r) => r.checked);
  const minRating = selectedRatingRadio && selectedRatingRadio.value
    ? parseFloat(selectedRatingRadio.value)
    : 0;

  let filtered = restaurants;

  if (city) {
    filtered = filtered.filter(
      (r) => r.city.toLowerCase() === city.toLowerCase()
    );
  }

  if (minRating > 0) {
    filtered = filtered.filter((r) => r.rating >= minRating);
  }

  if (searchTerm) {
    filtered = filtered.filter(
      (r) =>
        r.name.toLowerCase().includes(searchTerm) ||
        r.cuisine.toLowerCase().includes(searchTerm)
    );
  }

  renderRestaurants(filtered);
}

// Events
if (searchInputEl) {
  searchInputEl.addEventListener('input', applyFilters);
}

if (citySelectEl) {
  citySelectEl.addEventListener('change', applyFilters);
}

ratingRadios.forEach((radio) => {
  radio.addEventListener('change', applyFilters);
});

document.addEventListener('DOMContentLoaded', loadRestaurants);