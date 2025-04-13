const express = require('express');
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
require('dotenv').config();

const User = require('../../models/user.model');

const forgotPasswordRouter = express.Router();
const resetPasswordRouter = express.Router();

// Email transporter setup
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.EMAIL_USER,   
    pass: process.env.EMAIL_PASS,
  },
});

// Generate 6-digit OTP
function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString(); // Ensures 6 digits
}

//Forgot Password Route (send OTP)
forgotPasswordRouter.post('/forgot-password', async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const otp = generateOTP();
    const otpExpiration = new Date(Date.now() + 10 * 60 * 1000); // Expires in 10 minutes

    user.resetOTP = otp;
    user.otpExpires = otpExpiration;
    await user.save();

    // Send OTP email
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'SmartEd Password Reset OTP',
      html: `<p>Your OTP to reset your password is: <strong>${otp}</strong></p>
             <p>This OTP is valid for 10 minutes.</p>`,
    });

    res.json({ message: 'OTP sent to your email' });
  } catch (err) {
    console.error('Error sending OTP:', err);
    res.status(500).json({ message: 'Failed to send OTP' });
  }
});

// Reset Password Route (with OTP)
resetPasswordRouter.post('/reset-password', async (req, res) => {
  const { otp, password } = req.body;

  if (!otp || !password) {
    return res.status(400).json({ message: 'OTP and password are required' });
  }

  try {
    const user = await User.findOne({ resetOTP: otp });

    if (!user) {
      return res.status(400).json({ message: 'Invalid OTP' });
    }

    if (!user.otpExpires || user.otpExpires < new Date()) {
      return res.status(400).json({ message: 'OTP has expired' });
    }

    // Hash and update password
    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;

    // Invalidate used OTP
    user.resetOTP = undefined;
    user.otpExpires = undefined;

    await user.save();

    res.json({ message: 'Password updated successfully' });
  } catch (err) {
    console.error('Error resetting password:', err);
    res.status(500).json({ message: 'Failed to reset password' });
  }
});

module.exports = {
  forgotPasswordRouter,
  resetPasswordRouter,
};

