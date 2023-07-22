const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
  orderId: { type: String, required: true },
  senderType: { type: String, required: true },
  message: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Message', MessageSchema);
