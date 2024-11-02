import React, { useState } from 'react';
import {  Link } from 'react-router-dom';
import { login } from '../api';

const Login = ({ user, setUser, setIsLoggedIn }) => {
    const [credentials, setCredentials] = useState({ username: '', password: '' });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const { token } = await login(credentials);
            localStorage.setItem('token', token); // Save the token to local storage

            setUser({ username: credentials.username, token }); // Set user object with username and token
            setIsLoggedIn(true); // Update login status in the parent component
            // Redirect to home or another protected route if needed
        } catch (error) {
            console.error(error);
            setError(error.response?.data?.message || 'Login failed');
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
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
                <button type="submit">Login</button>
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </form>

            {/* Display Class Links if the user is logged in (user has a token) */}
            {user && user.token && (
                <div>
                    <h2>Select a Class:</h2>
                    <Link to="/timetable/A">Class A</Link>
                    <br />
                    <Link to="/timetable/B">Class B</Link>
                </div>
            )}
        </div>
    );
};

export default Login;
