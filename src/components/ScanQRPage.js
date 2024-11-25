// "use client";

// import React, { useState, useEffect, useRef } from 'react';
// import Webcam from 'webcam-easy';  // Used for webcam management
// import jsQR from 'jsqr';  // Library for QR code scanning
// import axios from 'axios';  // Used for making API requests
// import styles from './ScanQR.module.css';



// import BackIcon from '../assets/icons/Back_Icon.png';
// import CameraIcon from '../assets/icons/Camera_Icon.png';
// import InfoCircleIcon from '../assets/icons/InfoCircle.png';
// import PlaceIcon from '../assets/icons/Place_Icon.png';
// import BascomHallPlaceholder from '../assets/thumbnails/Bascom_Placeholder.png';
// import BascomHallFullPicture from '../assets/thumbnails/Bascom_Full_Picture.png';
// import CapitolFullPicture from '../assets/thumbnails/Capitol_Full_Picture.png';
// import MemorialUnionFullPicture from '../assets/thumbnails/MemorialUnion_Full_Picture.png';

// const ScanQRPage = () => {
//     const [cameraActive, setCameraActive] = useState(false); // Track if camera is active
//     const [popupActive, setPopupActive] = useState(false); // Track if pop-up is active
//     const [webcam, setWebcam] = useState(null); // Store webcam instance
//     const [locationData, setLocationData] = useState(null); // Store fetched location data
//     const videoRef = useRef(null); // Reference to the video element
//     const canvasRef = useRef(null); // Reference to the canvas element

//     const imageMapping = {
//         BascomHallFullPicture: BascomHallFullPicture,
//         MemorialUnionFullPicture: MemorialUnionFullPicture,
//         CapitolFullPicture: CapitolFullPicture
//     };

//     // Start the camera
//     const startCamera = () => {
//         if (!webcam) {
//             const webcamInstance = new Webcam(videoRef.current, 'user', canvasRef.current);
//             webcamInstance.start()
//                 .then(() => {
//                     setCameraActive(true);
//                     setWebcam(webcamInstance);
//                 })
//                 .catch(err => {
//                     console.error("Error starting webcam: ", err);
//                 });
//         }
//     };

//     // Function to scan the QR code from the camera feed
//     const scanQRCode = () => {
//         const canvas = canvasRef.current;
//         const video = videoRef.current;

//         if (canvas && video && cameraActive) {
//             const context = canvas.getContext('2d', { willReadFrequently: true });
//             if (context) {
//                 context.drawImage(video, 0, 0, canvas.width, canvas.height);
//                 const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
//                 const qrCode = jsQR(imageData.data, canvas.width, canvas.height);

//                 if (qrCode) {
//                     console.log("QR Code data:", qrCode.data);
//                     fetchLocationData(qrCode.data);  // Fetch data based on QR code content (assumed to be location ID)
//                 }
//             }
//         }
//     };

//     const fetchLocationData = (qrData) => {
//         // Extract location ID from the scanned URL
//         const locationId = qrData.split('/').pop();  // Extract the last part of the URL
    
//         axios.get(`http://127.0.0.1:5000/api/location/${locationId}`)
//             .then(response => {
//                 setLocationData(response.data);
//                 setPopupActive(true);  // Show pop-up with location data
//             })
//             .catch(error => {
//                 console.error("Error fetching location data:", error);
//                 setLocationData(null);
//             });
//     };

//     // Stop the camera when the component is unmounted
//     useEffect(() => {
//         return () => {
//             if (webcam) {
//                 webcam.stop();
//             }
//         };
//     }, [webcam]);

//     // Continuously scan for QR codes every second
//     useEffect(() => {
//         const interval = setInterval(scanQRCode, 1000);  // Scan for QR codes every second
//         return () => clearInterval(interval);  // Clean up the interval on unmount
//     }, [cameraActive]);

//     // Toggle pop-up visibility
//     const togglePopup = () => {
//         setPopupActive(!popupActive);
//     };

//     return (
//         <div className={styles.mainContainer}>
//             <div
//                 className={styles.Scan}
//                 style={{
//                     backgroundImage: !cameraActive ? `url(${BascomHallPlaceholder})` : 'none',
//                     backgroundSize: 'cover',
//                     backgroundPosition: 'center',
//                 }}
//             >
//                 {/* Container for the camera feed */}
//                 <div
//                     className={styles.cameraMask}
//                     style={{
//                         position: 'absolute',
//                         top: '50%',
//                         left: '50%',
//                         width: '412px',
//                         height: '915px',
//                         transform: 'translate(-50%, -50%)',
//                         overflow: 'hidden',
//                         borderRadius: '20px',
//                     }}
//                 >
//                     <video
//                         ref={videoRef}
//                         className={styles.video}
//                         autoPlay
//                         playsInline
//                         controls={false}
//                         style={{
//                             width: '100%',
//                             height: '100%',
//                             objectFit: 'cover',
//                             display: cameraActive ? 'block' : 'none',
//                             zIndex: cameraActive ? 10001 : 'auto',
//                         }}
//                     ></video>
//                 </div>

//                 {/* Invisible frame with corners to guide QR code positioning */}
//                 <div className={styles.invisibleFrame} style={{ position: 'relative', zIndex: 10002 }}>
//                     <div className={`${styles.corner} ${styles.tl}`}></div>
//                     <div className={`${styles.corner} ${styles.tr}`}></div>
//                     <div className={`${styles.corner} ${styles.bl}`}></div>
//                     <div className={`${styles.corner} ${styles.br}`}></div>
//                 </div>

//                 <canvas ref={canvasRef} id="canvas" style={{ display: 'none' }}></canvas>

//                 {/* InfoCircle images, visible when camera is not active */}
//                 {!cameraActive && (
//                     <>
//                         <img
//                             src={InfoCircleIcon}
//                             alt="Info Circle 1"
//                             className={styles.infoCircle}
//                         />
//                         <img
//                             src={InfoCircleIcon}
//                             alt="Info Circle 2"
//                             className={styles.infoCircleTwo}
//                             onClick={togglePopup}
//                             style={{ cursor: 'pointer' }}
//                         />
//                     </>
//                 )}

//                 {/* Button to start the camera */}
//                 {!cameraActive && (
//                     <button onClick={startCamera} className={styles.cameraButton}>
//                         <div className={styles.cameraIconBox}>
//                             <img src={CameraIcon} alt="Camera Icon" className={styles.cameraIcon} />
//                         </div>
//                         Start Scanner
//                     </button>
//                 )}
//             </div>

//             {/* Pop-up overlay with information */}
//             {popupActive && locationData && (
//                 <div className={styles.popupOverlay}>
//                     <div className={styles.popupContent}>
//                         {/* Use dynamic image URL from locationData */}
//                         <img
//                             src={imageMapping[locationData.image]} // Fetch image URL from locationData
//                             alt={`${locationData.name} Picture`}
//                             className={styles.popupImage}
//                         />
//                         <div className={styles.bascomText}>
//                             {locationData.name}
//                         </div>
//                         <img
//                             src={PlaceIcon}
//                             alt="Place Icon"
//                             className={styles.placeIcon}
//                         />
//                         <div className={styles.addressText}>
//                             {locationData.address}
//                         </div>
//                         <div className={styles.yearText}>
//                             {locationData.yearConstructed}
//                         </div>
//                         <div className={styles.yearConstructedText}>
//                             Year Constructed
//                         </div>
//                         <div className={styles.descriptionText}>
//                             {locationData.history}
//                         </div>
//                         <button className={styles.moreInfoButton}>
//                             More information
//                         </button>

//                         {/* Back Button with Back Icon */}
//                         <button onClick={togglePopup} className={styles.backButton}>
//                             <img src={BackIcon} alt="Back Icon" className={styles.backIcon} />
//                         </button>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default ScanQRPage;


import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

function ScanQRPage() {
    const containerRef = useRef(null);

    useEffect(() => {
        if (!containerRef.current) return;

        // Create the scene, camera, and renderer
        const scene = new THREE.Scene();
        const camera = new THREE.Camera();
        const renderer = new THREE.WebGLRenderer({ alpha: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        containerRef.current.appendChild(renderer.domElement);

        // AR.js initialization
        const arToolkitSource = new THREEx.ArToolkitSource({
            sourceType: 'webcam'
        });

        arToolkitSource.init(() => {
            setTimeout(() => {
                arToolkitSource.onResize();
            }, 2000);
        });

        const arToolkitContext = new THREEx.ArToolkitContext({
            cameraParametersUrl: 'path/to/camera_para.dat',
            detectionMode: 'mono'
        });

        arToolkitContext.init(() => {
            camera.projectionMatrix.copy(arToolkitContext.getProjectionMatrix());
        });

        // Animate function
        const animate = () => {
            requestAnimationFrame(animate);
            if (arToolkitSource.ready) {
                arToolkitContext.update(arToolkitSource.domElement);
            }
            renderer.render(scene, camera);
        };

        animate();

        return () => {
            containerRef.current.removeChild(renderer.domElement);
        };
    }, []);

    return <div ref={containerRef} style={{ width: '100vw', height: '100vh' }} />;
}

export default ScanQRPage;

