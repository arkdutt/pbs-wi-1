"use client";
import React, { useEffect, useRef, useState } from "react";
import "mind-ar/dist/mindar-image.prod.js";
import "aframe";
import "mind-ar/dist/mindar-image-aframe.prod.js";

export default function MindARViewer() {
  const sceneRef = useRef(null);

  // Track currently playing audio
  const [currentAudio, setCurrentAudio] = useState(null);
  // State for pop-out caption text
  const [popupText, setPopupText] = useState(null);

  useEffect(() => {
    const sceneEl = sceneRef.current;
    let arSystem = null;

    // Initialize and start AR system
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
        }, 1000);
      }
    };

    sceneEl?.addEventListener("renderstart", handleRenderStart);

    // Set up UI interactions after scene loads
    const addEventListeners = () => {
      // Audio functionality for speaker icons
      const audioUrls = {
        "speaker-icon-0": "https://cdn.glitch.global/84be45ad-dc75-4cd9-ba4f-7faa0bd8a924/George%20B.Post.mp3?v=1733346203149",
        "speaker-icon-1": "https://cdn.glitch.global/84be45ad-dc75-4cd9-ba4f-7faa0bd8a924/WisconsinCapitol.mp3?v=1733279649928",
        "speaker-icon-2": "https://cdn.glitch.global/84be45ad-dc75-4cd9-ba4f-7faa0bd8a924/LadyWisconsin.mp3?v=1733279577467",
        "speaker-icon-3": "https://cdn.glitch.global/84be45ad-dc75-4cd9-ba4f-7faa0bd8a924/DotysWashbowl.mp3?v=1733022223353",
      };

      Object.keys(audioUrls).forEach((id) => {
        const element = document.getElementById(id);
        if (element) {
          element.addEventListener("click", () => {
            const audioUrl = audioUrls[id];
            // Toggle play/pause or switch audio
            if (currentAudio && currentAudio.src === audioUrl) {
              if (currentAudio.paused) {
                currentAudio.play();
              } else {
                currentAudio.pause();
              }
            } else {
              if (currentAudio) {
                currentAudio.pause();
                currentAudio.currentTime = 0;
                setCurrentAudio(null);
              }
              const newAudio = new Audio(audioUrl);
              newAudio.play();
              setCurrentAudio(newAudio);
            }
          });
        }
      });

      // Video play/pause functionality
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

      // Closed-caption (CC) button functionality
      document.querySelectorAll(".cc-icon").forEach((ccElement) => {
        ccElement.addEventListener("click", () => {
          const text = ccElement.getAttribute("data-text");
          setPopupText(text);
        });
      });
    };

    // Handle target detection (appear, animate, and disappear models)
    const handleTargetFound = (e) => {
      console.log("Target found", e);
      const targetIndex = e.target.getAttribute("mindar-image-target").targetIndex;
      const modelMap = {
        0: "georgePostModel",
        1: "wisconsinCapitolModel",
        2: "wisconsinLadyModel",
        3: "jamesDotyModel",
      };
      const modelId = modelMap[targetIndex];
      const model = document.querySelector(`#${modelId}`);

      if (model) {
        model.setAttribute("visible", "true");
        model.setAttribute("animation", {
          property: "scale",
          to: "0.5 0.5 0.5",
          dur: 1000,
          easing: "easeOutQuad",
        });
        // Add spinning animation
        model.setAttribute("animation__spin", {
          property: "rotation",
          to: "0 360 0",
          dur: 3000,
          loop: true,
          easing: "linear",
        });
        // Stop spinning after 3 seconds
        setTimeout(() => {
          model.removeAttribute("animation__spin");
        }, 3000);
      }
    };

    const handleTargetLost = (e) => {
      console.log("Target lost", e);
      const targetIndex = e.target.getAttribute("mindar-image-target").targetIndex;
      const modelMap = {
        0: "georgePostModel",
        1: "wisconsinCapitolModel",
        2: "wisconsinLadyModel",
        3: "jamesDotyModel",
      };
      const modelId = modelMap[targetIndex];
      const model = document.querySelector(`#${modelId}`);

      if (model) {
        model.setAttribute("animation", {
          property: "scale",
          to: "0 0 0",
          dur: 500,
          easing: "easeInQuad",
        });
        model.setAttribute("visible", "false");
        // Remove spinning animation
        model.removeAttribute("animation__spin");
      }

      // Stop any playing audio when marker is lost
      if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
        setCurrentAudio(null);
      }

      // Close CC popup when marker is lost
      setPopupText(null);
    };

    sceneEl?.addEventListener("targetFound", handleTargetFound);
    sceneEl?.addEventListener("targetLost", handleTargetLost);

    // Track click counts for each model interaction
    const clickCounts = new Map();

    // Handle model interactions (scale animations, spin after 5 clicks)
    const handleModelInteraction = (modelId) => {
      const model = document.querySelector(`#${modelId}`);
      if (!model) return;

      if (!clickCounts.has(modelId)) {
        clickCounts.set(modelId, 0);
      }

      const handleClick = () => {
        let currentCount = clickCounts.get(modelId) + 1;
        clickCounts.set(modelId, currentCount);

        // Make sure the model is visible and properly scaled
        model.setAttribute("visible", "true");
        model.removeAttribute("animation__scaleup");
        model.removeAttribute("animation__scaledown");
        model.setAttribute("scale", "0.5 0.5 0.5");

        model.setAttribute("animation__scaleup", {
          property: "scale",
          to: "0.6 0.6 0.6",
          dur: 200,
          easing: "easeOutQuad",
        });
        model.setAttribute("animation__scaledown", {
          property: "scale",
          to: "0.5 0.5 0.5",
          dur: 200,
          easing: "easeOutQuad",
          startEvents: "animationcomplete__scaleup",
        });

        if (currentCount === 5) {
          // Reset click count
          clickCounts.set(modelId, 0);

          // Make sure model is visible and scaled as in handleTargetFound
          model.setAttribute("visible", "true");
          model.setAttribute("scale", "0.5 0.5 0.5");

          // Remove any previous animations that could conflict
          model.removeAttribute("animation__scaleup");
          model.removeAttribute("animation__scaledown");
          model.removeAttribute("animation__spin");

          // Set the spin animation exactly like in handleTargetFound
          model.setAttribute("animation__spin", {
            property: "rotation",
            from: "0 0 0",
            to: "0 360 0",
            dur: 3000,
            easing: "linear",
            loop: false
          });

          // Remove the spin after it completes, just like handleTargetFound does
          setTimeout(() => {
            model.removeAttribute("animation__spin");
          }, 3000);
        }
      };

      model.addEventListener("click", handleClick);
      return handleClick;
    };

    const cleanupHandlers = new Map();
    const models = document.querySelectorAll(".interactive-model");
    models.forEach((model) => {
      const handler = handleModelInteraction(model.id);
      cleanupHandlers.set(model.id, handler);
    });

    // Handle sound icons interactions (scale animations)
    const handleSoundIconInteraction = (iconId) => {
      const icon = document.querySelector(`#${iconId}`);
      if (!icon) return;

      const handleClick = () => {
        icon.removeAttribute("animation__scaleup");
        icon.removeAttribute("animation__scaledown");
        icon.setAttribute("animation__scaleup", {
          property: "scale",
          to: "0.15 0.15 0.15",
          dur: 200,
          easing: "easeOutQuad",
        });
        icon.setAttribute("animation__scaledown", {
          property: "scale",
          to: "0.1 0.1 0.1",
          dur: 200,
          easing: "easeInQuad",
          startEvents: "animationcomplete__scaleup",
        });
      };

      icon.addEventListener("click", handleClick);
      return handleClick;
    };

    const soundIcons = ["speaker-icon-0", "speaker-icon-1", "speaker-icon-2", "speaker-icon-3"];
    const soundIconCleanupHandlers = new Map();
    soundIcons.forEach((iconId) => {
      const handler = handleSoundIconInteraction(iconId);
      soundIconCleanupHandlers.set(iconId, handler);
    });

    // Handle CC buttons interactions (scale animations)
    const handleCCButtonInteraction = (ccId) => {
      const ccButton = document.querySelector(`#${ccId}`);
      if (!ccButton) return;

      const handleClick = () => {
        ccButton.removeAttribute("animation__scaleup");
        ccButton.removeAttribute("animation__scaledown");
        ccButton.setAttribute("animation__scaleup", {
          property: "scale",
          to: "0.15 0.15 0.15",
          dur: 200,
          easing: "easeOutQuad",
        });
        ccButton.setAttribute("animation__scaledown", {
          property: "scale",
          to: "0.1 0.1 0.1",
          dur: 200,
          easing: "easeInQuad",
          startEvents: "animationcomplete__scaleup",
        });
      };

      ccButton.addEventListener("click", handleClick);
      return handleClick;
    };

    const ccButtons = ["cc-icon-0", "cc-icon-1", "cc-icon-2", "cc-icon-3"];
    const ccButtonCleanupHandlers = new Map();
    ccButtons.forEach((ccId) => {
      const handler = handleCCButtonInteraction(ccId);
      ccButtonCleanupHandlers.set(ccId, handler);
    });

    // Handle giftbox interactions (if any)
    const handleGiftboxInteraction = (giftboxId) => {
      const giftbox = document.querySelector(`#${giftboxId}`);
      if (!giftbox) return;

      const handleClick = () => {
        giftbox.removeAttribute("animation__scaleup");
        giftbox.removeAttribute("animation__scaledown");
        giftbox.setAttribute("animation__scaleup", {
          property: "scale",
          to: "0.25 0.25 0.25",
          dur: 200,
          easing: "easeOutQuad",
        });
        giftbox.setAttribute("animation__scaledown", {
          property: "scale",
          to: "0.2 0.2 0.2",
          dur: 200,
          easing: "easeInQuad",
          startEvents: "animationcomplete__scaleup",
        });
      };

      giftbox.addEventListener("click", handleClick);
      return handleClick;
    };

    const giftboxes = ["play-button"];
    const giftboxCleanupHandlers = new Map();
    giftboxes.forEach((giftboxId) => {
      const handler = handleGiftboxInteraction(giftboxId);
      giftboxCleanupHandlers.set(giftboxId, handler);
    });

    sceneEl?.addEventListener("renderstart", handleRenderStart);
    sceneEl?.addEventListener("loaded", addEventListeners);

    return () => {
      // Cleanup giftbox event listeners
      giftboxes.forEach((giftboxId) => {
        const giftbox = document.querySelector(`#${giftboxId}`);
        const handler = giftboxCleanupHandlers.get(giftboxId);
        if (giftbox && handler) {
          giftbox.removeEventListener("click", handler);
        }
      });

      // Cleanup CC button event listeners
      ccButtons.forEach((ccId) => {
        const ccButton = document.querySelector(`#${ccId}`);
        const handler = ccButtonCleanupHandlers.get(ccId);
        if (ccButton && handler) {
          ccButton.removeEventListener("click", handler);
        }
      });

      // Cleanup sound icon event listeners
      soundIcons.forEach((iconId) => {
        const icon = document.querySelector(`#${iconId}`);
        const handler = soundIconCleanupHandlers.get(iconId);
        if (icon && handler) {
          icon.removeEventListener("click", handler);
        }
      });

      // Cleanup model event listeners
      models.forEach((model) => {
        const handler = cleanupHandlers.get(model.id);
        if (handler) {
          model.removeEventListener("click", handler);
        }
      });

      cleanupHandlers.clear();
      clickCounts.clear();

      // Cleanup AR events
      sceneEl?.removeEventListener("targetFound", handleTargetFound);
      sceneEl?.removeEventListener("targetLost", handleTargetLost);
      sceneEl?.removeEventListener("renderstart", handleRenderStart);
      sceneEl?.removeEventListener("loaded", addEventListeners);

      if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
      }
    };
  }, [currentAudio]);

  return (
    <>
      {/* CC Pop-out Overlay */}
      {popupText && (
        <div
          style={{
            position: "absolute",
            top: "10%",
            left: "10%",
            background: "rgba(0, 0, 0, 0.8)",
            color: "#fff",
            padding: "20px",
            borderRadius: "10px",
            zIndex: 1000,
          }}
        >
          <p>{popupText}</p>
          <button
            onClick={() => setPopupText(null)}
            style={{
              marginTop: "10px",
              backgroundColor: "#007BFF",
              color: "#fff",
              border: "none",
              padding: "10px 20px",
              cursor: "pointer",
            }}
          >
            Close
          </button>
        </div>
      )}

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
          <video
            id="video-lady-wisconsin"
            src="https://cdn.glitch.global/84be45ad-dc75-4cd9-ba4f-7faa0bd8a924/LadyWisconsinVid.mp4?v=1733611517402"
            preload="auto"
            crossOrigin="anonymous"
          ></video>
        </a-assets>

        <a-camera
          position="0 0 0"
          look-controls="enabled: false"
          cursor="fuse: false; rayOrigin: mouse;"
          raycaster="objects: .clickable; far: 10000"
        ></a-camera>

        {/* Marker 0 */}
        <a-entity mindar-image-target="targetIndex: 0">
          <a-gltf-model
            id="georgePostModel"
            src="#georgePost"
            position="0 0 0.1"
            scale="0 0 0"
            visible="false"
            class="interactive-model clickable"
          ></a-gltf-model>
          <a-image
            id="speaker-icon-0"
            src="https://cdn.glitch.global/84be45ad-dc75-4cd9-ba4f-7faa0bd8a924/speakerIcon.jpeg?v=1733618136510"
            position="0.4 0.3 0"
            scale="0.1 0.1 0.1"
            class="clickable"
          ></a-image>
          <a-image
            id="cc-icon-0"
            class="cc-icon clickable"
            src="https://cdn.glitch.global/142aa6f9-3bd6-4455-b12e-f96d9dc9bd7d/closed-captioning-icon-in-gradient-colors-cc-signs-illustration-png.webp?v=1733639276440"
            position="-0.4 -0.3 0"
            scale="0.1 0.1 0.1"
            data-text="To understand the Wisconsin State Capitol, it helps to look to New York City. That’s where the building’s architect, George B. Post, lived most of his life and designed many innovative buildings of his era."
          ></a-image>
        </a-entity>

        {/* Marker 1 */}
        <a-entity mindar-image-target="targetIndex: 1">
          <a-gltf-model
            id="wisconsinCapitolModel"
            src="#wisconsinCapitol"
            position="0 0 0.1"
            scale="0 0 0"
            visible="false"
            class="interactive-model clickable"
          ></a-gltf-model>
          <a-image
            id="speaker-icon-1"
            src="https://cdn.glitch.global/84be45ad-dc75-4cd9-ba4f-7faa0bd8a924/speakerIcon.jpeg?v=1733618136510"
            position="0.4 0.3 0"
            scale="0.1 0.1 0.1"
            class="clickable"
          ></a-image>
          <a-image
            id="cc-icon-1"
            class="cc-icon clickable"
            src="https://cdn.glitch.global/142aa6f9-3bd6-4455-b12e-f96d9dc9bd7d/closed-captioning-icon-in-gradient-colors-cc-signs-illustration-png.webp?v=1733639276440"
            position="-0.6 -0.3 0"
            scale="0.1 0.1 0.1"
            data-text="The Wisconsin State Capitol stands majestically at the heart of downtown Madison, a towering symbol of the state’s government and rich history. Its gleaming white dome rises above the city skyline, reflecting not only the architectural beauty but also the stories of the people and events that have shaped Wisconsin.\n\nConstruction on the current Capitol began in 1906, but this wasn’t the first Capitol building on the site. Two previous structures had stood in its place—both of which were destroyed by fires, the second of which occurred in 1904, leaving the state in need of a new, grander home for its government. Determined to build something that would stand the test of time, the state enlisted the help of George B. Post, a renowned architect from New York."
          ></a-image>
        </a-entity>

        {/* Marker 2 */}
        <a-entity mindar-image-target="targetIndex: 2">
          <a-gltf-model
            id="wisconsinLadyModel"
            src="#wisconsinLady"
            position="0 0 0.1"
            scale="0 0 0"
            visible="false"
            class="interactive-model clickable"
          ></a-gltf-model>
          <a-image
            id="speaker-icon-2"
            src="https://cdn.glitch.global/84be45ad-dc75-4cd9-ba4f-7faa0bd8a924/speakerIcon.jpeg?v=1733618136510"
            position="0.4 0.3 0"
            scale="0.1 0.1 0.1"
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
          <a-image
            id="cc-icon-2"
            class="cc-icon clickable"
            src="https://cdn.glitch.global/142aa6f9-3bd6-4455-b12e-f96d9dc9bd7d/closed-captioning-icon-in-gradient-colors-cc-signs-illustration-png.webp?v=1733639276440"
            position="-0.4 -0.3 0"
            scale="0.1 0.1 0.1"
            data-text="Commonly mistaken for Miss Forward, this statue is actually named Wisconsin. Standing at a height of 15 feet and five inches and weighing three tons, it proudly sits atop the Wisconsin State Capitol building. The statue was crafted by Daniel Chester French, the same artist behind the iconic statue of Abraham Lincoln at the Lincoln Memorial in Washington, DC."
          ></a-image>
        </a-entity>

        {/* Marker 3 */}
        <a-entity mindar-image-target="targetIndex: 3">
          <a-gltf-model
            id="jamesDotyModel"
            src="#jamesDoty"
            position="0 0 0.1"
            scale="0 0 0"
            visible="false"
            class="interactive-model clickable"
          ></a-gltf-model>
          <a-image
            id="speaker-icon-3"
            src="https://cdn.glitch.global/84be45ad-dc75-4cd9-ba4f-7faa0bd8a924/speakerIcon.jpeg?v=1733618136510"
            position="0.4 0.3 0"
            scale="0.1 0.1 0.1"
            class="clickable"
          ></a-image>
          <a-image
            id="cc-icon-3"
            class="cc-icon clickable"
            src="https://cdn.glitch.global/142aa6f9-3bd6-4455-b12e-f96d9dc9bd7d/closed-captioning-icon-in-gradient-colors-cc-signs-illustration-png.webp?v=1733639276440"
            position="-0.6 -0.3 0"
            scale="0.1 0.1 0.1"
            data-text="Madison's first Capitol Building was constructed on the square Doty at earmark.\nBy the time Wisconsin achieved statehood in 1848, this cold and leaky capital had earned the uncomplimentary nickname 'Doty's Wash Bowl.'"
          ></a-image>
        </a-entity>
      </a-scene>
    </>
  );
}
