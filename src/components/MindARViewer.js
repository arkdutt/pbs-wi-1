// "use client";
// import React, { useEffect, useRef } from "react";
// import "mind-ar/dist/mindar-image.prod.js";
// import "aframe";
// import "mind-ar/dist/mindar-image-aframe.prod.js";

// export default function ModelWithSound() {
//   const sceneRef = useRef(null);

//   useEffect(() => {
//     const sceneEl = sceneRef.current;

//     // Ensure AR system starts correctly
//     const handleRenderStart = () => {
//       const arSystem = sceneEl?.systems?.["mindar-image-system"];
//       if (arSystem && typeof arSystem.start === "function") {
//         arSystem.start();
//       } else {
//         console.warn("AR system failed to start.");
//       }
//     };

//     // Add render start event listener
//     sceneEl?.addEventListener("renderstart", handleRenderStart);

//     // Clean up on unmount
//     return () => {
//       sceneEl?.removeEventListener("renderstart", handleRenderStart);
//     };
//   }, []);

//   // Play audio function
//   const handlePlayAudio = () => {
//     const audio = new Audio(
//       "https:/A/cdn.glitch.global/84be45ad-dc75-4cd9-ba4f-7faa0bd8a924/DotysWashbowl.mp3?v=1733022223353"
//     );
//     audio.play();
//   };

//   return (
//     <>
//       <a-scene
//         ref={sceneRef}
//         mindar-image="imageTargetSrc: https://cdn.glitch.global/68e5af42-4925-411b-a090-64dcec22f1bb/james-doty.mind?v=1732585705029; debugUIEnabled: true"
//         vr-mode-ui="enabled: false"
//         embedded
//         style={{ width: "100%", height: "100%", position: "absolute", top: 0, left: 0 }}
//       >
//         <a-camera position="0 0 0"></a-camera>
//         <a-entity mindar-image-target="targetIndex: 0">
//           {/* James Doty Model */}
//           <a-gltf-model
//             src="https://cdn.glitch.global/84be45ad-dc75-4cd9-ba4f-7faa0bd8a924/James-Doty-2.glb?v=1733018433769"
//             position="0 0 0.1"
//             scale="0.5 0.5 0.5"
//           ></a-gltf-model>

//           {/* Speaker Icon */}
//           <a-gltf-model
//             src="https://cdn.glitch.global/84be45ad-dc75-4cd9-ba4f-7faa0bd8a924/speakerIcon.glb?v=1733023701158"
//             position="0 0 0"
//             scale="0.005 0.005 0.005"
//             rotation="90 0 0"
//             events={{
//               click: handlePlayAudio, // Trigger audio on click
//             }}
//           ></a-gltf-model>
//         </a-entity>
//       </a-scene>

//       {/* Transparent Clickable Overlay */}
//       <div
//         id="clickable-area"
//         style={{
//           position: "absolute",
//           top: 0,
//           left: 0,
//           width: "100%",
//           height: "100%",
//           zIndex: 10,
//         }}
//         onClick={handlePlayAudio} // Trigger audio when overlay is clicked
//       ></div>
//     </>
//   );
// }








"use client";
import React, { useEffect, useRef, useState } from "react";
import "mind-ar/dist/mindar-image.prod.js";
import "aframe";
import "mind-ar/dist/mindar-image-aframe.prod.js";

export default function MindARViewer() {
  const sceneRef = useRef(null);
  const [currentModel, setCurrentModel] = useState(null); // Track current model index

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

    // Cleanup on unmount
    return () => {
      sceneEl?.removeEventListener("renderstart", handleRenderStart);
    };
  }, []);

  const playAudio = () => {
    if (currentModel === null) {
      console.error("No model detected. Cannot play audio.");
      return;
    }
  
    const audioUrls = {
      0: "https://cdn.glitch.global/84be45ad-dc75-4cd9-ba4f-7faa0bd8a924/George%20B.Post.mp3?v=1733346203149",
      1: "https://cdn.glitch.global/84be45ad-dc75-4cd9-ba4f-7faa0bd8a924/WisconsinCapitol.mp3?v=1733279649928",
      2: "https://cdn.glitch.global/84be45ad-dc75-4cd9-ba4f-7faa0bd8a924/LadyWisconsin.mp3?v=1733279577467",
      3: "https://cdn.glitch.global/84be45ad-dc75-4cd9-ba4f-7faa0bd8a924/DotysWashbowl.mp3?v=1733022223353",
    };
  
    const audioUrl = audioUrls[currentModel];
    if (audioUrl) {
      const audio = new Audio(audioUrl);
      audio
        .play()
        .then(() => console.log(`Playing audio for model ${currentModel}`))
        .catch((err) => console.error("Audio playback failed:", err));
    } else {
      console.error(`No audio found for the detected model: ${currentModel}`);
    }
  };


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
          <a-asset-item id="speaker" src="https://cdn.glitch.global/84be45ad-dc75-4cd9-ba4f-7faa0bd8a924/speakerIcon.glb?v=1733023701158"></a-asset-item>
        </a-assets>

        <a-camera position="0 0 0" look-controls="enabled: false"></a-camera>

        {/* Marker 0 */}
        <a-entity mindar-image-target="targetIndex: 0">
          <a-gltf-model src="#georgePost" position="0 0 0.1" scale="0.5 0.5 0.5"></a-gltf-model>
          <a-gltf-model
            src="#speaker"
            position="0 0 0"
            scale="0.005 0.005 0.005"
            rotation="90 0 0"
            events={{
              click: () => playAudio("https://cdn.glitch.global/84be45ad-dc75-4cd9-ba4f-7faa0bd8a924/George%20B.Post.mp3?v=1733346203149"),
            }}
          ></a-gltf-model>
        </a-entity>

        {/* Marker 1 */}
        <a-entity mindar-image-target="targetIndex: 1">
          <a-gltf-model src="#wisconsinCapitol" position="0 0 0.1" scale="0.5 0.5 0.5"></a-gltf-model>
          <a-gltf-model
            src="#speaker"
            position="0 0 0"
            scale="0.005 0.005 0.005"
            rotation="90 0 0"
            events={{
              click: () => playAudio("https://cdn.glitch.global/84be45ad-dc75-4cd9-ba4f-7faa0bd8a924/WisconsinCapitol.mp3?v=1733279649928"),
            }}
          ></a-gltf-model>
        </a-entity>

        {/* Marker 2 */}
        <a-entity mindar-image-target="targetIndex: 2">
          <a-gltf-model src="#wisconsinLady" position="0 0 0.1" scale="0.5 0.5 0.5"></a-gltf-model>
          <a-gltf-model
            src="#speaker"
            position="0 0 0"
            scale="0.005 0.005 0.005"
            rotation="90 0 0"
            events={{
              click: () => playAudio("https://cdn.glitch.global/84be45ad-dc75-4cd9-ba4f-7faa0bd8a924/LadyWisconsin.mp3?v=1733279577467"),
            }}
          ></a-gltf-model>
        </a-entity>

        {/* Marker 3 */}
        <a-entity mindar-image-target="targetIndex: 3">
          <a-gltf-model src="#jamesDoty" position="0 0 0.1" scale="0.5 0.5 0.5"></a-gltf-model>
          <a-gltf-model
            src="#speaker"
            position="0 0 0"
            scale="0.005 0.005 0.005"
            rotation="90 0 0"
            events={{
              click: () => playAudio("https://cdn.glitch.global/84be45ad-dc75-4cd9-ba4f-7faa0bd8a924/DotysWashbowl.mp3?v=1733022223353"),
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
        onClick={playAudio} // Dynamically play audio for the current model
      ></div>

    </>
  );
}





