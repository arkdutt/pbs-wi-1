
"use client"
import React, { useEffect, useRef } from 'react';
import 'mind-ar/dist/mindar-image.prod.js';
import 'aframe';
import 'mind-ar/dist/mindar-image-aframe.prod.js';

export default () => {
  const sceneRef = useRef(null);

  useEffect(() => {
    const sceneEl = sceneRef.current;

    let arSystem = null;
    const handleRenderStart = () => {
        console.log("Render start triggered");
        arSystem = sceneEl?.systems?.["mindar-image-system"];
        if (arSystem && typeof arSystem.start === "function") {
          console.log("AR system successfully initialized.");
          arSystem.start();
        } else {
          console.warn("AR system not initialized correctly. Retrying...");
          setTimeout(() => {
            arSystem = sceneEl?.systems?.["mindar-image-system"];
            if (arSystem && typeof arSystem.start === "function") {
              console.log("AR system successfully initialized after retry.");
              arSystem.start();
            } else {
              console.error("Failed to initialize AR system after retry.");
            }
          }, 1000); // Retry after 1 second
        }
      };

    // Add event listener to handle system start
    sceneEl?.addEventListener('renderstart', handleRenderStart);

    // Cleanup function to safely stop the AR system
    return () => {
      sceneEl?.removeEventListener('renderstart', handleRenderStart);
      if (arSystem && typeof arSystem.stop === "function") {
        arSystem.stop(); // Safely stop AR
        console.log("AR stopped");
      }
    };
  }, []);

  return (
    <a-scene 
    ref={sceneRef} 
    mindar-image="imageTargetSrc: https://cdn.glitch.global/84be45ad-dc75-4cd9-ba4f-7faa0bd8a924/ForwardRewindMarkers.mind?v=1733176852299; autoStart: false; uiLoading: no; uiError: no; uiScanning: no; filterMinCF: 0.0001; missTolerance: 5; filterBeta: 0.007;" // filterMinCF: 0.001; filterBeta: 1000;
    color-space="sRGB" 
    embedded renderer="colorManagement: true, physicallyCorrectLights" 
    vr-mode-ui="enabled: false" 
    device-orientation-permission-ui="enabled: false">
      <a-assets>
          <a-asset-item id="georgePost" src="https://cdn.glitch.global/84be45ad-dc75-4cd9-ba4f-7faa0bd8a924/George-Post.glb?v=1733176910540"></a-asset-item>
          <a-asset-item id="wisconsinCapitol" src="https://cdn.glitch.global/84be45ad-dc75-4cd9-ba4f-7faa0bd8a924/WisconsinCapitol.glb?v=1733169937656"></a-asset-item>
          <a-asset-item id="wisconsinLady" src="https://cdn.glitch.global/84be45ad-dc75-4cd9-ba4f-7faa0bd8a924/WisconsinLady.glb?v=1733169536761"></a-asset-item>
          <a-asset-item id="jamesDoty" src="https://cdn.glitch.global/84be45ad-dc75-4cd9-ba4f-7faa0bd8a924/James-Doty-2.glb?v=1733018433769"></a-asset-item>
        </a-assets>

      <a-camera position="0 0 0" look-controls="enabled: false"></a-camera>

      {/* Marker 0: George Post */}
      <a-entity mindar-image-target="targetIndex: 0">
          <a-gltf-model
            rotation="0 0 0"
            position="0 0 0.1"
            scale="0.5 0.5 0.5"
            src="#georgePost"
          ></a-gltf-model>
        </a-entity>

        {/* Marker 1: Wisconsin Capitol */}
        <a-entity mindar-image-target="targetIndex: 1">
          <a-gltf-model
            rotation="0 0 0"
            position="0 0 0.1"
            scale="0.5 0.5 0.5"
            src="#wisconsinCapitol"
          ></a-gltf-model>
        </a-entity>

        {/* Marker 2: Wisconsin Lady */}
        <a-entity mindar-image-target="targetIndex: 2">
          <a-gltf-model
            rotation="0 0 0"
            position="0 0 0.1"
            scale="0.5 0.5 0.5"
            src="#wisconsinLady"
          ></a-gltf-model>
        </a-entity>

        {/* Marker 3: James Doty */}
        <a-entity mindar-image-target="targetIndex: 3">
          <a-gltf-model
            rotation="0 0 0"
            position="0 0 0.1"
            scale="0.5 0.5 0.5"
            src="#jamesDoty"
          ></a-gltf-model>
        </a-entity>
    </a-scene>
  );
};