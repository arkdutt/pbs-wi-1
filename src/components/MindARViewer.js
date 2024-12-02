
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
    <a-scene ref={sceneRef} mindar-image="imageTargetSrc: https://cdn.glitch.global/436a8662-ce0c-4fde-a24a-aa50c450c72e/james-ben.mind?v=1732943277541; autoStart: false; uiLoading: no; uiError: no; uiScanning: no;" color-space="sRGB" embedded renderer="colorManagement: true, physicallyCorrectLights" vr-mode-ui="enabled: false" device-orientation-permission-ui="enabled: false">
      <a-assets>
        {/* <img id="card" src="https://cdn.glitch.global/436a8662-ce0c-4fde-a24a-aa50c450c72e/James-Doty.jpg?v=1733090993201" /> */}
        <a-asset-item id="jamesDoty" src=" https://cdn.glitch.global/68e5af42-4925-411b-a090-64dcec22f1bb/James-Doty.glb?v=1732585994143"></a-asset-item>
        <a-asset-item id="ben" src=" https://cdn.glitch.global/436a8662-ce0c-4fde-a24a-aa50c450c72e/George-Post.glb?v=1732943396474"></a-asset-item>
      </a-assets>

      <a-camera position="0 0 0" look-controls="enabled: false"></a-camera>

      <a-entity mindar-image-target="targetIndex: 1">
        {/* <a-plane src="#card" position="0 0 0" height="0.552" width="1" rotation="0 0 0"></a-plane> */}
        <a-gltf-model rotation="0 0 0" position="0 0 0.1" scale="0.5 0.5 0.5" src="#jamesDoty"></a-gltf-model>
      </a-entity>
      <a-entity mindar-image-target="targetIndex: 0">
        {/* <a-plane src="#card" position="0 0 0" height="0.552" width="1" rotation="0 0 0"></a-plane> */}
        <a-gltf-model rotation="0 0 0" position="0 0 0.1" scale="0.5 0.5 0.5" src="#ben"></a-gltf-model>
      </a-entity>
    </a-scene>
  );
};