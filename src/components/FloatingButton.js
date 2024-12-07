// import React from 'react';
// import './FloatingButton.css';
// import { useNavigate } from 'react-router-dom';

// function FloatingButton({ handleClick }) {
//     const navigate = useNavigate();

//     const handleButtonClick = (e) => {
//         e.preventDefault();
//         handleClick();
//     };

//     return (
//         <a href="#" className="floating-btn material-icons" onClick={handleButtonClick}>
//             center_focus_strong
//         </a>
//     );
// }
// export default FloatingButton;

import React, { forwardRef } from 'react';
import './FloatingButton.css';

const FloatingButton = forwardRef(({ handleClick }, ref) => {
    const handleButtonClick = (e) => {
        e.preventDefault();
        handleClick();
    };

    return (
        <button 
            ref={ref} 
            href="#" 
            className="floating-btn material-icons" 
            onClick={handleButtonClick}
        >
                center_focus_strong
        </button>
    );
});

export default FloatingButton;