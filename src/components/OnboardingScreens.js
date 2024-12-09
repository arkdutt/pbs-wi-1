import React from 'react';
import Joyride from 'react-joyride';
import '../styles/global.css';
import pointPhoneImg from '../assets/icons/point_phone.jpg';

const OnboardingScreens = ({
  isVisible,
  handleClose,
  locationRef,
  containersRef,
  arButtonRef,
}) => {
  const steps = [
    {
      target: 'body',
      content: (
        <div className="welcome-content">
          <h2>Welcome to PBS Wisconsin's AR experience!</h2>
          <p>Let's explore Wisconsin landmarks in augmented reality!</p>
        </div>
      ),
      placement: 'center',
    },
    {
      target: locationRef.current,
      content: (
        <div className='location-content'>
            <p>
            Click & Allow Location Access to automatically find places near you!
            </p>
        </div>
      ),
      placement: 'bottom',
    },
    {
        target: containersRef.current,
        content: (
            <div className='containers-content'>
                <p>Click on a place to learn more about it!</p>
            </div>
        ),
        placement: 'top',
    },
    {
      target: arButtonRef.current,
      content: (
        <div className='arbutton-content'>
          <p>Click here to start the augmented reality experience</p>
        </div>
      ),
      placement: 'top',
      styles: {
        spotlight: {
            borderRadius: '50%',
        }
      }
    },
    {
        target: 'body',
        content: (
            <div className='point-phone-content'>
                <h2>Just Point!</h2>
                <img src = {pointPhoneImg} alt='Point Phone' style={{ width: '150px'}}/>
                <p style={{ marginLeft: '15px', marginRight: '15px'}}>Simply pull your phone out and point it at one of our supported sites and enjoy the experience!</p>
            </div>
        ),
        placement: 'center',
        locale: {
            last: 'Got it!',
        }
    }
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
      spotlightClicks={false}
      styles={{
        options: {
            zIndex: 10000,
            backgroundColor: '#ffffff',
            primaryColor: 'var(--primary)',
        },
        tooltipContainer: {
            fontFamily: 'PBSSans, sans-serif',
        },
        tooltipTitle: {
            fontFamily: 'PBSSans, sans-serif',
        },
        tooltipContent: {
            fontFamily: 'PBSSans, sans-serif',
        },
        buttonNext: {
            fontFamily: 'PBSSans, sans-serif',
        },
        buttonBack: {
            fontFamily: 'PBSSans, sans-serif',
        },
      }}
    />
  );
};

export default OnboardingScreens;