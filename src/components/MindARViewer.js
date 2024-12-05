// "use client";
// import React, { useEffect, useRef, useState } from "react";
// import "mind-ar/dist/mindar-image.prod.js";
// import "aframe";
// import "mind-ar/dist/mindar-image-aframe.prod.js";

// export default () => {
//   const sceneRef = useRef(null);

//   // State for visibility and audio playback
//   const [activeModel, setActiveModel] = useState(null); // Tracks the currently visible model
//   const [isAudioPlaying, setIsAudioPlaying] = useState(false);

//   const audioRefs = {
//     georgePost: useRef(null),
//     wisconsinCapitol: useRef(null),
//     wisconsinLady: useRef(null),
//     jamesDoty: useRef(null),
//   };

//   useEffect(() => {
//     const sceneEl = sceneRef.current;

//     let arSystem = null;
//     const handleRenderStart = () => {
//       console.log("Render start triggered");
//       arSystem = sceneEl?.systems?.["mindar-image-system"];
//       if (arSystem && typeof arSystem.start === "function") {
//         console.log("AR system successfully initialized.");
//         arSystem.start();
//       } else {
//         console.warn("AR system not initialized correctly. Retrying...");
//         setTimeout(() => {
//           arSystem = sceneEl?.systems?.["mindar-image-system"];
//           if (arSystem && typeof arSystem.start === "function") {
//             console.log("AR system successfully initialized after retry.");
//             arSystem.start();
//           } else {
//             console.error("Failed to initialize AR system after retry.");
//           }
//         }, 1000); // Retry after 1 second
//       }
//     };

//     // Add event listener to handle system start
//     sceneEl?.addEventListener("renderstart", handleRenderStart);

//     // Cleanup function to safely stop the AR system
//     return () => {
//       sceneEl?.removeEventListener("renderstart", handleRenderStart);
//       if (arSystem && typeof arSystem.stop === "function") {
//         arSystem.stop(); // Safely stop AR
//         console.log("AR stopped");
//       }
//     };
//   }, []);

//   const handleModelVisibility = (model, isVisible) => {
//     if (isVisible) {
//       setActiveModel(model);
//       setIsAudioPlaying(false);
//       if (audioRefs[model]?.current) {
//         audioRefs[model].current.play();
//         setIsAudioPlaying(true);
//       }
//     } else {
//       if (audioRefs[model]?.current) {
//         audioRefs[model].current.pause();
//       }
//       setActiveModel(null);
//       setIsAudioPlaying(false);
//     }
//   };

//   const handleAudioToggle = () => {
//     if (activeModel && audioRefs[activeModel]?.current) {
//       if (isAudioPlaying) {
//         audioRefs[activeModel].current.pause();
//       } else {
//         audioRefs[activeModel].current.play();
//       }
//       setIsAudioPlaying(!isAudioPlaying);
//     }
//   };

//   return (
//     <>
//       {/* Audio Elements */}
//       <audio ref={audioRefs.georgePost} src="https://example.com/george-post-audio.mp3"></audio>
//       <audio ref={audioRefs.wisconsinCapitol} src="https://example.com/wisconsin-capitol-audio.mp3"></audio>
//       <audio ref={audioRefs.wisconsinLady} src="https://example.com/wisconsin-lady-audio.mp3"></audio>
//       <audio ref={audioRefs.jamesDoty} src="https://cdn.glitch.global/84be45ad-dc75-4cd9-ba4f-7faa0bd8a924/DotysWashbowl.mp3?v=1733022223353"></audio>

//       <a-scene
//         ref={sceneRef}
//         mindar-image="imageTargetSrc: https://cdn.glitch.global/84be45ad-dc75-4cd9-ba4f-7faa0bd8a924/ForwardRewindMarkers.mind?v=1733176852299; autoStart: false; uiLoading: no; uiError: no; uiScanning: no; filterMinCF: 0.0001; missTolerance: 5; filterBeta: 0.007;"
//         color-space="sRGB"
//         embedded
//         renderer="colorManagement: true, physicallyCorrectLights"
//         vr-mode-ui="enabled: false"
//         device-orientation-permission-ui="enabled: false"
//       >
//         <a-assets>
//           {/* 3D models */}
//           <a-asset-item id="georgePost" src="https://cdn.glitch.global/84be45ad-dc75-4cd9-ba4f-7faa0bd8a924/George-Post.glb?v=1733176910540"></a-asset-item>
//           <a-asset-item id="wisconsinCapitol" src="https://cdn.glitch.global/84be45ad-dc75-4cd9-ba4f-7faa0bd8a924/WisconsinCapitol.glb?v=1733169937656"></a-asset-item>
//           <a-asset-item id="wisconsinLady" src="https://cdn.glitch.global/84be45ad-dc75-4cd9-ba4f-7faa0bd8a924/WisconsinLady.glb?v=1733169536761"></a-asset-item>
//           <a-asset-item id="jamesDoty" src="https://cdn.glitch.global/84be45ad-dc75-4cd9-ba4f-7faa0bd8a924/James-Doty-2.glb?v=1733018433769"></a-asset-item>

//           {/* Sound icon */}
//           <img
//             id="soundOn"
//             alt=""
//             src="https://cdn.glitch.global/c2eee5e0-25e4-44da-aa9e-f014628917c1/fa311e78-2dae-4fe6-ae68-2648dddae3ce.image.png?v=1733351296496"
//             crossOrigin="anonymous"
//           />
//         </a-assets>

//         <a-camera position="0 0 0" look-controls="enabled: false"></a-camera>

//         {/* Marker 0: George Post */}
//         <a-entity
//           mindar-image-target="targetIndex: 0"
//           events={{
//             targetFound: () => handleModelVisibility("georgePost", true),
//             targetLost: () => handleModelVisibility("georgePost", false),
//           }}
//         >
//           <a-gltf-model
//             rotation="0 0 0"
//             position="0 0 0.1"
//             scale="0.5 0.5 0.5"
//             src="#georgePost"
//           ></a-gltf-model>
//           {activeModel === "georgePost" && (
//             <a-image
//               id="sound-button"
//               class="clickable"
//               src="#soundOn"
//               position="-0.7 0 0"
//               height="0.15"
//               width="0.15"
//               events={{ click: handleAudioToggle }}
//             ></a-image>
//           )}
//         </a-entity>

//         {/* Marker 1: Wisconsin Capitol */}
//         <a-entity
//           mindar-image-target="targetIndex: 1"
//           events={{
//             targetFound: () => handleModelVisibility("wisconsinCapitol", true),
//             targetLost: () => handleModelVisibility("wisconsinCapitol", false),
//           }}
//         >
//           <a-gltf-model
//             rotation="0 0 0"
//             position="0 0 0.1"
//             scale="0.5 0.5 0.5"
//             src="#wisconsinCapitol"
//           ></a-gltf-model>
//           {activeModel === "wisconsinCapitol" && (
//             <a-image
//               id="sound-button"
//               class="clickable"
//               src="#soundOn"
//               position="-0.7 0 0"
//               height="0.15"
//               width="0.15"
//               events={{ click: handleAudioToggle }}
//             ></a-image>
//           )}
//         </a-entity>

//         {/* Marker 2: Wisconsin Lady */}
//         <a-entity
//           mindar-image-target="targetIndex: 2"
//           events={{
//             targetFound: () => handleModelVisibility("wisconsinLady", true),
//             targetLost: () => handleModelVisibility("wisconsinLady", false),
//           }}
//         >
//           <a-gltf-model
//             rotation="0 0 0"
//             position="0 0 0.1"
//             scale="0.5 0.5 0.5"
//             src="#wisconsinLady"
//           ></a-gltf-model>
//           {activeModel === "wisconsinLady" && (
//             <a-image
//               id="sound-button"
//               class="clickable"
//               src="#soundOn"
//               position="-0.7 0 0"
//               height="0.15"
//               width="0.15"
//               events={{ click: handleAudioToggle }}
//             ></a-image>
//           )}
//         </a-entity>

//         {/* Marker 3: James Doty */}
//         <a-entity
//           mindar-image-target="targetIndex: 3"
//           events={{
//             targetFound: () => handleModelVisibility("jamesDoty", true),
//             targetLost: () => handleModelVisibility("jamesDoty", false),
//           }}
//         >
//           <a-gltf-model
//             rotation="0 0 0"
//             position="0 0 0.1"
//             scale="0.5 0.5 0.5"
//             src="#jamesDoty"
//           ></a-gltf-model>
//           {activeModel === "jamesDoty" && (
//             <a-image
//               id="sound-button"
//               class="clickable"
//               src="#soundOn"
//               position="-0.7 0 0"
//               height="0.15"
//               width="0.15"
//               events={{ click: handleAudioToggle }}
//             ></a-image>
//           )}
//         </a-entity>
//       </a-scene>
//     </>
//   );
// };

"use client";
import React, { useEffect, useRef } from "react";
import "mind-ar/dist/mindar-image.prod.js";
import "aframe";
import "mind-ar/dist/mindar-image-aframe.prod.js";

export default function MultipleModelsWithAudio() {
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
  const handlePlayAudio = (audioUrl) => {
    const audio = new Audio(audioUrl);
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

        {/* Model 1: James Doty */}
        <a-entity mindar-image-target="targetIndex: 0">
          <a-gltf-model
            src="https://cdn.glitch.global/84be45ad-dc75-4cd9-ba4f-7faa0bd8a924/James-Doty-2.glb?v=1733018433769"
            position="0 0 0.1"
            scale="0.5 0.5 0.5"
          ></a-gltf-model>
          <a-gltf-model
            src="https://cdn.glitch.global/84be45ad-dc75-4cd9-ba4f-7faa0bd8a924/speakerIcon.glb?v=1733023701158"
            position="0 0 0"
            scale="0.005 0.005 0.005"
            rotation="90 0 0"
            events={{
              click: () =>
                handlePlayAudio(
                  "https://cdn.glitch.global/84be45ad-dc75-4cd9-ba4f-7faa0bd8a924/DotysWashbowl.mp3?v=1733022223353"
                ),
            }}
          ></a-gltf-model>
        </a-entity>

        {/* Model 2: George Post */}
        <a-entity mindar-image-target="targetIndex: 1">
          <a-gltf-model
            src="https://cdn.glitch.global/84be45ad-dc75-4cd9-ba4f-7faa0bd8a924/George-Post.glb?v=1733176910540"
            position="0 0 0.1"
            scale="0.5 0.5 0.5"
          ></a-gltf-model>
          <a-gltf-model
            src="https://cdn.glitch.global/84be45ad-dc75-4cd9-ba4f-7faa0bd8a924/speakerIcon.glb?v=1733023701158"
            position="0 0 0"
            scale="0.005 0.005 0.005"
            rotation="90 0 0"
            events={{
              click: () =>
                handlePlayAudio(
                  "https://cdn.glitch.global/84be45ad-dc75-4cd9-ba4f-7faa0bd8a924/GeorgePostAudio.mp3"
                ),
            }}
          ></a-gltf-model>
        </a-entity>

        {/* Model 3: Wisconsin Capitol */}
        <a-entity mindar-image-target="targetIndex: 2">
          <a-gltf-model
            src="https://cdn.glitch.global/84be45ad-dc75-4cd9-ba4f-7faa0bd8a924/WisconsinCapitol.glb?v=1733169937656"
            position="0 0 0.1"
            scale="0.5 0.5 0.5"
          ></a-gltf-model>
          <a-gltf-model
            src="https://cdn.glitch.global/84be45ad-dc75-4cd9-ba4f-7faa0bd8a924/speakerIcon.glb?v=1733023701158"
            position="0 0 0"
            scale="0.005 0.005 0.005"
            rotation="90 0 0"
            events={{
              click: () =>
                handlePlayAudio(
                  "https://cdn.glitch.global/84be45ad-dc75-4cd9-ba4f-7faa0bd8a924/WisconsinCapitolAudio.mp3"
                ),
            }}
          ></a-gltf-model>
        </a-entity>

        {/* Model 4: Wisconsin Lady */}
        <a-entity mindar-image-target="targetIndex: 3">
          <a-gltf-model
            src="https://cdn.glitch.global/84be45ad-dc75-4cd9-ba4f-7faa0bd8a924/WisconsinLady.glb?v=1733169536761"
            position="0 0 0.1"
            scale="0.5 0.5 0.5"
          ></a-gltf-model>
          <a-gltf-model
            src="https://cdn.glitch.global/84be45ad-dc75-4cd9-ba4f-7faa0bd8a924/speakerIcon.glb?v=1733023701158"
            position="0 0 0"
            scale="0.005 0.005 0.005"
            rotation="90 0 0"
            events={{
              click: () =>
                handlePlayAudio(
                  "https://cdn.glitch.global/84be45ad-dc75-4cd9-ba4f-7faa0bd8a924/WisconsinLadyAudio.mp3"
                ),
            }}
          ></a-gltf-model>
        </a-entity>
      </a-scene>
    </>
  );
}
