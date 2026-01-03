# QuickBite - Food Delivery Platform

A fully functional food delivery web application built with **HTML, CSS, and JavaScript** (frontend) and **Node.js** (backend). Features Pakistani restaurants, shops, drinks, and authentic cuisine with complete checkout and payment flow.

## 🎯 Features

### Customer Features
- **Browse Restaurants**: View 15+ Pakistani restaurants across major cities (Karachi, Lahore, Islamabad, etc.)
- **Shops**: Browse supermarkets and bakeries (Al-Fateh, Imtiaz Mart, Jalal Sons, Rahat, United)
- **Drinks**: Comprehensive drinks catalog with multiple brands and sizes (Pepsi, Coca Cola, water brands)
- **Brands**: Shop by favorite brands (KFC, McDonald's, Burger Lab, etc.)
- **Restaurant Menus**: Each restaurant has 10-15 authentic Pakistani food items
- **Filter & Search**: Filter by city, rating, category, and search across all sections
- **Shopping Cart**: Add items, update quantities, remove items with persistent cart
- **User Authentication**: Google login and email/password login required for checkout
- **Complete Checkout Flow**: 
  - Delivery address management with label options (Home, Work, Other)
  - Delivery options (Standard or Scheduled delivery)
  - Personal details form (Name, Email, Mobile)
  - Rider tip selection with preset and custom amounts
  - Order summary with fee breakdown
- **Payment Page**: Comprehensive payment interface with sticky order summary
- **Order Tracking**: Real-time order status updates
- **Recent Orders**: View order history on homepage
- **Location Management**: Manually set delivery location with localStorage persistence
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile

### UI/UX
- **Modern Design**: Pink accent color (#ff2b85) with clean card-based layouts
- **Grid Layout**: 3-column responsive grid for restaurants, shops, and products
- **Smooth Animations**: Transitions and interactive elements
- **Toast Notifications**: User-friendly feedback messages

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Modern web browser

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/ZAINI-CODE/The-Fooddelivery-Project.git
   cd The-Fooddelivery-Project
   ```

2. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Start the backend server**
   ```bash
   npm start
   ```
   Backend runs on http://localhost:5000

4. **Serve the frontend**
   
   Open a new terminal and navigate to the frontend folder:
   ```bash
   cd frontend
   python3 -m http.server 8080
   ```
   Or use any static file server of your choice.

5. **Open in browser**
   
   Navigate to http://localhost:8080

## 📁 Project Structure

```
The-Fooddelivery-Project/
├── backend/
│   ├── data/
│   │   ├── restaurants.json      # Restaurant data with brand logos
│   │   ├── shops.json             # Shops data (supermarkets, bakeries)
│   │   ├── drinks.json            # Drinks catalog
│   │   ├── brands.json            # Brands with products
│   │   └── products.json          # Shop products
│   ├── server.js                  # Express server
│   └── package.json
├── frontend/
│   ├── assets/
│   │   ├── css/
│   │   │   ├── layout.css         # Main layout styles
│   │   │   ├── payment.css        # Payment page styles
│   │   │   ├── restaurants.css    # Restaurant grid styles
│   │   │   └── ...
│   │   └── js/
│   │       ├── payment.js         # Payment page logic
│   │       ├── auth.js            # Authentication logic
│   │       ├── utils/
│   │       │   ├── cart-utils.js  # Cart management
│   │       │   └── dom-utils.js   # DOM utilities
│   │       └── ...
│   ├── partials/
│   │   ├── header.html            # Header with location input
│   │   └── footer.html            # Footer
│   ├── index.html                 # Homepage
│   ├── restaurants.html           # Restaurants page
│   ├── shops.html                 # Shops page
│   ├── drinks.html                # Drinks page
│   ├── brands.html                # Brands page
│   ├── cart.html                  # Shopping cart
│   ├── checkout.html              # Checkout summary
│   ├── payment.html               # Payment and order placement
│   ├── login.html                 # Login page
│   └── track-order.html           # Order tracking
├── .gitignore
├── README.md
└── package.json
```

## 🍽️ Featured Content

### Restaurants (15)
KFC, McDonald's, OPTP, Hardee's, Burger Lab, Howdy, Jalil Kabab House, Tandoori Restaurant, Monal Downtown, Savour Foods, Cheezious, Broadway Pizza, Nando's, Karachi Biryani House, Student Biryani

### Shops (10)
- **Supermarkets**: Al-Fateh Store, Imtiaz Mart, Fresh Mart
- **Bakeries**: Jalal Sons, Rahat Bakery, United Bakery
- **Others**: Med-Cure Pharmacy, Allure Beauty, Green Valley Organics, HealthPlus

### Drinks (32 products)
- Soft drinks (Pepsi, Coca Cola, Gourmet) in 0.5L, 1L, 1.5L, 2.5L
- Water (Nestle Pure Life, Aquafina)
- Energy drinks (Red Bull, Sting)
- Pakistani drinks (Rooh Afza, Jam-e-Shirin)
- Juices (Mango, Orange, Apple)
- Iced Tea (Lipton)

### Brands (16)
Restaurant and drink brands with 4-5 products each

## 🔐 Authentication

- **Google Login**: Simulated Google OAuth (for demo purposes)
- **Email/Password**: Simple form-based authentication
- **Login Required**: Users must log in before proceeding to payment
- **Session Management**: User data stored in localStorage

## 💳 Payment Flow

1. **Cart**: Add items from restaurants/shops/drinks
2. **Checkout**: Review cart contents
3. **Login**: Authenticate if not already logged in
4. **Payment Page**:
   - Set delivery address
   - Choose delivery type (Standard/Scheduled)
   - Enter personal details
   - Add rider tip (optional)
   - Review order summary
   - Place order
5. **Order Tracking**: Track order status in real-time

## 🎨 Key Technologies

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Backend**: Node.js, Express.js
- **Data Storage**: JSON files, localStorage
- **Design**: Custom CSS with responsive grid layouts
- **Icons**: Emoji and custom SVGs

## 📝 Notes

- This is a demo/prototype application for learning purposes
- Google login is simulated (no real OAuth integration)
- Payment processing is simulated (no real payment gateway)
- Order tracking uses mock status updates
- Backend API is minimal and for demo purposes only

## 👤 Author

**ZAINI-CODE**
- GitHub: [@ZAINI-CODE](https://github.com/ZAINI-CODE)

## 📄 License

© 2026 QuickBite. All rights reserved by ZAINI-CODE.

Built with ❤️ for the Pakistani food delivery market

---

**For development and testing purposes only. Not for production use.**
