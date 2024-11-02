const express = require('express');
const {
    getTimetable,
    cancelClass,
    assignFaculty,
    getStaticTimetables
} = require('../controllers/timetableController');

const router = express.Router();

// Define routes
router.get('/static', getStaticTimetables); 
router.post('/cancel-class', cancelClass);
router.post('/assign-faculty', assignFaculty);
router.get('/:className', getTimetable);

// New route for static timetables
module.exports = router;
