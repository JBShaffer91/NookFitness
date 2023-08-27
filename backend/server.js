
require('dotenv').config();
const axios = require('axios');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');
const userRoutes = require('./routes/userRoutes');
const foodRoutes = require('./routes/foodRoutes');
const workoutRoutes = require('./routes/workoutRoutes');
const progressRoutes = require('./routes/progressRoutes');
const { Suggestic } = require('@suggestic/sdk');

const app = express();
const PORT = process.env.PORT || 3000;
const SUGGESTIC_API_KEY = process.env.SUGGESTIC_API_KEY;
const suggesticClient = new Suggestic(SUGGESTIC_API_KEY);
const EXERCISE_API3_KEY = process.env.EXERCISE_API3_KEY;

// Middleware setup
app.use(bodyParser.json());
app.use(cors());
app.use(foodRoutes);
app.use('/api/workouts', workoutRoutes);
app.use(progressRoutes);

// MySQL Connection setup
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'nook_fitness'
});

connection.connect(err => {
  if (err) throw err;
  console.log('Connected to MySQL database.');
});

// Exporting the connection for other modules to use
module.exports = connection;

// Routes
app.get('/', (req, res) => {
  res.send('Nook Fitness API is running!');
});

app.use('/api/users', userRoutes);

// Suggestic API Route to get a meal plan
app.get('/api/suggestic/mealplan', async (req, res) => {
  try {
      const user = suggesticClient.getUser(process.env.SUGGESTIC_USER_ID);
      const mealplan = await user.mealPlan();
      res.json(mealplan);
  } catch (error) {
      res.status(500).send('Error fetching data from Suggestic API.');
  }
});

// ExerciseAPI3 Route
app.get('/api/exercise/:name', async (req, res) => {
  const exerciseName = req.params.name;
  const options = {
      method: 'GET',
      url: `https://exerciseapi3.p.rapidapi.com/exercise/name/${exerciseName}`,
      headers: {
          'X-RapidAPI-Key': process.env.EXERCISE_API3_KEY,
          'X-RapidAPI-Host': 'exerciseapi3.p.rapidapi.com'
      }
  };

  try {
      const response = await axios.request(options);
      res.json(response.data);
  } catch (error) {
      res.status(500).send('Error fetching data from ExerciseAPI3.');
  }
});

// Error Handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Starting the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
