import React from 'react';
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

function App() {
  const [currState, setState] = React.useState('home');

  const arStart = () => {
    setState('ar');
  };

  const goHome = () => {
    setState('home');
  };

  const startOnboarding = () => {
    setState('onboarding');
  }

  return (
    <div className="App">
      {state == 'home' ? (
        <>
          <Header />
          <Location />
          <PopularPlaces />
          <NearPlaces />
          <Nav />
          <FloatingButton handleClick={arStart} />
        </>
      ) : state == 'ar' ? (
        <div className="camera-container">
          <BackButton handleClick={goHome} />
          <MindARViewer />
        </div>
      ) : (
        <p>Temp State</p>
      )}
    </div>
  );
}

export default App;
