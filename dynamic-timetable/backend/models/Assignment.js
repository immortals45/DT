const mongoose = require('mongoose');

const assignmentSchema = new mongoose.Schema({
    subject: { type: String, required: true },
    className: { type: String, required: true },
    facultyName: { type: String, required: true },
    description: { type: String, required: true },
    lastDate: { type: Date, required: true }
});

const Assignment = mongoose.model('Assignment', assignmentSchema);
module.exports = Assignment;
