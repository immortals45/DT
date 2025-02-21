const Assignment = require('../models/Assignment');

// Publish a new assignment (Faculty only)
exports.publishAssignment = async (req, res) => {
    try {
        const { subject, className, facultyName, description, lastDate } = req.body;
        const newAssignment = new Assignment({ subject, className, facultyName, description, lastDate });
        await newAssignment.save();
        res.status(201).json({ message: "Assignment published successfully!" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};
exports.getAssignments = async (req, res) => {
    try {
        const assignments = await Assignment.find();
        res.json(assignments);
    } catch (error) {
        res.status(500).json({ message: 'Server error, unable to fetch assignments' });
    }
};
exports.getAssignmentsByClass = async (req, res) => {
    const { className } = req.params;

    try {
        const assignments = await Assignment.find({ className });

        if (!assignments.length) {
            return res.status(404).json({ message: 'No assignments found for this class' });
        }

        res.json(assignments);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error, please try again.' });
    }
};
