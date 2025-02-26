const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Student = require('../models/Student');


exports.login = async (req, res) => {
    const { username, password } = req.body;
    console.log('username', username);
    console.log('password', password);
    
    try {
        const user = await User.findOne({ username, role: 'faculty' });
        
        // Direct password comparison (assuming password is stored in plain text)
        if (!user || user.password !== password) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign(
            { id: user._id, username: user.username },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );
        console.log('token', token);

        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Server error, please try again.' });
    }
};

exports.studentLogin = async (req, res) => {
    const { username, password } = req.body;

    try {
        const student = await Student.findOne({ username });

        if (!student || student.password !== password) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign(
            { id: student._id, username: student.username, className: student.className },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.json({
            token,
            studentId: student._id,  // Sending student ID
            username: student.username,
            className: student.className
        });
    } catch (error) {
        res.status(500).json({ message: "Server error, please try again." });
    }
};
