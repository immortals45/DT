import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useParams } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Timetable from './components/Timetable';

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

    return (
        <Router>
            <div className="App">
                <Routes>
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
