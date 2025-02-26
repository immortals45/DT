import React, { useEffect, useState } from "react";
import axios from "axios";

const ViewMidMarks = ({ student }) => {
    const [marks, setMarks] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchMarks = async () => {
            try {
                console.log(student);
                const response = await axios.get(`http://localhost:5000/students/fetch-marks/${student.studentId}`);
                console.log(response.data);
                setMarks(response.data);
            } catch (err) {
                setError("Failed to fetch marks. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        fetchMarks();
    }, [student]);

    if (loading) return <p className="loading">Loading...</p>;
    if (error) return <p className="error">{error}</p>;

    return (
        <div style={styles.container}>
            <h2 style={styles.heading}>{student.username}'s Mid-Sem Marks</h2>
            {marks ? (
                <table style={styles.table}>
                    <thead>
                        <tr>
                            <th style={styles.th}>Subject</th>
                            <th style={styles.th}>Marks</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Object.entries(marks).map(([subject, mark]) => (
                            <tr key={subject} style={styles.row}>
                                <td style={styles.td}>{subject}</td>
                                <td style={styles.td}>{mark}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p style={styles.noMarks}>No marks available.</p>
            )}
        </div>
    );
};

const styles = {
    container: {
        maxWidth: "500px",
        margin: "20px auto",
        padding: "20px",
        borderRadius: "10px",
        backgroundColor: "#f9f9f9",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        textAlign: "center",
    },
    heading: {
        marginBottom: "15px",
        color: "#333",
    },
    table: {
        width: "100%",
        borderCollapse: "collapse",
        backgroundColor: "#fff",
    },
    th: {
        backgroundColor: "#007bff",
        color: "#fff",
        padding: "10px",
        textAlign: "left",
    },
    td: {
        padding: "10px",
        borderBottom: "1px solid #ddd",
        textAlign: "left",
    },
    row: {
        backgroundColor: "#f8f9fa",
    },
    noMarks: {
        color: "#ff0000",
        fontWeight: "bold",
    },
    error: {
        color: "#d9534f",
        fontWeight: "bold",
    },
    loading: {
        color: "#007bff",
        fontWeight: "bold",
    },
};

export default ViewMidMarks;
