import React, { useEffect, useState } from 'react';
import { getTimetable, assignClass, cancelClass } from '../api'; // Adjust the import path based on your project structure

const Timetable = ({ classId, user, onUpdate }) => {
    const [timetable, setTimetable] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchTimetable = async () => {
            try {
                const data = await getTimetable(classId);
                setTimetable(data);
                setLoading(false);
            } catch (err) {
                console.error(err);
                setError('Failed to load timetable');
                setLoading(false);
            }
        };

        fetchTimetable();
    }, [classId]);

    const handleCancel = async (timeSlot) => {
        try {
            console.log('Cancelling class at', timeSlot);
            await cancelClass(classId, timeSlot, user.username); // Pass the username for cancellation
            onUpdate(`Class at ${timeSlot} has been canceled.`);
            // Refetch the timetable after cancellation
            const data = await getTimetable(classId);
            setTimetable(data);
        } catch (err) {
            console.error(err);
            onUpdate('Failed to cancel class.');
        }
    };

    const handleAssign = async (time) => {
        try {
            await assignClass(classId, time, user.username); // Pass the username for assignment
            onUpdate(`Class at ${time} has been assigned to ${user.username}.`);
            // Refetch the timetable after assignment
            const data = await getTimetable(classId);
            setTimetable(data);
        } catch (err) {
            console.error(err);
            onUpdate('Failed to assign class.');
        }
    };

    if (loading) return <p>Loading timetable...</p>;
    if (error) return <p>{error}</p>;
    console.log(user);

    return (
        <div>
            <h2>Timetable for {timetable.className}</h2>
            <table>
                <thead>
                    <tr>
                        <th>Time</th>
                        <th>Faculty</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {timetable.periods.map((period, index) => (
                        <tr key={index}>
                            <td>{period.time}</td>
                            <td>{period.faculty}</td>
                            <td>{period.status}</td>
                            <td>
                                {period.status === 'occupied' && period.faculty === user.username ? (
                                    <button onClick={() => handleCancel(period.time)}>Cancel</button>
                                ) : period.status === 'unoccupied' ? (
                                    <button onClick={() => handleAssign(period.time)}>Assign</button>
                                ) : (
                                    <span>N/A</span>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Timetable;
