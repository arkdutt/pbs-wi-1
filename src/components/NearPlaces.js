import React, { useState } from 'react';
import './NearPlaces.css';
import Card from './Card';
import PopupHandler from './PopupHandler';

import BascomHallThumbnail from '../assets/thumbnails/Bascom150x150.png';
import CapitalBuildingThumbnail from '../assets/thumbnails/Capitol150x150.png';
import MemorialUnionThumbnail from '../assets/thumbnails/MemorialUnion150x150.png';
import BascomHallFullPicture from '../assets/thumbnails/Bascom_Full_Picture.png';
import MemorialUnionFullPicture from '../assets/thumbnails/MemorialUnion_Full_Picture.png';
import CapitolFullPicture from '../assets/thumbnails/Capitol_Full_Picture.png';

function NearPlaces() {
    const [selectedPlace, setSelectedPlace] = useState(null);
    const [popupActive, setPopupActive] = useState(false);

    // Placeholder data
    const places = [
        {
            id: 1,
            name: "Bascom Hill",
            thumbnail: BascomHallThumbnail,
            fullPicture: BascomHallFullPicture,
            address: "1872 Lincoln Dr",
            yearConstructed: "1851",
            history: "Bascom Hill is the iconic main quadrangle that forms the historic core of the University of Wisconsin–Madison campus. It is located on the opposite end of State Street from the Wisconsin State Capitol, and is named after John Bascom, former president of the University of Wisconsin. The hill is crowned by Bascom Hall, the main administration building for the campus. Near the main entrance to Bascom Hall sits a statue of President Abraham Lincoln. The first university building, North Hall, was constructed on Bascom Hill in 1851 and is still in use by the Department of Political Science."
        },
        {
            id: 2,
            name: "Wisconsin State Capitol",
            thumbnail: CapitalBuildingThumbnail,
            fullPicture: CapitolFullPicture,
            address: "2 E Main St",
            yearConstructed: "1917",
            history: "The Wisconsin State Capitol, located in Madison, Wisconsin, houses both chambers of the Wisconsin Legislature along with the Wisconsin Supreme Court and the Office of the Governor. Completed in 1917, the building is the fifth to serve as the Wisconsin capitol since the first territorial legislature convened in 1836 and the third building since Wisconsin was granted statehood in 1848. The Wisconsin State Capitol is the tallest building in Madison, a distinction that has been preserved by legislation that prohibits buildings taller than the 187 feet (57 m) columns surrounding the dome.",
        },
        {
            id: 3,
            name: "Memorial Union",
            thumbnail: MemorialUnionThumbnail,
            fullPicture: MemorialUnionFullPicture,
            address: "800 Langdon St",
            yearConstructed: "1928",
            history: "The exterior of the main wing was designed by University Architect Arthur Peabody. Opened on October 5, 1928, the facility is operated by the Wisconsin Union, a membership organization. Porter Butts, the first director, called it a 'college union' because it combines the characteristics of a student union ('student activity center' in other countries) and a student government ('students' union' in other countries) in an organization that brings together students, faculty, and members of the surrounding community.",
        },
        { id: 4, name: 'Memorial Library', image: 'https://via.placeholder.com/150' },
        { id: 5, name: 'State Street', image: 'https://via.placeholder.com/150' },
    ];

    const handleCardClick = (place) => {
        console.log("Card clicked:", place);
        setSelectedPlace(place);
        setPopupActive(true);
    };

    const togglePopup = () => {
        setPopupActive(false);
    };

    return (
        <div className="near-places">
            <h2><b>Near</b> You</h2>
            <div className="cards-container">
                {places.map(place => (
                    <Card
                        key={place.id}
                        name={place.name}
                        image={place.thumbnail}
                        onClick={() => handleCardClick(place)}
                    />
                ))}
            </div>
            <PopupHandler
                placeData={selectedPlace}
                isActive={popupActive}
                togglePopup={togglePopup}
            />
        </div>
    );
}

export default NearPlaces;
