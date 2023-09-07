require('dotenv').config();
const axios = require('axios');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose'); // Added this line for Mongoose
const userRoutes = require('./routes/userRoutes');
const foodRoutes = require('./routes/foodRoutes');
const workoutRoutes = require('./routes/workoutRoutes');
const progressRoutes = require('./routes/progressRoutes');
const { Suggestic } = require('@suggestic/sdk');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware setup
app.use(bodyParser.json());
app.use(cors());

// MongoDB Connection setup using Mongoose
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/NookFitDB';

mongoose.connect(MONGO_URI, { useUnifiedTopology: true, useNewUrlParser: true })
  .then(() => console.log('Connected to MongoDB using Mongoose'))
  .catch(err => {
    console.error('Error connecting to MongoDB:', err);
    process.exit(1);
  });

// Routes
app.use('/api/food', foodRoutes);
app.use('/api/workouts', workoutRoutes);
app.use('/api/users', userRoutes);
app.use('/api/users/:userId/progress', progressRoutes);

app.get('/', (req, res) => {
  res.send('Nook Fitness API is running!');
});

// Suggestic API setup
const SUGGESTIC_API_KEY = process.env.SUGGESTIC_API_KEY;
const suggesticClient = new Suggestic(SUGGESTIC_API_KEY);

app.get('/api/suggestic/mealplan', async (req, res) => {
  try {
    const user = suggesticClient.getUser(process.env.SUGGESTIC_USER_ID);
    const mealplan = await user.mealPlan();
    res.json(mealplan);
  } catch (error) {
    console.error('Error fetching data from Suggestic API:', error);
    res.status(500).send('Error fetching data from Suggestic API.');
  }
});

// ExerciseAPI3 Route
const EXERCISE_API3_KEY = process.env.EXERCISE_API3_KEY;

app.get('/api/exercise/:name', async (req, res) => {
  const exerciseName = req.params.name;
  const options = {
    method: 'GET',
    url: `https://exerciseapi3.p.rapidapi.com/exercise/name/${exerciseName}`,
    headers: {
      'X-RapidAPI-Key': EXERCISE_API3_KEY,
      'X-RapidAPI-Host': 'exerciseapi3.p.rapidapi.com'
    }
  };

  try {
    const response = await axios.request(options);
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching data from ExerciseAPI3:', error);
    res.status(500).send('Error fetching data from ExerciseAPI3.');
  }
});

// Error Handling
app.use((err, req, res, next) => {
  console.error('Server error:', err.stack);
  res.status(500).send('Something broke!');
});

// Starting the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
