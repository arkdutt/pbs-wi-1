"use client";
import React, { useEffect, useRef } from "react";
import "mind-ar/dist/mindar-image.prod.js";
import "aframe";
import "mind-ar/dist/mindar-image-aframe.prod.js";

export default function ModelWithSound() {
  const sceneRef = useRef(null);

  useEffect(() => {
    const sceneEl = sceneRef.current;

    // Ensure AR system starts correctly
    const handleRenderStart = () => {
      const arSystem = sceneEl?.systems?.["mindar-image-system"];
      if (arSystem && typeof arSystem.start === "function") {
        arSystem.start();
      } else {
        console.warn("AR system failed to start.");
      }
    };

    // Add render start event listener
    sceneEl?.addEventListener("renderstart", handleRenderStart);

    // Clean up on unmount
    return () => {
      sceneEl?.removeEventListener("renderstart", handleRenderStart);
    };
  }, []);

  // Play audio function
  const handlePlayAudio = () => {
    const audio = new Audio(
      "https://cdn.glitch.global/84be45ad-dc75-4cd9-ba4f-7faa0bd8a924/DotysWashbowl.mp3?v=1733022223353"
    );
    audio.play();
  };

  return (
    <>
      <a-scene
        ref={sceneRef}
        mindar-image="imageTargetSrc: https://cdn.glitch.global/68e5af42-4925-411b-a090-64dcec22f1bb/james-doty.mind?v=1732585705029; debugUIEnabled: true"
        vr-mode-ui="enabled: false"
        embedded
        style={{ width: "100%", height: "100%", position: "absolute", top: 0, left: 0 }}
      >
        <a-camera position="0 0 0"></a-camera>
        <a-entity mindar-image-target="targetIndex: 0">
          {/* James Doty Model */}
          <a-gltf-model
            src="https://cdn.glitch.global/84be45ad-dc75-4cd9-ba4f-7faa0bd8a924/James-Doty-2.glb?v=1733018433769"
            position="0 0 0.1"
            scale="0.5 0.5 0.5"
          ></a-gltf-model>

          {/* Speaker Icon */}
          <a-gltf-model
            src="https://cdn.glitch.global/84be45ad-dc75-4cd9-ba4f-7faa0bd8a924/speakerIcon.glb?v=1733023701158"
            position="0 0 0"
            scale="0.005 0.005 0.005"
            rotation="90 0 0"
            events={{
              click: handlePlayAudio, // Trigger audio on click
            }}
          ></a-gltf-model>
        </a-entity>
      </a-scene>

      {/* Transparent Clickable Overlay */}
      <div
        id="clickable-area"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 10,
        }}
        onClick={handlePlayAudio} // Trigger audio when overlay is clicked
      ></div>
    </>
  );
}
