require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const profileRoutes = require('./routes/profileRoutes');
const roomRoutes = require('./routes/roomRoutes');
const expenseRoutes = require('./routes/expenseRoutes');
const bodyParser = require('body-parser');
const path = require('path');
const cookieParser = require('cookie-parser');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const cors = require('cors'); // Added for CORS support

const app = express();
const PORT = 5500;

// Connect to database
connectDB();

// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../../Frontend/views')));
app.use(cookieParser());

// OTP and User Data Storage (temporary in-memory stores)
const otpStore = {};
const userStore = {};

// Nodemailer transporter configuration
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'rajawattanishka@gmail.com', // Replace with your email
    pass: 'hxvh xxiu inas txrr', // Replace with your app password
  },
});

// Routes
app.post('/send-otp', (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'Email is required.' });
  }

  const otp = crypto.randomInt(100000, 999999).toString();
  otpStore[email] = otp;

  const mailOptions = {
    from: 'rajawattanishka@gmail.com',
    to: email,
    subject: 'Your OTP Code',
    text: `Your OTP code is ${otp}.`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).json({ error: 'Failed to send OTP. Please try again.' });
    }

    res.status(200).json({ message: 'OTP sent successfully to your email.' });
  });
});

app.post('/verify-otp', (req, res) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    return res.status(400).json({ error: 'Email and OTP are required.' });
  }

  const storedOtp = otpStore[email];

  if (storedOtp && storedOtp === otp) {
    delete otpStore[email];

    // Store user information
    userStore[email] = req.body;
    return res.status(200).json({ message: 'OTP verified successfully!' });
  }

  res.status(400).json({ error: 'Invalid or expired OTP.' });
});

// User, Profile, and Room Routes
app.use('/', userRoutes);
app.use('/profile', profileRoutes);
app.use('/rooms', roomRoutes);
app.use('/expense',expenseRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
