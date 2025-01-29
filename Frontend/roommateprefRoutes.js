const express = require('express');
const router = express.Router();
const RoommatePreference = require('../models/roommatePreference'); // Import RoommatePreference schema
const auth = require('../middleware/auth'); // Authentication middleware

// Create Roommate Preference (Protected route)
router.post('/create', auth, async (req, res) => {
  const {
    userId,       // User ID linked to the preference
    preferredGender,
    preferredAgeRange,
    preferredLanguages, // Array of languages
    petsAllowed,
    smokingAllowed,
    description, // Additional details (optional)
  } = req.body;

  try {
    // Create a new roommate preference
    const newPreference = new RoommatePreference({
      userId,
      preferredGender,
      preferredAgeRange,
      preferredLanguages,
      petsAllowed,
      smokingAllowed,
      description,
    });

    await newPreference.save();
    res.status(201).json({ message: 'Roommate Preference Created Successfully', preference: newPreference });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get All Roommate Preferences
router.get('/', async (req, res) => {
  try {
    const preferences = await RoommatePreference.find();
    res.status(200).json(preferences);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get Roommate Preference by ID
router.get('/:id', async (req, res) => {
  try {
    const preference = await RoommatePreference.findById(req.params.id);
    if (!preference) {
      return res.status(404).json({ message: 'Roommate Preference not found' });
    }
    res.status(200).json(preference);
  } catch (error) {
    res.status(400).json({ message: 'Invalid preference ID' });
  }
});

// Update Roommate Preference by ID (Protected route)
router.put('/update/:id', auth, async (req, res) => {
  const { id } = req.params;

  try {
    const updatedPreference = await RoommatePreference.findByIdAndUpdate(id, req.body, {
      new: true, // Return the updated document
      runValidators: true, // Ensure validation rules are enforced
    });

    if (!updatedPreference) {
      return res.status(404).json({ message: 'Roommate Preference not found' });
    }

    res.status(200).json({ message: 'Preference updated successfully', preference: updatedPreference });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete Roommate Preference by ID (Protected route)
router.delete('/delete/:id', auth, async (req, res) => {
  const { id } = req.params;

  try {
    const deletedPreference = await RoommatePreference.findByIdAndDelete(id);

    if (!deletedPreference) {
      return res.status(404).json({ message: 'Roommate Preference not found' });
    }

    res.status(200).json({ message: 'Preference deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
