import React from 'react';
import './BackButton.css';
import back_icon from '../assets/icons/back_icon_24px.png';

function BackButton({ handleClick }) {
    
    const handleButtonClick = (e) => {
        e.preventDefault();
        handleClick();
    };

    return (
        <button className="back-btn" onClick={handleButtonClick}>
            <img src={back_icon} alt='Back Icon' className='back-icon'/> 
        </button>
    );
}
export default BackButton;