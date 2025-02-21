import React, { useEffect, useState } from "react";
import axios from "axios";

const Home = () => {
    const [classATimetable, setClassATimetable] = useState([]);
    const [classBTimetable, setClassBTimetable] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTimetables = async () => {
            try {
                const response = await axios.get("http://localhost:5000/timetable/static");
                setClassATimetable(response.data.classA);
                setClassBTimetable(response.data.classB);
            } catch (error) {
                console.error("Error fetching timetables:", error);
                setError("Error fetching timetables");
            } finally {
                setLoading(false);
            }
        };

        fetchTimetables();
    }, []);

    if (loading) return <div style={styles.loading}>Loading timetables...</div>;
    if (error) return <div style={styles.error}>{error}</div>;

    return (
        <div style={styles.container}>
            <h2 style={styles.heading}>📅 Dynamic Timetable Application</h2>
            <p style={styles.subtitle}>Login to view & manage schedules efficiently.</p>

            <h3 style={styles.sectionTitle}>📖 Timetables</h3>

            <div style={styles.timetableContainer}>
                <div style={styles.timetable}>
                    <h4 style={styles.classTitle}>🏫 Class A Timetable</h4>
                    <ul style={styles.list}>
                        {classATimetable.length > 0 ? (
                            classATimetable[0].periods.map((slot) => (
                                <li key={slot.time} style={slot.status === "unoccupied" ? styles.freeSlot : styles.occupiedSlot}>
                                    <span style={styles.time}>{slot.time}:</span> 
                                    <span style={styles.faculty}>{slot.faculty || "Free"}</span>
                                </li>
                            ))
                        ) : (
                            <li style={styles.noTimetable}>No timetable available for Class A.</li>
                        )}
                    </ul>
                </div>

                <div style={styles.timetable}>
                    <h4 style={styles.classTitle}>🏫 Class B Timetable</h4>
                    <ul style={styles.list}>
                        {classBTimetable.length > 0 ? (
                            classBTimetable[0].periods.map((slot) => (
                                <li key={slot.time} style={slot.status === "unoccupied" ? styles.freeSlot : styles.occupiedSlot}>
                                    <span style={styles.time}>{slot.time}:</span> 
                                    <span style={styles.faculty}>{slot.faculty || "Free"}</span>
                                </li>
                            ))
                        ) : (
                            <li style={styles.noTimetable}>No timetable available for Class B.</li>
                        )}
                    </ul>
                </div>
            </div>

            <div style={styles.buttonContainer}>
                <a href="/login" style={styles.button}>👨‍🏫 Faculty Login</a>
                <a href="/student-login" style={styles.button}>🎓 Student Login</a>
            </div>
        </div>
    );
};

// Improved Internal Styles
const styles = {
    container: {
        padding: "40px",
        maxWidth: "900px",
        margin: "auto",
        background: "linear-gradient(135deg, #e3f2fd, #bbdefb)",
        borderRadius: "12px",
        boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.15)",
        textAlign: "center",
        fontFamily: "Arial, sans-serif",
    },
    heading: {
        color: "#2c3e50",
        marginBottom: "12px",
        fontSize: "26px",
        fontWeight: "bold",
    },
    subtitle: {
        color: "#555",
        fontSize: "16px",
        marginBottom: "25px",
    },
    sectionTitle: {
        color: "#007bff",
        marginBottom: "15px",
        fontSize: "20px",
        fontWeight: "bold",
    },
    timetableContainer: {
        display: "flex",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: "20px",
    },
    timetable: {
        flex: "1",
        minWidth: "400px",
        padding: "20px",
        backgroundColor: "#ffffff",
        borderRadius: "10px",
        boxShadow: "0px 3px 8px rgba(0, 0, 0, 0.15)",
        textAlign: "left",
    },
    classTitle: {
        color: "#444",
        borderBottom: "3px solid #007bff",
        paddingBottom: "8px",
        marginBottom: "12px",
        fontSize: "18px",
        fontWeight: "bold",
    },
    list: {
        listStyle: "none",
        padding: "0",
    },
    listItem: {
        padding: "12px",
        borderBottom: "1px solid #ddd",
        fontSize: "16px",
    },
    time: {
        fontWeight: "bold",
        color: "#555",
    },
    faculty: {
        fontWeight: "bold",
        marginLeft: "10px",
        color: "#34495e",
    },
    freeSlot: {
        backgroundColor: "#e0f7fa",
        padding: "10px",
        margin: "5px 0",
        borderRadius: "6px",
        fontSize: "16px",
    },
    occupiedSlot: {
        backgroundColor: "#ffebee",
        padding: "10px",
        margin: "5px 0",
        borderRadius: "6px",
        fontSize: "16px",
    },
    noTimetable: {
        textAlign: "center",
        color: "#666",
        padding: "10px",
        fontSize: "16px",
    },
    buttonContainer: {
        marginTop: "25px",
    },
    button: {
        display: "inline-block",
        padding: "12px 20px",
        margin: "8px",
        backgroundColor: "#007bff",
        color: "white",
        textDecoration: "none",
        borderRadius: "6px",
        fontSize: "16px",
        transition: "background 0.3s",
    },
    buttonHover: {
        backgroundColor: "#0056b3",
    },
    loading: {
        color: "#007bff",
        fontSize: "18px",
        textAlign: "center",
    },
    error: {
        color: "red",
        fontSize: "18px",
        textAlign: "center",
    },
};

export default Home;