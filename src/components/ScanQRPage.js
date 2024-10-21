"use client";

import React, { useState, useEffect, useRef } from 'react';
import Webcam from 'webcam-easy';
import styles from './ScanQR.module.css';


const ScanQRPage = () => {
    const [cameraActive, setCameraActive] = useState(false); // Track if camera is active
    const [popupActive, setPopupActive] = useState(false); // Track if pop-up is active
    const [webcam, setWebcam] = useState(null); // Store webcam instance
    const videoRef = useRef(null); // Reference to the video element
    const canvasRef = useRef(null); // Reference to the canvas element

    // Start the camera
    const startCamera = () => {
        if (!webcam) {
            const webcamInstance = new Webcam(
                videoRef.current,
                'user',
                canvasRef.current
            );
            webcamInstance.start()
                .then(() => {
                    setCameraActive(true);
                    setWebcam(webcamInstance);
                })
                .catch(err => {
                    console.error("Error starting webcam: ", err);
                });
        }
    };

    // Stop the camera when the component is unmounted
    useEffect(() => {
        return () => {
            if (webcam) {
                webcam.stop();
            }
        };
    }, [webcam]);

    // Toggle pop-up visibility
    const togglePopup = () => {
        setPopupActive(!popupActive);
    };

    return (
        <div className={styles.mainContainer}>
            <div
                className={styles.Scan}
                style={{
                    backgroundImage: !cameraActive ? `url(/Bascom_Placeholder.png)` : 'none',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            >
                {/* Container for the camera feed */}
                <div
                    className={styles.cameraMask}
                    style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        width: '412px',
                        height: '915px',
                        transform: 'translate(-50%, -50%)',
                        overflow: 'hidden',
                        borderRadius: '20px',
                    }}
                >
                    <video
                        ref={videoRef}
                        className={styles.video}
                        autoPlay
                        playsInline
                        controls={false}
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            display: cameraActive ? 'block' : 'none',
                            zIndex: cameraActive ? 10001 : 'auto',
                        }}
                    ></video>
                </div>

                {/* Invisible frame with corners to guide QR code positioning */}
                <div className={styles.invisibleFrame} style={{ position: 'relative', zIndex: 10002 }}>
                    <div className={`${styles.corner} ${styles.tl}`}></div>
                    <div className={`${styles.corner} ${styles.tr}`}></div>
                    <div className={`${styles.corner} ${styles.bl}`}></div>
                    <div className={`${styles.corner} ${styles.br}`}></div>
                </div>

                <canvas ref={canvasRef} id="canvas" style={{ display: 'none' }}></canvas>

                {/* InfoCircle images, visible when camera is not active */}
                {!cameraActive && (
                    <>
                        <img
                            src="/InfoCircle.png"
                            alt="Info Circle 1"
                            className={styles.infoCircle}
                        />
                        <img
                            src="/InfoCircle.png"
                            alt="Info Circle 2"
                            className={styles.infoCircleTwo}
                            onClick={togglePopup}
                            style={{ cursor: 'pointer' }}
                        />
                    </>
                )}

                {/* Button to start the camera */}
                {!cameraActive && (
                    <button onClick={startCamera} className={styles.cameraButton}>
                        <div className={styles.cameraIconBox}>
                            <img src="/Camera_Icon.png" alt="Camera Icon" className={styles.cameraIcon} />
                        </div>
                        Start Scanner
                    </button>
                )}
            </div>

            {/* Pop-up overlay with information */}
            {popupActive && (
                <div className={styles.popupOverlay}>
                    <div className={styles.popupContent}>
                        <img
                            src="/Bascom_Full_Pic.png"
                            alt="Bascom Full Pic"
                            className={styles.popupImage}
                        />
                        <div className={styles.bascomText}>
                            Bascom Hall
                        </div>
                        <img
                            src="/Place_Icon.png"
                            alt="Place Icon"
                            className={styles.placeIcon}
                        />
                        <div className={styles.addressText}>
                            1872 Lincoln Dr
                        </div>
                        <div className={styles.yearText}>
                            1859
                        </div>
                        <div className={styles.yearConstructedText}>
                            Year Constructed
                        </div>
                        <div className={styles.descriptionText}>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum.
                        </div>
                        <button className={styles.moreInfoButton}>
                            More information
                        </button>

                        {/* Back Button with Back Icon */}
                        <button onClick={togglePopup} className={styles.backButton}>
                            <img src="/Back_Icon.png" alt="Back Icon" className={styles.backIcon} />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ScanQRPage;