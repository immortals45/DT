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

    if (loading) return <div style={styles.loading}>Loading timetables...</div>;
    if (error) return <div style={styles.error}>{error}</div>;

    return (
        <div style={styles.container}>
            <h2 style={styles.heading}>Welcome to the Dynamic Timetable Application</h2>
            <p style={styles.subtitle}>Please log in to view and manage timetables.</p>
            
            <h3 style={styles.sectionTitle}>Timetables</h3>

            <div style={styles.timetableContainer}>
                <div style={styles.timetable}>
                    <h4 style={styles.classTitle}>Class A Timetable</h4>
                    <ul style={styles.list}>
                        {classATimetable.length > 0 ? (
                            classATimetable[0].periods.map((slot) => (
                                <li key={slot.time} style={styles.listItem}>
                                    {slot.time}: <span style={styles.faculty}>{slot.faculty || 'Free'}</span> 
                                    {slot.status === 'unoccupied' ? <span style={styles.free}> (Free)</span> : ''}
                                </li>
                            ))
                        ) : (
                            <li style={styles.listItem}>No timetable available for Class A.</li>
                        )}
                    </ul>
                </div>

                <div style={styles.timetable}>
                    <h4 style={styles.classTitle}>Class B Timetable</h4>
                    <ul style={styles.list}>
                        {classBTimetable.length > 0 ? (
                            classBTimetable[0].periods.map((slot) => (
                                <li key={slot.time} style={styles.listItem}>
                                    {slot.time}: <span style={styles.faculty}>{slot.faculty || 'Free'}</span> 
                                    {slot.status === 'unoccupied' ? <span style={styles.free}> (Free)</span> : ''}
                                </li>
                            ))
                        ) : (
                            <li style={styles.listItem}>No timetable available for Class B.</li>
                        )}
                    </ul>
                </div>
            </div>

            <div style={styles.buttonContainer}>
                <a href="/login" style={styles.button}>Faculty Login</a>
                <a href="/student-login" style={styles.button}>Student Login</a>
            </div>
        </div>
    );
};

// Inline styles
const styles = {
    container: {
        padding: '20px',
        maxWidth: '800px',
        margin: 'auto',
        backgroundColor: '#f9f9f9',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        textAlign: 'center',
    },
    heading: {
        color: '#333',
        marginBottom: '10px',
    },
    subtitle: {
        color: '#666',
        fontSize: '14px',
        marginBottom: '20px',
    },
    sectionTitle: {
        color: '#007bff',
        marginBottom: '10px',
    },
    timetableContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '20px',
    },
    timetable: {
        flex: '1',
        minWidth: '350px',
        padding: '15px',
        backgroundColor: '#fff',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        textAlign: 'left',
    },
    classTitle: {
        color: '#444',
        borderBottom: '2px solid #007bff',
        paddingBottom: '5px',
        marginBottom: '10px',
    },
    list: {
        listStyle: 'none',
        padding: '0',
    },
    listItem: {
        padding: '8px',
        borderBottom: '1px solid #ddd',
    },
    faculty: {
        fontWeight: 'bold',
    },
    free: {
        color: '#28a745',
        fontWeight: 'bold',
    },
    buttonContainer: {
        marginTop: '20px',
    },
    button: {
        display: 'inline-block',
        padding: '10px 15px',
        margin: '5px',
        backgroundColor: '#007bff',
        color: '#fff',
        textDecoration: 'none',
        borderRadius: '5px',
        fontSize: '14px',
    },
    loading: {
        color: '#007bff',
        fontSize: '16px',
        textAlign: 'center',
    },
    error: {
        color: 'red',
        fontSize: '16px',
        textAlign: 'center',
    },
};

export default Home;
