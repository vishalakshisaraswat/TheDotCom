const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

// Create an in-memory store for OTPs (for testing purposes)
const otpStore = {};

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Welcome to the Aadhaar e-KYC API! Use /sendAadhaar or /verifyOtp endpoints.');
});

// Send Aadhaar to mock API and generate OTP
app.post('/sendAadhaar', async (req, res) => {
    const { aadhaar } = req.body;

    console.log('Received POST request on /sendAadhaar');
    console.log('Request body:', req.body);

    if (!aadhaar) {
        console.log('No Aadhaar number provided!');
        return res.status(400).send('Aadhaar number is required');
    }

    // Generate a 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000);
    otpStore[aadhaar] = otp; // Store OTP for this Aadhaar number
    console.log(`Generated OTP for Aadhaar ${aadhaar}: ${otp}`);

    try {
        // Simulate sending Aadhaar to a dummy endpoint
        console.log('Sending Aadhaar to dummy API:', aadhaar);

        const response = await fetch('http://localhost:3001/aadhaar', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ aadhaar, otp, status: 'OTP Sent' }),
        });

        console.log('Response from dummy API:', response.status);

        if (response.ok) {
            console.log('Successfully sent Aadhaar and OTP.');
            res.status(200).send('OTP Sent');
        } else {
            console.log('Error while sending Aadhaar:', response.statusText);
            res.status(500).send('Error sending Aadhaar');
        }
    } catch (error) {
        console.error('Error while sending Aadhaar:', error.message);
        res.status(500).send('Error: ' + error.message);
    }
});

// Verify OTP
app.post('/verifyOtp', (req, res) => {
    const { aadhaar, otp } = req.body;

    console.log('Received POST request on /verifyOtp');
    console.log('Request body:', req.body);

    if (!aadhaar || !otp) {
        return res.status(400).send('Aadhaar number and OTP are required');
    }

    // Check if OTP matches
    if (otpStore[aadhaar] && otpStore[aadhaar] == otp) {
        console.log('OTP verified successfully for Aadhaar:', aadhaar);
        delete otpStore[aadhaar]; // Remove OTP after successful verification
        res.status(200).send('OTP Verified Successfully');
    } else {
        console.log('Invalid OTP for Aadhaar:', aadhaar);
        res.status(400).send('Invalid OTP');
    }
});

// Start the server
app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
