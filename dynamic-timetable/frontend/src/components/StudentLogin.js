import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { studentLogin } from '../api';

const StudentLogin = ({ student, setIsStudentLoggedIn, setStudent }) => {
    const [credentials, setCredentials] = useState({ username: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            const { token, username, className } = await studentLogin(credentials);
            localStorage.setItem('token', token);
            localStorage.setItem('className', className); // Store className
            setStudent({ username, token, className });
            setIsStudentLoggedIn(true);
        } catch (error) {
            console.error(error);
            setError(error.response?.data?.message || 'Login failed');
        } finally {
            setLoading(false);
        }
    };
    

    return (
        <div style={styles.container}>
            {!student.token && (
                <form onSubmit={handleSubmit} style={styles.form}>
                    <h2 style={styles.heading}>Student Login</h2>
                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        value={credentials.username}
                        onChange={handleChange}
                        required
                        style={styles.input}
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={credentials.password}
                        onChange={handleChange}
                        required
                        style={styles.input}
                    />
                    <button type="submit" disabled={loading} style={styles.button}>
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                    {error && <p style={styles.error}>{error}</p>}
                </form>
            )}

            {/* Show options after successful login */}
            {student && student.token && (
                <div style={styles.optionsContainer}>
                    <h2 style={styles.heading}>Options</h2>
                    <div style={styles.optionSection}>
                        <h3>Assignments:</h3>
                        <Link to="/view-assignments" style={styles.link}>View Assignments</Link>
                    </div>
                    <div style={styles.optionSection}>
                        <h3>View MidMarks:</h3>
                        <Link to="/view-midmarks" style={styles.link}>View MidMarks</Link>
                    </div>
                </div>
            )}
        </div>
    );
};

// Inline styles
const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        backgroundColor: '#f4f4f4',
        padding: '20px',
    },
    form: {
        backgroundColor: '#fff',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        width: '300px',
        textAlign: 'center',
    },
    heading: {
        marginBottom: '10px',
        color: '#333',
    },
    input: {
        padding: '10px',
        borderRadius: '5px',
        border: '1px solid #ccc',
        fontSize: '16px',
    },
    button: {
        padding: '10px',
        borderRadius: '5px',
        border: 'none',
        backgroundColor: '#007bff',
        color: '#fff',
        cursor: 'pointer',
        fontSize: '16px',
    },
    error: {
        color: 'red',
        fontSize: '14px',
    },
    optionsContainer: {
        backgroundColor: '#fff',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
        width: '320px',
        marginTop: '20px',
        textAlign: 'center',
    },
    optionSection: {
        marginBottom: '10px',
    },
    link: {
        display: 'block',
        textDecoration: 'none',
        color: '#007bff',
        fontSize: '16px',
        margin: '5px 0',
    },
};

export default StudentLogin;
