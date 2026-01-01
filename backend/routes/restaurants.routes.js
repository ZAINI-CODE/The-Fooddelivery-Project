const express = require('express');
const router = express.Router();
const {
  getAllRestaurants,
  getRestaurantById,
  getRestaurantMenuItems
} = require('../controllers/restaurants.controller');

router.get('/', getAllRestaurants);
router.get('/:id', getRestaurantById);
router.get('/:id/menu', getRestaurantMenuItems);

module.exports = router;