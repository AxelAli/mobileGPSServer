import User from "../models/User.js";
import asyncHandler from "express-async-handler";

// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
const register = asyncHandler(async (req, res, next) => {
  const { fingerprintString, pin } = req.body;

  // Create user
  const user = await User.create({
    fingerprintString,
    pin,
  });

  sendTokenResponse(user, 200, res);
});

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
const login = asyncHandler(async (req, res, next) => {
  const { fingerprintString, pin } = req.body;

  if (!fingerprintString || !pin) {
    res.status(400);
    throw new Error("Credentials not found");
  }

  const user = await User.findOne({ fingerprintString }).select("+pin");

  if (!user) {
    res.status(401);
    throw new Error("Credentials invalid");
  }

  const isMatch = await user.matchPin(pin);

  if (!isMatch) {
    res.status(401);
    throw new Error("Credentials invalid");
  }

  sendTokenResponse(user, 200, res);
});

// Get token from model, create cookie and send response
const sendTokenResponse = (user, statusCode, res) => {
  const token = user.getSignedJwtToken();

  const options = {
    expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    httpOnly: true,
  };

  if (process.env.NODE_ENV === "production") {
    options.secure = true;
  }

  res
    .status(statusCode)
    .cookie("token", token, options)
    .json({ success: true, token });
};

export { register, login };
