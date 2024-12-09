// import React, { useState, forwardRef } from 'react';
// import './Location.css';
// import gpsIcon from '../assets/icons/gps-icon.png';

// function Location() {
//     const [city, setCity] = useState('City');
//     const [permissionDenied, setPermissionDenied] = useState(false);

//     const getLocation = () => {
//         if (navigator.geolocation) {
//             navigator.geolocation.getCurrentPosition(success, error);
//         } else {
//             alert('Geolocation is not supported by this browser.');
//         }
//     };

//     const success = position => {
//         const { latitude, longitude } = position.coords;

//         // Reverse geocoding to get city name
//         fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`)
//             .then(response => response.json())
//             .then(data => {
//                 if (data.address) {
//                     const { city, town, village } = data.address;
//                     setCity(city || town || village || 'Unknown Location');
//                 } else {
//                     setCity('Unknown Location');
//                 }
//             })
//             .catch(() => setCity('Unknown Location'));
//     };

//     const error = err => {
//         console.warn(`ERROR(${err.code}): ${err.message}`);
//         setPermissionDenied(true);
//         setCity('Permission Denied');
//     };

//     return (
//         <div className="location">
//             <div className="find" onClick={getLocation}>
//                 <img src={gpsIcon} alt="GPS Icon" />
//                 <span>You're in <b>{city}</b></span>
//             </div>
//             <h1><b>Discover</b></h1>
//             <h1>{city}</h1>
//         </div>
//     );
// }

// export default Location;
import React, { useState, forwardRef } from 'react';
import './Location.css';
import gpsIcon from '../assets/icons/gps-icon.png';

const Location = forwardRef((props, ref) => {
    const [city, setCity] = useState('City');
    const [permissionDenied, setPermissionDenied] = useState(false);

    const getLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(success, error);
        } else {
            alert('Geolocation is not supported by this browser.');
        }
    };

    const success = position => {
        const { latitude, longitude } = position.coords;

        // Reverse geocoding to get city name
        fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`)
            .then(response => response.json())
            .then(data => {
                if (data.address) {
                    const { city, town, village } = data.address;
                    setCity(city || town || village || 'Unknown Location');
                } else {
                    setCity('Unknown Location');
                }
            })
            .catch(() => setCity('Unknown Location'));
    };

    const error = err => {
        console.warn(`ERROR(${err.code}): ${err.message}`);
        setPermissionDenied(true);
        setCity('Permission Denied');
    };

    return (
        <div className="location">
            <div ref={ref} className="find" onClick={getLocation}>
                <img src={gpsIcon} alt="GPS Icon" />
                <span>You're in <b>{city}</b></span>
            </div>
            <h1><b>Discover</b></h1>
            <h1>{city}</h1>
        </div>
    );
});

export default Location;

