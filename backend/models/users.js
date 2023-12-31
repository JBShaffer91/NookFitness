const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  age: Number,
  height: Number,
  weight: Number,
  tdee: Number,
  caloricTarget: Number,
  macronutrients: {
    proteins: Number,
    fats: Number,
    carbohydrates: Number
  },
  fitnessGoals: {
    goal: String,
    caloricAdjustment: Number
  },
  workoutPreferences: {
    frequency: String,
    duration: String,
    type: [String]
  },
  dietaryPreferences: [String],
  allergies: [String],
  healthConcerns: [String],
  injuries: [String],
  refreshToken: String
});

const User = mongoose.model('User', userSchema);

module.exports = User;
