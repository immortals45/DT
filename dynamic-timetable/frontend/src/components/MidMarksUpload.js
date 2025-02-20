import React, { useState, useEffect } from "react";

const MidMarksUpload = () => {
    const [students, setStudents] = useState([]); // All students list
    const [selectedStudent, setSelectedStudent] = useState(null); // Selected student
    const [marks, setMarks] = useState({
        AA: "",
        BB: "",
        CC: "",
        DD: "",
    }); // Subject-wise marks
    const [message, setMessage] = useState("");

    // Fetch students list on component mount
    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const response = await fetch("http://localhost:5000/students/display"); // Adjust if the URL is different
                if (response.ok) {
                    const data = await response.json();
                    setStudents(data);
                } else {
                    console.error("Error fetching students:", response.status);
                }
            } catch (error) {
                console.error("Error fetching students:", error);
            }
        };
        fetchStudents();
    }, []);

    const handleStudentSelection = (e) => {
        setSelectedStudent(e.target.value);
        setMarks({
            AA: "",
            BB: "",
            CC: "",
            DD: "",
        }); // Reset marks when a new student is selected
    };

    const handleMarksChange = (subject, value) => {
        setMarks((prevMarks) => ({
            ...prevMarks,
            [subject]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!selectedStudent) {
            setMessage("Please select a student.");
            return;
        }

        const payload = {
            username: selectedStudent,
            marks,
        };

        try {
            const response = await fetch("http://localhost:5000/students/update-marks", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            const data = await response.json();
            setMessage(response.ok ? `Marks updated successfully for ${selectedStudent}!` : data.message);
        } catch (error) {
            setMessage("Error updating marks.");
        }
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.heading}>Mid Marks Upload</h1>

            {/* Student Selection Dropdown */}
            <div style={styles.selectionContainer}>
                <label htmlFor="student" style={styles.label}>Select Student:</label>
                <select id="student" value={selectedStudent || ""} onChange={handleStudentSelection} style={styles.select}>
                    <option value="" disabled>
                        -- Select a Student --
                    </option>
                    {students.map((student, index) => (
                        <option key={index} value={student.name}>
                            {student.name}
                        </option>
                    ))}
                </select>
            </div>

            {/* Marks Input Form */}
            {selectedStudent && (
                <form onSubmit={handleSubmit} style={styles.form}>
                    <h3 style={styles.subHeading}>Enter Marks for {selectedStudent}:</h3>
                    {Object.keys(marks).map((subject) => (
                        <div key={subject} style={styles.inputContainer}>
                            <label htmlFor={subject} style={styles.label}>{subject}:</label>
                            <input
                                id={subject}
                                type="number"
                                placeholder={`Enter marks for ${subject}`}
                                value={marks[subject]}
                                onChange={(e) => handleMarksChange(subject, e.target.value)}
                                required
                                style={styles.input}
                            />
                        </div>
                    ))}
                    <button type="submit" style={styles.button}>Submit Marks</button>
                </form>
            )}

            {message && <p style={styles.message}>{message}</p>}
        </div>
    );
};

// Inline styles
const styles = {
    container: {
        padding: "20px",
        maxWidth: "500px",
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
    selectionContainer: {
        marginBottom: "15px",
    },
    label: {
        fontSize: "16px",
        fontWeight: "bold",
        display: "block",
        marginBottom: "5px",
    },
    select: {
        width: "100%",
        padding: "10px",
        borderRadius: "5px",
        border: "1px solid #ddd",
        fontSize: "14px",
    },
    form: {
        marginTop: "20px",
        textAlign: "left",
    },
    subHeading: {
        color: "#007bff",
        marginBottom: "10px",
        textAlign: "center",
    },
    inputContainer: {
        marginBottom: "10px",
    },
    input: {
        width: "calc(100% - 22px)",
        padding: "8px",
        borderRadius: "5px",
        border: "1px solid #ddd",
        fontSize: "14px",
    },
    button: {
        width: "100%",
        padding: "10px",
        backgroundColor: "#28a745",
        color: "white",
        border: "none",
        borderRadius: "5px",
        fontSize: "16px",
        cursor: "pointer",
        marginTop: "10px",
    },
    buttonHover: {
        backgroundColor: "#218838",
    },
    message: {
        color: "green",
        marginTop: "20px",
        fontSize: "16px",
        fontWeight: "bold",
    },
};

export default MidMarksUpload;
