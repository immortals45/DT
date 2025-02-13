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
    },
    email: { type: String, required: true } 
});

const Student= mongoose.model('Student', studentSchema);
module.exports =Student;
