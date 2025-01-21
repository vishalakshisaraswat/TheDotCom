const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  profileName: { type: String, required: true },
  userId: { type: String, ref: 'User', required: true }, // Use userId as reference
  address: { type: String, required: true },
  gender: { type: String, required: true },
  language: { type: String, required: true },
  age: { type: Number, required: true },
  userType: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Profile', profileSchema);
