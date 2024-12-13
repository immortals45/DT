// routes/studentRoutes.js
const express = require('express');
const router = express.Router();
const { getAllStudents,studentLogin } = require('../controllers/studentController');
router.get('/display', getAllStudents);
router.post('/login', studentLogin);


module.exports = router;
