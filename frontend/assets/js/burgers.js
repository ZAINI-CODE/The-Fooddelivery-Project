// Burgers page: fetch burgers, filter, add to cart + toast

const burgersRowEl = document.getElementById('burgers-row');
const searchInput = document.getElementById('burgers-search');
const categoryRadios = document.querySelectorAll('input[name="burger-category"]');

const cartItemsElB = document.getElementById('cart-items');
const cartEmptyTextElB = document.getElementById('cart-empty-text');
const cartSubtotalElB = document.getElementById('cart-subtotal');
const cartTotalElB = document.getElementById('cart-total');
const checkoutBtnB = document.getElementById('checkout-btn');

const toastElB = document.getElementById('toast');

let burgers = [];
let cartBurgers = [];
let toastTimeoutIdB = null;

function showToastB(message) {
  if (!toastElB) return;
  toastElB.textContent = message;
  toastElB.classList.add('show');

  if (toastTimeoutIdB) clearTimeout(toastTimeoutIdB);
  toastTimeoutIdB = setTimeout(() => {
    toastElB.classList.remove('show');
  }, 2000);
}

function createBurgerCard(b) {
  const card = document.createElement('div');
  card.className = 'product-card burger-card';

  const img = document.createElement('div');
  img.className = 'product-image';
  img.style.backgroundImage = `url(${b.image})`;
  img.style.backgroundSize = 'cover';
  img.style.backgroundPosition = 'center';

  const name = document.createElement('div');
  name.className = 'product-name';
  name.textContent = b.name;

  const price = document.createElement('div');
  price.className = 'product-price';
  price.textContent = `Rs. ${b.price.toFixed(0)}`;

  const old = document.createElement('div');
  old.className = 'product-old-price';
  old.textContent = `Rs. ${b.oldPrice.toFixed(0)}`;

  const discount = document.createElement('div');
  discount.className = 'product-discount';
  const discountPercent = Math.round(((b.oldPrice - b.price) / b.oldPrice) * 100);
  discount.textContent = `${discountPercent}% off • ★ ${b.rating.toFixed(1)}`;

  const addBtn = document.createElement('button');
  addBtn.className = 'product-add-btn';
  addBtn.textContent = '+';
  addBtn.title = 'Add to cart';
  addBtn.addEventListener('click', () => addBurgerToCart(b));

  card.appendChild(img);
  card.appendChild(name);
  card.appendChild(price);
  card.appendChild(old);
  card.appendChild(discount);
  card.appendChild(addBtn);

  return card;
}

function renderBurgers(list) {
  burgersRowEl.innerHTML = '';

  if (!list.length) {
    const p = document.createElement('p');
    p.className = 'muted';
    p.textContent = 'No burgers matched your filters.';
    burgersRowEl.appendChild(p);
    return;
  }

  list.forEach((b) => {
    burgersRowEl.appendChild(createBurgerCard(b));
  });
}

function addBurgerToCart(burger) {
  const existing = cartBurgers.find((i) => i.id === burger.id);
  if (existing) {
    existing.qty += 1;
  } else {
    cartBurgers.push({
      id: burger.id,
      name: burger.name,
      price: burger.price,
      qty: 1
    });
  }
  renderBurgerCart();
  showToastB('Item added to cart');
}

function renderBurgerCart() {
  cartItemsElB.innerHTML = '';

  if (cartBurgers.length === 0) {
    cartEmptyTextElB.style.display = 'block';
    checkoutBtnB.disabled = true;
    checkoutBtnB.classList.add('btn-disabled');
    checkoutBtnB.classList.remove('btn-primary');
    checkoutBtnB.onclick = null;
  } else {
    cartEmptyTextElB.style.display = 'none';
    checkoutBtnB.disabled = false;
    checkoutBtnB.classList.remove('btn-disabled');
    checkoutBtnB.classList.add('btn-primary');
    checkoutBtnB.onclick = () => window.location.href = 'cart.html';
  }

  let subtotal = 0;

  cartBurgers.forEach((item) => {
    subtotal += item.price * item.qty;

    const row = document.createElement('div');
    row.className = 'cart-item';

    const name = document.createElement('span');
    name.textContent = `${item.qty} × ${item.name}`;

    const price = document.createElement('span');
    price.textContent = `Rs. ${(item.price * item.qty).toFixed(0)}`;

    row.appendChild(name);
    row.appendChild(price);
    cartItemsElB.appendChild(row);
  });

  cartSubtotalElB.textContent = `Rs. ${subtotal.toFixed(0)}`;
  cartTotalElB.textContent = `Rs. ${subtotal.toFixed(0)}`;

  // Save to shared cart key so cart.html sees everything
  localStorage.setItem('fd_cart', JSON.stringify(cartBurgers));
}

async function loadBurgers() {
  try {
    burgers = await window.api.getBurgers();
    applyBurgerFilters();
  } catch (err) {
    console.error('Error loading burgers:', err);
  }
}

function applyBurgerFilters() {
  const searchTerm = searchInput.value.trim().toLowerCase();
  const selectedCategoryRadio = Array.from(categoryRadios).find((r) => r.checked);
  const category = selectedCategoryRadio && selectedCategoryRadio.value
    ? selectedCategoryRadio.value
    : '';

  let filtered = burgers;

  if (category) {
    filtered = filtered.filter((b) => b.category === category);
  }

  if (searchTerm) {
    filtered = filtered.filter((b) =>
      b.name.toLowerCase().includes(searchTerm)
    );
  }

  renderBurgers(filtered);
}

// events
searchInput.addEventListener('input', applyBurgerFilters);
categoryRadios.forEach((radio) => {
  radio.addEventListener('change', applyBurgerFilters);
});

document.addEventListener('DOMContentLoaded', () => {
  // load existing cart if any
  const stored = localStorage.getItem('fd_cart');
  if (stored) {
    try {
      cartBurgers = JSON.parse(stored);
    } catch {
      cartBurgers = [];
    }
  }
  renderBurgerCart();
  loadBurgers();
});