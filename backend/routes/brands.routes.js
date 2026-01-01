const express = require('express');
const router = express.Router();
const {
  getAllBrands,
  getBrandById
} = require('../controllers/brands.controller');

router.get('/', getAllBrands);
router.get('/:id', getBrandById);

module.exports = router;