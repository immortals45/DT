import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../api';

const Login = ({ user, setUser, setIsLoggedIn }) => {
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
            const { token } = await login(credentials);
            localStorage.setItem('token', token);
            setUser({ username: credentials.username, token });
            setIsLoggedIn(true);
        } catch (error) {
            console.error(error);
            setError(error.response?.data?.message || 'Login failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={styles.container}>
            {!user.token && (
                <form onSubmit={handleSubmit} style={styles.form}>
                    <h2 style={styles.heading}>Login</h2>
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

            {user && user.token && (
                <div style={styles.optionsContainer}>
                    <h2 style={styles.heading}>Options</h2>
                    <div style={styles.optionGrid}>
                        <div style={styles.optionCard}>
                            <h3>Select a Class:</h3>
                            <Link to="/timetable/A" style={styles.link}>Class A</Link>
                            <Link to="/timetable/B" style={styles.link}>Class B</Link>
                        </div>
                        <div style={styles.optionCard}>
                            <h3>View MidMarks:</h3>
                            <Link to="/show-marks/A" style={styles.link}>Class A</Link>
                            <Link to="/show-marks/B" style={styles.link}>Class B</Link>
                        </div>
                        <div style={styles.optionCard}>
                            <h3>Mid Marks Upload:</h3>
                            <Link to="/mid-marks" style={styles.link}>Upload Mid Marks</Link>
                        </div>
                        <div style={styles.optionCard}>
                            <h3>Assignments:</h3>
                            <Link to="/publish-assignment" style={styles.link}>Publish Assignment</Link>
                        </div>
                        <div style={styles.optionCard}>
                            <h3>View Published Assignments:</h3>
                            <Link to="/faculty-assignments" style={styles.link}>View Assignments</Link>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #2196F3, #64B5F6)',
        padding: '20px',
    },
    form: {
        backgroundColor: '#ffffff',
        padding: '25px',
        borderRadius: '10px',
        boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.2)',
        display: 'flex',
        flexDirection: 'column',
        gap: '15px',
        width: '350px',
        textAlign: 'center',
    },
    heading: {
        marginBottom: '15px',
        color: '#0D47A1',
        fontSize: '22px',
    },
    input: {
        padding: '12px',
        borderRadius: '5px',
        border: '1px solid #64B5F6',
        fontSize: '16px',
        outline: 'none',
    },
    button: {
        padding: '12px',
        borderRadius: '5px',
        border: 'none',
        background: 'linear-gradient(90deg, #1E88E5, #1976D2)',
        color: '#fff',
        cursor: 'pointer',
        fontSize: '16px',
        transition: 'background 0.3s ease',
        ':hover': {
            background: 'linear-gradient(90deg, #1565C0, #0D47A1)'
        }
    },
    link: {
        display: 'block',
        textDecoration: 'none',
        color: '#fff',
        fontSize: '16px',
        margin: '8px 0',
        transition: 'color 0.3s ease',
        ':hover': {
            color: '#FFEB3B'
        }
    },
    optionsContainer: {
        backgroundColor: '#ffffff',
        padding: '20px',
        borderRadius: '10px',
        boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.2)',
        width: '500px',
        marginTop: '20px',
        textAlign: 'center',
    },
    optionGrid: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '20px',
    },
    optionCard: {
        background: 'linear-gradient(135deg, #64b5f6, #42a5f5, #1e88e5)',
        padding: '20px',
        borderRadius: '12px',
        color: '#fff',
        fontWeight: 'bold',
        boxShadow: '2px 4px 10px rgba(0, 0, 0, 0.2)',
    }
};

export default Login;
