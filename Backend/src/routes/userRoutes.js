const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const path = require('path');
const jwt = require('jsonwebtoken');

const router = express.Router();

// Check if JWT_SECRET is set in the environment
if (!process.env.JWT_SECRET) {
  throw new Error('JWT_SECRET environment variable is required.');
}

// Signup
router.post('/signup', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required.' });
    }

    if (password.length < 8 || password.length > 19) {
      return res.status(400).json({
        message: 'Password must be greater than 8 and less than 20 characters.',
      });
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists.' });
    }

    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create and save the new user
    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();

    // Send success HTML page
    res.sendFile(path.resolve(__dirname, '../../../Frontend/views/success.html'));
  } catch (err) {
    console.error('Error saving user:', err);
    res.status(500).json({ message: 'Error saving user.', error: err.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required.' });
    }

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    // Validate password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid password.' });
    }

    // Generate JWT Token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });

    // Set cookie with the token
    res.cookie('authToken', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
      sameSite: 'Strict', // Prevent CSRF
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    // Redirect to profile page
    res.redirect('/profile.html');
  } catch (err) {
    console.error('Error during login:', err);
    res.status(500).json({ message: 'Error during login.', error: err.message });
  }
});

module.exports = router;
