const path = require('path');
const fs = require('fs');

const brandsPath = path.join(__dirname, '..', 'data', 'brands.json');

function readBrands() {
  const raw = fs.readFileSync(brandsPath, 'utf-8');
  return JSON.parse(raw);
}

exports.getAllBrands = (req, res) => {
  const brands = readBrands();
  const { type, q } = req.query;
  let filtered = brands;

  if (type) {
    filtered = filtered.filter(
      (b) => b.type.toLowerCase() === type.toLowerCase()
    );
  }

  if (q) {
    const term = q.toLowerCase();
    filtered = filtered.filter(
      (b) =>
        b.name.toLowerCase().includes(term) ||
        b.description.toLowerCase().includes(term)
    );
  }

  res.json(filtered);
};

exports.getBrandById = (req, res) => {
  const brands = readBrands();
  const id = parseInt(req.params.id, 10);
  const brand = brands.find((b) => b.id === id);

  if (!brand) {
    return res.status(404).json({ message: 'Brand not found' });
  }

  res.json(brand);
};