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
const updateMarksMiddleware = async (req, res) => {
    try {
        const { username, marks } = req.body;
        console.log(username, marks);

        if (!username || !marks) {
            return res.status(400).json({ message: "Username and marks are required." });
        }

        // Convert marks from string to number
        const parsedMarks = {};
        for (let subject in marks) {
            if (marks.hasOwnProperty(subject)) {
                parsedMarks[subject] = Number(marks[subject]); // Convert to number
                if (isNaN(parsedMarks[subject])) {
                    return res.status(400).json({ message: `Invalid marks for ${subject}. Must be a number.` });
                }
            }
        }

        // Update marks in database
        const student = await Student.findOneAndUpdate(
            { name:username },
            { $set: { marks: parsedMarks } },
            { new: true }
        );

        if (!student) {
            return res.status(404).json({ message: "Student not found." });
        }

        res.status(200).json({ message: "Marks updated successfully.", student });
    } catch (error) {
        res.status(500).json({ message: "Server error.", error: error.message });
    }
};

module.exports = updateMarksMiddleware;



module.exports = { getAllStudents, studentLogin, updateMarksMiddleware };
