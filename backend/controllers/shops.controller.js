const path = require('path');
const fs = require('fs');

const shopsPath = path.join(__dirname, '..', 'data', 'shops.json');
const productsPath = path.join(__dirname, '..', 'data', 'products.json');

function readJson(filePath) {
  const raw = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(raw);
}

exports.getAllShops = (req, res) => {
  const shops = readJson(shopsPath);
  res.json(shops);
};

exports.getShopById = (req, res) => {
  const shops = readJson(shopsPath);
  const id = parseInt(req.params.id, 10);
  const shop = shops.find((s) => s.id === id);

  if (!shop) {
    return res.status(404).json({ message: 'Shop not found' });
  }

  res.json(shop);
};

exports.getProductsByShop = (req, res) => {
  const products = readJson(productsPath);
  const id = parseInt(req.params.id, 10);
  const shopProducts = products.filter((p) => p.shopId === id);
  res.json(shopProducts);
};

exports.getAllProducts = (req, res) => {
  const products = readJson(productsPath);
  res.json(products);
};