// models/Meeting.js
const mongoose = require('mongoose');

const MeetingSchema = new mongoose.Schema({
    title: { type: String, required: true },
    agenda: { type: String },
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User ' }],
    date: { type: Date, required: true },
    notes: [{ type: String }],
}, { timestamps: true });

module.exports = mongoose.model('Meeting', MeetingSchema);