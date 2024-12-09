import React from 'react';
import './PopupHandler.css';
import PlaceIcon from '../assets/icons/Place_Icon.png';
import BackIcon from '../assets/icons/Back_Icon.png';

const PopupHandler = ({ placeData, isActive, togglePopup }) => {
    const imageMapping = {
        BascomHallFullPicture: require('../assets/thumbnails/Bascom_Full_Picture.png'),
        MemorialUnionFullPicture: require('../assets/thumbnails/MemorialUnion_Full_Picture.png'),
        CapitolFullPicture: require('../assets/thumbnails/Capitol_Full_Picture.png'),
    };

    if (!isActive || !placeData) return null;

    return (
        <div className="popupOverlay">
            <div className="popupContent">
                <img
                    src={placeData.fullPicture}
                    alt={`${placeData.name} Picture`}
                    className="popupImage"
                />
                <div className="popUpTitle">{placeData.name}</div>
                <img src={PlaceIcon} alt="Place Icon" className="placeIcon" />
                <div className="addressText">{placeData.address}</div>
                <div className="yearText">{placeData.yearConstructed}</div>
                <div className="yearConstructedText">Year Constructed</div>
                <div className="descriptionText">{placeData.history}</div>
                {/* <button className="moreInfoButton">More information</button> */}
                <button onClick={togglePopup} className="backButton">
                    <img src={BackIcon} alt="Back Icon" className="backIcon" />
                </button>
            </div>
        </div>
    );
};

export default PopupHandler;
