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
  profileId1: { 
    type: profile_id,  
    required: true
   },
  profileId2: { 
    type: profile_id, 
    required: true 
   },
}, { timestamps: true }); 


module.exports = mongoose.model('Match', matchSchema);
