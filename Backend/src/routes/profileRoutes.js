const express = require('express');
const router = express.Router();
const Profile = require('../models/profile');
const auth = require('../middleware/auth'); // Importing the authentication middleware

// Create Profile (Protected route)
router.post('/create', auth, async (req, res) => {
  const {
    profileName,
    address,
    gender,
    language,
    age,
    userType,
  } = req.body;

  try {
    // Use req.user.userId to get the userId from the authenticated user
    const newProfile = new Profile({
      profileName,
      userId: req.user.userId, // Extract userId from the authenticated user
      address,
      gender,
      language,
      age,
      userType,
    });

    await newProfile.save();
    res.status(201).json({ message: 'Profile Created Successfully', profile: newProfile });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get All Profiles
router.get('/', async (req, res) => {
  try {
    const profiles = await Profile.find();
    res.status(200).json(profiles);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
