const User = require('../models/userModel');
const sendToken = require('../utils/jwtToken');
const sendError = require('../utils/errors');

exports.registerUser = async (req, res, next) => {
  const { name, email, password, address, userType } = req.body;
  try {
    const user = await User.create({
      orderId: 'XB',
      name,
      email,
      password,
      address,
      userType,
    });

    return res.status(201).json({
      success: true,
      message: 'User has been registered, Please sign in now',
    });
  } catch (err) {
    return sendError(500, err.message, res);
  }
};

exports.loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return sendError(400, 'Invalid email or password', res);
    }

    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      return sendError(401, 'Invalid email or password', res);
    }

    const isPasswordMatched = await user.comparePassword(password);

    if (!isPasswordMatched) {
      return sendError(401, 'Invalid email or password', res);
    }

    return sendToken(user, 200, res);
  } catch (err) {
    return sendError(500, 'Server Error Occured', res);
  }
};
