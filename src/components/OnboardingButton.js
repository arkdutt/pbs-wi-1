import React from 'react';
import './OnboardingButton.css';

function OnboardingButton({ handleClick }) {
    const handleButtonClick = (e) => {
        e.preventDefault();
        handleClick();
    };

    return (
        <a href="#" className="onboarding-btn material-icons" onClick={handleButtonClick}>
            question_mark
        </a>
    );
}
export default OnboardingButton;