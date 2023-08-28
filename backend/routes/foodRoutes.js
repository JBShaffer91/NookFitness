const express = require('express');
const router = express.Router();

// POST: Add a food entry
router.post('/api/food', async (req, res) => {
  try {
    const db = req.app.locals.db;
    const foodDiaryCollection = db.collection('food_diary');
    const { user_id, food_name, calories, protein, carbs, fats } = req.body;

    // Simple validation
    if (!user_id || !food_name || !calories || !protein || !carbs || !fats) {
      return res.status(400).json({ message: 'Please provide all required fields.' });
    }

    const entry = {
      user_id,
      food_name,
      calories,
      protein,
      carbs,
      fats,
      entry_date: new Date(),
      entry_time: new Date().toLocaleTimeString()
    };

    await foodDiaryCollection.insertOne(entry);
    res.status(201).json({ message: 'Food entry added successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Server error.' });
  }
});

// GET: Fetch food entries for a user on a specific date
router.get('/api/food/:user_id/:date', async (req, res) => {
  try {
    const db = req.app.locals.db;
    const foodDiaryCollection = db.collection('food_diary');
    const { user_id, date } = req.params;

    const entries = await foodDiaryCollection.find({ user_id, entry_date: new Date(date) }).toArray();
    res.status(200).json(entries);
  } catch (error) {
    res.status(500).json({ message: 'Server error.' });
  }
});

// POST: Set an intermittent fasting (IF) schedule for a user
router.post('/api/if/schedule', async (req, res) => {
  try {
    const db = req.app.locals.db;
    const ifCollection = db.collection('intermittent_fasting');
    const { user_id, start_time, end_time } = req.body;

    // Simple validation
    if (!user_id || !start_time || !end_time) {
      return res.status(400).json({ message: 'Please provide all required fields.' });
    }

    await ifCollection.insertOne({ user_id, start_time, end_time, is_active: true });
    res.status(201).json({ message: 'IF schedule set successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Server error.' });
  }
});

// PUT: Toggle the active status of a user's IF schedule
router.put('/api/if/toggle/:user_id', async (req, res) => {
  try {
    const db = req.app.locals.db;
    const ifCollection = db.collection('intermittent_fasting');
    const { user_id } = req.params;

    const userIF = await ifCollection.findOne({ user_id });
    if (!userIF) {
      return res.status(404).json({ message: 'User IF schedule not found.' });
    }

    await ifCollection.updateOne({ user_id }, { $set: { is_active: !userIF.is_active } });
    res.status(200).json({ message: 'IF status toggled successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Server error.' });
  }
});

// GET: Fetch a user's IF schedule
router.get('/api/if/schedule/:user_id', async (req, res) => {
  try {
    const db = req.app.locals.db;
    const ifCollection = db.collection('intermittent_fasting');
    const { user_id } = req.params;

    const schedule = await ifCollection.findOne({ user_id });
    if (!schedule) {
      return res.status(404).json({ message: 'User IF schedule not found.' });
    }

    res.status(200).json(schedule);
  } catch (error) {
    res.status(500).json({ message: 'Server error.' });
  }
});

module.exports = router;
