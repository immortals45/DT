const Student = require('../models/Student'); // Adjust the path to where your student model is located

// Middleware to get all students
const getAllStudents = async (req, res, next) => {
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

// Login Controller
const studentLogin = async (req, res) => {
    const { username, password } = req.body;

    // Validate input
    if (!username || !password) {
        return res.status(400).json({ success: false, message: 'Username and password are required.' });
    }

    try {
        // Check if user exists
        const user = await Student.findOne({ username });

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found.' });
        }

        // Compare passwords directly (no hashing)
        if (password !== user.password) {
            return res.status(401).json({ success: false, message: 'Invalid password.' });
        }

        // Successful login
        return res.status(200).json({ success: true, message: 'Login successful.' });
    } catch (error) {
        console.error('Error during login:', error);
        return res.status(500).json({ success: false, message: 'Internal server error.' });
    }
};

module.exports = { getAllStudents, studentLogin };
