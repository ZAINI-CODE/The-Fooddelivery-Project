// Brands page: fetch brands, show featured + grid, filter and toast

const featuredBrandsEl = document.getElementById('featured-brands');
const allBrandsEl = document.getElementById('all-brands');
const brandsSearchEl = document.getElementById('brands-search');
const brandsSearchBtnEl = document.getElementById('brands-search-btn');
const brandTypeFilterEl = document.getElementById('brand-type-filter');
const toastElBr = document.getElementById('toast');

let brands = [];
let toastTimeoutIdBr = null;

function showToastBr(message) {
  if (!toastElBr) return;
  toastElBr.textContent = message;
  toastElBr.classList.add('show');

  if (toastTimeoutIdBr) clearTimeout(toastTimeoutIdBr);
  toastTimeoutIdBr = setTimeout(() => {
    toastElBr.classList.remove('show');
  }, 2000);
}

function createBrandPill(brand) {
  const pill = document.createElement('button');
  pill.className = 'brand-pill';
  pill.textContent = `${brand.name} • ★ ${brand.rating.toFixed(1)}`;
  pill.addEventListener('click', () => {
    showToastBr(`Opening brand ${brand.name} (demo)`);
  });
  return pill;
}

function createBrandCard(brand) {
  const card = document.createElement('div');
  card.className = 'brand-card';

  const logo = document.createElement('div');
  logo.className = 'brand-logo';
  logo.style.backgroundImage = `url(${brand.logo})`;

  const name = document.createElement('div');
  name.className = 'brand-name';
  name.textContent = brand.name;

  const type = document.createElement('div');
  type.className = 'brand-type';
  type.textContent = brand.type;

  const city = document.createElement('div');
  city.className = 'brand-city';
  city.textContent = brand.city;

  const rating = document.createElement('div');
  rating.className = 'brand-rating';
  rating.textContent = `★ ${brand.rating.toFixed(1)}`;

  card.appendChild(logo);
  card.appendChild(name);
  card.appendChild(type);
  card.appendChild(city);
  card.appendChild(rating);

  card.addEventListener('click', () => {
    showToastBr(`Opening brand ${brand.name} (demo)`);
  });

  return card;
}

function renderFeaturedBrands() {
  featuredBrandsEl.innerHTML = '';
  // Take top 5 by rating
  const top = [...brands].sort((a, b) => b.rating - a.rating).slice(0, 5);
  top.forEach((b) => {
    featuredBrandsEl.appendChild(createBrandPill(b));
  });
}

function renderAllBrands(list) {
  allBrandsEl.innerHTML = '';

  if (!list.length) {
    const p = document.createElement('p');
    p.className = 'muted';
    p.textContent = 'No brands matched your filters.';
    allBrandsEl.appendChild(p);
    return;
  }

  list.forEach((b) => allBrandsEl.appendChild(createBrandCard(b)));
}

async function loadBrands() {
  try {
    brands = await window.api.getBrands();
    applyBrandFilters();
    renderFeaturedBrands();
  } catch (err) {
    console.error('Error loading brands:', err);
  }
}

function applyBrandFilters() {
  const searchTerm = brandsSearchEl ? brandsSearchEl.value.trim().toLowerCase() : '';
  const typeVal = brandTypeFilterEl ? brandTypeFilterEl.value : '';

  let filtered = brands;

  if (typeVal) {
    filtered = filtered.filter((b) => b.type === typeVal);
  }

  if (searchTerm) {
    filtered = filtered.filter(
      (b) =>
        b.name.toLowerCase().includes(searchTerm) ||
        b.description.toLowerCase().includes(searchTerm)
    );
  }

  renderAllBrands(filtered);
}

// Events
if (brandsSearchEl) {
  brandsSearchEl.addEventListener('input', applyBrandFilters);
  brandsSearchEl.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      applyBrandFilters();
    }
  });
}

if (brandsSearchBtnEl) {
  brandsSearchBtnEl.addEventListener('click', applyBrandFilters);
}

if (brandTypeFilterEl) {
  brandTypeFilterEl.addEventListener('change', applyBrandFilters);
}

document.addEventListener('DOMContentLoaded', loadBrands);