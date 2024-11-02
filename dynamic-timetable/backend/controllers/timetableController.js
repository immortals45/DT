const User = require('../models/User');
const Timetable = require('../models/Timetable');

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

// Cancel a class period
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

        period.status = 'unoccupied'; // Update the status
        await timetable.save();

        res.json({ message: `Class at ${time} has been canceled.` });
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
