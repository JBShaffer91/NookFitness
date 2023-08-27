const express = require('express');
const router = express.Router();
const connection = require('../server');  // Assuming server.js is in the root directory

// Add New Workout
router.post('/', (req, res) => {
    const { user_id, workout_name, date, duration, exercises, sets, reps } = req.body;
    const query = 'INSERT INTO workout_sessions (user_id, workout_name, date, duration, exercises, sets, reps) VALUES (?, ?, ?, ?, ?, ?, ?)';
    connection.query(query, [user_id, workout_name, date, duration, exercises, sets, reps], (err, result) => {
        if (err) {
            res.status(500).send('Error inserting workout.');
        } else {
            res.status(200).send('Workout added successfully.');
        }
    });
});

// Update Existing Workout
router.put('/:workoutId', (req, res) => {
    const { user_id, workout_name, date, duration, exercises, sets, reps } = req.body;
    const query = 'UPDATE workout_sessions SET user_id = ?, workout_name = ?, date = ?, duration = ?, exercises = ?, sets = ?, reps = ? WHERE id = ?';
    connection.query(query, [user_id, workout_name, date, duration, exercises, sets, reps, req.params.workoutId], (err, result) => {
        if (err) {
            res.status(500).send('Error updating workout.');
        } else {
            res.status(200).send('Workout updated successfully.');
        }
    });
});

// Delete Workout
router.delete('/:workoutId', (req, res) => {
    const query = 'DELETE FROM workout_sessions WHERE id = ?';
    connection.query(query, [req.params.workoutId], (err, result) => {
        if (err) {
            res.status(500).send('Error deleting workout.');
        } else {
            res.status(200).send('Workout deleted successfully.');
        }
    });
});

// Fetch Workouts by Date
router.get('/api/workouts/:userId/date/:date', (req, res) => {
  const { userId, date } = req.params;
  connection.query('SELECT * FROM workout_sessions WHERE user_id = ? AND date = ?', [userId, date], (error, results) => {
      if (error) throw error;
      res.json(results);
  });
});

// Fetch Workouts by Week
router.get('/api/workouts/:userId/week/:weekNumber', (req, res) => {
  const { userId, weekNumber } = req.params;
  const year = new Date().getFullYear(); // Assuming the current year
  const startDate = new Date(year, 0, 1 + (weekNumber - 1) * 7);
  const endDate = new Date(year, 0, 7 + (weekNumber - 1) * 7);
  
  connection.query('SELECT * FROM workout_sessions WHERE user_id = ? AND date BETWEEN ? AND ?', [userId, startDate, endDate], (error, results) => {
      if (error) throw error;
      res.json(results);
  });
});

// Fetch Workouts by Month
router.get('/api/workouts/:userId/month/:monthNumber', (req, res) => {
  const { userId, monthNumber } = req.params;
  const year = new Date().getFullYear(); // Assuming the current year
  const startDate = new Date(year, monthNumber - 1, 1);
  const endDate = new Date(year, monthNumber, 0); // Last day of the month
  
  connection.query('SELECT * FROM workout_sessions WHERE user_id = ? AND date BETWEEN ? AND ?', [userId, startDate, endDate], (error, results) => {
      if (error) throw error;
      res.json(results);
  });
});

module.exports = router;
