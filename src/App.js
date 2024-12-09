import React, { useState, useRef, useEffect} from 'react';
import './App.css';
import './styles/global.css';
import Header from './components/Header';
import Location from './components/Location';
import PopularPlaces from './components/PopularPlaces';
import NearPlaces from './components/NearPlaces';
import Nav from './components/Nav';
import FloatingButton from './components/FloatingButton';
import MindARViewer from './components/MindARViewer'; // Ensure this is correctly imported
import BackButton from './components/BackButton';
import OnboardingButton from './components/OnboardingButton';
import OnboardingScreens from './components/OnboardingScreens';

function App() {
  const [currState, setState] = React.useState('home');
  const [showOnboarding, setShowOnboarding] = useState(false);
  
  const locationRef = useRef();
  const containersRef = useRef();
  const arButtonRef = useRef();

  // Functions to handle state changes
  const arStart = () => {
    setState('ar');
  };

  const goHome = () => {
    setState('home');
  };

  const startOnboarding = () => {
    setShowOnboarding(true);
  }

  const handleOnboardingClose = () => {
    setShowOnboarding(false);
  }

  // Disable scrolling when in 'ar' state
  useEffect(() => {
    if (currState === 'ar') {
      // Disable scrolling
      document.body.style.overflow = 'hidden';
    } else {
      // Enable scrolling
      document.body.style.overflow = 'auto';
    }
    // Cleanup function to reset overflow when the component unmounts
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [currState]);

  return (
    <div className="App">
      {currState === 'home' ? (
        <>
          <Header />
          <OnboardingButton handleClick={startOnboarding} />
          <Location ref={locationRef} />
          <div ref={containersRef}>
            <PopularPlaces />
            <NearPlaces />
          </div>
          <Nav />
          <FloatingButton ref={arButtonRef} handleClick={arStart} />
          <OnboardingScreens 
            isVisible={showOnboarding}
            handleClose={handleOnboardingClose}
            locationRef={locationRef}
            arButtonRef={arButtonRef}
            containersRef={containersRef}
          /> 
        </>
      ) : currState === 'ar' ? (
        <div className="camera-container">
          <BackButton handleClick={goHome} />
          <MindARViewer />
        </div>
      ): null}
    </div>
  );
}

export default App;
