const User = require('../models/User');
const Timetable = require('../models/Timetable');
const Student=require('../models/Student');
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey('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');

// Get a specific timetable by class name
// controllers/timetableController.js


// Get Timetable for a specific class
exports.getTimetable = async (req, res) => {
    const { className } = req.params;
    console.log('className', className);

    try {
        const timetable = await Timetable.findOne({ className });
        if (!timetable) {
            return res.status(404).json({ message: 'Timetable not found' });
        }

        res.json(timetable);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

exports.cancelClass = async (req, res) => {
    const { className, time, faculty } = req.body;

    try {
        const timetable = await Timetable.findOne({ className });
        if (!timetable) {
            return res.status(404).json({ message: 'Timetable not found' });
        }

        const period = timetable.periods.find((p) => p.time === time && p.faculty === faculty);
        if (!period || period.status === 'unoccupied') {
            return res.status(400).json({ message: 'Cannot cancel an unoccupied class or class not found' });
        }

        // Update the period status
        period.status = 'unoccupied';
        await timetable.save();

        // Fetch all students belonging to this class
        const students = await Student.find({ className: timetable.className });
        console.log(students);

        if (!students.length) {
            return res.status(404).json({ message: 'No students found for this class' });
        }
        console.log("Students:", students.map(s => ({ name: s.name, email: s.email })));


        // Send individual emails
        const emailPromises = students.map(student => {
            const msg = {
                to: student.email,
                from: 'yaswanthsharma775@gmail.com',
                subject: `Class Cancellation Notification`,
                text: `Dear ${student.name},\n\nYour class scheduled at ${time} has been canceled.\n\nFaculty: ${faculty}\nClass: ${className}\n\nThank you.`,
                html: `<p>Dear ${student.name},</p><p>Your class scheduled at <b>${time}</b> has been canceled.</p><p><b>Faculty:</b> ${faculty}<br><b>Class:</b> ${className}</p><p>Thank you.</p>`
            };
            return sgMail.send(msg);
        });

        await Promise.all(emailPromises);

        res.json({ 
            message: `Class at ${time} has been canceled. Notifications sent to ${students.length} students individually.`
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

// Assign a new faculty to a class period
exports.assignFaculty = async (req, res) => {
   const className=req.body.className;
    const time=req.body.time;
    const newFaculty=req.body.faculty;
    
    try {
        const timetable = await Timetable.findOne({ className });
        if (!timetable) {
            return res.status(404).json({ message: 'Timetable not found' });
        }

        const period = timetable.periods.find((p) => p.time === time);
        if (!period || period.status === 'occupied') {
            return res.status(400).json({ message: 'Cannot assign faculty to an occupied class or class not found' });
        }

        period.faculty = newFaculty; // Assign new faculty
        period.status = 'occupied'; // Update status
        await timetable.save();
        const students = await Student.find({ className: timetable.className });
        console.log(students);
        if (!students.length) {
            return res.status(404).json({ message: 'No students found for this class' });
        }
        console.log("Students:", students.map(s => ({ name: s.name, email: s.email })));
        const emailPromises = students.map(student => {
            const msg = {
                to: student.email,
                from: 'yaswanthsharma775@gmail.com',
                subject: `Class Modification Notification`,
                text: `Dear ${student.name},\n\nYour class scheduled at ${time} has been modified.\n\nFaculty: ${newFaculty}\nClass: ${className}\n\nThank you.`,
                html: `<p>Dear ${student.name},</p><p>Your class scheduled at <b>${time}</b> has been Modified.</p><p><b>Faculty:</b> ${newFaculty}<br><b>Class:</b> ${className}</p><p>Thank you.</p>`
            };
            return sgMail.send(msg);
        });

        await Promise.all(emailPromises);


        res.json({ message: `Faculty ${newFaculty} has been assigned to class at ${time}.` });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

// Get static timetables for class A and class B
exports.getStaticTimetables = async (req, res) => {
    try {
        const classATimetable = await Timetable.find({ className: "A" }); // Match the exact case
        const classBTimetable = await Timetable.find({ className: "B" });
        console.log(classATimetable);
        console.log(classBTimetable);
        res.json({
            classA: classATimetable,
            classB: classBTimetable,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error fetching timetables' });
    }
};
