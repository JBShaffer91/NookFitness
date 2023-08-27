const express = require('express');
const router = express.Router();

router.post('/api/food', async (req, res) => {
  const db = req.app.locals.db;
  const foodDiaryCollection = db.collection('food_diary');
  const { user_id, food_name, calories, protein, carbs, fats } = req.body;

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
  res.status(201).send('Food entry added successfully!');
});

router.get('/api/food/:user_id/:date', async (req, res) => {
  const db = req.app.locals.db;
  const foodDiaryCollection = db.collection('food_diary');
  const { user_id, date } = req.params;

  const entries = await foodDiaryCollection.find({ user_id, entry_date: new Date(date) }).toArray();
  res.status(200).json(entries);
});

router.post('/api/if/schedule', async (req, res) => {
  const db = req.app.locals.db;
  const ifCollection = db.collection('intermittent_fasting');
  const { user_id, start_time, end_time } = req.body;

  await ifCollection.insertOne({ user_id, start_time, end_time, is_active: true });
  res.status(201).send('IF schedule set successfully!');
});

router.put('/api/if/toggle/:user_id', async (req, res) => {
  const db = req.app.locals.db;
  const ifCollection = db.collection('intermittent_fasting');
  const { user_id } = req.params;

  const userIF = await ifCollection.findOne({ user_id });
  if (!userIF) {
    return res.status(404).send('User IF schedule not found.');
  }

  await ifCollection.updateOne({ user_id }, { $set: { is_active: !userIF.is_active } });
  res.status(200).send('IF status toggled successfully!');
});

router.get('/api/if/schedule/:user_id', async (req, res) => {
  const db = req.app.locals.db;
  const ifCollection = db.collection('intermittent_fasting');
  const { user_id } = req.params;

  const schedule = await ifCollection.findOne({ user_id });
  if (!schedule) {
    return res.status(404).send('User IF schedule not found.');
  }

  res.status(200).json(schedule);
});

module.exports = router;
