const express = require('express');
const router = express.Router();
const Match = require('../models/match');
const auth = require('../middleware/auth'); // Importing the authentication middleware

// Create Match (Protected route)
router.post('/create', auth, async (req, res) => {
  const { score, profileId1, profileId2 } = req.body;

  try {
    // Validate required fields
    if (!score || !profileId1 || !profileId2) {
      return res.status(400).json({ message: 'All fields are required: score, userId1, and profileId2.' });
    }

    const newMatch = new Match({
      score,
      profileId1,
      profileId2,
    });

    await newMatch.save();
    res.status(201).json({ message: 'Match Created Successfully', match: newMatch });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get All Matches
router.get('/', auth, async (req, res) => {
  try {
    // Populate userId1 and profileId2 to fetch their related profiles
    const matches = await Match.find()
      .populate('profileId1', 'profileName userId') // Populate fields from Profile schema
      .populate('profileId2', 'profileName userId'); // Populate fields from Profile schema

    res.status(200).json(matches);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get Match by ID (Optional)
router.get('/:id', auth, async (req, res) => {
  try {
    const match = await Match.findById(req.params.id)
      .populate('profileId1', 'profileName userId')
      .populate('profileId2', 'profileName userId');

    if (!match) {
      return res.status(404).json({ message: 'Match not found' });
    }

    res.status(200).json(match);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
