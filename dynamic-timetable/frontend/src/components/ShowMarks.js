import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ShowMarks = () => {
  const { className } = useParams();
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch(`http://localhost:5000/students/fetch-student/${className}`);
        if (!response.ok) {
          throw new Error("Failed to fetch student data");
        }
        const data = await response.json();
        setStudents(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, [className]);

  if (loading) return <p style={styles.loading}>Loading...</p>;
  if (error) return <p style={styles.error}>{error}</p>;
  if (!students.length) return <p style={styles.noData}>No student data found</p>;

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Student Details for Class {className}</h2>
      {students.map((student) => (
        <div key={student._id} style={styles.card}>
          <p style={styles.name}><strong>Name:</strong> {student.name}</p>
          <p style={styles.email}><strong>Email:</strong> {student.email}</p>
          <h3 style={styles.marksHeading}>Marks:</h3>
          <ul style={styles.list}>
            {Object.entries(student.marks).map(([subject, score]) => (
              <li key={subject} style={styles.listItem}>
                {subject}: <span style={styles.score}>{score}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

// Inline styles
const styles = {
  container: {
    padding: '20px',
    maxWidth: '700px',
    margin: 'auto',
    backgroundColor: '#f9f9f9',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
  },
  heading: {
    color: '#333',
    marginBottom: '15px',
  },
  card: {
    backgroundColor: '#fff',
    padding: '15px',
    marginBottom: '15px',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    textAlign: 'left',
  },
  name: {
    fontSize: '16px',
    fontWeight: 'bold',
    marginBottom: '5px',
  },
  email: {
    fontSize: '14px',
    color: '#666',
    marginBottom: '10px',
  },
  marksHeading: {
    color: '#007bff',
    marginBottom: '5px',
  },
  list: {
    listStyle: 'none',
    padding: '0',
  },
  listItem: {
    padding: '8px',
    borderBottom: '1px solid #ddd',
    fontSize: '14px',
  },
  score: {
    fontWeight: 'bold',
    color: '#28a745',
  },
  loading: {
    color: '#007bff',
    fontSize: '16px',
    textAlign: 'center',
  },
  error: {
    color: 'red',
    fontSize: '16px',
    textAlign: 'center',
  },
  noData: {
    color: '#888',
    fontSize: '16px',
    textAlign: 'center',
  },
};

export default ShowMarks;
