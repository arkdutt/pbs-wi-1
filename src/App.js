import React from 'react';
import Header from './components/Header';
import PopularPlaces from './components/PopularPlaces';
import NeerPlaces from './components/NeerPlaces';

function App() {
    return (
        <div className="App">
            <Header />
            <PopularPlaces />
            <NeerPlaces />
        </div>
    );
}

export default App;
