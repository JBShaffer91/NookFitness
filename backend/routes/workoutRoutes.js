const express = require('express');
const { ObjectId } = require('mongodb');
const router = express.Router();

// Add New Workout
router.post('/', async (req, res) => {
    try {
        const db = req.app.locals.db;
        const workoutCollection = db.collection('workout_sessions');
        const { user_id, workout_name, date, duration, exercises, sets, reps } = req.body;

        // Data validation can be added here

        const workout = {
            user_id,
            workout_name,
            date: new Date(date),
            duration,
            exercises,
            sets,
            reps
        };

        await workoutCollection.insertOne(workout);
        res.status(201).send('Workout added successfully.');
    } catch (error) {
        res.status(500).send('Server error.');
    }
});

// Update Existing Workout
router.put('/:workoutId', async (req, res) => {
    try {
        const db = req.app.locals.db;
        const workoutCollection = db.collection('workout_sessions');
        const { user_id, workout_name, date, duration, exercises, sets, reps } = req.body;

        // Data validation can be added here

        const updatedWorkout = {
            user_id,
            workout_name,
            date: new Date(date),
            duration,
            exercises,
            sets,
            reps
        };

        await workoutCollection.updateOne({ _id: ObjectId(req.params.workoutId) }, { $set: updatedWorkout });
        res.status(200).send('Workout updated successfully.');
    } catch (error) {
        res.status(500).send('Server error.');
    }
});

// Delete Workout
router.delete('/:workoutId', async (req, res) => {
    try {
        const db = req.app.locals.db;
        const workoutCollection = db.collection('workout_sessions');

        await workoutCollection.deleteOne({ _id: ObjectId(req.params.workoutId) });
        res.status(200).send('Workout deleted successfully.');
    } catch (error) {
        res.status(500).send('Server error.');
    }
});

// Fetch Workouts by Date
router.get('/:userId/date/:date', async (req, res) => {
    try {
        const db = req.app.locals.db;
        const workoutCollection = db.collection('workout_sessions');
        const { userId, date } = req.params;

        const workouts = await workoutCollection.find({ user_id: userId, date: new Date(date) }).toArray();
        res.status(200).json(workouts);
    } catch (error) {
        res.status(500).send('Server error.');
    }
});

// Fetch Workouts by Week
router.get('/:userId/week/:weekNumber', async (req, res) => {
    try {
        const db = req.app.locals.db;
        const workoutCollection = db.collection('workout_sessions');
        const { userId, weekNumber } = req.params;
        const year = new Date().getFullYear();
        const startDate = new Date(year, 0, 1 + (weekNumber - 1) * 7);
        const endDate = new Date(year, 0, 7 + (weekNumber - 1) * 7);

        const workouts = await workoutCollection.find({ user_id: userId, date: { $gte: startDate, $lte: endDate } }).toArray();
        res.status(200).json(workouts);
    } catch (error) {
        res.status(500).send('Server error.');
    }
});

// Fetch Workouts by Month
router.get('/:userId/month/:monthNumber', async (req, res) => {
    try {
        const db = req.app.locals.db;
        const workoutCollection = db.collection('workout_sessions');
        const { userId, monthNumber } = req.params;
        const year = new Date().getFullYear();
        const startDate = new Date(year, monthNumber - 1, 1);
        const endDate = new Date(year, monthNumber, 0);

        const workouts = await workoutCollection.find({ user_id: userId, date: { $gte: startDate, $lte: endDate } }).toArray();
        res.status(200).json(workouts);
    } catch (error) {
        res.status(500).send('Server error.');
    }
});

module.exports = router;
