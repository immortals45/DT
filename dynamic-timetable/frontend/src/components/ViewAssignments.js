import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ViewAssignments = ({ student }) => {
    const [assignments, setAssignments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchAssignments = async () => {
            const storedClassName = student?.className || localStorage.getItem('className');

            if (!storedClassName) {
                setError('Student class not found');
                setLoading(false);
                return;
            }

            try {
                const response = await axios.get(`http://localhost:5000/assignments/${storedClassName}`);
                setAssignments(response.data);
            } catch (err) {
                setError('Failed to fetch assignments');
            } finally {
                setLoading(false);
            }
        };

        fetchAssignments();
    }, [student]);

    if (loading) return <p>Loading assignments...</p>;
    if (error) return <p style={{ color: 'red' }}>{error}</p>;

    return (
        <div style={styles.container}>
            <h2 style={styles.heading}>Assignments</h2>
            {assignments.length === 0 ? (
                <p>No assignments available.</p>
            ) : (
                <ul style={styles.list}>
                    {assignments.map((assignment) => (
                        <li key={assignment._id} style={styles.listItem}>
                            <h3>{assignment.subject}</h3>
                            <p><strong>Faculty:</strong> {assignment.facultyName}</p>
                            <p><strong>Description:</strong> {assignment.description}</p>
                            <p><strong>Due Date:</strong> {new Date(assignment.lastDate).toLocaleDateString()}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

const styles = {
    container: {
        padding: '20px',
        maxWidth: '600px',
        margin: 'auto',
        textAlign: 'center',
    },
    heading: {
        color: '#333',
    },
    list: {
        listStyleType: 'none',
        padding: 0,
    },
    listItem: {
        backgroundColor: '#f4f4f4',
        padding: '15px',
        marginBottom: '10px',
        borderRadius: '8px',
        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
    },
};

export default ViewAssignments;
