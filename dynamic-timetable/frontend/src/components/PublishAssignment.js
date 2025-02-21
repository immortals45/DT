import React, { useState } from 'react';
import axios from 'axios';

const PublishAssignment = () => {
    const [assignment, setAssignment] = useState({
        subject: "",
        className: "",
        facultyName: "",
        description: "",
        lastDate: ""
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.post("http://localhost:5000/assignments", assignment, {
            headers: { Authorization: localStorage.getItem("token") }
        });
        console.log(localStorage.getItem("token"));
        alert("Assignment Published!");
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h2 style={styles.heading}>Publish Assignment</h2>
                <form onSubmit={handleSubmit} style={styles.form}>
                    <input 
                        type="text" 
                        placeholder="Subject" 
                        onChange={(e) => setAssignment({ ...assignment, subject: e.target.value })} 
                        required 
                        style={styles.input}
                    />
                    <select 
                        value={assignment.className} 
                        onChange={(e) => setAssignment({ ...assignment, className: e.target.value })} 
                        required 
                        style={styles.input}
                    >
                        <option value="" disabled>Select Class</option>
                        <option value="A">A</option>
                        <option value="B">B</option>
                    </select>
                    <input 
                        type="text" 
                        placeholder="Faculty Name" 
                        onChange={(e) => setAssignment({ ...assignment, facultyName: e.target.value })} 
                        required 
                        style={styles.input}
                    />
                    <textarea 
                        placeholder="Description" 
                        onChange={(e) => setAssignment({ ...assignment, description: e.target.value })} 
                        required 
                        style={styles.textarea}
                    />
                    <input 
                        type="date" 
                        onChange={(e) => setAssignment({ ...assignment, lastDate: e.target.value })} 
                        required 
                        style={styles.input}
                    />
                    <button type="submit" style={styles.button}>Publish</button>
                </form>
            </div>
        </div>
    );
};

// Inline styles
const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f4f4f4'
    },
    card: {
        background: 'white',
        padding: '20px',
        borderRadius: '10px',
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
        width: '400px',
        textAlign: 'center'
    },
    heading: {
        marginBottom: '15px',
        color: '#333'
    },
    form: {
        display: 'flex',
        flexDirection: 'column'
    },
    input: {
        width: '100%',
        padding: '10px',
        margin: '8px 0',
        border: '1px solid #ccc',
        borderRadius: '5px',
        fontSize: '16px'
    },
    textarea: {
        width: '100%',
        padding: '10px',
        margin: '8px 0',
        border: '1px solid #ccc',
        borderRadius: '5px',
        fontSize: '16px',
        height: '80px',
        resize: 'none'
    },
    button: {
        width: '100%',
        padding: '10px',
        backgroundColor: '#007bff',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        fontSize: '16px',
        cursor: 'pointer',
        marginTop: '10px',
        transition: 'background 0.3s'
    }
};

export default PublishAssignment;
