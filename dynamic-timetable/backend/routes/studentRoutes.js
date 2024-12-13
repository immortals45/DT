// routes/studentRoutes.js
const express = require('express');
const router = express.Router();
const { getAllStudents } = require('../controllers/studentController'); // Adjust path to middleware

// Route to get all students
router.get('/display', getAllStudents);

module.exports = router;
