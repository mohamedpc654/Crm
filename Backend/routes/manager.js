// routes/manager.js
const express = require('express');
const Task = require('../models/Task');
const Team = require('../models/Team');
const Meeting = require('../models/Meeting');
const auth = require('../middleware/auth');
const roleAuthorization = require('../middleware/role');
const router = express.Router();

// Protect all routes with authentication and role check
router.use(auth);
router.use(roleAuthorization(['Manager','Employee'])); // Only allow Managers

// Create Team
router.post('/teams', async (req, res) => {
    const { name, members } = req.body; // members is an array of employee IDs
    const newTeam = new Team({ name, members });
    await newTeam.save();
    res.status(201).json(newTeam);
});
// Get All Teams
router.get('/teams', async (req, res) => {
    const teams = await Team.find().populate('members', 'username'); // Populate member usernames
    res.json(teams);
});

// Get Team by ID
router.get('/teams/:id', async (req, res) => {
    const team = await Team.findById(req.params.id).populate('members', 'username');
    if (!team) return res.status(404).json({ message: 'Team not found' });
    res.json(team);
});
// Update Team
router.put('/teams/:id', async (req, res) => {
    const { name, members } = req.body;
    const updatedTeam = await Team.findByIdAndUpdate(req.params.id, { name, members }, { new: true });
    if (!updatedTeam) return res.status(404).json({ message: 'Team not found' });
    res.json(updatedTeam);
});
// Delete Team
router.delete('/teams/:id', async (req, res) => {
    const deletedTeam = await Team.findByIdAndDelete(req.params.id);
    if (!deletedTeam) return res.status(404).json({ message: 'Team not found' });
    res.status(204).send();
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Assign Task
router.post('/tasks', async (req, res) => {
    const { title, description, assignedTo, deadline, priority } = req.body; // assignedTo is an employee ID
    const newTask = new Task({ title, description, assignedTo, deadline, priority });
    await newTask.save();
    res.status(201).json(newTask);
});

// Get All Tasks
router.get('/tasks', async (req, res) => {
    const tasks = await Task.find().populate('assignedTo', 'username'); // Populate assigned user usernames
    res.json(tasks);
});

// Get Task by ID
router.get('/tasks/:id', async (req, res) => {
    const task = await Task.findById(req.params.id).populate('assignedTo', 'username');
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.json(task);
});
// Update Task
router.put('/tasks/:id', async (req, res) => {
    const { title, description, assignedTo, status, deadline, priority } = req.body;
    const updatedTask = await Task.findByIdAndUpdate(req.params.id, { title, description, assignedTo, status, deadline, priority }, { new: true });
    if (!updatedTask) return res.status(404).json({ message: 'Task not found' });
    res.json(updatedTask);
});

// Delete Task
router.delete('/tasks/:id', async (req, res) => {
    const deletedTask = await Task.findByIdAndDelete(req.params.id);
    if (!deletedTask) return res.status(404).json({ message: 'Task not found' });
    res.status(204).send();
});
/********************************************************************************************************************* */
// Create Meeting
router.post('/meetings', async (req, res) => {
    const { title, agenda, participants, date } = req.body; // participants is an array of user IDs
    const newMeeting = new Meeting({ title, agenda, participants, date });
    await newMeeting.save();
    res.status(201).json(newMeeting);
});

// Get All Meetings
router.get('/meetings', async (req, res) => {
    const meetings = await Meeting.find().populate('participants', 'username'); // Populate participant usernames
    res.json(meetings);
});

// Get Meeting by ID
router.get('/meetings/:id', async (req, res) => {
    const meeting = await Meeting.findById(req.params.id).populate('participants', 'username');
    if (!meeting) return res.status(404).json({ message: 'Meeting not found' });
    res.json(meeting);
});

// Update Meeting
router.put('/meetings/:id', async (req, res) => {
    const { title, agenda, participants, date } = req.body;
    const updatedMeeting = await Meeting.findByIdAndUpdate(req.params.id, { title, agenda, participants, date }, { new: true });
    if (!updatedMeeting) return res.status(404).json({ message: 'Meeting not found' });
    res.json(updatedMeeting);
});

// Delete Meeting
router.delete('/meetings/:id', async (req, res) => {
    const deletedMeeting = await Meeting.findByIdAndDelete(req.params.id);
    if (!deletedMeeting) return res.status(404).json({ message: 'Meeting not found' });
    res.status(204).send();
});

module.exports = router;