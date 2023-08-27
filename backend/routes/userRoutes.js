const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const connection = require('../server');

// User Registration
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Store the user in the database 
  connection.query('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [username, email, hashedPassword], (err, results) => {
    if (err) {
        return res.status(500).send('Database error.');
    }
    res.status(201).send('User registered successfully!');
  });
});

// User Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  // Fetch the user from the database
  connection.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
    if (err) {
      return res.status(500).send('Database error.');
    }

    // If no user is found with the provided email
    if (results.length === 0) {
      return res.status(400).send('User not found!');
    }

    const user = results[0];

    // Compare the provided password with the stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).send('Invalid credentials!');
    }

    // Generate a JWT for the user
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ token });
  });
});

// Fetch User Profile
router.get('/profile/:userId', (req, res) => {
  const userId = req.params.userId;
  
  // Fetch the user's profile from the database
  connection.query('SELECT * FROM users WHERE id = ?', [userId], (err, results) => {
    if (err) {
      return res.status(500).send('Database error.');
    }

    if (results.length === 0) {
      return res.status(404).send('User not found!');
    }

    res.status(200).json(results[0]);
  });
});

// Update User Profile
router.put('/profile/:userId', (req, res) => {
  const userId = req.params.userId;
  const { username, email, age, height, weight } = req.body;

  // Update the user's profile in the database
  connection.query('UPDATE users SET username = ?, email = ?, age = ?, height = ?, weight = ? WHERE id = ?', [username, email, age, height, weight, userId], (err, results) => {
    if (err) {
      return res.status(500).send('Database error.');
    }

    res.status(200).send('Profile updated successfully!');
  });
});

// Delete User Profile
router.delete('/profile/:userId', (req, res) => {
  const userId = req.params.userId;

  // Delete the user's profile from the database
  connection.query('DELETE FROM users WHERE id = ?', [userId], (err, results) => {
    if (err) {
      return res.status(500).send('Database error.');
    }

    res.status(200).send('Profile deleted successfully!');
  });
});

module.exports = router;
