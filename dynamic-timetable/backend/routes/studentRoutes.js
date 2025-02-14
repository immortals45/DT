// routes/studentRoutes.js
const express = require('express');
const router = express.Router();
const { getAllStudents,studentLogin,updateMarksMiddleware } = require('../controllers/studentController');
router.get('/display', getAllStudents);
router.post('/login', studentLogin);
router.post('/update-marks', updateMarksMiddleware);
module.exports = router;
