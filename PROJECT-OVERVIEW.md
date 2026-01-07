# 🍔 Food Delivery Project - Complete Overview (Frontend + Backend)

This document explains the **entire project** - both frontend and backend in simple words.

---

## 📁 Complete Project Structure (Copy-Paste Ready)

```
The-Fooddelivery-Project/
│
├── README.md                       ← Project description
├── FRONTEND-OVERVIEW.md            ← Frontend-only documentation
├── PROJECT-OVERVIEW.md             ← This file (complete overview)
├── package.json                    ← Root package file
│
├── backend/                        ← SERVER-SIDE CODE
│   ├── server.js                   ← Main entry point (starts server)
│   ├── package.json                ← Backend dependencies
│   ├── package-lock.json           ← Dependency lock file
│   │
│   ├── config/                     ← Configuration files
│   │   ├── db.js                   ← Database configuration (empty/unused)
│   │   └── env.js                  ← Environment variables (empty/unused)
│   │
│   ├── controllers/                ← Request handlers (business logic)
│   │   ├── auth.controller.js      ← Login/register logic
│   │   ├── brands.controller.js    ← Brands data handling
│   │   ├── burgers.controller.js   ← Burgers data handling
│   │   ├── cart.controller.js      ← Cart operations
│   │   ├── drinks.controller.js    ← Drinks data handling
│   │   ├── hotels.controller.js    ← Hotels data handling
│   │   ├── map.controller.js       ← Map/location services
│   │   ├── restaurants.controller.js ← Restaurants data handling
│   │   └── shops.controller.js     ← Shops/products data handling
│   │
│   ├── data/                       ← JSON files (database replacement)
│   │   ├── brands.json             ← Brand data
│   │   ├── burgers.json            ← Burger products data
│   │   ├── drinks.json             ← Drink products data
│   │   ├── hotels.json             ← Hotel data
│   │   ├── menu-items.json         ← Restaurant menu items
│   │   ├── products.json           ← Shop products
│   │   ├── restaurants.json        ← Restaurant data
│   │   └── shops.json              ← Shop data
│   │
│   ├── logs/                       ← Application logs
│   │   └── app.log                 ← Log file
│   │
│   ├── middleware/                 ← Express middleware
│   │   ├── auth.middleware.js      ← Authentication checks
│   │   └── error-handler.js        ← Error handling
│   │
│   ├── models/                     ← Data models (schemas)
│   │   ├── Brand.js                ← Brand model
│   │   ├── Burger.js               ← Burger model
│   │   ├── CartItem.js             ← Cart item model
│   │   ├── Drink.js                ← Drink model
│   │   ├── Hotel.js                ← Hotel model
│   │   ├── Restaurant.js           ← Restaurant model
│   │   ├── Shop.js                 ← Shop model
│   │   └── User.js                 ← User model
│   │
│   ├── routes/                     ← API endpoint definitions
│   │   ├── auth.routes.js          ← /api/auth/* routes
│   │   ├── brands.routes.js        ← /api/brands/* routes
│   │   ├── burgers.routes.js       ← /api/burgers/* routes
│   │   ├── cart.routes.js          ← /api/cart/* routes
│   │   ├── drinks.routes.js        ← /api/drinks/* routes
│   │   ├── hotels.routes.js        ← /api/hotels/* routes
│   │   ├── map.routes.js           ← /api/map/* routes
│   │   ├── restaurants.routes.js   ← /api/restaurants/* routes
│   │   └── shops.routes.js         ← /api/shops/* routes
│   │
│   └── services/                   ← Business logic services
│       ├── map.service.js          ← Map/location services
│       └── user.service.js         ← User management services
│
└── frontend/                       ← CLIENT-SIDE CODE (BROWSER)
    ├── index.html                  ← Home/dashboard page
    ├── login.html                  ← Login page
    ├── register.html               ← Sign-up page
    ├── restaurants.html            ← Restaurant list page
    ├── restaurant-menu.html        ← Single restaurant menu
    ├── shops.html                  ← Shops/products page
    ├── burgers.html                ← Burgers category page
    ├── drinks.html                 ← Drinks category page
    ├── brands.html                 ← Brands page
    ├── hotels.html                 ← Hotels page
    ├── cart.html                   ← Shopping cart page
    ├── checkout.html               ← Checkout/order page
    ├── track-order.html            ← Order tracking page
    ├── profile.html                ← User profile page
    ├── faq.html                    ← FAQ page
    ├── privacy.html                ← Privacy policy page
    ├── refund-policy.html          ← Refund policy page
    ├── favicon.ico                 ← Website icon
    │
    ├── partials/                   ← Reusable page components
    │   ├── header.html             ← Top navigation bar
    │   ├── footer.html             ← Bottom footer
    │   └── navbar.html             ← Navigation menu
    │
    └── assets/                     ← Static resources
        │
        ├── css/                    ← Stylesheets
        │   ├── layout.css          ← Overall layout (header/footer/nav)
        │   ├── main.css            ← Home page styles
        │   ├── restaurants.css     ← Restaurants page styles
        │   ├── restaurant-menu.css ← Menu page styles
        │   ├── shops.css           ← Shops page styles
        │   ├── cart.css            ← Cart page styles
        │   ├── burgers.css         ← Burgers page styles
        │   ├── drinks.css          ← Drinks page styles
        │   ├── brands.css          ← Brands page styles
        │   ├── hotels.css          ← Hotels page styles
        │   ├── auth.css            ← Login/register page styles
        │   ├── order-tracking.css  ← Order tracking page styles
        │   ├── legal.css           ← FAQ/privacy page styles
        │   └── responsive.css      ← Mobile/tablet responsive styles
        │
        ├── js/                     ← JavaScript files
        │   ├── main.js             ← Home page script
        │   ├── api.js              ← Backend API communication
        │   ├── auth.js             ← Login/register logic
        │   ├── restaurants.js      ← Restaurant list page logic
        │   ├── restaurant-menu.js  ← Menu page logic
        │   ├── shops.js            ← Shops page logic
        │   ├── burgers.js          ← Burgers page logic
        │   ├── drinks.js           ← Drinks page logic
        │   ├── brands.js           ← Brands page logic
        │   ├── hotels.js           ← Hotels page logic
        │   ├── cart.js             ← Cart page logic
        │   ├── checkout.js         ← Checkout page logic
        │   ├── track-order.js      ← Order tracking logic
        │   ├── map.js              ← Map functionality (empty)
        │   │
        │   └── utils/              ← Utility functions
        │       ├── dom-utils.js    ← DOM helpers (load partials)
        │       ├── cart-utils.js   ← Cart management functions
        │       └── storage.js      ← Storage helpers (empty)
        │
        └── manifest/               ← Web app manifest
            └── site.webmanifest    ← PWA configuration
```

---

## 🏗️ Architecture Overview

### **How Frontend and Backend Work Together**

```
┌─────────────────────────────────────────────────────────────┐
│                        USER'S BROWSER                        │
│  ┌────────────────────────────────────────────────────────┐ │
│  │  Frontend (HTML + CSS + JavaScript)                    │ │
│  │  - Shows pages to user                                 │ │
│  │  - Handles user clicks and inputs                      │ │
│  │  - Stores cart in localStorage                         │ │
│  └────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
                            ↕ 
              (Fetch API / HTTP Requests)
                            ↕
┌─────────────────────────────────────────────────────────────┐
│                      SERVER (Node.js)                        │
│  ┌────────────────────────────────────────────────────────┐ │
│  │  Backend (Express Server)                              │ │
│  │  - Receives requests from frontend                     │ │
│  │  - Reads data from JSON files                          │ │
│  │  - Sends data back to frontend                         │ │
│  │  - Runs on http://localhost:5000                       │ │
│  └────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
                            ↕
              (File System Read/Write)
                            ↕
┌─────────────────────────────────────────────────────────────┐
│              JSON FILES (Database Replacement)               │
│  restaurants.json, menu-items.json, shops.json, etc.        │
└─────────────────────────────────────────────────────────────┘
```

---

## 🖥️ BACKEND (Server-Side)

### **What is the Backend?**

The backend is a **Node.js server** that:
- Stores all the data (restaurants, menus, products)
- Provides data to the frontend through **API endpoints**
- Runs on **http://localhost:5000**

### **Technology Stack**

- **Node.js** - JavaScript runtime (runs JavaScript on server)
- **Express.js** - Web framework (creates API endpoints)
- **CORS** - Allows frontend to talk to backend
- **JSON files** - Acts as database (instead of MongoDB/PostgreSQL)

---

## 🔧 Backend Components Explained

### **1. server.js** - Main Server File

This is where everything starts. It:
- Creates the Express server
- Connects all routes
- Starts listening on port 5000

```javascript
const express = require('express');
const app = express();

// Connect routes
app.use('/api/auth', authRoutes);
app.use('/api/restaurants', restaurantsRoutes);
app.use('/api/shops', shopsRoutes);
// ... more routes

// Start server
app.listen(5000, () => {
  console.log('Server running on http://localhost:5000');
});
```

**When you run**: `npm start` in backend folder, this file starts the server.

---

### **2. routes/** - API Endpoint Definitions

Routes define **what URLs** the backend responds to.

**Example: restaurants.routes.js**
```javascript
router.get('/', getAllRestaurants);           // GET /api/restaurants
router.get('/:id', getRestaurantById);        // GET /api/restaurants/123
router.get('/:id/menu', getRestaurantMenuItems); // GET /api/restaurants/123/menu
```

**All Available Routes:**

| File | Base URL | Purpose |
|------|----------|---------|
| auth.routes.js | /api/auth | Login, register |
| restaurants.routes.js | /api/restaurants | Get restaurants, menus |
| shops.routes.js | /api/shops | Get shops, products |
| burgers.routes.js | /api/burgers | Get burger products |
| drinks.routes.js | /api/drinks | Get drink products |
| brands.routes.js | /api/brands | Get brands |
| hotels.routes.js | /api/hotels | Get hotels |
| cart.routes.js | /api/cart | Cart operations |
| map.routes.js | /api/map | Location services |

---

### **3. controllers/** - Request Handlers

Controllers contain the **logic** for each API endpoint.

**Example: restaurants.controller.js**

```javascript
exports.getAllRestaurants = (req, res) => {
  // 1. Read restaurants.json file
  const restaurants = readRestaurants();
  
  // 2. Filter by query parameters (city, rating, search)
  let filtered = restaurants;
  if (req.query.city) {
    filtered = filtered.filter(r => r.city === req.query.city);
  }
  
  // 3. Send back as JSON
  res.json(filtered);
};

exports.getRestaurantById = (req, res) => {
  const id = req.params.id;
  const restaurant = restaurants.find(r => r.id === id);
  res.json(restaurant);
};
```

**What controllers do:**
1. Receive request from frontend
2. Read data from JSON files
3. Filter/process data if needed
4. Send response back to frontend

---

### **4. data/** - JSON Files (Database)

Instead of using a real database like MongoDB, this project uses **JSON files** to store data.

**Files:**
- **restaurants.json** - 15+ Pakistani restaurants
- **menu-items.json** - 150+ food items with prices
- **shops.json** - Shops data (groceries, beauty, etc.)
- **products.json** - Shop products
- **burgers.json** - Burger products
- **drinks.json** - Drink products
- **brands.json** - Brand information
- **hotels.json** - Hotel data

**Example data structure (restaurants.json):**
```json
[
  {
    "id": 1,
    "name": "KFC",
    "cuisine": "Fast Food",
    "city": "Islamabad",
    "rating": 4.5,
    "deliveryTime": "30-40 min",
    "deliveryFee": 99,
    "minOrder": 299,
    "open": true,
    "image": "https://..."
  },
  ...
]
```

---

### **5. models/** - Data Models (Schemas)

Models define what data looks like (structure/format).

**Note**: In this project, models are mostly **empty files** because the project uses JSON files directly instead of a database. In a real app with MongoDB, these would define schemas.

---

### **6. middleware/** - Middleware Functions

Middleware are functions that run **before** your controller.

**auth.middleware.js** - Checks if user is logged in
```javascript
function requireAuth(req, res, next) {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  next(); // Continue to controller
}
```

**error-handler.js** - Handles errors globally

---

### **7. services/** - Business Logic

Services contain reusable business logic.

- **user.service.js** - User-related operations
- **map.service.js** - Location/map services

---

## 🔄 Backend Request Flow

```
Frontend makes request
    ↓
http://localhost:5000/api/restaurants
    ↓
Express receives request
    ↓
Routes match URL → restaurants.routes.js
    ↓
Route calls controller → restaurants.controller.js
    ↓
Controller reads JSON file → restaurants.json
    ↓
Controller filters/processes data
    ↓
Controller sends JSON response back to frontend
    ↓
Frontend receives data and displays it
```

---

## 🌐 API Endpoints List

### **Authentication**
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration

### **Restaurants**
- `GET /api/restaurants` - Get all restaurants
  - Query params: `?city=Islamabad&minRating=4.0&q=pizza`
- `GET /api/restaurants/:id` - Get single restaurant
- `GET /api/restaurants/:id/menu` - Get restaurant menu items

### **Shops**
- `GET /api/shops` - Get all shops
- `GET /api/shops/:id/products` - Get shop products
- `GET /api/shops/products` - Get all products

### **Burgers**
- `GET /api/burgers` - Get all burgers
- `GET /api/burgers/:id` - Get single burger

### **Drinks**
- `GET /api/drinks` - Get all drinks
- `GET /api/drinks/:id` - Get single drink

### **Brands**
- `GET /api/brands` - Get all brands
- `GET /api/brands/:id` - Get single brand

### **Health Check**
- `GET /api/health` - Check if server is running

---

## 🎨 FRONTEND (Client-Side)

### **What is the Frontend?**

The frontend is everything that runs in the **browser** - the pages you see, buttons you click, and how it looks.

**Detailed frontend documentation**: See [FRONTEND-OVERVIEW.md](FRONTEND-OVERVIEW.md)

### **Quick Summary:**

**HTML Pages (17 total):**
- index.html - Home page
- restaurants.html - Restaurant list
- restaurant-menu.html - Single restaurant menu
- shops.html - Shops/products
- cart.html - Shopping cart
- checkout.html - Order placement
- track-order.html - Order tracking
- login.html, register.html - Authentication
- burgers.html, drinks.html, brands.html, hotels.html - Categories
- faq.html, privacy.html, refund-policy.html, profile.html - Other pages

**CSS Files (14 total):**
- Separate CSS for each page
- responsive.css for mobile/tablet support

**JavaScript Files (15 total):**
- api.js - Communicates with backend
- Page-specific scripts (restaurants.js, cart.js, etc.)
- Utilities (dom-utils.js, cart-utils.js)

---

## 🔗 Frontend ↔ Backend Communication

### **How They Talk**

Frontend uses **Fetch API** to make HTTP requests:

```javascript
// Frontend (api.js)
async function apiGet(endpoint) {
  const response = await fetch(`http://localhost:5000${endpoint}`);
  return response.json();
}

// Usage in restaurants.js
const restaurants = await window.api.getRestaurants();
```

### **Example Flow: Loading Restaurant List**

1. **User opens** `restaurants.html`
2. **JavaScript runs** `restaurants.js`
3. **JavaScript calls** `window.api.getRestaurants()`
4. **api.js sends** HTTP GET request to `http://localhost:5000/api/restaurants`
5. **Backend receives** request in `restaurants.routes.js`
6. **Route calls** `restaurants.controller.js`
7. **Controller reads** `data/restaurants.json`
8. **Backend sends** JSON response back
9. **Frontend receives** data
10. **JavaScript creates** HTML cards for each restaurant
11. **User sees** restaurant list on page

---

## 💾 Data Storage

### **Backend Storage:**
- **JSON Files** in `backend/data/` folder
- Acts as a simple database
- Data persists permanently on server

### **Frontend Storage:**
- **localStorage** in browser
- Stores: cart items, user session, current order
- Data stays until browser cache is cleared
- Keys used: `fd_user`, `fd_cart`, `fd_current_order`, `fd_order_status`

---

## 🚀 How to Run the Project

### **1. Install Dependencies**

```bash
# Install backend dependencies
cd backend
npm install

# Frontend has no dependencies (pure HTML/CSS/JS)
```

### **2. Start Backend Server**

```bash
cd backend
npm start
```

Server starts at: **http://localhost:5000**

### **3. Serve Frontend**

Option A - Using Python:
```bash
cd frontend
python3 -m http.server 8080
```

Option B - Using Node http-server:
```bash
npm install -g http-server
cd frontend
http-server -p 8080
```

Option C - Open directly in browser:
```bash
# Open frontend/index.html in your browser
```

### **4. Access Website**

Open browser and go to:
- **http://localhost:8080** (if using frontend server)
- Or just open `frontend/index.html` directly

---

## 📦 Dependencies

### **Backend (Node.js)**
```json
{
  "express": "^5.2.1",    // Web framework
  "cors": "^2.8.5"         // Cross-origin requests
}
```

### **Frontend**
- **No dependencies!** Pure vanilla JavaScript
- No frameworks like React, Vue, or Angular
- No build process needed

---

## 🎯 Key Features

### **Frontend Features:**
- Browse restaurants by city and rating
- View detailed menus
- Add items to cart
- Place orders
- Track order status
- Shop for groceries and products
- User authentication (login/register)
- Responsive design (works on mobile)

### **Backend Features:**
- RESTful API
- Data filtering and search
- CORS enabled for frontend communication
- Static file serving
- Health check endpoint

---

## 🔐 Authentication Flow

```
1. User enters email/password on login.html
    ↓
2. Frontend sends POST to /api/auth/login
    ↓
3. Backend validates credentials (auth.controller.js)
    ↓
4. Backend sends back user data + token
    ↓
5. Frontend saves to localStorage as 'fd_user'
    ↓
6. User redirected to index.html
    ↓
7. Frontend reads 'fd_user' and shows welcome message
```

---

## 🛒 Shopping Cart Flow

```
1. User browses restaurant-menu.html
    ↓
2. Clicks "Add to Cart" on an item
    ↓
3. JavaScript calls addToCart(item) from cart-utils.js
    ↓
4. Cart stored in localStorage as 'fd_cart'
    ↓
5. Cart badge in header updates (shows item count)
    ↓
6. User clicks cart icon → goes to cart.html
    ↓
7. cart.js reads from localStorage and displays items
    ↓
8. User can update quantities or remove items
    ↓
9. User clicks "Checkout" → goes to checkout.html
    ↓
10. User clicks "Place Order"
    ↓
11. Order saved to localStorage as 'fd_current_order'
    ↓
12. Cart cleared
    ↓
13. Redirected to track-order.html
```

---

## 📊 Data Flow Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                         FRONTEND                             │
│                                                               │
│  User Browser                                                │
│  ├── HTML Pages (17 files)                                  │
│  ├── CSS Styles (14 files)                                  │
│  ├── JavaScript (15 files)                                  │
│  └── localStorage                                           │
│      ├── fd_user (logged-in user)                          │
│      ├── fd_cart (shopping cart)                           │
│      └── fd_current_order (active order)                   │
│                                                               │
└─────────────────────────────────────────────────────────────┘
                            ↕ HTTP Requests
                    (Fetch API - JSON)
                            ↕
┌─────────────────────────────────────────────────────────────┐
│                         BACKEND                              │
│                                                               │
│  Node.js Server (Express) - Port 5000                       │
│  ├── Routes (9 files) - URL definitions                    │
│  ├── Controllers (9 files) - Request handlers              │
│  ├── Middleware (2 files) - Auth, errors                   │
│  ├── Services (2 files) - Business logic                   │
│  └── Models (8 files) - Data schemas                       │
│                                                               │
└─────────────────────────────────────────────────────────────┘
                            ↕ File System
                    (fs.readFileSync)
                            ↕
┌─────────────────────────────────────────────────────────────┐
│                      DATA STORAGE                            │
│                                                               │
│  JSON Files (8 files)                                       │
│  ├── restaurants.json (15+ restaurants)                    │
│  ├── menu-items.json (150+ food items)                     │
│  ├── shops.json (shops data)                               │
│  ├── products.json (shop products)                         │
│  ├── burgers.json (burger products)                        │
│  ├── drinks.json (drink products)                          │
│  ├── brands.json (brand info)                              │
│  └── hotels.json (hotel data)                              │
│                                                               │
└─────────────────────────────────────────────────────────────┘
```

---

## 🎨 Design & Styling

### **Color Theme**
- **Primary**: Pink (#ff2b85) - Inspired by Foodpanda
- **Style**: Modern, clean, card-based design
- **Layout**: Responsive grid system

### **UI Components**
- Card layouts for restaurants/products
- Toast notifications
- Modal dialogs
- Progress timelines (order tracking)
- Filter sidebars
- Shopping cart sidebar

---

## 🔧 Technology Summary

| Component | Technology | Purpose |
|-----------|------------|---------|
| **Backend Server** | Node.js + Express | Handle API requests |
| **Backend Language** | JavaScript (CommonJS) | Server-side code |
| **Data Storage** | JSON Files | Store all data |
| **API Style** | REST API | Frontend-backend communication |
| **Frontend Pages** | HTML5 | Page structure |
| **Frontend Styling** | CSS3 | Visual design |
| **Frontend Logic** | Vanilla JavaScript | Interactivity |
| **Frontend-Backend** | Fetch API | HTTP requests |
| **Local Storage** | localStorage API | Browser storage |
| **Package Manager** | npm | Dependency management |

---

## 📝 File Naming Conventions

### **Backend:**
- Routes: `*.routes.js`
- Controllers: `*.controller.js`
- Models: Capitalized (e.g., `Restaurant.js`)
- Services: `*.service.js`
- Middleware: `*.middleware.js`

### **Frontend:**
- Pages: `*.html`
- Styles: `*.css`
- Scripts: `*.js`
- Utilities: `utils/*.js`

---

## 🌟 Special Features

### **1. Partial Loading (Reusable Components)**
Header and footer automatically load on every page using custom implementation:

```html
<!-- In any HTML page -->
<div data-include="partials/header.html"></div>
```

```javascript
// dom-utils.js loads these automatically
async function loadPartials() {
  const includeEls = document.querySelectorAll('[data-include]');
  for (const el of includeEls) {
    const path = el.getAttribute('data-include');
    const html = await fetch(path).then(r => r.text());
    el.innerHTML = html;
  }
}
```

### **2. Persistent Shopping Cart**
Cart survives page refresh using localStorage:

```javascript
// Add to cart
function addToCart(item) {
  const cart = getCart();
  cart.push(item);
  localStorage.setItem('fd_cart', JSON.stringify(cart));
}

// Get cart
function getCart() {
  const stored = localStorage.getItem('fd_cart');
  return stored ? JSON.parse(stored) : [];
}
```

### **3. Order Tracking with Status Timeline**
Simulated order progress with 5 stages:
- Order Placed
- Order Confirmed
- Food Ready
- Out for Delivery
- Delivered

### **4. Dynamic Filtering**
Real-time search and filters on multiple pages without page reload.

---

## 🚦 Request/Response Examples

### **Example 1: Get All Restaurants**

**Frontend Request:**
```javascript
const restaurants = await window.api.getRestaurants();
```

**Actual HTTP Request:**
```
GET http://localhost:5000/api/restaurants
```

**Backend Response:**
```json
[
  {
    "id": 1,
    "name": "KFC",
    "cuisine": "Fast Food",
    "city": "Islamabad",
    "rating": 4.5,
    "deliveryTime": "30-40 min",
    "deliveryFee": 99,
    "minOrder": 299,
    "open": true,
    "image": "https://..."
  },
  ...
]
```

### **Example 2: User Login**

**Frontend Request:**
```javascript
const response = await fetch('http://localhost:5000/api/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email: 'user@example.com', password: 'pass123' })
});
```

**Backend Response:**
```json
{
  "success": true,
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "user@example.com"
  },
  "token": "jwt_token_here"
}
```

---

## 🎓 Learning Path

### **For Beginners:**

1. **Start with Frontend**:
   - Open `frontend/index.html` in browser
   - Look at HTML structure
   - Check `assets/css/main.css` for styling
   - Read `assets/js/main.js` for logic

2. **Understand Backend**:
   - Read `backend/server.js` - entry point
   - Check `backend/routes/restaurants.routes.js` - URL definitions
   - Read `backend/controllers/restaurants.controller.js` - logic
   - Look at `backend/data/restaurants.json` - data

3. **See Communication**:
   - Open browser DevTools (F12)
   - Go to Network tab
   - Click around the website
   - See API requests being made

---

## 🛠️ Common Development Tasks

### **Add a New Restaurant:**
Edit `backend/data/restaurants.json` and add a new object.

### **Add a New Menu Item:**
Edit `backend/data/menu-items.json` with the restaurant's ID.

### **Change Color Theme:**
Edit `frontend/assets/css/layout.css` and update color variables.

### **Add a New API Endpoint:**
1. Add route in `backend/routes/*.routes.js`
2. Add controller function in `backend/controllers/*.controller.js`
3. Update `frontend/assets/js/api.js` to use it

---

## 📚 Summary

This is a **full-stack food delivery application** with:

**Backend (Node.js):**
- Express server on port 5000
- RESTful API with 9 route files
- JSON file-based data storage
- 8 controllers handling business logic

**Frontend (HTML/CSS/JS):**
- 17 HTML pages
- 14 CSS stylesheets
- 15 JavaScript files
- No frameworks - pure vanilla JS

**Communication:**
- Frontend calls backend via Fetch API
- Backend responds with JSON data
- Cart stored in browser localStorage

**Design:**
- Foodpanda-inspired pink theme
- Responsive for mobile/tablet/desktop
- Card-based modern UI

---

## 🤔 Questions?

This overview covers the **complete project** - both frontend and backend. For more detailed frontend information, see [FRONTEND-OVERVIEW.md](FRONTEND-OVERVIEW.md).
