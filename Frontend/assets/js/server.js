const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const cors = require('cors'); // Added for CORS support

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

const otpStore = {};
const userStore = {}; // Store user information temporarily

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'rajawattanishka@gmail.com', // Replace with your email
    pass: 'hxvh xxiu inas txrr', // Replace with your app password
  },
});

// Send OTP
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

// Verify OTP
app.post('/verify-otp', (req, res) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    return res.status(400).json({ error: 'Email and OTP are required.' });
  }

  const storedOtp = otpStore[email];

  if (storedOtp && storedOtp === otp) {
    delete otpStore[email];
    
    // Proceed to store user information
    userStore[email] = req.body; // Save user information
    return res.status(200).json({ message: 'OTP verified successfully!' });
  }

  res.status(400).json({ error: 'Invalid or expired OTP.' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
