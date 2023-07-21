const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { USER_TYPE } = require('../config/contants');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please Enter Your Name'],
  },
  email: {
    type: String,
    required: [true, 'Please Enter Your Email'],
    unique: true,
    validate: [validator.isEmail, 'Please Enter a valid Email'],
  },
  password: {
    type: String,
    required: [true, 'Please Enter Your Password'],
    select: false,
  },
  address: {
    type: String,
    required: [true, 'Please Enter Your affiliation'],
  },
  userType: {
    type: String,
    required: [true, 'Please Select Your User Type'],
    enum: [USER_TYPE.MANUFACTURER, USER_TYPE.TRANSPORTER],
  },
  orders: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }],
    default: [],
  },
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }

  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('User', userSchema);
