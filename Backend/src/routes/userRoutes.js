const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const path = require('path');
const jwt = require('jsonwebtoken');


const router = express.Router();
//signup
router.post('/signup', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    if (password.length < 8 || password.length > 19) {
        return res
          .status(400)
          .json({ message: 'Password must be greater than 8 and less than 20 characters.' });
      }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }
      

    const saltRounds = 10; 
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();

    res.sendFile(path.join(__dirname, '../../../Frontend/views/success.html'));
  } catch (err) {
    res.status(500).json({ message: 'Error saving user', error: err });
  }
});

//login 
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid password' }); 
    }

    // Generate JWT Token
    const token = jwt.sign({ userId: user.userId }, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.cookie('authToken', token, { httpOnly: true, maxAge: 7 * 24 * 60 * 60 * 1000 });
    res.redirect('profile.html');

    // res.status(200).json({ message: 'Login successful', token });
  } catch (err) {
    res.status(500).json({ message: 'Error during login', error: err.message });
  }
});


module.exports = router;
