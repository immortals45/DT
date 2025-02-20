import React, { useEffect, useState } from "react";
import axios from "axios";

const FacultyAssignmentList = () => {
    const [assignments, setAssignments] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchAssignments = async () => {
            try {
                const response = await axios.get("http://localhost:5000/assignments", {
                    headers: { Authorization: localStorage.getItem("token") },
                });
                setAssignments(response.data);
            } catch (error) {
                setError("Failed to fetch assignments");
            }
        };

        fetchAssignments();
    }, []);

    return (
        <div style={styles.container}>
            <h2 style={styles.heading}>📚 Published Assignments</h2>
            {error && <p style={styles.error}>{error}</p>}
            {assignments.length === 0 ? (
                <p style={styles.noAssignments}>No assignments published yet.</p>
            ) : (
                <ul style={styles.list}>
                    {assignments.map((assignment) => (
                        <li key={assignment._id} style={styles.assignmentCard}>
                            <h3 style={styles.subject}>{assignment.subject}</h3>
                            <p><strong>📖 Class:</strong> {assignment.className}</p>
                            <p><strong>👨‍🏫 Faculty:</strong> {assignment.facultyName}</p>
                            <p><strong>📝 Description:</strong> {assignment.description}</p>
                            <p><strong>⏳ Last Date:</strong> {new Date(assignment.lastDate).toDateString()}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

// Internal styles
const styles = {
    container: {
        padding: "20px",
        maxWidth: "700px",
        margin: "auto",
        backgroundColor: "#f9f9f9",
        borderRadius: "10px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        textAlign: "center",
    },
    heading: {
        color: "#333",
        marginBottom: "15px",
    },
    error: {
        color: "red",
        fontWeight: "bold",
    },
    noAssignments: {
        fontSize: "16px",
        fontStyle: "italic",
        color: "#666",
    },
    list: {
        listStyleType: "none",
        padding: 0,
    },
    assignmentCard: {
        border: "1px solid #ddd",
        padding: "15px",
        margin: "10px 0",
        borderRadius: "8px",
        backgroundColor: "#fff",
        textAlign: "left",
        transition: "transform 0.2s ease-in-out",
    },
    assignmentCardHover: {
        transform: "scale(1.02)",
    },
    subject: {
        color: "#007bff",
        marginBottom: "5px",
    },
};

export default FacultyAssignmentList;
