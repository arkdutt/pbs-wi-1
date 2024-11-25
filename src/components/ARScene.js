// src/components/ARScene.js
import React, { useEffect } from 'react';

const ARScene = () => {
  useEffect(() => {
    // Ensure A-Frame and AR.js have loaded
    if (!window.AFRAME) {
      console.error("A-Frame is not loaded!");
      return;
    }
    if (!window.AR) {
      console.error("AR.js is not loaded!");
      return;
    }
  }, []);

  return (
    <div>
      {/* AR.js Scene Setup */}
      <a-scene
      embedded
      arjs="trackingMethod: best; sourceType: webcam;"
      style={{ width: '100vw', height: '100vh' }} // Set full viewport width and height
      >
        {/* Image Marker */}
        <a-marker type="pattern" url="portrait-files/pattern-red.patt">
          {/* 3D Model */}
          <a-entity
            // gltf-model="/glb-files/James-Doty.glb"
            gltf-model="glb-files/cube.glb"
            scale="0.5 0.5 0.5"
            position="0 0 0"
            rotation="0 0 0"
          ></a-entity>
        </a-marker>
        
        {/* Camera Setup */}
        <a-entity camera></a-entity>
      </a-scene>
    </div>
  );
};

export default ARScene;