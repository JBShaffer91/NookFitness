const express = require('express');
const router = express.Router();
const connection = require('../server');  // Assuming server.js is in the root directory

// Add Progress Entry
router.post('/api/users/:userId/progress', (req, res) => {
    const { userId } = req.params;
    const { date, weight, height, chest, waist, hips } = req.body;
    const query = 'INSERT INTO user_progress (user_id, date, weight, height, chest, waist, hips) VALUES (?, ?, ?, ?, ?, ?, ?)';
    connection.query(query, [userId, date, weight, height, chest, waist, hips], (err, result) => {
        if (err) {
            res.status(500).send('Error inserting progress entry.');
        } else {
            res.status(200).send('Progress entry added successfully.');
        }
    });
});

// Get Progress Entries
router.get('/api/users/:userId/progress', (req, res) => {
    const { userId } = req.params;
    const query = 'SELECT * FROM user_progress WHERE user_id = ? ORDER BY date DESC';
    connection.query(query, [userId], (err, results) => {
        if (err) {
            res.status(500).send('Error fetching progress entries.');
        } else {
            res.json(results);
        }
    });
});

// Update Progress Entry
router.put('/api/users/:userId/progress/:progressId', (req, res) => {
    const { userId, progressId } = req.params;
    const { date, weight, height, chest, waist, hips } = req.body;
    const query = 'UPDATE user_progress SET date = ?, weight = ?, height = ?, chest = ?, waist = ?, hips = ? WHERE id = ? AND user_id = ?';
    connection.query(query, [date, weight, height, chest, waist, hips, progressId, userId], (err, result) => {
        if (err) {
            res.status(500).send('Error updating progress entry.');
        } else {
            res.status(200).send('Progress entry updated successfully.');
        }
    });
});

// Delete Progress Entry
router.delete('/api/users/:userId/progress/:progressId', (req, res) => {
    const { userId, progressId } = req.params;
    const query = 'DELETE FROM user_progress WHERE id = ? AND user_id = ?';
    connection.query(query, [progressId, userId], (err, result) => {
        if (err) {
            res.status(500).send('Error deleting progress entry.');
        } else {
            res.status(200).send('Progress entry deleted successfully.');
        }
    });
});

module.exports = router;
