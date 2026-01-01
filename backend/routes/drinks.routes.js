const express = require('express');
const router = express.Router();
const {
  getAllDrinks,
  getDrinkById
} = require('../controllers/drinks.controller');

router.get('/', getAllDrinks);
router.get('/:id', getDrinkById);

module.exports = router;