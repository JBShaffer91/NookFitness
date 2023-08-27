const express = require('express');
const router = express.Router();
const ObjectId = require('mongodb').ObjectId;

// Add Progress Entry
router.post('/api/users/:userId/progress', async (req, res) => {
    const db = req.app.locals.db;
    const progressCollection = db.collection('user_progress');
    const { userId } = req.params;
    const { date, weight, height, chest, waist, hips } = req.body;

    const progress = {
        user_id: ObjectId(userId),
        date: new Date(date),
        weight,
        height,
        chest,
        waist,
        hips
    };

    await progressCollection.insertOne(progress);
    res.status(201).send('Progress entry added successfully.');
});

// Get Progress Entries
router.get('/api/users/:userId/progress', async (req, res) => {
    const db = req.app.locals.db;
    const progressCollection = db.collection('user_progress');
    const { userId } = req.params;

    const progressEntries = await progressCollection.find({ user_id: ObjectId(userId) }).sort({ date: -1 }).toArray();
    res.status(200).json(progressEntries);
});

// Update Progress Entry
router.put('/api/users/:userId/progress/:progressId', async (req, res) => {
    const db = req.app.locals.db;
    const progressCollection = db.collection('user_progress');
    const { userId, progressId } = req.params;
    const { date, weight, height, chest, waist, hips } = req.body;

    const updatedProgress = {
        date: new Date(date),
        weight,
        height,
        chest,
        waist,
        hips
    };

    await progressCollection.updateOne({ _id: ObjectId(progressId), user_id: ObjectId(userId) }, { $set: updatedProgress });
    res.status(200).send('Progress entry updated successfully.');
});

// Delete Progress Entry
router.delete('/api/users/:userId/progress/:progressId', async (req, res) => {
    const db = req.app.locals.db;
    const progressCollection = db.collection('user_progress');
    const { userId, progressId } = req.params;

    await progressCollection.deleteOne({ _id: ObjectId(progressId), user_id: ObjectId(userId) });
    res.status(200).send('Progress entry deleted successfully.');
});

module.exports = router;
