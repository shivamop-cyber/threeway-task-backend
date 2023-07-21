const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  orderId: {
    type: String,
    unique: true,
    required: [true, 'Order ID should be present'],
  },
  from: {
    type: String,
    required: [true, 'Order source should be present'],
  },
  to: {
    type: String,
    required: [true, 'order destination should be present'],
  },
  quantity: {
    type: Number,
    required: [true, 'Order quantity should be present'],
  },
  pickup: {
    type: String,
    required: [true, 'Order pickup should be present'],
  },
  transporter: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  price: {
    type: Number,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Order', orderSchema);
