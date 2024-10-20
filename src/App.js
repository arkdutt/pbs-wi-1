import React from 'react';
import Header from './components/Header';
import Location from './components/Location';
import PopularPlaces from './components/PopularPlaces';
import NearPlaces from './components/NearPlaces';
import Nav from './components/Nav';
import FloatingButton from './components/FloatingButton';

function App() {
    return (
        <div className="App">
            <Header />
            <Location />
            <PopularPlaces />
            <NearPlaces />
            <Nav />
            <FloatingButton />
        </div>
    );
}

export default App;
