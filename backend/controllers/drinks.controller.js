const path = require('path');
const fs = require('fs');

const drinksPath = path.join(__dirname, '..', 'data', 'drinks.json');

function readDrinks() {
  const raw = fs.readFileSync(drinksPath, 'utf-8');
  return JSON.parse(raw);
}

exports.getAllDrinks = (req, res) => {
  const drinks = readDrinks();
  const { category, brand, q } = req.query;
  let filtered = drinks;

  if (category) {
    filtered = filtered.filter(
      (d) => d.category.toLowerCase() === category.toLowerCase()
    );
  }

  if (brand) {
    filtered = filtered.filter(
      (d) => d.brand.toLowerCase() === brand.toLowerCase()
    );
  }

  if (q) {
    const term = q.toLowerCase();
    filtered = filtered.filter(
      (d) =>
        d.name.toLowerCase().includes(term) ||
        d.brand.toLowerCase().includes(term)
    );
  }

  res.json(filtered);
};

exports.getDrinkById = (req, res) => {
  const drinks = readDrinks();
  const id = parseInt(req.params.id, 10);
  const drink = drinks.find((d) => d.id === id);

  if (!drink) {
    return res.status(404).json({ message: 'Drink not found' });
  }

  res.json(drink);
};  