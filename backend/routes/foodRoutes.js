const express = require('express');
const router = express.Router();
const connection = require('../server'); // Assuming you've exported the MySQL connection from server.js

router.post('/api/food', (req, res) => {
  const { user_id, food_name, calories, protein, carbs, fats } = req.body;
  connection.query('INSERT INTO food_diary (user_id, food_name, calories, protein, carbs, fats, entry_date, entry_time) VALUES (?, ?, ?, ?, ?, ?, CURDATE(), CURTIME())', [user_id, food_name, calories, protein, carbs, fats], (err, results) => {
      if (err) {
          return res.status(500).send('Database error.');
      }
      res.status(201).send('Food entry added successfully!');
  });
});

router.get('/api/food/:user_id/:date', (req, res) => {
  const { user_id, date } = req.params;
  connection.query('SELECT * FROM food_diary WHERE user_id = ? AND entry_date = ?', [user_id, date], (err, results) => {
      if (err) {
          return res.status(500).send('Database error.');
      }
      res.status(200).json(results);
  });
});

router.post('/api/if/schedule', (req, res) => {
  const { user_id, start_time, end_time } = req.body;
  connection.query('INSERT INTO intermittent_fasting (user_id, start_time, end_time) VALUES (?, ?, ?)', [user_id, start_time, end_time], (err, results) => {
      if (err) {
          return res.status(500).send('Database error.');
      }
      res.status(201).send('IF schedule set successfully!');
  });
});

router.put('/api/if/toggle/:user_id', (req, res) => {
  const { user_id } = req.params;
  connection.query('UPDATE intermittent_fasting SET is_active = NOT is_active WHERE user_id = ?', [user_id], (err, results) => {
      if (err) {
          return res.status(500).send('Database error.');
      }
      res.status(200).send('IF status toggled successfully!');
  });
});

router.get('/api/if/schedule/:user_id', (req, res) => {
  const { user_id } = req.params;
  connection.query('SELECT * FROM intermittent_fasting WHERE user_id = ?', [user_id], (err, results) => {
      if (err) {
          return res.status(500).send('Database error.');
      }
      res.status(200).json(results);
  });
});

module.exports = router;
