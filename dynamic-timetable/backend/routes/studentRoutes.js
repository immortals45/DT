// routes/studentRoutes.js
const express = require('express');
const router = express.Router();
const { getAllStudents,studentLogin,updateMarksMiddleware,fetchStudentByClass,fetchStudentMarks } = require('../controllers/studentController');
router.get('/display', getAllStudents);
router.post('/login', studentLogin);
router.post('/update-marks', updateMarksMiddleware);
router.get('/fetch-student/:className', fetchStudentByClass);
router.get('/fetch-marks/:studentId', fetchStudentMarks);
module.exports = router;
