import React from 'react';
import './FloatingButton.css';
import { useNavigate } from 'react-router-dom';

function FloatingButton({ handleClick }) {
    const navigate = useNavigate();

    const handleButtonClick = (e) => {
        e.preventDefault();
        handleClick();
    };

    return (
        <a href="#" className="floating-btn material-icons" onClick={handleButtonClick}>
            center_focus_strong
        </a>
    );
}
export default FloatingButton;