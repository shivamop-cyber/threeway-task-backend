const express = require('express');
const {
  createOrder,
  setOrderPrice,
  getOrderChats,
} = require('../controllers/orderController');
const { authenticateUser } = require('../middleware/auth');

const router = express.Router();

router.route('/create').post(authenticateUser, createOrder);

router.route('/price/set').post(authenticateUser, setOrderPrice);

router.route('/messages/:orderId').get(authenticateUser, getOrderChats);

module.exports = router;
