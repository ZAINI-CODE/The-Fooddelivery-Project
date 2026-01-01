const path = require('path');
const fs = require('fs');

const restaurantsPath = path.join(__dirname, '..', 'data', 'restaurants.json');
const menuItemsPath = path.join(__dirname, '..', 'data', 'menu-items.json');

function readRestaurants() {
  const raw = fs.readFileSync(restaurantsPath, 'utf-8');
  return JSON.parse(raw);
}

function readMenuItems() {
  const raw = fs.readFileSync(menuItemsPath, 'utf-8');
  return JSON.parse(raw);
}

exports.getAllRestaurants = (req, res) => {
  const restaurants = readRestaurants();

  const { city, minRating, q } = req.query;
  let filtered = restaurants;

  if (city) {
    filtered = filtered.filter(
      (r) => r.city.toLowerCase() === city.toLowerCase()
    );
  }

  if (minRating) {
    const mr = parseFloat(minRating);
    filtered = filtered.filter((r) => r.rating >= mr);
  }

  if (q) {
    const term = q.toLowerCase();
    filtered = filtered.filter(
      (r) =>
        r.name.toLowerCase().includes(term) ||
        r.cuisine.toLowerCase().includes(term)
    );
  }

  res.json(filtered);
};

exports.getRestaurantById = (req, res) => {
  const restaurants = readRestaurants();
  const id = parseInt(req.params.id, 10);
  const restaurant = restaurants.find((r) => r.id === id);

  if (!restaurant) {
    return res.status(404).json({ message: 'Restaurant not found' });
  }

  res.json(restaurant);
};

exports.getRestaurantMenuItems = (req, res) => {
  const id = parseInt(req.params.id, 10);
  const menuItems = readMenuItems();
  const items = menuItems.filter((item) => item.restaurantId === id);

  res.json(items);
};