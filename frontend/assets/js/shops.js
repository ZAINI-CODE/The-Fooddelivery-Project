// Shops page logic: fetch shops + products, render cards, handle cart + toast

const shopsRowEl = document.getElementById('shops-row');
const freshRowEl = document.getElementById('freshly-picked');
const beautyRowEl = document.getElementById('beauty-boutique');
const tissuesRowEl = document.getElementById('prime-tissues');
const healthRowEl = document.getElementById('health-essentials');

const heroBannerImg = document.getElementById('hero-banner-img');
const shopSearchEl = document.getElementById('shop-search');
const shopSearchBtnEl = document.getElementById('shop-search-btn');

const cartItemsEl = document.getElementById('cart-items');
const cartEmptyTextEl = document.getElementById('cart-empty-text');
const cartSubtotalEl = document.getElementById('cart-subtotal');
const cartTotalEl = document.getElementById('cart-total');
const checkoutBtn = document.getElementById('checkout-btn');

const toastEl = document.getElementById('toast');

let cart = [];
let toastTimeoutId = null;
let allShops = [];
let allProducts = [];

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

function createShopCard(shop) {
  const card = document.createElement('div');
  card.className = 'card shop-card';

  const img = document.createElement('div');
  img.className = 'card-image';
  img.style.backgroundImage = `url(${shop.thumbnail})`;

  const body = document.createElement('div');
  body.className = 'card-body';

  const title = document.createElement('div');
  title.className = 'card-title';
  title.textContent = shop.name;

  const subtitle = document.createElement('div');
  subtitle.className = 'card-subtitle';
  subtitle.textContent = shop.type;

  const meta = document.createElement('div');
  meta.className = 'card-meta';
  meta.textContent = `${shop.deliveryTime} • Rs. ${shop.deliveryFee} • ★ ${shop.rating.toFixed(
    1
  )}`;

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
  price.textContent = `Rs. ${product.price.toFixed(2)}`;

  const old = document.createElement('div');
  old.className = 'product-old-price';
  old.textContent = `Rs. ${product.oldPrice.toFixed(2)}`;

  const discount = document.createElement('div');
  discount.className = 'product-discount';
  discount.textContent = product.discount;

  const addBtn = document.createElement('button');
  addBtn.className = 'product-add-btn';
  addBtn.textContent = '+';
  addBtn.title = 'Add to cart';
  addBtn.addEventListener('click', () => addToCart(product));

  card.appendChild(img);
  card.appendChild(name);
  card.appendChild(price);
  card.appendChild(old);
  card.appendChild(discount);
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

async function loadShopsAndProducts() {
  try {
    allShops = await window.api.getShops();
    allProducts = await window.api.getAllProducts();
    applyShopsFilter();
  } catch (err) {
    console.error('Error loading shops/products:', err);
  }
}

function applyShopsFilter() {
  const searchTerm = shopSearchEl ? shopSearchEl.value.trim().toLowerCase() : '';
  
  let filteredShops = allShops;
  let filteredProducts = allProducts;
  
  if (searchTerm) {
    filteredShops = allShops.filter(shop => 
      shop.name.toLowerCase().includes(searchTerm) ||
      shop.type.toLowerCase().includes(searchTerm)
    );
    
    filteredProducts = allProducts.filter(product =>
      product.name.toLowerCase().includes(searchTerm) ||
      product.category.toLowerCase().includes(searchTerm)
    );
  }
  
  renderShopsAndProducts(filteredShops, filteredProducts);
}

function renderShopsAndProducts(shops, products) {
  // Hero banner image from first shop
  if (shops.length > 0 && heroBannerImg) {
    heroBannerImg.style.backgroundImage = `url(${shops[0].heroImage})`;
    heroBannerImg.style.backgroundSize = 'cover';
    heroBannerImg.style.backgroundPosition = 'center';
    heroBannerImg.textContent = '';
    heroBannerImg.style.height = '220px';
  }

  // Shops row
  shopsRowEl.innerHTML = '';
  shops.forEach((shop) => {
    shopsRowEl.appendChild(createShopCard(shop));
  });

  // Collect all shop products from shops.json
  let allShopProducts = [];
  shops.forEach(shop => {
    if (shop.products && Array.isArray(shop.products)) {
      shop.products.forEach(product => {
        allShopProducts.push({
          ...product,
          shopName: shop.name,
          shopId: shop.id
        });
      });
    }
  });

  // Group products by shop type for different sections
  const groceryShops = shops.filter(s => 
    s.type === 'Supermarket' || s.type === 'Hypermarket' || s.type === 'Groceries'
  );
  
  const bakeryShops = shops.filter(s => s.type === 'Bakery');
  
  const beautyShops = shops.filter(s => s.type === 'Beauty');
  
  const healthShops = shops.filter(s => s.type === 'Pharmacy');

  // Get products from each category
  const groceryProducts = [];
  groceryShops.forEach(shop => {
    if (shop.products) groceryProducts.push(...shop.products);
  });

  const bakeryProducts = [];
  bakeryShops.forEach(shop => {
    if (shop.products) bakeryProducts.push(...shop.products);
  });

  const beautyProducts = [];
  beautyShops.forEach(shop => {
    if (shop.products) beautyProducts.push(...shop.products);
  });

  const healthProducts = [];
  healthShops.forEach(shop => {
    if (shop.products) healthProducts.push(...shop.products);
  });

  freshRowEl.innerHTML = '';
  beautyRowEl.innerHTML = '';
  tissuesRowEl.innerHTML = '';
  healthRowEl.innerHTML = '';

  groceryProducts.slice(0, 10).forEach((p) => freshRowEl.appendChild(createProductCard(p)));
  bakeryProducts.slice(0, 10).forEach((p) => beautyRowEl.appendChild(createProductCard(p)));
  beautyProducts.slice(0, 10).forEach((p) => tissuesRowEl.appendChild(createProductCard(p)));
  healthProducts.slice(0, 10).forEach((p) => healthRowEl.appendChild(createProductCard(p)));
}

// Search event listeners
if (shopSearchEl) {
  shopSearchEl.addEventListener('input', applyShopsFilter);
  shopSearchEl.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      applyShopsFilter();
    }
  });
}

if (shopSearchBtnEl) {
  shopSearchBtnEl.addEventListener('click', applyShopsFilter);
}

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
  loadShopsAndProducts();
});