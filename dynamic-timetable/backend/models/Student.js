const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    className: { type: String, required: true },
    marks: {
        AA: { type: Number, required: true },
        BB: { type: Number, required: true },
        CC: { type: Number, required: true },
        DD: { type: Number, required: true }
    }
});

module.exports = mongoose.model('Student', studentSchema);
