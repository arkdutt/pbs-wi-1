// import React, { useState } from 'react';
// import './App.css';
// import MindARViewer from './mindar-viewer';
// import MindARThreeViewer from './mindar-three-viewer';

// function App() {
//   const [started, setStarted] = useState(null);

//   return (
    
//     <div className="App">
//       <h1>Example React component with <a href="https://github.com/hiukim/mind-ar-js" target="_blank">MindAR</a></h1>

//       <div className="control-buttons">
//         {started === null && <button onClick={() => {setStarted('aframe')}}>Start AFRAME version</button>}
//         {started === null && <button onClick={() => {setStarted('three')}}>Start ThreeJS version</button>}
//         {started !== null && <button onClick={() => {setStarted(null)}}>Stop</button>}
//       </div>

//       {started === 'aframe' && (
//         <div className="container">
//           <MindARViewer/>
//           <video></video>
//         </div>
//       )}

//       {started === 'three' && (
//         <div className="container">
//           <MindARThreeViewer />
//         </div>
//       )}
//     </div>
//   );
// }

// export default App;
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

function App() {
  const [started, setStarted] = React.useState(false);

  const handleStart = () => {
    setStarted(true);
  };

  const handleStop = () => {
    setStarted(false);
  };

  return (
    <div className="App">
      {!started ? (
        <>
          <Header />
          <Location />
          <PopularPlaces />
          <NearPlaces />
          <Nav />
          <FloatingButton handleClick={handleStart} />
        </>
      ) : (
        <div className="container">
          <MindARViewer />
          <button className="stop-button" onClick={handleStop}>
            Stop AR
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
