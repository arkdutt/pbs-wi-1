import React from 'react';
import './OnboardingButton.css';

function OnboardingButton({ handleClick }) {
    const handleButtonClick = (e) => {
        e.preventDefault();
        handleClick();
    };

    return (
        <button className="onboarding-btn material-icons" onClick={handleButtonClick}>
            question_mark
        </button>
    );
}
export default OnboardingButton;