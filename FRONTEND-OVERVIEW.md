# 🍔 Food Delivery Project - Frontend Overview

This document explains **ONLY the frontend** (what users see) of the Food Delivery project in **simple words**.

---

## 📁 What is the Frontend?

The frontend is everything that runs in your **web browser** - the pages you see, the buttons you click, and how the website looks and works.

---

## 🗂️ Folder Structure

```
frontend/
├── index.html              ← Main home page
├── login.html              ← Login page
├── register.html           ← Sign-up page
├── restaurants.html        ← List of all restaurants
├── restaurant-menu.html    ← Menu of a single restaurant
├── shops.html              ← Shops for groceries, beauty items
├── burgers.html            ← Burger category page
├── drinks.html             ← Drinks category page
├── brands.html             ← Brands category page
├── hotels.html             ← Hotels category page
├── cart.html               ← Shopping cart page
├── checkout.html           ← Checkout/order placement page
├── track-order.html        ← Track your order status
├── profile.html            ← User profile page
├── faq.html                ← Frequently asked questions
├── privacy.html            ← Privacy policy
├── refund-policy.html      ← Refund policy
├── partials/               ← Reusable page parts
│   ├── header.html         ← Top navigation bar (appears on every page)
│   ├── footer.html         ← Bottom footer (appears on every page)
│   └── navbar.html         ← Navigation menu
└── assets/                 ← Images, styles, and scripts
    ├── css/                ← All styling files
    └── js/                 ← All JavaScript code files
```

---

## 📄 HTML Pages (What Each Page Does)

### 🏠 **index.html** - Home Page
- **What it does**: This is the first page users see when they visit the website
- **Shows**: 
  - Search bar to find restaurants or shops
  - Category cards (Restaurants, Shops, Drinks, Burgers, Brands)
  - Recent orders section
- **When clicked**: Takes you to different category pages

### 🍽️ **restaurants.html** - All Restaurants
- **What it does**: Shows a list of all available restaurants
- **Features**:
  - Search bar to find specific restaurants
  - Filters: City selection, minimum rating filter
  - Restaurant cards showing name, cuisine, rating, delivery time, delivery fee
- **When clicked**: Opens that restaurant's menu page

### 📋 **restaurant-menu.html** - Single Restaurant Menu
- **What it does**: Shows all food items from one restaurant
- **Shows**:
  - Restaurant info (name, rating, delivery time, location)
  - Category filters (Appetizers, Main Course, Desserts, etc.)
  - Menu items with pictures, names, descriptions, and prices
  - "Add to Cart" button for each item
- **Connected to**: URL parameter `?id=123` tells it which restaurant to show

### 🛍️ **shops.html** - Shopping Page
- **What it does**: Shows stores selling groceries, beauty products, health items
- **Shows**:
  - List of shops with ratings
  - Products grouped by categories
  - Prices with discounts
  - Mini shopping cart on the side
- **Special**: Has a mini cart that updates instantly when you add items

### 🍔 **burgers.html** - Burger Category
- **What it does**: Shows all burger options from different restaurants
- **Features**: 
  - Search burgers by name
  - Filter by brand and price range
  - Shows burger cards with images and prices

### 🥤 **drinks.html** - Drinks Category
- **What it does**: Shows all available drinks
- **Features**: Similar to burgers page but for drinks

### 🏷️ **brands.html** - Brands Page
- **What it does**: Shows all available food brands
- **Features**: Filter and browse by brand name

### 🛒 **cart.html** - Shopping Cart
- **What it does**: Shows all items you've added to your cart
- **Features**:
  - List of all cart items with images
  - Quantity controls (+ and - buttons)
  - Remove item button (trash icon)
  - Shows subtotal, delivery fee, and total price
  - "Proceed to Checkout" button

### ✅ **checkout.html** - Complete Your Order
- **What it does**: Final step before placing your order
- **Shows**:
  - Summary of all items in your cart
  - Delivery address (pre-filled)
  - Payment method (Cash on Delivery)
  - Total amount
  - "Place Order" button
- **After placing order**: Redirects to order tracking page

### 📦 **track-order.html** - Track Your Order
- **What it does**: Shows your order status in real-time
- **Shows**:
  - Order ID and time
  - Status timeline (Order Placed → Confirmed → Ready → Out for Delivery → Delivered)
  - List of items in the order
  - Delivery information (address, phone, payment method)
  - "Order Again" button

### 🔐 **login.html** - User Login
- **What it does**: Lets users log into their account
- **Features**:
  - Email and password input fields
  - "Log In" button
  - Link to sign-up page
  - Placeholder for social login (Facebook, Google, Apple)

### 📝 **register.html** - Create New Account
- **What it does**: Lets new users create an account
- **Features**: Similar to login but with name and additional fields

---

## 🎨 CSS Files (How Pages Look)

All CSS files are in `assets/css/` folder:

- **layout.css** - Overall page structure (header, footer, navigation)
- **main.css** - Home page styling
- **restaurants.css** - Restaurant list page styling
- **restaurant-menu.css** - Menu page styling
- **shops.css** - Shops page styling
- **cart.css** - Shopping cart styling
- **burgers.css** - Burgers page styling
- **drinks.css** - Drinks page styling
- **brands.css** - Brands page styling
- **auth.css** - Login and register pages styling
- **order-tracking.css** - Order tracking page styling
- **legal.css** - FAQ, privacy policy pages styling
- **responsive.css** - Makes website work on phones and tablets

### 🎨 Color Theme
- **Primary color**: Pink (#ff2b85) - like Foodpanda
- **Style**: Modern, clean, card-based design

---

## 💻 JavaScript Files (How Pages Work)

All JavaScript files are in `assets/js/` folder:

### 🔧 **Utility Files** (Helper Functions)

#### **utils/dom-utils.js** - Page Part Loader
- **What it does**: Loads reusable page parts (header, footer) automatically
- **Main functions**:
  - `loadPartials()` - Loads header and footer into every page
  - `activateNavTab()` - Highlights the current page in the navigation menu
- **How it works**: Every page has `<div data-include="partials/header.html">` tags, this script finds them and loads the HTML

#### **utils/storage.js** - Storage Helper (Currently empty)
- Reserved for future localStorage functions

#### **utils/cart-utils.js** - Shopping Cart Functions
- **What it does**: Manages shopping cart across all pages
- **Main functions**:
  - `getCart()` - Gets all items from cart (stored in browser)
  - `addToCart(item)` - Adds new item or increases quantity
  - `removeFromCart(itemId)` - Removes item completely
  - `updateCartItemQty(itemId, qty)` - Changes quantity of an item
  - `getCartTotal()` - Calculates total price
  - `getCartCount()` - Counts total items in cart
  - `clearCart()` - Empties the cart
  - `updateCartBadge()` - Updates cart icon number in header
- **How it stores data**: Uses `localStorage` (browser storage) with key `fd_cart`

### 🌐 **API Communication**

#### **api.js** - Talks to Backend Server
- **What it does**: Fetches data from the backend (restaurants, menus, products)
- **Backend URL**: `http://localhost:5000`
- **Main functions**:
  - `window.api.getShops()` - Gets all shops
  - `window.api.getRestaurants()` - Gets all restaurants
  - `window.api.getRestaurantById(id)` - Gets one restaurant details
  - `window.api.getRestaurantMenu(id)` - Gets menu items for a restaurant
  - `window.api.getBurgers()` - Gets all burgers
  - `window.api.getDrinks()` - Gets all drinks
  - `window.api.getBrands()` - Gets all brands

### 📄 **Page-Specific JavaScript Files**

#### **main.js** - Home Page Script
- **What it does**: Shows welcome message if user is logged in
- **How it works**: 
  - Checks localStorage for user data
  - If found, displays "Welcome back, [name]" in the header

#### **auth.js** - Login Page Script
- **What it does**: Handles user login
- **Main parts**:
  - Gets email and password from form
  - Sends to backend server
  - If successful: Saves user data in localStorage and redirects to home
  - If failed: Shows error message
- **Extra features**: 
  - Close button (goes back to home)
  - Sign-up button (goes to register page)
  - Social login buttons (show "not implemented" alert)

#### **restaurants.js** - Restaurants List Page Script
- **What it does**: Shows and filters restaurant list
- **Main functions**:
  - `loadRestaurants()` - Fetches all restaurants from backend
  - `createRestaurantCard(r)` - Creates HTML card for one restaurant
  - `renderRestaurants(list)` - Displays all restaurant cards
  - `applyFilters()` - Filters by search term, city, and rating
- **Filters work by**: 
  - Search: Matches restaurant name or cuisine type
  - City: Shows only restaurants in selected city
  - Rating: Shows only restaurants above selected rating
- **When restaurant clicked**: Goes to `restaurant-menu.html?id=123`

#### **restaurant-menu.js** - Restaurant Menu Page Script
- **What it does**: Shows menu for a single restaurant
- **Main functions**:
  - `loadRestaurantMenu()` - Fetches restaurant info and menu items
  - `renderRestaurantInfo(r)` - Shows restaurant details at top
  - `getCategories(items)` - Gets unique food categories
  - `renderCategoryFilters(categories)` - Creates category filter buttons
  - `renderMenuItems(items)` - Shows menu item cards
  - `showToast(message)` - Shows popup message when adding to cart
- **How categories work**: 
  - Gets restaurant ID from URL (`?id=123`)
  - Groups menu items by category (Appetizers, Main Course, etc.)
  - Click category button to filter items
- **Add to Cart**: 
  - Click "Add to Cart" button
  - Calls `addToCart(item)` from cart-utils.js
  - Shows toast message "Item added to cart!"

#### **shops.js** - Shops Page Script
- **What it does**: Shows shops and products, manages mini cart
- **Main functions**:
  - `loadShopsAndProducts()` - Fetches all shops and products
  - `createShopCard(shop)` - Creates shop card HTML
  - `createProductCard(product)` - Creates product card HTML
  - `addToCart(product)` - Adds product to cart
  - `renderCart()` - Updates mini cart display
  - `showToast(message)` - Shows notification
- **Special feature**: 
  - Has a mini cart on the side of the page
  - Updates instantly when you add items
  - Shows subtotal and checkout button

#### **burgers.js** - Burgers Page Script
- **What it does**: Shows burger products with filters
- **Features**: Similar to restaurants page but for burgers
- **Filters**: Brand name and price range

#### **drinks.js** - Drinks Page Script
- **What it does**: Shows drink products with filters
- **Features**: Similar to burgers page but for drinks

#### **brands.js** - Brands Page Script
- **What it does**: Shows brand cards
- **Features**: Lists all available brands

#### **cart.js** - Shopping Cart Page Script
- **What it does**: Shows full cart page with all items
- **Main functions**:
  - `renderCartPage()` - Displays all cart items
  - Updates quantity with + and - buttons
  - Shows subtotal, delivery fee (Rs. 150), and total
  - Remove item button (trash icon)
- **If cart empty**: Shows "Your cart is empty" message with link to browse restaurants

#### **checkout.js** - Checkout Page Script
- **What it does**: Handles order placement
- **Main functions**:
  - `renderCheckout()` - Shows order summary
  - `placeOrder()` - Creates order and saves it
- **How placing order works**:
  1. Creates order object with order ID, items, prices, address, phone
  2. Saves order to localStorage as `fd_current_order`
  3. Clears the cart
  4. Shows success message
  5. Redirects to order tracking page

#### **track-order.js** - Order Tracking Page Script
- **What it does**: Shows order status with timeline
- **Main functions**:
  - `getOrder()` - Gets order from localStorage
  - `getOrderStatus()` - Gets current status (0-4)
  - `renderOrder(order)` - Displays order with status timeline
  - `simulateStatusUpdate()` - Demo function to move to next status
- **Order statuses**:
  - 0: Order Placed ✓
  - 1: Order Confirmed ✓
  - 2: Food Ready ✓
  - 3: Out for Delivery 🛵
  - 4: Delivered 🎉
- **Demo feature**: "Simulate Next Status" button to test the tracking

---

## 🔗 How Files Are Connected

### 1. **Page Loading Flow**:
```
User opens browser
    ↓
Loads HTML file (e.g., restaurants.html)
    ↓
HTML loads CSS files (styling)
    ↓
HTML loads JavaScript files
    ↓
JavaScript runs and makes page interactive
    ↓
JavaScript may fetch data from backend API
    ↓
Page is fully loaded and ready to use
```

### 2. **Navigation Between Pages**:
```
index.html (Home)
    ↓ Click "Restaurants" card
restaurants.html (Restaurant List)
    ↓ Click a restaurant card
restaurant-menu.html?id=123 (Menu)
    ↓ Click "Add to Cart" button
Cart updates (cart-utils.js)
    ↓ Click cart icon 🛒
cart.html (Shopping Cart)
    ↓ Click "Proceed to Checkout"
checkout.html (Checkout)
    ↓ Click "Place Order"
track-order.html (Order Tracking)
```

### 3. **Header and Footer Connection**:
Every page has these lines:
```html
<div data-include="partials/header.html"></div>
<!-- Page content here -->
<div data-include="partials/footer.html"></div>
<script src="assets/js/utils/dom-utils.js"></script>
```

The `dom-utils.js` script finds all `data-include` elements and loads the HTML automatically. This way, header and footer appear on every page without copying code.

### 4. **Cart Connection Across Pages**:
```
restaurant-menu.js
    ↓ User clicks "Add to Cart"
Calls addToCart() from cart-utils.js
    ↓
cart-utils.js saves to localStorage
    ↓
cart-utils.js updates badge number in header
    ↓
Any page can access cart using getCart()
```

### 5. **API Connection**:
```
JavaScript file (e.g., restaurants.js)
    ↓ Needs restaurant data
Calls window.api.getRestaurants()
    ↓ api.js function
Fetches from http://localhost:5000/api/restaurants
    ↓ Backend server responds
api.js returns data as JSON
    ↓
JavaScript file receives data and displays it
```

---

## 🔄 Important JavaScript Functions Summary

### **Cart Management** (cart-utils.js):
| Function | What it does |
|----------|-------------|
| `addToCart(item)` | Adds item to cart or increases quantity |
| `removeFromCart(itemId)` | Removes item from cart |
| `updateCartItemQty(itemId, qty)` | Changes quantity |
| `getCart()` | Gets all cart items |
| `getCartTotal()` | Calculates total price |
| `clearCart()` | Empties cart |
| `updateCartBadge()` | Updates cart number in header |

### **API Calls** (api.js):
| Function | What it does |
|----------|-------------|
| `window.api.getRestaurants()` | Gets all restaurants |
| `window.api.getRestaurantById(id)` | Gets one restaurant |
| `window.api.getRestaurantMenu(id)` | Gets restaurant menu |
| `window.api.getShops()` | Gets all shops |
| `window.api.getBurgers()` | Gets all burgers |
| `window.api.getDrinks()` | Gets all drinks |
| `window.api.getBrands()` | Gets all brands |

### **Page Utilities** (dom-utils.js):
| Function | What it does |
|----------|-------------|
| `loadPartials()` | Loads header and footer |
| `activateNavTab()` | Highlights active page in nav |

---

## 💾 Data Storage (Browser Storage)

The frontend stores data in the browser using **localStorage**:

| Key | What it stores | Used by |
|-----|---------------|---------|
| `fd_user` | Logged-in user info (name, email) | auth.js, main.js |
| `fd_cart` | Shopping cart items | cart-utils.js, cart.js, shops.js |
| `fd_current_order` | Latest order details | checkout.js, track-order.js |
| `fd_order_status` | Order status number (0-4) | track-order.js |

**Note**: This data stays in your browser even after closing the page, but gets deleted if you clear browser data.

---

## 🎯 User Journey Examples

### **Example 1: Ordering Food**
1. User opens **index.html** (Home page)
2. Clicks "Restaurants" card → Goes to **restaurants.html**
3. Searches for "pizza" or filters by city → **restaurants.js** filters list
4. Clicks a restaurant → Goes to **restaurant-menu.html?id=123**
5. Browses menu, clicks "Add to Cart" → **restaurant-menu.js** calls `addToCart()`
6. Cart badge updates → **cart-utils.js** updates header
7. Clicks cart icon 🛒 → Goes to **cart.html**
8. Reviews cart, clicks "Proceed to Checkout" → Goes to **checkout.html**
9. Clicks "Place Order" → **checkout.js** creates order, clears cart
10. Redirected to **track-order.html** → Shows order status

### **Example 2: Shopping at a Store**
1. User opens **index.html**
2. Clicks "Shops" card → Goes to **shops.html**
3. Browses products by category
4. Clicks + button on products → **shops.js** adds to mini cart
5. Mini cart updates instantly on the same page
6. Clicks "Checkout" in mini cart → Goes to **checkout.html**
7. Places order → Same as above

### **Example 3: Logging In**
1. User clicks "Log in" button in header
2. Goes to **login.html**
3. Enters email and password
4. **auth.js** sends data to backend
5. If successful: Saves user to `localStorage` as `fd_user`
6. Redirected to **index.html**
7. **main.js** reads `fd_user` and shows "Welcome back, [name]"

---

## 🔍 Key Technologies Used (Frontend Only)

- **HTML5** - Structure of web pages
- **CSS3** - Styling and layout
- **JavaScript (Vanilla/Plain)** - No frameworks like React or Vue
- **localStorage** - Browser storage for cart and user data
- **Fetch API** - To communicate with backend server
- **URLSearchParams** - To read URL parameters like `?id=123`

---

## 📱 Responsive Design

The website works on all devices:
- **Desktop**: Full layout with sidebar filters
- **Tablet**: Adjusted layout
- **Mobile**: Stacked layout, touch-friendly buttons

This is handled by **responsive.css** file.

---

## ✨ Special Features

1. **Reusable Header/Footer**: Using `data-include` attribute and `dom-utils.js`
2. **Persistent Cart**: Cart items saved in browser, survive page refresh
3. **Toast Notifications**: Pop-up messages when adding to cart
4. **Dynamic Content**: Data loaded from backend API
5. **URL Parameters**: Pages like `restaurant-menu.html?id=123` use URL to know which restaurant
6. **Order Tracking**: Simulated order status progression
7. **Filter & Search**: Real-time filtering on multiple pages

---

## 🎨 Summary

**The frontend is a complete food delivery website that:**
- Shows restaurants, shops, and products
- Lets users browse menus and add items to cart
- Handles checkout and order placement
- Tracks orders with status timeline
- Works on all devices (responsive)
- Saves data in browser (localStorage)
- Communicates with backend server (API calls)

**Built with**: Pure HTML, CSS, and JavaScript - no frameworks!

**Design inspiration**: Foodpanda (pink theme, card layouts, modern UI)

---

## 🤔 Questions?

If you want to know more about any specific part, just ask! This overview covers only the frontend (what runs in the browser), not the backend (server-side code).
