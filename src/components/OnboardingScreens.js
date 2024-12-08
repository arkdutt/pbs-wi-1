import React from 'react';
import Joyride from 'react-joyride';

const OnboardingScreens = ({
  isVisible,
  handleClose,
  locationRef,
  arButtonRef,
}) => {
  const steps = [
    {
      target: '.welcome-modal',
      content: (
        <div className="modal-content">
          <h2>Welcome to PBS Wisconsin's AR experience!</h2>
          <p>Let's explore Wisconsin landmarks in augmented reality!</p>
        </div>
      ),
      placement: 'center',
    },
    {
      target: locationRef.current,
      content: (
        <p>
          Click & Allow Location Access to automatically find places near you!
        </p>
      ),
      placement: 'bottom',
    },
    {
      target: arButtonRef.current,
      content: (
        <div>
          <h2>Augmented Reality</h2>
          <p>Click here to start the augmented reality experience</p>
        </div>
      ),
      placement: 'top',
    },
  ];

  return (
    <Joyride
      steps={steps}
      run={isVisible}
      continuous
      showSkipButton
      showProgress
      callback={(data) => {
        const { status, type } = data;

        if (['finished', 'skipped'].includes(status)) {
          handleClose();
        }
      }}
    />
  );
};

export default OnboardingScreens;