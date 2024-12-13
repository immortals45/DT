const Student = require('../models/Student'); // Adjust the path to where your student model is located

// Middleware to get all students
exports.getAllStudents = async (req, res, next) => {
    try {
        // Fetch all students from the database
        const students = await Student.find();
        console.log(students);

        // If no students found
        if (students.length === 0) {
            return res.status(404).json({ message: 'No students found' });
        }

        // Send the students data as the response
        res.status(200).json(students);
    } catch (error) {
        // Handle any errors that occur
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};