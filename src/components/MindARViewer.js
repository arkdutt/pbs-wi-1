"use client";
import React, { useEffect, useRef } from "react";
import "mind-ar/dist/mindar-image.prod.js";
import "aframe";
import "mind-ar/dist/mindar-image-aframe.prod.js";

// Assign the component to a variable before exporting
const MindARViewer = () => {
  const sceneRef = useRef(null);
  const audioRef = useRef(null); // Audio reference

  useEffect(() => {
    const audioElement = audioRef.current; // Access the audio element

    const showInfo = () => {
      const audioButton = document.querySelector("#audio-button"); // Audio button
      const text = document.querySelector("#text");

      // Set up the button to be visible
      audioButton.setAttribute("visible", true);

      // Add event listener to play the audio when the button is clicked
      audioButton.addEventListener("click", () => {
        if (audioElement) {
          audioElement.play(); // Play audio when clicked
          text.setAttribute("value", "Playing audio: Doty's Washbowl"); // Update text
        }
      });
    };

    const showAvatar = (onDone) => {
      const avatar = document.querySelector("#avatar");
      let z = -0.3;

      const id = setInterval(() => {
        z += 0.008;
        avatar.setAttribute("position", `0 -0.25 ${z}`);
        if (z >= 0.3) {
          clearInterval(id);
          onDone();
        }
      }, 10);
    };

    const handleTargetFound = () => {
      console.log("Target found");
      showAvatar(() => {
        setTimeout(() => {
          showInfo(); // Show the audio button
        }, 300);
      });
    };

    const handleTargetLost = () => {
      console.log("Target lost");
    };

    // Add event listeners to the MindAR target
    const targetEntity = document.querySelector("[mindar-image-target]");
    targetEntity.addEventListener("targetFound", handleTargetFound);
    targetEntity.addEventListener("targetLost", handleTargetLost);

    return () => {
      targetEntity.removeEventListener("targetFound", handleTargetFound);
      targetEntity.removeEventListener("targetLost", handleTargetLost);
    };
  }, []);

  return (
    <a-scene
    ref={sceneRef}
    mindar-image="imageTargetSrc: https://cdn.glitch.global/84be45ad-dc75-4cd9-ba4f-7faa0bd8a924/ForwardRewindMarkers.mind?v=1733176852299; autoStart: true; uiLoading: no; uiError: no; uiScanning: no; filterMinCF: 0.0001; missTolerance: 5; filterBeta: 0.007;"
    color-space="sRGB"
    embedded
    renderer="colorManagement: true, physicallyCorrectLights"
    vr-mode-ui="enabled: false"
    device-orientation-permission-ui="enabled: false"
  >
      {/* Audio Button (button to trigger audio play) */}
      <a-entity
        id="audio-button"
        visible="false"
        geometry="primitive: plane; height: 1; width: 1"
        material="color: #4CAF50; opacity: 0.7"
        text="value: Tap to Play Audio; align: center; color: white;"
        position="0 1.5 -3"
      ></a-entity>

      {/* Text to show the status or message */}
      <a-entity id="text" value="" position="0 1.5 -3"></a-entity>

      {/* Avatar */}
      <a-entity id="avatar" visible="false" position="0 -0.25 -0.3"></a-entity>

      {/* Audio File */}
      <audio id="audioFile" ref={audioRef} src="https://cdn.glitch.global/84be45ad-dc75-4cd9-ba4f-7faa0bd8a924/DotysWashbowl.mp3?v=1733022223353"></audio>

      {/* Define other assets and markers */}
      <a-assets>
        {/* Add other assets like models if needed */}
        <a-asset-item
          id="georgePost"
          src="https://cdn.glitch.global/84be45ad-dc75-4cd9-ba4f-7faa0bd8a924/George-Post.glb?v=1733176910540"
        ></a-asset-item>
        <a-asset-item
          id="wisconsinCapitol"
          src="https://cdn.glitch.global/84be45ad-dc75-4cd9-ba4f-7faa0bd8a924/WisconsinCapitol.glb?v=1733169937656"
        ></a-asset-item>
        <a-asset-item
          id="wisconsinLady"
          src="https://cdn.glitch.global/84be45ad-dc75-4cd9-ba4f-7faa0bd8a924/WisconsinLady.glb?v=1733169536761"
        ></a-asset-item>
        <a-asset-item
          id="jamesDoty"
          src="https://cdn.glitch.global/84be45ad-dc75-4cd9-ba4f-7faa0bd8a924/James-Doty-2.glb?v=1733018433769"
        ></a-asset-item>
      </a-assets>
      
      {/* Add A-Frame Camera */}
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
          events="mouseenter: showAudioIcon;"
        ></a-gltf-model>
      </a-entity>

      {/* Audio Icon Button */}
      <a-entity
        id="audioIconEntity"
        position="0 0 0.1"
        visible="false"
        class="clickable"
        geometry="primitive: plane; height: 0.5; width: 0.5;"
        material="src: #audioIcon;"
        sound="src: #jamesDotyAudio; autoplay: false"
        events="click: playAudio"
      ></a-entity>
    </a-scene>
  );
};

export default MindARViewer;
