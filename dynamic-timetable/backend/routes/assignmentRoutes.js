const express = require('express');
const { publishAssignment, getAssignments } = require('../controllers/assignmentController');
const authenticate = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', authenticate, publishAssignment);
router.get('/', authenticate, getAssignments); // Fetch assignments

module.exports = router;
