import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../api';

const Login = ({ user, setUser, setIsLoggedIn }) => {
    const [credentials, setCredentials] = useState({ username: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false); // Loading state
    const navigate = useNavigate();

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true); // Show loading indicator
        try {
            const { token } = await login(credentials);
            localStorage.setItem('token', token);
            setUser({ username: credentials.username, token });
            setIsLoggedIn(true);
            //navigate('/'); // Redirect to home or another page
        } catch (error) {
            console.error(error);
            setError(error.response?.data?.message || 'Login failed');
        } finally {
            setLoading(false); // Hide loading indicator
        }
    };

    return (
        <div>
            {!user.token&&(<form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={credentials.username}
                    onChange={handleChange}
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={credentials.password}
                    onChange={handleChange}
                    required
                />
                <button type="submit" disabled={loading}>
                    {loading ? 'Logging in...' : 'Login'}
                </button>
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </form>)}

            {/* Show options after successful login */}
            {user && user.token && (
                <div>
                    <h2>Options:</h2>
                    <div>
                        <h3>Select a Class:</h3>
                        <Link to="/timetable/A">Class A</Link>
                        <br />
                        <Link to="/timetable/B">Class B</Link>
                    </div>
                    <div>
                        <h3>View MidMarks</h3>
                        <Link to="/show-marks/A">ClassA</Link>
                        <br></br>
                        <Link to="/show-marks/B">ClassB</Link>
                    </div>
                    <div>
                        <h3>Mid Marks Upload:</h3>
                        <Link to="/mid-marks">Upload Mid Marks</Link>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Login;
