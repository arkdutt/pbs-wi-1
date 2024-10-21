import React from 'react';
import './FloatingButton.css';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation

function FloatingButton() {
    const navigate = useNavigate(); // Initialize navigate hook

    const handleClick = (e) => {
        e.preventDefault(); // Prevent default anchor behavior
        navigate('/scanqr'); // Navigate to ScanQRPage
    };

    return (
        <a href="#" className="floating-btn material-icons" onClick={handleClick}>
            center_focus_strong
        </a>
    );
}

export default FloatingButton;