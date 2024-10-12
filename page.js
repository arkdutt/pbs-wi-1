"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Html5Qrcode } from 'html5-qrcode';
import styles from '../../styles/ScanQR.module.css';

const ScanQRPage = () => {
    // Stores the scanned QR code result
    const [scanResult, setScanResult] = useState('');
    // Camera mode: 'environment' for rear or 'user' for front camera
    const [cameraFacingMode, setCameraFacingMode] = useState('environment');
    // Controls the visibility of the information modal
    const [showInfoModal, setShowInfoModal] = useState(false);
    // Stores AI-generated data to display in the modal
    const [aiData, setAiData] = useState(null);
    // Reference to the QR code scanner instance
    const html5QrCodeRef = useRef(null);

    // Starts the camera and QR code scanner
    const startCamera = () => {
        if (!html5QrCodeRef.current) {
            html5QrCodeRef.current = new Html5Qrcode("reader");

            html5QrCodeRef.current.start(
                { facingMode: cameraFacingMode },
                { fps: 10, qrbox: 250 },
                (decodedText) => {
                    console.log(`QR Code decoded: ${decodedText}`);
                    setScanResult(decodedText);
                },
                (error) => {
                    console.error(`QR Code scan error: ${error}`);
                }
            ).catch(err => {
                console.error("Error starting QR scanner: ", err);
            });
        }
    };

    // Cleans up the QR scanner on component unmount or camera mode change
    useEffect(() => {
        return () => {
            if (html5QrCodeRef.current) {
                html5QrCodeRef.current.stop().then(() => {
                    html5QrCodeRef.current.clear();
                }).catch(err => console.error("Failed to stop and clear QR scanner: ", err));
            }
        };
    }, [cameraFacingMode]);

    // Toggles between front and back camera
    const toggleCamera = () => {
        if (html5QrCodeRef.current) {
            html5QrCodeRef.current.stop().then(() => {
                html5QrCodeRef.current.clear();
                html5QrCodeRef.current = null;
                setCameraFacingMode(prevMode => (prevMode === 'environment' ? 'user' : 'environment'));
                startCamera();
            }).catch(err => {
                console.error("Failed to stop scanner before toggling camera:", err);
            });
        } else {
            setCameraFacingMode(prevMode => (prevMode === 'environment' ? 'user' : 'environment'));
            startCamera();
        }
    };

    // Toggles the visibility of the information modal
    const toggleInfoModal = () => {
        // Sets mock data for the modal
        const mockData = {
            title: "Placeholder Description",
            description: "This is a placeholder description for the data that will be displayed after scanning a QR code."
        };
        setAiData(mockData);
        setShowInfoModal(!showInfoModal);
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1>Scan QR Code</h1>
            </div>
            
            {/* QR Code Scanner */}
            <div className={styles.scannerContainer}>
                <div className={styles.invisibleFrame}>
                    <div id="reader"></div>
                </div>
                {/* Corner markers */}
                <div className={`${styles.corner} ${styles.tl}`}></div>
                <div className={`${styles.corner} ${styles.tr}`}></div>
                <div className={`${styles.corner} ${styles.bl}`}></div>
                <div className={`${styles.corner} ${styles.br}`}></div>
            </div>
            
            {/* Start Scanner Button */}
            <div className={styles.controls}>
                <button onClick={startCamera} className={styles.cameraButton}>Start Scanner</button>
            </div>
            
            {/* Switch Camera Button */}
            <div className={styles.controls}>
                <button onClick={toggleCamera} className={styles.cameraButton}>Switch Camera</button>
            </div>

            {/* Show Information Button */}
            <div className={styles.controls}>
                <button onClick={toggleInfoModal} className={styles.infoButton}>Show Information</button>
            </div>
            
            {/* Display Scanned Result */}
            {scanResult && (
                <div className={styles.result}>
                    <h2>Scanned Result:</h2>
                    <p>{scanResult}</p>
                </div>
            )}

            {/* Information Modal */}
            {showInfoModal && (
                <div className={styles.modal}>
                    <div className={styles.modalContent}>
                        <h2>{aiData.title}</h2>
                        <p>{aiData.description}</p>
                        <button onClick={toggleInfoModal} className={styles.closeButton}>Close</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ScanQRPage;
