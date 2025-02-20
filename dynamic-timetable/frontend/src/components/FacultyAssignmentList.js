import React, { useEffect, useState } from 'react';
import axios from 'axios';

const FacultyAssignmentList = () => {
    const [assignments, setAssignments] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchAssignments = async () => {
            try {
                const response = await axios.get('http://localhost:5000/assignments', {
                    headers: { Authorization: localStorage.getItem('token') }
                });
                setAssignments(response.data);
            } catch (error) {
                setError('Failed to fetch assignments');
            }
        };

        fetchAssignments();
    }, []);

    return (
        <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>
            <h2>Published Assignments</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {assignments.length === 0 ? (
                <p>No assignments published yet.</p>
            ) : (
                <ul style={{ listStyleType: 'none', padding: 0 }}>
                    {assignments.map((assignment) => (
                        <li key={assignment._id} style={{ border: '1px solid #ccc', padding: '10px', margin: '10px 0', borderRadius: '5px' }}>
                            <h3>{assignment.subject}</h3>
                            <p><strong>Class:</strong> {assignment.className}</p>
                            <p><strong>Faculty:</strong> {assignment.facultyName}</p>
                            <p><strong>Description:</strong> {assignment.description}</p>
                            <p><strong>Last Date:</strong> {new Date(assignment.lastDate).toDateString()}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default FacultyAssignmentList;
