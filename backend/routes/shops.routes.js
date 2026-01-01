const express = require('express');
const router = express.Router();
const {
  getAllShops,
  getShopById,
  getProductsByShop,
  getAllProducts
} = require('../controllers/shops.controller');

router.get('/', getAllShops);
router.get('/products', getAllProducts);
router.get('/:id', getShopById);
router.get('/:id/products', getProductsByShop);

module.exports = router;