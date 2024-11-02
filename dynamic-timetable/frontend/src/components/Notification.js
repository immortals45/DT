import React from 'react';

const Notification = ({ message, onClose }) => {
    if (!message) return null; // Don't render if no message

    return (
        <div style={{ border: '1px solid red', padding: '10px', margin: '10px', backgroundColor: '#f8d7da', color: '#721c24' }}>
            <span>{message}</span>
            <button onClick={onClose} style={{ marginLeft: '10px' }}>Close</button>
        </div>
    );
};

export default Notification;
