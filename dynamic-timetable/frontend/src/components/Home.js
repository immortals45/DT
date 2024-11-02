import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Home = () => {
    const [classATimetable, setClassATimetable] = useState([]);
    const [classBTimetable, setClassBTimetable] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTimetables = async () => {
            try {
                const response = await axios.get('http://localhost:5000/timetable/static');
                setClassATimetable(response.data.classA);
                setClassBTimetable(response.data.classB);
            } catch (error) {
                console.error('Error fetching timetables:', error);
                setError('Error fetching timetables');
            } finally {
                setLoading(false);
            }
        };

        fetchTimetables();
    }, []);

    if (loading) return <div>Loading timetables...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <h2>Welcome to the Dynamic Timetable Application</h2>
            <p>Please log in to view and manage timetables.</p>
            <h3>Timetables</h3>

            <h4>Class A Timetable</h4>
            <ul>
                {classATimetable.length > 0 ? (
                    classATimetable[0].periods.map((slot) => (
                        <li key={slot.time}>
                            {slot.time}: {slot.faculty || 'Free'}{slot.status === 'unoccupied' ? ' (Free)' : ''}
                        </li>
                    ))
                ) : (
                    <li>No timetable available for Class A.</li>
                )}
            </ul>

            <h4>Class B Timetable</h4>
            <ul>
                {classBTimetable.length > 0 ? (
                    classBTimetable[0].periods.map((slot) => (
                        <li key={slot.time}>
                            {slot.time}: {slot.faculty || 'Free'}{slot.status === 'unoccupied' ? ' (Free)' : ''}
                        </li>
                    ))
                ) : (
                    <li>No timetable available for Class B.</li>
                )}
            </ul>
            <a href="/login">Faculty Login</a>
        </div>
    );
};

export default Home;
