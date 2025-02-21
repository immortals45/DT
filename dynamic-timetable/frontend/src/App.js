import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useParams } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Timetable from './components/Timetable';
import MidMarksUpload from './components/MidMarksUpload';
import StudentLogin from './components/StudentLogin';
import ShowMarks from './components/ShowMarks';
import PublishAssignment from './components/PublishAssignment';
import FacultyAssignmentList from './components/FacultyAssignmentList';

const ProtectedRoute = ({ element, isLoggedIn }) => {
    return isLoggedIn ? element : <Navigate to="/login" />;
};

const TimetableWrapper = ({ user }) => {
    const { className } = useParams();
    return <Timetable classId={className} user={user} onUpdate={(message) => alert(message)} />;
};

const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState({});
    const[isStudentLoggedIn, setIsStudentLoggedIn] = useState(false);
    const [student, setStudent] = useState({});

    return (
        <Router>
            <div className="App">
                <Routes>
                 <Route path="/mid-marks" 
                        element={<ProtectedRoute isLoggedIn={isLoggedIn} element={<MidMarksUpload />} />}   
                    />
                    <Route path="/faculty-assignments" element={<FacultyAssignmentList />} />
                    <Route path="/publish-assignment" element={<PublishAssignment />} />
                    <Route path="/show-marks/:className" element={<ShowMarks />} />
                    <Route path="/student-login" element={<StudentLogin student={student} setIsStudentLoggedIn={setIsStudentLoggedIn} setStudent={setStudent}/>} />

                    <Route path="/" element={<Home isLoggedIn={isLoggedIn} />} />
                    <Route path="/login" element={<Login user={user}setIsLoggedIn={setIsLoggedIn} setUser={setUser} />} />
                    <Route
                        path="/timetable/:className"
                        element={<ProtectedRoute isLoggedIn={isLoggedIn} element={<TimetableWrapper user={user} />} />}
                    />

                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
