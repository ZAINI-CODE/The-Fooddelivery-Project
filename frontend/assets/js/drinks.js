// Drinks page: fetch drinks, filter, add to cart + toast

const drinksRowEl = document.getElementById('drinks-row');
const drinksSearchEl = document.getElementById('drinks-search');
const drinksSearchBtnEl = document.getElementById('drinks-search-btn');
const categoryRadiosD = document.querySelectorAll('input[name="drink-category"]');

const cartItemsElD = document.getElementById('cart-items');
const cartEmptyTextElD = document.getElementById('cart-empty-text');
const cartSubtotalElD = document.getElementById('cart-subtotal');
const cartTotalElD = document.getElementById('cart-total');
const checkoutBtnD = document.getElementById('checkout-btn');

const toastElD = document.getElementById('toast');

let drinks = [];
let cartDrinks = [];
let toastTimeoutIdD = null;

function showToastD(message) {
  if (!toastElD) return;
  toastElD.textContent = message;
  toastElD.classList.add('show');

  if (toastTimeoutIdD) clearTimeout(toastTimeoutIdD);
  toastTimeoutIdD = setTimeout(() => {
    toastElD.classList.remove('show');
  }, 2000);
}

function createDrinkCard(d) {
  const card = document.createElement('div');
  card.className = 'product-card drink-card';

  const img = document.createElement('div');
  img.className = 'product-image';
  img.style.backgroundImage = `url(${d.image})`;
  img.style.backgroundSize = 'cover';
  img.style.backgroundPosition = 'center';

  const name = document.createElement('div');
  name.className = 'product-name';
  name.textContent = d.name;

  const price = document.createElement('div');
  price.className = 'product-price';
  price.textContent = `Rs. ${d.price.toFixed(0)}`;

  const old = document.createElement('div');
  old.className = 'product-old-price';
  old.textContent = `Rs. ${d.oldPrice.toFixed(0)}`;

  const discount = document.createElement('div');
  discount.className = 'product-discount';
  discount.textContent = `${d.discount} • ${d.brand}`;

  const addBtn = document.createElement('button');
  addBtn.className = 'product-add-btn';
  addBtn.textContent = '+';
  addBtn.title = 'Add to cart';
  addBtn.addEventListener('click', () => addDrinkToCart(d));

  card.appendChild(img);
  card.appendChild(name);
  card.appendChild(price);
  card.appendChild(old);
  card.appendChild(discount);
  card.appendChild(addBtn);

  return card;
}

function renderDrinks(list) {
  drinksRowEl.innerHTML = '';

  if (!list.length) {
    const p = document.createElement('p');
    p.className = 'muted';
    p.textContent = 'No drinks matched your filters.';
    drinksRowEl.appendChild(p);
    return;
  }

  list.forEach((d) => {
    drinksRowEl.appendChild(createDrinkCard(d));
  });
}

function addDrinkToCart(drink) {
  const existing = cartDrinks.find((i) => i.id === drink.id);
  if (existing) {
    existing.qty += 1;
  } else {
    cartDrinks.push({
      id: drink.id,
      name: drink.name,
      price: drink.price,
      qty: 1
    });
  }
  renderDrinksCart();
  showToastD('Item added to cart');
}

function renderDrinksCart() {
  cartItemsElD.innerHTML = '';

  if (cartDrinks.length === 0) {
    cartEmptyTextElD.style.display = 'block';
    checkoutBtnD.disabled = true;
    checkoutBtnD.classList.add('btn-disabled');
    checkoutBtnD.classList.remove('btn-primary');
  } else {
    cartEmptyTextElD.style.display = 'none';
    checkoutBtnD.disabled = false;
    checkoutBtnD.classList.remove('btn-disabled');
    checkoutBtnD.classList.add('btn-primary');
    checkoutBtnD.onclick = () => window.location.href = 'checkout.html';
  }

  let subtotal = 0;

  cartDrinks.forEach((item) => {
    subtotal += item.price * item.qty;

    const row = document.createElement('div');
    row.className = 'cart-item';

    const name = document.createElement('span');
    name.textContent = `${item.qty} × ${item.name}`;

    const price = document.createElement('span');
    price.textContent = `Rs. ${(item.price * item.qty).toFixed(0)}`;

    row.appendChild(name);
    row.appendChild(price);
    cartItemsElD.appendChild(row);
  });

  cartSubtotalElD.textContent = `Rs. ${subtotal.toFixed(0)}`;
  cartTotalElD.textContent = `Rs. ${subtotal.toFixed(0)}`;

  localStorage.setItem('fd_cart', JSON.stringify(cartDrinks));
}

async function loadDrinks() {
  try {
    drinks = await window.api.getDrinks();
    applyDrinksFilters();
  } catch (err) {
    console.error('Error loading drinks:', err);
  }
}

function applyDrinksFilters() {
  const searchTerm = drinksSearchEl.value.trim().toLowerCase();
  const selectedCatRadio = Array.from(categoryRadiosD).find((r) => r.checked);
  const category = selectedCatRadio && selectedCatRadio.value
    ? selectedCatRadio.value
    : '';

  let filtered = drinks;

  if (category) {
    filtered = filtered.filter((d) => d.category === category);
  }

  if (searchTerm) {
    filtered = filtered.filter(
      (d) =>
        d.name.toLowerCase().includes(searchTerm) ||
        d.brand.toLowerCase().includes(searchTerm)
    );
  }

  renderDrinks(filtered);
}

// Events
drinksSearchEl.addEventListener('input', applyDrinksFilters);
drinksSearchEl.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    applyDrinksFilters();
  }
});

if (drinksSearchBtnEl) {
  drinksSearchBtnEl.addEventListener('click', applyDrinksFilters);
}

categoryRadiosD.forEach((radio) => {
  radio.addEventListener('change', applyDrinksFilters);
});

document.addEventListener('DOMContentLoaded', () => {
  const stored = localStorage.getItem('fd_cart');
  if (stored) {
    try {
      cartDrinks = JSON.parse(stored);
    } catch {
      cartDrinks = [];
    }
  }
  renderDrinksCart();
  loadDrinks();
});