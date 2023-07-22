const express = require('express');
const {
  registerUser,
  loginUser,
  fetchMyOrders,
  getAllTransporters,
} = require('../controllers/userController');
const { authenticateUser } = require('../middleware/auth');

const router = express.Router();

router.route('/register').post(registerUser);

router.route('/login').post(loginUser);

router.route('/orders').get(authenticateUser, fetchMyOrders);

router.route('/transporters/all').get(authenticateUser, getAllTransporters);

module.exports = router;
