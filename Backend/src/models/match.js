const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

// Match schema 
const matchSchema = new mongoose.Schema({
  matchId: {
    type: String,
    default: uuidv4, 
    unique: true, 
    required: true 
  },
  score: { 
    type: Number, 
    required: true
    },
  userId1: { 
    type: String, 
    ref: 'User', 
    required: true
   },
  userId2: { 
    type: String, 
    ref: 'User', 
    required: true 
   },
}, { timestamps: true }); 


module.exports = mongoose.model('Match', matchSchema);
