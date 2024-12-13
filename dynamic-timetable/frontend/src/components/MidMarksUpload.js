import React, { useState, useEffect } from 'react';

const MidMarksUpload = () => {
    const [students, setStudents] = useState([]); // All students list
    const [selectedStudent, setSelectedStudent] = useState(null); // Selected student
    const [marks, setMarks] = useState({
        AA: '',
        BB: '',
        CC: '',
        DD: '',
    }); // Subject-wise marks
    const [message, setMessage] = useState('');

    // Fetch students list on component mount
    useEffect(() => {
        // API call to fetch students
        const fetchStudents = async () => {
            try {
                const response = await fetch('http://localhost:5000/students/display'); // Adjust if the URL is different
                if (response.ok) {
                    const data = await response.json();
                    setStudents(data);
                } else {
                    console.error('Error fetching students:', response.status);
                }
            } catch (error) {
                console.error('Error fetching students:', error);
            }
        };
        fetchStudents();
    }, []);

    const handleStudentSelection = (e) => {
        setSelectedStudent(e.target.value);
        setMarks({
            AA: '',
            BB: '',
            CC: '',
            DD: '',
        }); // Reset marks when a new student is selected
    };

    const handleMarksChange = (subject, value) => {
        setMarks((prevMarks) => ({
            ...prevMarks,
            [subject]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!selectedStudent) {
            setMessage('Please select a student.');
            return;
        }

        // Example payload to be sent to the backend
        const payload = {
            student: selectedStudent,
            marks,
        };

        console.log('Submitted Data:', payload);
        setMessage(`Marks submitted successfully for ${selectedStudent}!`);
    };

    return (
        <div>
            <h1>Mid Marks Upload</h1>

            {/* Student Selection Dropdown */}
            <div>
                <label htmlFor="student">Select Student:</label>
                <select id="student" value={selectedStudent || ''} onChange={handleStudentSelection}>
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
                <form onSubmit={handleSubmit} style={{ marginTop: '20px' }}>
                    <h3>Enter Marks for {selectedStudent}:</h3>
                    {Object.keys(marks).map((subject) => (
                        <div key={subject} style={{ marginBottom: '10px' }}>
                            <label htmlFor={subject}>{subject}:</label>
                            <input
                                id={subject}
                                type="number"
                                placeholder={`Enter marks for ${subject}`}
                                value={marks[subject]}
                                onChange={(e) => handleMarksChange(subject, e.target.value)}
                                required
                            />
                        </div>
                    ))}
                    <button type="submit">Submit Marks</button>
                </form>
            )}

            {message && <p style={{ color: 'green', marginTop: '20px' }}>{message}</p>}
        </div>
    );
};

export default MidMarksUpload;
