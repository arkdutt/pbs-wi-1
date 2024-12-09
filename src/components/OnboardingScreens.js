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
          <h2>Welcome to <br /><span style={{ color: 'var(--primary)', fontFamily: 'PBSSans-Bold' }}>PBS Wisconsin's</span><br/>AR experience!</h2>
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
            Click & Allow <span style={{ color: 'var(--primary)', fontFamily: 'PBSSans-Bold' }}>Location Access</span> to automatically find places near you!
            </p>
        </div>
      ),
      placement: 'bottom',
    },
    {
        target: containersRef.current,
        content: (
            <div className='containers-content'>
                <p>Click on a <span style={{ color: 'var(--primary)', fontFamily: 'PBSSans-Bold' }}>landmark</span> to learn more about it!</p>
            </div>
        ),
        placement: 'top',
    },
    {
      target: arButtonRef.current,
      content: (
        <div className='arbutton-content'>
          <p>Click here to start the <br /><span style={{ color: 'var(--primary)', fontFamily: 'PBSSans-Bold' }}>Augmented Reality</span> experience!</p>
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
                <span style={{ color: 'var(--primary)', fontFamily: 'PBSSans-Bold' }}><h2>Just Point!</h2> </span>
                <img src = {pointPhoneImg} alt='Point Phone' style={{ width: '150px'}}/>
                <p style={{ marginLeft: '15px', marginRight: '15px'}}>Simply pull your phone out and <span style={{ color: 'var(--primary)', fontFamily: 'PBSSans-Bold' }}>point it</span> at one of our supported sites and enjoy the experience!</p>
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
            width: '360px',
        },
        tooltipContainer: {
            fontFamily: 'PBSSans, sans-serif',
        },
        tooltipTitle: {
            fontFamily: 'PBSSans, sans-serif',
        },
        tooltipContent: {
            fontFamily: 'PBSSans, sans-serif',
            fontSize: '18px',
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