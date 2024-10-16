import React from 'react';
import './NeerPlaces.css';
import Card from './Card';

function NeerPlaces() {
    // Placeholder data
    const places = [
        { id: 1, name: 'Memorial Library', image: 'https://via.placeholder.com/150' },
        { id: 2, name: 'Memorial Union', image: 'https://via.placeholder.com/150' },
        { id: 3, name: 'Bascom Hall', image: 'https://via.placeholder.com/150' },
        { id: 4, name: 'State Street', image: 'https://via.placeholder.com/150' },
        { id: 5, name: 'Capital Building', image: 'https://via.placeholder.com/150' },
    ];

    return (
        <div className="neer-places">
            <h2><b>Neer</b> You</h2>
            <div className="cards-container">
                {places.map(place => (
                    <Card key={place.id} name={place.name} image={place.image} />
                ))}
            </div>
        </div>
    );
}

export default NeerPlaces;
