const express = require('express');
const router = express.Router();
const {
  getAllBurgers,
  getBurgerById
} = require('../controllers/burgers.controller');

router.get('/', getAllBurgers);
router.get('/:id', getBurgerById);

module.exports = router;