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
    languages, // Updated to match the 'languages' array field in the model
    age,
    userType,
    description, // Optional field
  } = req.body;

  try {
    // Create a new profile using the validated input
    const newProfile = new Profile({
      profileName,
      address,
      gender,
      languages, // Save the array of languages
      age,
      userType,
      description, // Include optional description
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

// Get Profile by ID
router.get('/:id', async (req, res) => {
  try {
    const profile = await Profile.findById(req.params.id);
    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }
    res.status(200).json(profile);
  } catch (error) {
    res.status(400).json({ message: 'Invalid profile ID' });
  }
});


module.exports = router;
