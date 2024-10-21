import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import necessary components from react-router-dom
import Header from './components/Header';
import Location from './components/Location';
import PopularPlaces from './components/PopularPlaces';
import NeerPlaces from './components/NeerPlaces';
import Nav from './components/Nav';
import FloatingButton from './components/FloatingButton';
import ScanQRPage from './components/ScanQRPage'; // Import ScanQRPage


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
                                <NeerPlaces />
                                <Nav />
                                <FloatingButton />
                            </>
                        } 
                    />
                    {/* ScanQR Page Route */}
                    <Route path="/scanqr" element={<ScanQRPage />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;