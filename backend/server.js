// backend/server.js

const express = require('express');
const cors = require('cors');
const path = require('path');

// Route modules
const authRoutes = require('./routes/auth.routes');
const shopsRoutes = require('./routes/shops.routes');
const restaurantsRoutes = require('./routes/restaurants.routes');
const burgersRoutes = require('./routes/burgers.routes');
const drinksRoutes = require('./routes/drinks.routes');
const brandsRoutes = require('./routes/brands.routes');

const app = express();
const PORT = process.env.PORT || 5000;

// ===== Middleware =====
app.use(cors());
app.use(express.json());

// ===== API routes =====

// Auth (login, etc.)
app.use('/api/auth', authRoutes);

// Shops (shops list + products)
app.use('/api/shops', shopsRoutes);

// Restaurants
app.use('/api/restaurants', restaurantsRoutes);

// Burgers
app.use('/api/burgers', burgersRoutes);

// Drinks
app.use('/api/drinks', drinksRoutes);

// Brands
app.use('/api/brands', brandsRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Backend is running' });
});

// ===== Static frontend serving =====
const frontendPath = path.join(__dirname, '..', 'frontend');

app.use(express.static(frontendPath));

app.get('/', (req, res) => {
  res.sendFile(path.join(frontendPath, 'index.html'));
});

// ===== Start server =====
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});