const express = require('express');
const mongoose = require('mongoose');
const Room = require('../models/room.js');
const router = express.Router();

// Create a new room (POST /rooms)
router.post('/create', async (req, res) => {
  try {
    const { profileId, address, rent, description, availableSpacesForRoommates, photos } = req.body;

    if (!mongoose.Types.ObjectId.isValid(profileId)) {
      return res.status(400).json({ error: 'Invalid profile ID' });
    }

    const newRoom = new Room({
      profileId,
      address,
      rent,
      description,
      availableSpacesForRoommates,
      photos
    });

    await newRoom.save();
    res.status(201).json({ message: 'Room added successfully', room: newRoom });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all rooms (GET /rooms)
router.get('/', async (req, res) => {
  try {
    const rooms = await Room.find().populate('profileId', 'profileName age gender');
    res.status(200).json(rooms);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a single room by ID (GET /rooms/:id)
router.get('/:id', async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: 'Invalid room ID format' });
    }

    const room = await Room.findById(req.params.id).populate('profileId', 'profileName age gender');
    if (!room) {
      return res.status(404).json({ message: 'Room not found' });
    }
    res.status(200).json(room);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a room by ID (PUT /rooms/:id)
router.put('/:id', async (req, res) => {
  try {
    const updatedRoom = await Room.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedRoom) {
      return res.status(404).json({ message: 'Room not found' });
    }
    res.status(200).json({ message: 'Room updated successfully', room: updatedRoom });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a room by ID (DELETE /rooms/:id)
router.delete('/:id', async (req, res) => {
  try {
    const deletedRoom = await Room.findByIdAndDelete(req.params.id);
    if (!deletedRoom) {
      return res.status(404).json({ message: 'Room not found' });
    }
    res.status(200).json({ message: 'Room deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
