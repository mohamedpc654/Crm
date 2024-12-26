// routes/admin.js
const express = require('express');
const User = require('../models/User'); // User model
const router = express.Router();
const bcrypt = require('bcryptjs');
const auth = require('../middleware/auth');
const roleAuthorization = require('../middleware/role');

// Protect all routes with authentication and role check
router.use(auth);
router.use(roleAuthorization(['Admin','Manager'])); // Only allow Admins

// Create User
router.post('/users', async (req, res) => {
    const { username, password, role } = req.body;

    // Check if the user already exists
    const existingUser  = await User.findOne({ username });
    if (existingUser ) {
        return res.status(400).json({ message: 'User  already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser  = new User({ username, password: hashedPassword, role });
    await newUser .save();

    res.status(201).json(newUser );
});

// Update User
router.put('/users/:id', async (req, res) => {
    const updatedUser  = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedUser );
});

// Delete User
router.delete('/users/:id', async (req, res) => {
    await User.findByIdAndDelete(req.params.id);
    res.status(204).send();
});

// Get All Users
router.get('/users', async (req, res) => {
    const users = await User.find();
    res.json(users);
});

module.exports = router;