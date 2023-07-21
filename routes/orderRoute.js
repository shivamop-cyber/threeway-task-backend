const express = require('express');
const {
  createOrder,
  setOrderPrice,
} = require('../controllers/orderController');
const { authenticateUser } = require('../middleware/auth');

const router = express.Router();

router.route('/create').post(authenticateUser, createOrder);

router.route('/price/set').post(authenticateUser, setOrderPrice);

module.exports = router;
