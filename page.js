"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Html5Qrcode } from 'html5-qrcode';
import styles from '../../styles/ScanQR.module.css';

const ScanQRPage = () => {
    const [scanResult, setScanResult] = useState('');
    const [cameraFacingMode, setCameraFacingMode] = useState('environment'); // Camera mode: 'environment' or 'user'
    const html5QrCodeRef = useRef(null);

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

    useEffect(() => {
        // Cleanup QR scanner on unmount or camera change
        return () => {
            if (html5QrCodeRef.current) {
                html5QrCodeRef.current.stop().then(() => {
                    html5QrCodeRef.current.clear();
                }).catch(err => console.error("Failed to stop and clear QR scanner: ", err));
            }
        };
    }, [cameraFacingMode]);

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

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1>Scan QR Code</h1>
            </div>
            
            {/* QR Scanner Container */}
            <div className={styles.scannerContainer}>
                <div className={styles.invisibleFrame}>
                    <div id="reader"></div>
                </div>
                {/* Corner Markers */}
                <div className={`${styles.corner} ${styles.tl}`}></div>
                <div className={`${styles.corner} ${styles.tr}`}></div>
                <div className={`${styles.corner} ${styles.bl}`}></div>
                <div className={`${styles.corner} ${styles.br}`}></div>
            </div>
            
            {/* Start Scanner Button */}
            <div className={styles.controls}>
                <button onClick={startCamera} className={styles.cameraButton}>Start Scanner</button>
            </div>
            
            {/* Toggle Camera Button */}
            <div className={styles.controls}>
                <button onClick={toggleCamera} className={styles.cameraButton}>Switch Camera</button>
            </div>
            
            {/* Scanned Result Display */}
            {scanResult && (
                <div className={styles.result}>
                    <h2>Scanned Result:</h2>
                    <p>{scanResult}</p>
                </div>
            )}
        </div>
    );
};

export default ScanQRPage;
