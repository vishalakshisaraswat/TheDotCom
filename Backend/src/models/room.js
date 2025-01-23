const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  profileId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'RegisteredUser',  // Reference to the RegisteredUser collection
    required: true
  },
  address: {
    type: String,
    required: true
  },
  rent: {
    type: Number,
    required: true
  },
  description: {
    type: String
  },
  availableSpacesForRoommates: {
    type: Number,
    required: true
  },
  photos: [
    {
      type: String  // Assuming photo URLs are stored as strings
    }
  ]
}, {
  timestamps: true
});

const Room = mongoose.model('Room', roomSchema);
module.exports = Room;
