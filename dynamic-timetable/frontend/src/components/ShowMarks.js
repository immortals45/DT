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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!students.length) return <p>No student data found</p>;

  return (
    <div>
      <h2>Student Details for Class {className}</h2>
      {students.map((student) => (
        <div key={student._id}>
          <p><strong>Name:</strong> {student.name}</p>
          <p><strong>Email:</strong> {student.email}</p>
          <h3>Marks:</h3>
          <ul>
            {Object.entries(student.marks).map(([subject, score]) => (
              <li key={subject}>{subject}: {score}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default ShowMarks;
