const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const cors = require('cors');
const timetableRoutes = require('./routes/timetableRoutes');
const studentRoutes = require('./routes/studentRoutes');
const assignmentRoutes = require('./routes/assignmentRoutes');
require('dotenv').config();
const app = express();
connectDB();
app.use(express.json());
app.use(cors());

app.use('/auth', authRoutes);
app.use('/timetable', timetableRoutes);
app.use('/students', studentRoutes);
app.use('/assignments', assignmentRoutes);


app.get('/', (req, res) => res.send('Dynamic Timetable API'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
