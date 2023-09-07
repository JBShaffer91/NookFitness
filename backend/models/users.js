const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  age: Number,
  height: Number,
  weight: Number,
  tdee: Number,
  fitnessGoal: String,
  workoutPreferences: {
    frequency: String,
    duration: String,
    type: [String]
  },
  dietaryPreferences: [String],
  allergies: [String],
  healthConcerns: [String],
  injuries: [String]
});

const User = mongoose.model('User', userSchema);

module.exports = User;
