const express = require('express');
const Task = require('../models/Task');
const auth = require('../middleware/auth');
const router = express.Router();

// Protect all routes with authentication
router.use(auth);

// Update Task Route
router.put('/tasks/:id', async (req, res) => { // Corrected: Removed the parentheses around the async function
    const { status, notes } = req.body; // Get status and notes from request body

    try {
        const updatedTask = await Task.findByIdAndUpdate(req.params.id, { status, notes }, { new: true });
        if (!updatedTask) return res.status(404).json({ message: 'Task not found' });
        res.json(updatedTask);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Get Assigned Tasks
router.get('/tasks', async (req, res) => {
    const tasks = await Task.find({ assignedTo: req.user.id });
    res.json(tasks);
});

module.exports = router;