// models/Timetable.js
const mongoose = require('mongoose');

const timetableSchema = new mongoose.Schema({
    className: { type: String, required: true },
    periods: [
        {
            time: { type: String, required: true },
            faculty: { type: String, required: true },
            status: { type: String, enum: ['occupied', 'unoccupied'], default: 'unoccupied' }, // Status field
        },
    ],
});

const Timetable = mongoose.model('Timetable', timetableSchema);
module.exports = Timetable;
