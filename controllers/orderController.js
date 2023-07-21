const Order = require('../models/orderModel');
const User = require('../models/userModel');
const sendError = require('../utils/errors');

exports.createOrder = async (req, res, next) => {
  const { from, to, quantity, transporter } = req.body;

  try {
    const manufacturer = await User.findById(req.user._id);
    const entries = await Order.count();
    const orderId = 'XB' + entries;
    const order = await Order.create({
      orderId,
      from,
      to,
      quantity,
      transporter,
      pickup: manufacturer.address,
    });

    const transporterObj = await User.findById(transporter);

    transporterObj.orders.push(order._id);
    await transporterObj.save();

    manufacturer.orders.push(order._id);
    await manufacturer.save();

    return res.status(201).json({
      success: true,
      message: 'Order Successfully Created',
      order,
    });
  } catch (err) {
    return sendError(400, err, res);
  }
};

exports.setOrderPrice = async (req, res, next) => {
  const { orderId, price } = req.body;

  try {
    const order = await Order.findOne({ orderId });

    if (!order.transporter.equals(req.user._id)) {
      sendError(401, 'Unauthorized', res);
    }
    order.price = price;
    await order.save();

    return res.status(200).json({
      success: true,
      message: 'Order price successfully updated',
      order,
    });
  } catch (err) {
    return sendError(400, err, res);
  }
};
