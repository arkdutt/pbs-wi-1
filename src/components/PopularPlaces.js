import React from 'react';
import './PopularPlaces.css';
import Card from './Card';

function PopularPlaces() {
    // Placeholder data
    const places = [
        { id: 1, name: 'Bascom Hall', image: 'https://via.placeholder.com/150' },
        { id: 2, name: 'Capital Building', image: 'https://via.placeholder.com/150' },
        { id: 3, name: 'Memorial Library', image: 'https://via.placeholder.com/150' },
        { id: 4, name: 'State Street', image: 'https://via.placeholder.com/150' },
        { id: 5, name: 'Memorial Union', image: 'https://via.placeholder.com/150' },
    ];

    return (
        <div className="popular-places">
            <h2><b>Popular</b> Places</h2>
            <div className="cards-container">
                {places.map(place => (
                    <Card key={place.id} name={place.name} image={place.image} />
                ))}
            </div>
        </div>
    );
}

export default PopularPlaces;
