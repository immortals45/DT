import axios from 'axios';

const API_URL = 'http://localhost:5000'; // Your backend URL

// Login function
export const login = async (credentials) => {
    const response = await axios.post(`${API_URL}/auth/login`, credentials);
    return response.data; // Return user data
};
export const studentLogin = async (credentials) => {
    const response = await axios.post(`${API_URL}/auth/student-login`, credentials);
    return response.data; // Return student data
};

// Get timetable for a specific class

export const getTimetable = async (className) => {
    const response = await axios.get(`${API_URL}/timetable/${className}`);
    return response.data;
};

// Assign a class to a faculty member
export const assignClass = async (className, time, faculty) => {
    const response = await axios.post(`${API_URL}/timetable/assign-faculty`, {
        className,
        time,
        faculty,
    });
    return response.data;
};

// Cancel a class for a faculty member
export const cancelClass = async (className, time, faculty) => {
    const response = await axios.post(`${API_URL}/timetable/cancel-class`, {
        className,
        time,
        faculty,
    });
    return response.data;
};