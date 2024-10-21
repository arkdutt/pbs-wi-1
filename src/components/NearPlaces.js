import React from 'react';
import './NearPlaces.css';
import Card from './Card';

import BascomHallThumbnail from '../assets/thumbnails/Bascom150x150.png';
import CapitalBuildingThumbnail from '../assets/thumbnails/Capitol150x150.png';
import MemorialUnionThumbnail from '../assets/thumbnails/MemorialUnion150x150.png';

function NearPlaces() {
    // Placeholder data
    const places = [
        { id: 1, name: 'Bascom Hall', image: BascomHallThumbnail },
        { id: 2, name: 'Memorial Union', image: MemorialUnionThumbnail },
        { id: 3, name: 'Capital Building', image: CapitalBuildingThumbnail },
        { id: 4, name: 'Memorial Library', image: 'https://via.placeholder.com/150' },
        { id: 5, name: 'State Street', image: 'https://via.placeholder.com/150' },
    ];

    return (
        <div className="near-places">
            <h2><b>Near</b> You</h2>
            <div className="cards-container">
                {places.map(place => (
                    <Card key={place.id} name={place.name} image={place.image} />
                ))}
            </div>
        </div>
    );
}

export default NearPlaces;
