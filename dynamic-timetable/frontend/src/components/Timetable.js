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
            await cancelClass(classId, timeSlot, user.username);
            onUpdate(`Class at ${timeSlot} has been canceled.`);
            const data = await getTimetable(classId);
            setTimetable(data);
        } catch (err) {
            console.error(err);
            onUpdate('Failed to cancel class.');
        }
    };

    const handleAssign = async (time) => {
        try {
            await assignClass(classId, time, user.username);
            onUpdate(`Class at ${time} has been assigned to ${user.username}.`);
            const data = await getTimetable(classId);
            setTimetable(data);
        } catch (err) {
            console.error(err);
            onUpdate('Failed to assign class.');
        }
    };

    if (loading) return <p style={styles.loading}>Loading timetable...</p>;
    if (error) return <p style={styles.error}>{error}</p>;

    return (
        <div style={styles.container}>
            <h2 style={styles.heading}>Timetable for {timetable.className}</h2>
            <table style={styles.table}>
                <thead>
                    <tr>
                        <th style={styles.th}>Time</th>
                        <th style={styles.th}>Faculty</th>
                        <th style={styles.th}>Status</th>
                        <th style={styles.th}>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {timetable.periods.map((period, index) => (
                        <tr key={index} style={styles.tr}>
                            <td style={styles.td}>{period.time}</td>
                            <td style={styles.td}>{period.faculty}</td>
                            <td style={styles.td}>{period.status}</td>
                            <td style={styles.td}>
                                {period.status === 'occupied' && period.faculty === user.username ? (
                                    <button onClick={() => handleCancel(period.time)} style={styles.cancelButton}>
                                        Cancel
                                    </button>
                                ) : period.status === 'unoccupied' ? (
                                    <button onClick={() => handleAssign(period.time)} style={styles.assignButton}>
                                        Assign
                                    </button>
                                ) : (
                                    <span style={styles.na}>N/A</span>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

// Inline styles
const styles = {
    container: {
        padding: '20px',
        backgroundColor: '#f9f9f9',
        borderRadius: '8px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        maxWidth: '800px',
        margin: '20px auto',
        textAlign: 'center',
    },
    heading: {
        marginBottom: '15px',
        color: '#333',
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse',
        backgroundColor: '#fff',
        borderRadius: '8px',
        overflow: 'hidden',
    },
    th: {
        padding: '10px',
        backgroundColor: '#007bff',
        color: '#fff',
        fontWeight: 'bold',
    },
    tr: {
        borderBottom: '1px solid #ddd',
    },
    td: {
        padding: '10px',
        textAlign: 'center',
    },
    assignButton: {
        padding: '8px 12px',
        backgroundColor: '#28a745',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '14px',
    },
    cancelButton: {
        padding: '8px 12px',
        backgroundColor: '#dc3545',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '14px',
    },
    na: {
        color: '#777',
    },
    loading: {
        color: '#007bff',
        fontSize: '16px',
    },
    error: {
        color: 'red',
        fontSize: '16px',
    },
};

export default Timetable;
