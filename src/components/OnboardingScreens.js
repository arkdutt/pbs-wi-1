import './OnboardingScreens.css';
import React, {useRef} from 'react';
import UserOnboarding from 'react-user-onboarding';
import 'react-user-onboarding/dist/index.css';

const OnboardingScreens = ({
    isVisible, 
    handleClose, 
    locationRef, 
    arButtonRef,
}) => {

    const onboarding_flow = [
        {
            component: 'modal',
            intro: true,
            className: 'welcome-modal',
            children: (
                <div className="modal-content">
                    <h2>Welcome to PBS Wisconsin's AR experience!</h2>
                    <p>Let's explore Wisconsin landmarks in augmented reality!</p>
                </div>
            )
        },
        {
            component: 'tooltip',
            ref: locationRef,
            children: (
                <div>
                    <p>Click & Allow Location Access to automatically find places near you!</p>
                </div>
            )
        },
        {
            component: 'tooltip',
            ref: arButtonRef,
            children: (
                <div>
                    <h2>Augmented Reality</h2>
                    <p>Click here to start the augmented reality experience</p>
                </div>
            )
        }
    ];

    return (
        <UserOnboarding
            story={onboarding_flow}
            isVisible={isVisible}
            onClose={handleClose}
        />
    );
};

export default OnboardingScreens;