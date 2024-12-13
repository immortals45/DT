import React, { useState } from 'react';

const StudentLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('https://your-backend-api.com/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok && data.success) {
                setIsLoggedIn(true);
            } else {
                alert(data.message || 'Invalid email or password. Please try again.');
            }
        } catch (error) {
            console.error('Error during login:', error);
            alert('Something went wrong. Please try again later.');
        }
    };

    return (
        <div style={{ maxWidth: '400px', margin: '50px auto', textAlign: 'center' }}>
            <h2>Student Login</h2>
            {!isLoggedIn ? (
                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '15px' }}>
                        <label htmlFor="email" style={{ display: 'block', marginBottom: '5px' }}>Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
                        />
                    </div>
                    <div style={{ marginBottom: '15px' }}>
                        <label htmlFor="password" style={{ display: 'block', marginBottom: '5px' }}>Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
                        />
                    </div>
                    <button type="submit" style={{ padding: '10px 20px', backgroundColor: '#007BFF', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                        Login
                    </button>
                </form>
            ) : (
                <div>
                    <h3>Welcome, Student!</h3>
                    <ul style={{ listStyleType: 'none', padding: 0 }}>
                        <li style={{ margin: '10px 0' }}><a href="/view-mid-marks">View Mid-Marks</a></li>
                        <li style={{ margin: '10px 0' }}><a href="/view-attendance">View Attendance</a></li>
                        <li style={{ margin: '10px 0' }}><a href="/view-assignments">View Assignments</a></li>
                    </ul>
                </div>
            )}
        </div>
    );
};

export default StudentLogin;
