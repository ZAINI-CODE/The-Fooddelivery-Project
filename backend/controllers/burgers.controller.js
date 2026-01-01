const path = require('path');
const fs = require('fs');

const burgersPath = path.join(__dirname, '..', 'data', 'burgers.json');

function readBurgers() {
  const raw = fs.readFileSync(burgersPath, 'utf-8');
  return JSON.parse(raw);
}

exports.getAllBurgers = (req, res) => {
  const burgers = readBurgers();
  const { restaurantId, category } = req.query;
  let filtered = burgers;

  if (restaurantId) {
    const rid = parseInt(restaurantId, 10);
    filtered = filtered.filter((b) => b.restaurantId === rid);
  }

  if (category) {
    filtered = filtered.filter(
      (b) => b.category.toLowerCase() === category.toLowerCase()
    );
  }

  res.json(filtered);
};

exports.getBurgerById = (req, res) => {
  const burgers = readBurgers();
  const id = parseInt(req.params.id, 10);
  const burger = burgers.find((b) => b.id === id);

  if (!burger) {
    return res.status(404).json({ message: 'Burger not found' });
  }

  res.json(burger);
};