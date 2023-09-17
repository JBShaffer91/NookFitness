const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({
  name: String,
  calories: Number,
  protein: Number,
  carbs: Number,
  fats: Number,
  serving_size: String
});

module.exports = mongoose.model('Food', foodSchema);
