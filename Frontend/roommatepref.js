const mongoose = require('mongoose');

const roommatePreferencesSchema = new mongoose.Schema({
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Prefer not to say'],
    required: true
  },
  age: { type: Number, required: true },
  roommateGenderPreference: {
    type: String,
    enum: ['Male', 'Female', 'No Preference'],
    required: true
  },
  preferredAgeRange: {
    type: String,
    enum: ['18-25', '26-35', '36-45', 'No Preference'],
    required: true
  },
  sleepingSchedule: {
    type: String,
    enum: ['Early Bird', 'Night Owl', 'No Preference'],
    required: true
  },
  workSchedule: {
    type: String,
    enum: ['Work from Home', 'On-site Work', 'Student'],
    required: true
  },
  socialInteractionStyle: {
    type: String,
    enum: [
      'Very outgoing and love meeting new people',
      'Friendly but prefer small, familiar groups',
      'Comfortable with occasional interactions',
      'Reserved and value personal space',
      'Flexible, depends on the situation'
    ],
    required: true
  },
  locationPreference: {
    type: String,
    enum: ['Yes', 'No', 'Flexible'],
    required: true
  },
  specificLocation: { type: String },
  budgetRange: { type: String },
  accommodationType: {
    type: String,
    enum: ['Apartment', 'Villa', 'Studio', 'Others'],
    required: true
  },
  otherAccommodationDetails: { type: String },
  languages: { type: [String], required: true },
  smokingPreference: {
    type: String,
    enum: ['Non-smoker', 'Smoker', 'No Preference'],
    required: true
  },
  alcoholConsumption: {
    type: String,
    enum: ['Yes', 'No', 'Occasionally'],
    required: true
  },
  cleanlinessImportance: {
    type: String,
    enum: ['Very Important', 'Moderately Important', 'Not Important'],
    required: true
  },
  quietEnvironmentPreference: {
    type: String,
    enum: ['Yes', 'No', 'Flexible'],
    required: true
  },
  guestFrequency: {
    type: String,
    enum: ['Rarely', 'Occasionally', 'Frequently'],
    required: true
  },
  roommateActivities: {
    type: String,
    enum: ['Yes', 'No', 'Sometimes'],
    required: true
  },
  mealSharing: {
    type: String,
    enum: ['Yes', 'No', 'Depends'],
    required: true
  },
  dietaryPreferences: {
    type: String,
    enum: ['Vegetarian', 'Non-vegetarian', 'Vegan'],
    required: true
  },
  pets: {
    type: String,
    enum: ['Own and Comfortable', 'No Preference', 'Prefer No Pets'],
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('RoommatePreference', roommatePreferencesSchema);
