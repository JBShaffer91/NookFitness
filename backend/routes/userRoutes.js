const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { ObjectId } = require('mongodb');
const { check, validationResult } = require('express-validator');
const USER_EXISTS_ERROR = 'User already exists.';
const USER_NOT_FOUND_ERROR = 'User not found!';
const INVALID_CREDENTIALS_ERROR = 'Invalid credentials!';
const PROFILE_UPDATE_FAILED_ERROR = 'Profile update failed.';
const PROFILE_DELETE_FAILED_ERROR = 'Profile deletion failed.';

// Utility function to get users collection
const getUsersCollection = (req) => {
    // Log when the function is called
    console.log("getUsersCollection called");

    if (!req.app.locals.db) {
        console.error("Database not initialized"); // Log an error message if the database isn't initialized
        throw new Error("Database not initialized");
    }

    // Log the name of the collection being retrieved
    console.log("Retrieving 'users' collection from the database");

    return req.app.locals.db.collection('users');
};

// Middleware for JWT authentication
const authenticateJWT = (req, res, next) => {
    const token = req.headers.authorization;
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) {
                return res.status(403).json({ message: 'Invalid token' });
            }
            req.user = user;
            next();
        });
    } else {
        res.status(401).json({ message: 'Token missing' });
    }
};

// User Registration with input validation
router.post('/register', [
    check('email').isEmail(),
    check('password').isLength({ min: 6 }),
    check('username').notEmpty(),
    check('presentation').notEmpty()
], async (req, res, next) => {
    console.log("Registration Request Body:", req.body);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log("Validation Errors:", errors.array());
        return res.status(400).json({ message: errors.array().map(err => err.msg).join(', ') });
    }

    try {
        const usersCollection = getUsersCollection(req);
        const { username, email, password, presentation } = req.body;

        const existingUser = await usersCollection.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: USER_EXISTS_ERROR });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        await usersCollection.insertOne({ username, email, password: hashedPassword, presentation });
        res.status(201).json({ message: 'User registered successfully!' });
    } catch (error) {
        console.error('Registration Error:', error.message);
        console.error('Stack Trace:', error.stack);
        next(error);
    }
});

// User Login
router.post('/login', async (req, res, next) => {
    try {
        const usersCollection = getUsersCollection(req);
        const { email, password } = req.body;

        const user = await usersCollection.findOne({ email });
        console.log("Received Email:", email);
        console.log("Received Password:", password);

        if (!user) {
            return res.status(400).json({ message: USER_NOT_FOUND_ERROR, reason: 'User not found' });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: INVALID_CREDENTIALS_ERROR, reason: 'Incorrect password' });
        }

        const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ 
            token, 
            email: user.email,
            userId: user._id,  // Assuming the user's ID is stored in _id field in MongoDB
            presentation: user.presentation  // Send the user's presentation
        });
    } catch (error) {
        console.error('Login Error:', error.message);
        console.error('Stack Trace:', error.stack);
        next(error);
    }
});

// Fetch User Profile with authentication middleware
router.get('/profile/:email', authenticateJWT, async (req, res, next) => {
    try {
        const usersCollection = getUsersCollection(req);
        const userEmail = decodeURIComponent(req.params.email);

        const user = await usersCollection.findOne({ email: userEmail });
        console.log("Queried User:", user);

        if (!user) {
            return res.status(404).json({ message: USER_NOT_FOUND_ERROR });
        }

        delete user.password;
        res.status(200).json(user);
    } catch (error) {
        console.error('Fetch Profile Error:', error.message);
        console.error('Stack Trace:', error.stack);
        next(error);
    }
});

// Update User Profile
router.put('/profile/:email', authenticateJWT, async (req, res, next) => {
    try {
        const usersCollection = getUsersCollection(req);
        const userEmail = decodeURIComponent(req.params.email);
        const { username, age, height, weight, tdee } = req.body;

        const result = await usersCollection.updateOne({ email: userEmail }, { $set: { username, age, height, weight, tdee } });

        if (result.modifiedCount === 0) {
            return res.status(400).json({ message: PROFILE_UPDATE_FAILED_ERROR });
        }

        res.status(200).json({ message: 'Profile updated successfully!' });
    } catch (error) {
        console.error('Update Profile Error:', error.message);
        console.error('Stack Trace:', error.stack);
        next(error);
    }
});

// Delete User Profile
router.delete('/profile/:email', authenticateJWT, async (req, res, next) => {
    try {
        const usersCollection = getUsersCollection(req);
        const userEmail = decodeURIComponent(req.params.email);

        const result = await usersCollection.deleteOne({ email: userEmail });

        if (result.deletedCount === 0) {
            return res.status(400).json({ message: PROFILE_DELETE_FAILED_ERROR });
        }

        res.status(200).json({ message: 'Profile deleted successfully!' });
    } catch (error) {
        console.error('Delete Profile Error:', error.message);
        console.error('Stack Trace:', error.stack);
        next(error);
    }
});

// Error handling middleware
router.use((err, req, res, next) => {
    console.error('Unhandled Error:', err.message);
    console.error('Stack Trace:', err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
});

module.exports = router;
