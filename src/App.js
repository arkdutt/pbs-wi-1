import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import necessary components from react-router-dom
import Header from './components/Header';
import Location from './components/Location';
import PopularPlaces from './components/PopularPlaces';
import NearPlaces from './components/NearPlaces';
import Nav from './components/Nav';
import FloatingButton from './components/FloatingButton';
import ScanQRPage from './components/ScanQRPage'; // Import ScanQRPage
import ARScene from './components/ARScene'; // Import the ARScene component



function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    {/* Main Page Route */}
                    <Route 
                        path="/" 
                        element={
                            <>
                                <Header />
                                <Location />
                                <PopularPlaces />
                                <NearPlaces />
                                <Nav />
                                <FloatingButton />
                            </>
                        } 
                    />
                    {/* ScanQR Page Route */}
                    {/* <Route path="/scanqr" element={<ScanQRPage />} /> */}


                    {/* ARScene Page Route */}
                    {/* <Route 
                        path="/ar" 
                        element={() => window.location.href = "/mindar.html"} 
                    />
                </Routes> */}
                <Route path="/arscene" element={<ARScene />} /></Routes>
            </div>
        </Router>
    );
}

export default App;