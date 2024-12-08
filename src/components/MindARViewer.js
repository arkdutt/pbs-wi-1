"use client";
import React, { useEffect, useRef, useState } from "react";
import "mind-ar/dist/mindar-image.prod.js";
import "aframe";
import "mind-ar/dist/mindar-image-aframe.prod.js";

export default function MindARViewer() {
  const sceneRef = useRef(null);
  const [currentAudio, setCurrentAudio] = useState(null); // Track currently playing audio

  useEffect(() => {
    const sceneEl = sceneRef.current;

    let arSystem = null;

    // Ensure AR system starts correctly
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

    // Add render start event listener
    sceneEl?.addEventListener("renderstart", handleRenderStart);

    const addEventListeners = () => {
      const audioUrls = {
        "speaker-icon-0": "https://cdn.glitch.global/84be45ad-dc75-4cd9-ba4f-7faa0bd8a924/George%20B.Post.mp3?v=1733346203149",
        "speaker-icon-1": "https://cdn.glitch.global/84be45ad-dc75-4cd9-ba4f-7faa0bd8a924/WisconsinCapitol.mp3?v=1733279649928",
        "speaker-icon-2": "https://cdn.glitch.global/84be45ad-dc75-4cd9-ba4f-7faa0bd8a924/LadyWisconsin.mp3?v=1733279577467",
        "speaker-icon-3": "https://cdn.glitch.global/84be45ad-dc75-4cd9-ba4f-7faa0bd8a924/DotysWashbowl.mp3?v=1733022223353",
      };
    
      let currentAudio = null; // Store the currently playing audio object
    
      Object.keys(audioUrls).forEach((id) => {
        const element = document.getElementById(id);
        if (element) {
          element.addEventListener("click", () => {
            const audioUrl = audioUrls[id];
    
            // If the current audio is the same as the clicked one, toggle play/pause
            if (currentAudio && currentAudio.src === audioUrl) {
              if (currentAudio.paused) {
                currentAudio.play();
              } else {
                currentAudio.pause();
              }
            } else {
              // Stop the currently playing audio if another audio is playing
              if (currentAudio) {
                currentAudio.pause();
                currentAudio.currentTime = 0;
              }
    
              // Create and play the new audio
              const newAudio = new Audio(audioUrl);
              newAudio.play();
              currentAudio = newAudio; // Update the current audio reference
            }
          });
        }
      });
    
      // Add video play/pause functionality
      const playButton = document.getElementById("play-button");
      const videoPlane = document.getElementById("video-plane");
    
      if (playButton && videoPlane) {
        playButton.addEventListener("click", () => {
          const videoElement = videoPlane.components.material.material.map.image;
          if (videoElement.paused) {
            videoElement.play();
            videoPlane.setAttribute("visible", "true");
          } else {
            videoElement.pause();
            videoPlane.setAttribute("visible", "false");
          }
        });
      }
    };



    // // Add event listeners for each speaker icon and play button
    // const addEventListeners = () => {
    //   const audioUrls = {
    //     "speaker-icon-0": "https://cdn.glitch.global/84be45ad-dc75-4cd9-ba4f-7faa0bd8a924/George%20B.Post.mp3?v=1733346203149",
    //     "speaker-icon-1": "https://cdn.glitch.global/84be45ad-dc75-4cd9-ba4f-7faa0bd8a924/WisconsinCapitol.mp3?v=1733279649928",
    //     "speaker-icon-2": "https://cdn.glitch.global/84be45ad-dc75-4cd9-ba4f-7faa0bd8a924/LadyWisconsin.mp3?v=1733279577467",
    //     "speaker-icon-3": "https://cdn.glitch.global/84be45ad-dc75-4cd9-ba4f-7faa0bd8a924/DotysWashbowl.mp3?v=1733022223353",
    //   };

    //   Object.keys(audioUrls).forEach((id) => {
    //     const element = document.getElementById(id);
    //     if (element) {
    //       element.addEventListener("click", () => {
    //         const newAudio = new Audio(audioUrls[id]);

    //         // Stop current audio if playing
    //         if (currentAudio) {
    //           currentAudio.pause();
    //           currentAudio.currentTime = 0;
    //         }

    //         // Play the new audio
    //         newAudio
    //           .play()
    //           .then(() => {
    //             console.log(`Playing audio for ${id}`);
    //             setCurrentAudio(newAudio); // Update current audio
    //           })
    //           .catch((err) => console.error(`Audio playback failed for ${id}:`, err));
    //       });
    //     }
    //   });

    //   // Add video play/pause functionality
    //   const playButton = document.getElementById("play-button");
    //   const videoPlane = document.getElementById("video-plane");

    //   if (playButton && videoPlane) {
    //     playButton.addEventListener("click", () => {
    //       const videoElement = videoPlane.components.material.material.map.image;
    //       if (videoElement.paused) {
    //         videoElement.play();
    //         videoPlane.setAttribute("visible", "true");
    //       } else {
    //         videoElement.pause();
    //         videoPlane.setAttribute("visible", "false");
    //       }
    //     });
    //   }
    // };

    // Wait for DOM elements to be ready before adding event listeners
    sceneEl?.addEventListener("loaded", addEventListeners);

    // Cleanup on unmount
    return () => {
      sceneEl?.removeEventListener("renderstart", handleRenderStart);
      sceneEl?.removeEventListener("loaded", addEventListeners);

      // Stop and cleanup the current audio
      if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
      }
    };
  }, [currentAudio]);

  return (
    <>
      <a-scene
        ref={sceneRef}
        mindar-image="imageTargetSrc: https://cdn.glitch.global/84be45ad-dc75-4cd9-ba4f-7faa0bd8a924/ForwardRewindMarkers.mind?v=1733176852299; autoStart: false; uiLoading: no; uiError: no; uiScanning: no; filterMinCF: 0.0001; missTolerance: 5; filterBeta: 0.007;"
        color-space="sRGB"
        embedded
        renderer="colorManagement: true, physicallyCorrectLights"
        vr-mode-ui="enabled: false"
        device-orientation-permission-ui="enabled: false"
        style={{ width: "100%", height: "100%", position: "absolute", top: 0, left: 0 }}
      >
        <a-assets>
          <a-asset-item id="georgePost" src="https://cdn.glitch.global/84be45ad-dc75-4cd9-ba4f-7faa0bd8a924/George-Post.glb?v=1733176910540"></a-asset-item>
          <a-asset-item id="wisconsinCapitol" src="https://cdn.glitch.global/84be45ad-dc75-4cd9-ba4f-7faa0bd8a924/WisconsinCapitol.glb?v=1733169937656"></a-asset-item>
          <a-asset-item id="wisconsinLady" src="https://cdn.glitch.global/84be45ad-dc75-4cd9-ba4f-7faa0bd8a924/WisconsinLady.glb?v=1733169536761"></a-asset-item>
          <a-asset-item id="jamesDoty" src="https://cdn.glitch.global/84be45ad-dc75-4cd9-ba4f-7faa0bd8a924/James-Doty-2.glb?v=1733018433769"></a-asset-item>
          <video id="video-lady-wisconsin" src="https://cdn.glitch.global/84be45ad-dc75-4cd9-ba4f-7faa0bd8a924/LadyWisconsinVid.mp4?v=1733611517402" preload="auto" crossOrigin="anonymous"></video>
        </a-assets>

        <a-camera
          position="0 0 0"
          look-controls="enabled: false"
          cursor="fuse: false; rayOrigin: mouse;"
          raycaster="objects: .clickable; far: 10000"
        ></a-camera>

        {/* Marker 0 */}
        <a-entity mindar-image-target="targetIndex: 0">
          <a-gltf-model src="#georgePost" position="0 0 0.1" scale="0.5 0.5 0.5"></a-gltf-model>
          <a-image
            id="speaker-icon-0"
            src="https://cdn.glitch.global/84be45ad-dc75-4cd9-ba4f-7faa0bd8a924/speakerIcon.png?v=1733616134961"
            position="0.4 0.3 0"
            scale="0.2 0.2 0.2"
            class="clickable"
          ></a-image>
        </a-entity>

        {/* Marker 1 */}
        <a-entity mindar-image-target="targetIndex: 1">
          <a-gltf-model src="#wisconsinCapitol" position="0 0 0.1" scale="0.5 0.5 0.5"></a-gltf-model>
          <a-image
            id="speaker-icon-1"
            src="https://cdn.glitch.global/84be45ad-dc75-4cd9-ba4f-7faa0bd8a924/speakerIcon.png?v=1733616134961"
            position="0.4 0.3 0"
            scale="0.2 0.2 0.2"
            class="clickable"
          ></a-image>
        </a-entity>

        {/* Marker 2 */}
        <a-entity mindar-image-target="targetIndex: 2">
          <a-gltf-model src="#wisconsinLady" position="0 0 0.1" scale="0.5 0.5 0.5"></a-gltf-model>
          <a-image
            id="speaker-icon-2"
            src="https://cdn.glitch.global/84be45ad-dc75-4cd9-ba4f-7faa0bd8a924/speakerIcon.png?v=1733616134961"
            position="0.4 0.3 0"
            scale="0.2 0.2 0.2"
            class="clickable"
          ></a-image>
          <a-image
            id="play-button"
            src="https://cdn.glitch.global/84be45ad-dc75-4cd9-ba4f-7faa0bd8a924/giftIcon.webp?v=1733613694275"
            position="0 0.9 0"
            scale="0.2 0.2 0.2"
            class="clickable"
          ></a-image>
          <a-video
            id="video-plane"
            src="#video-lady-wisconsin"
            position="0 0.9 0.11"
            scale="0.7 0.7 0.7"
            rotation="0 0 0"
            visible="false"
          ></a-video>
        </a-entity>

        {/* Marker 3 */}
        <a-entity mindar-image-target="targetIndex: 3">
          <a-gltf-model src="#jamesDoty" position="0 0 0.1" scale="0.5 0.5 0.5"></a-gltf-model>
          <a-image
            id="speaker-icon-3"
            src="https://cdn.glitch.global/84be45ad-dc75-4cd9-ba4f-7faa0bd8a924/speakerIcon.png?v=1733616134961"
            position="0.4 0.3 0"
            scale="0.2 0.2 0.2"
            class="clickable"
          ></a-image>
        </a-entity>
      </a-scene>
    </>
  );
}
