const express = require('express');
const router = express.Router();
const Food = require('../models/food');

// POST: Add a food entry to the user's diary
router.post('/api/food', async (req, res) => {
    try {
        const { user_id, food_name, calories, protein, carbs, fats } = req.body;

        // Simple validation
        if (!user_id || !food_name || !calories || !protein || !carbs || !fats) {
            return res.status(400).json({ message: 'Please provide all required fields.' });
        }

        const entry = new Food({
            user_id,
            food_name,
            calories,
            protein,
            carbs,
            fats,
            entry_date: new Date(),
            entry_time: new Date().toLocaleTimeString()
        });

        await entry.save();
        res.status(201).json({ message: 'Food entry added successfully!' });
    } catch (error) {
        res.status(500).json({ message: 'Server error.' });
    }
});

// GET: Fetch food entries for a user on a specific date
router.get('/api/food/:user_id/:date', async (req, res) => {
    try {
        const { user_id, date } = req.params;

        const entries = await Food.find({ user_id, entry_date: new Date(date) });
        res.status(200).json(entries);
    } catch (error) {
        res.status(500).json({ message: 'Server error.' });
    }
});

// GET: Fetch all food entries for a user
router.get('/api/food/:user_id', async (req, res) => {
    try {
        const { user_id } = req.params;

        const entries = await Food.find({ user_id });
        res.status(200).json(entries);
    } catch (error) {
        res.status(500).json({ message: 'Server error.' });
    }
});

// DELETE: Remove a specific food entry for a user
router.delete('/api/food/:entry_id', async (req, res) => {
    try {
        const { entry_id } = req.params;

        await Food.findByIdAndDelete(entry_id);
        res.status(200).json({ message: 'Food entry deleted successfully!' });
    } catch (error) {
        res.status(500).json({ message: 'Server error.' });
    }
});

module.exports = router;
