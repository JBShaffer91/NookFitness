const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { ObjectId } = require('mongodb');

const USER_EXISTS_ERROR = 'User already exists.';
const USER_NOT_FOUND_ERROR = 'User not found!';
const INVALID_CREDENTIALS_ERROR = 'Invalid credentials!';
const PROFILE_UPDATE_FAILED_ERROR = 'Profile update failed.';
const PROFILE_DELETE_FAILED_ERROR = 'Profile deletion failed.';

// Utility function to get users collection
const getUsersCollection = (req) => req.app.locals.db.collection('users');

// User Registration
router.post('/register', async (req, res, next) => {
  try {
    const usersCollection = getUsersCollection(req);
    const { username, email, password } = req.body;

    const existingUser = await usersCollection.findOne({ email });
    if (existingUser) {
      return res.status(400).send(USER_EXISTS_ERROR);
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await usersCollection.insertOne({ username, email, password: hashedPassword });
    res.status(201).send('User registered successfully!');
  } catch (error) {
    next(error);
  }
});

// User Login
router.post('/login', async (req, res, next) => {
  try {
    const usersCollection = getUsersCollection(req);
    const { email, password } = req.body;

    const user = await usersCollection.findOne({ email });

    if (!user) {
      return res.status(400).send(USER_NOT_FOUND_ERROR);
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).send(INVALID_CREDENTIALS_ERROR);
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ token });
  } catch (error) {
    next(error);
  }
});

// Fetch User Profile
router.get('/profile/:userId', async (req, res, next) => {
  try {
    const usersCollection = getUsersCollection(req);
    const userId = req.params.userId;

    const user = await usersCollection.findOne({ _id: ObjectId(userId) });

    if (!user) {
      return res.status(404).send(USER_NOT_FOUND_ERROR);
    }

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
});

// Update User Profile
router.put('/profile/:userId', async (req, res, next) => {
  try {
    const usersCollection = getUsersCollection(req);
    const userId = req.params.userId;
    const { username, email, age, height, weight } = req.body;

    const result = await usersCollection.updateOne({ _id: ObjectId(userId) }, { $set: { username, email, age, height, weight } });

    if (result.modifiedCount === 0) {
      return res.status(400).send(PROFILE_UPDATE_FAILED_ERROR);
    }

    res.status(200).send('Profile updated successfully!');
  } catch (error) {
    next(error);
  }
});

// Delete User Profile
router.delete('/profile/:userId', async (req, res, next) => {
  try {
    const usersCollection = getUsersCollection(req);
    const userId = req.params.userId;

    const result = await usersCollection.deleteOne({ _id: ObjectId(userId) });

    if (result.deletedCount === 0) {
      return res.status(400).send(PROFILE_DELETE_FAILED_ERROR);
    }

    res.status(200).send('Profile deleted successfully!');
  } catch (error) {
    next(error);
  }
});

// Error handling middleware
router.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

module.exports = router;
