// models/Task.js
const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User '},
    status: { type: String, default: 'Pending' },
    deadline: { type: Date },
    priority: { type: String, enum: ['Low', 'Medium', 'High'], default: 'Medium' },
    notes: [{ type: String }],
}, { timestamps: true });

module.exports = mongoose.model('Task ', TaskSchema);