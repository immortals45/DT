const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');


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

