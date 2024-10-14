import React from 'react';
import Header from './components/Header';
import Location from './components/Location';
import PopularPlaces from './components/PopularPlaces';
import NeerPlaces from './components/NeerPlaces';
import FloatingButton from './components/FloatingButton';
import Nav from './components/Nav';

function App() {
    return (
        <div className="App">
            <Header />
            <Location />
            <PopularPlaces />
            <NeerPlaces />
            <FloatingButton />
            <Nav />
        </div>
    );
}

export default App;
