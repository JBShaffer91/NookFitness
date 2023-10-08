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
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        console.log("Extracted Token:", token);  // Debug log
        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) {
                console.error("Token Verification Error:", err);  // Debug log
                return res.status(403).json({ message: 'Invalid token' });
            }
            console.log("Decoded User:", user);  // Debug log
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
        const refreshToken = jwt.sign({ email: user.email }, process.env.REFRESH_TOKEN_SECRET);
        await usersCollection.updateOne({ email: user.email }, { $set: { refreshToken: refreshToken } });

        res.status(200).json({ 
            token, 
            refreshToken,
            email: user.email,
            userId: user._id, 
            presentation: user.presentation  
        });
    } catch (error) {
        console.error('Login Error:', error.message);
        console.error('Stack Trace:', error.stack);
        next(error);
    }
});

// Revoke Refresh Token
router.post('/revoke-token', authenticateJWT, async (req, res, next) => {
    try {
        const usersCollection = getUsersCollection(req);
        const { email } = req.user; // Extracting email from the authenticated user

        // Update the user's document to remove the refresh token
        const result = await usersCollection.updateOne({ email }, { $unset: { refreshToken: "" } });

        if (result.modifiedCount === 0) {
            return res.status(400).json({ message: 'Failed to revoke refresh token.' });
        }

        res.status(200).json({ message: 'Refresh token revoked successfully!' });
    } catch (error) {
        console.error('Revoke Token Error:', error.message);
        console.error('Stack Trace:', error.stack);
        next(error);
    }
});

// Route to handle token refresh requests
router.post('/token', async (req, res) => {
    const refreshToken = req.body.token;
    if (!refreshToken) {
        return res.status(403).json({ message: 'Refresh token is required' });
    }

    const usersCollection = getUsersCollection(req);
    const user = await usersCollection.findOne({ refreshToken: refreshToken });
    if (!user) {
        return res.status(403).json({ message: 'Invalid refresh token' });
    }

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, userData) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid refresh token' });
        }

        const accessToken = jwt.sign({ email: userData.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ accessToken });
    });
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

// Update User Fitness Goals and Caloric Target
router.put('/fitness-goals/:email', authenticateJWT, async (req, res, next) => {
    try {
        const usersCollection = getUsersCollection(req);
        const userEmail = decodeURIComponent(req.params.email);
        const { fitnessGoals, caloricTarget } = req.body;

        // Log the incoming data
        console.log('Incoming Data:', { fitnessGoals, caloricTarget });

        // Check if fitnessGoals and caloricTarget are present in the request body
        if (!fitnessGoals || caloricTarget === undefined) {
            return res.status(400).json({ message: 'Missing required fields: fitnessGoals or caloricTarget.' });
        }

        const result = await usersCollection.updateOne(
            { email: userEmail },
            { 
                $set: { 
                    "fitnessGoals.goal": fitnessGoals.goal,
                    "fitnessGoals.caloricAdjustment": fitnessGoals.caloricAdjustment,
                    caloricTarget: caloricTarget 
                } 
            }
        );

        // Log the result of the update operation
        console.log('Update Result:', result);

        if (result.modifiedCount === 0) {
            return res.status(400).json({ message: 'Failed to update fitness goals and caloric target. No documents were modified.' });
        }

        res.status(200).json({ message: 'Fitness goals and caloric target updated successfully!' });
    } catch (error) {
        console.error('Update Fitness Goals and Caloric Target Error:', error.message);
        console.error('Stack Trace:', error.stack);
        next(error);
    }
});

// Update User Dietary Preferences and Allergies
router.put('/dietary-preferences/:email', authenticateJWT, async (req, res, next) => {
    try {
        const usersCollection = getUsersCollection(req);
        const userEmail = decodeURIComponent(req.params.email);
        const { dietaryPreferences } = req.body;

        const result = await usersCollection.updateOne({ email: userEmail }, { $set: { dietaryPreferences } });

        if (result.modifiedCount === 0) {
            return res.status(400).json({ message: 'Failed to update dietary preferences.' });
        }

        res.status(200).json({ message: 'Dietary preferences updated successfully!' });
    } catch (error) {
        console.error('Update Dietary Preferences Error:', error.message);
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
