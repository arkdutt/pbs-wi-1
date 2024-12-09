"use client";
import React, { useEffect, useRef, useState } from "react";
import "mind-ar/dist/mindar-image.prod.js";
import "aframe";
import "mind-ar/dist/mindar-image-aframe.prod.js";

export default function MindARViewer() {
  const sceneRef = useRef(null);
  const [popupText, setPopupText] = useState(null);

  useEffect(() => {
    const sceneEl = sceneRef.current;
    let arSystem = null;

    // This function attempts to start the AR system after the scene is rendered.
    // If the system isn't immediately available, it tries again after a short delay.
    const handleRenderStart = () => {
      arSystem = sceneEl?.systems?.["mindar-image-system"];
      if (arSystem && typeof arSystem.start === "function") {
        arSystem.start();
      } else {
        // Retry after 1 second if AR system is not ready yet
        setTimeout(() => {
          arSystem = sceneEl?.systems?.["mindar-image-system"];
          if (arSystem && typeof arSystem.start === "function") {
            arSystem.start();
          }
        }, 1000);
      }
    };

    // This function sets up event listeners for various interactive elements:
    // - Speaker icons for audio playback (play/pause on click).
    // - A gift icon for toggling a hidden video.
    // - Closed-caption (CC) icons for displaying popup text overlays.
    const addEventListeners = () => {
      const audioUrls = {
        "speaker-icon-0":
          "https://cdn.glitch.global/84be45ad-dc75-4cd9-ba4f-7faa0bd8a924/George%20B.Post.mp3?v=1733346203149",
        "speaker-icon-1":
          "https://cdn.glitch.global/84be45ad-dc75-4cd9-ba4f-7faa0bd8a924/WisconsinCapitol.mp3?v=1733279649928",
        "speaker-icon-2":
          "https://cdn.glitch.global/84be45ad-dc75-4cd9-ba4f-7faa0bd8a924/LadyWisconsin.mp3?v=1733279577467",
        "speaker-icon-3":
          "https://cdn.glitch.global/84be45ad-dc75-4cd9-ba4f-7faa0bd8a924/DotysWashbowl.mp3?v=1733022223353",
      };

      // Add click interactions for each speaker icon to play/pause corresponding audio.
      Object.keys(audioUrls).forEach((id) => {
        const speakerIcon = document.getElementById(id);
        const audioUrl = audioUrls[id];
        if (speakerIcon) {
          let audioInstance = null;
          const modelElement = speakerIcon.closest("a-entity[mindar-image-target]");

          speakerIcon.addEventListener("click", () => {
            if (!audioInstance) {
              audioInstance = new Audio(audioUrl);
            }
            // Toggle play/pause on click
            if (audioInstance.paused) {
              audioInstance.play();
            } else {
              audioInstance.pause();
            }

            // Trigger a small scale animation on the icon for feedback
            speakerIcon.removeAttribute("animation__scaleup");
            speakerIcon.removeAttribute("animation__scaledown");
            speakerIcon.setAttribute("animation__scaleup", {
              property: "scale",
              to: "0.01 0.01 0.01",
              dur: 200,
              easing: "easeOutQuad",
            });
            speakerIcon.setAttribute("animation__scaledown", {
              property: "scale",
              to: "0.008 0.008 0.008",
              dur: 200,
              easing: "easeInQuad",
              startEvents: "animationcomplete__scaleup",
            });
          });

          // If the target image is lost, stop and reset the audio.
          if (modelElement) {
            modelElement.addEventListener("targetLost", () => {
              if (audioInstance) {
                audioInstance.pause();
                audioInstance.currentTime = 0;
                audioInstance = null;
              }
            });
          }
        }
      });

      // Handle play/pause of a hidden video triggered by a gift icon.
      const playButton = document.getElementById("play-button");
      const videoPlane = document.getElementById("video-plane");
      if (playButton && videoPlane) {
        playButton.addEventListener("click", () => {
          const videoElement = videoPlane.components.material.material.map.image;
          // Toggle the video and its visibility
          if (videoElement.paused) {
            videoElement.play();
            videoPlane.setAttribute("visible", "true");
          } else {
            videoElement.pause();
            videoPlane.setAttribute("visible", "false");
          }

          // Animate the play button for user feedback
          playButton.removeAttribute("animation__scaleup");
          playButton.removeAttribute("animation__scaledown");
          playButton.setAttribute("animation__scaleup", {
            property: "scale",
            to: "0.25 0.25 0.25",
            dur: 200,
            easing: "easeOutQuad",
          });
          playButton.setAttribute("animation__scaledown", {
            property: "scale",
            to: "0.2 0.2 0.2",
            dur: 200,
            easing: "easeInQuad",
            startEvents: "animationcomplete__scaleup",
          });
        });
      }

      // CC icons: On click, display popup text overlay.
      // This makes it easier for viewers to read additional info about the displayed model.
      document.querySelectorAll(".cc-icon").forEach((ccElement) => {
        ccElement.addEventListener("click", () => {
          const text = ccElement.getAttribute("data-text");
          setPopupText(text);

          // Animate the CC icon to provide visual feedback of interaction
          ccElement.removeAttribute("animation__scaleup");
          ccElement.removeAttribute("animation__scaledown");
          ccElement.setAttribute("animation__scaleup", {
            property: "scale",
            to: "0.15 0.15 0.15",
            dur: 200,
            easing: "easeOutQuad",
          });
          ccElement.setAttribute("animation__scaledown", {
            property: "scale",
            to: "0.1 0.1 0.1",
            dur: 200,
            easing: "easeInQuad",
            startEvents: "animationcomplete__scaleup",
          });
        });
      });
    };

    // When a target is found, show the corresponding model, scale it up, and give it a spin.
    const handleTargetFound = (e) => {
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
        // Add a short spinning animation for a dynamic entrance
        model.setAttribute("animation__spin", {
          property: "rotation",
          to: "0 360 0",
          dur: 3000,
          loop: true,
          easing: "linear",
        });
        // Remove the spin after it completes one cycle (3 seconds)
        setTimeout(() => {
          model.removeAttribute("animation__spin");
        }, 3000);
      }
    };

    // When the target is lost, hide the model again by scaling it down.
    // Also reset the popup text since the user no longer sees the marker.
    const handleTargetLost = (e) => {
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
        model.removeAttribute("animation__spin");
      }
      setPopupText(null);
    };

    sceneEl?.addEventListener("renderstart", handleRenderStart);
    sceneEl?.addEventListener("targetFound", handleTargetFound);
    sceneEl?.addEventListener("targetLost", handleTargetLost);
    sceneEl?.addEventListener("loaded", addEventListeners);

    const clickCounts = new Map();

    // This function sets up a clickable interaction on the model itself:
    // - Each click animates the model (scaling it up and down slightly).
    // - After 5 clicks, it triggers a spin animation to reward repeated interaction.
    const handleModelInteraction = (modelId) => {
      const model = document.querySelector(`#${modelId}`);
      if (!model) return;

      if (!clickCounts.has(modelId)) {
        clickCounts.set(modelId, 0);
      }

      const handleClick = () => {
        let currentCount = clickCounts.get(modelId) + 1;
        clickCounts.set(modelId, currentCount);

        model.setAttribute("visible", "true");
        model.removeAttribute("animation__scaleup");
        model.removeAttribute("animation__scaledown");
        model.setAttribute("scale", "0.5 0.5 0.5");

        // Animate the model on each click for a nice user feedback.
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

        // On the 5th click, run a spin animation as a "special" interaction.
        if (currentCount === 5) {
          clickCounts.set(modelId, 0);
          model.setAttribute("visible", "true");
          model.setAttribute("scale", "0.5 0.5 0.5");
          model.removeAttribute("animation__scaleup");
          model.removeAttribute("animation__scaledown");
          model.removeAttribute("animation__spin");
          model.setAttribute("animation__spin", {
            property: "rotation",
            from: "0 0 0",
            to: "0 360 0",
            dur: 3000,
            easing: "linear",
            loop: false,
          });
          // Remove spin after completion
          setTimeout(() => {
            model.removeAttribute("animation__spin");
          }, 3000);
        }
      };

      model.addEventListener("click", handleClick);
      return handleClick;
    };

    const cleanupHandlers = new Map();
    // Set up model interactions for all interactive models in the scene
    const models = document.querySelectorAll(".interactive-model");
    models.forEach((model) => {
      const handler = handleModelInteraction(model.id);
      cleanupHandlers.set(model.id, handler);
    });

    // On component unmount, remove all event listeners to prevent memory leaks.
    return () => {
      models.forEach((model) => {
        const handler = cleanupHandlers.get(model.id);
        if (handler) {
          model.removeEventListener("click", handler);
        }
      });
      cleanupHandlers.clear();
    };
  }, []);

  return (
    <>
      {/* Popup Text Overlay:
          Displays additional context or information for the selected model.
          Triggered by clicking the CC icons on each target. */}
      {popupText && (
        <div
          style={{
            position: "absolute",
            top: "10%",
            left: "10%",
            background: "rgba(255, 255, 255, 0.8)", // Transparent white background
            color: "purple", // Purple text
            borderColor: "black",
            fontWeight: "bold",
            padding: "20px",
            borderRadius: "10px",
            zIndex: 1000,
            width: "250px",
            maxHeight: "250px",
            overflowY: "auto",
            overflowX: "hidden",
          }}
        >
          {popupText.split("\\n\\n").map((paragraph, index) => (
            <p key={index} style={{ marginBottom: "1em", lineHeight: "1.5" }}>
              {paragraph}
            </p>
          ))}
          {/* "X" Button to Close the Popup */}
          <button
            onClick={() => setPopupText(null)}
            style={{
              position: "absolute",
              top: "10px",
              right: "10px",
              background: "transparent",
              border: "none",
              fontSize: "16px",
              color: "red", // Red "X" button
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            &times;
          </button>

        </div>
      )}

      {/* Main AR scene:
          Uses MindAR to detect image targets and display corresponding 3D models.
          Models, captions, and other interactive elements are placed within these targets. */}
      <a-scene
        ref={sceneRef}
        mindar-image="imageTargetSrc: https://cdn.glitch.global/84be45ad-dc75-4cd9-ba4f-7faa0bd8a924/ForwardRewindMarkers.mind?v=1733176852299; autoStart: false; uiLoading: no; uiError: no; uiScanning: no; filterMinCF: 0.0001; missTolerance: 5; filterBeta: 0.007;"
        color-space="sRGB"
        embedded
        renderer="colorManagement: true, physicallyCorrectLights"
        vr-mode-ui="enabled: false"
        device-orientation-permission-ui="enabled: false"
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
          top: 0,
          left: 0,
        }}
      >
        <a-assets>
          {/* Preloading 3D models and videos needed for the AR experience */}
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
          <a-asset-item
            id="speakerIconBlue"
            src="https://cdn.glitch.global/84be45ad-dc75-4cd9-ba4f-7faa0bd8a924/speakerIconBlue.glb?v=1733719215944"
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

        {/* Each entity below represents a different image target.
            When the target is detected, the corresponding model and icons appear.
            Clicking icons or models triggers the interactions described above. */}
        <a-entity mindar-image-target="targetIndex: 0">
          <a-gltf-model
            id="georgePostModel"
            src="#georgePost"
            position="0 0 0.1"
            scale="0 0 0"
            visible="false"
            class="interactive-model clickable"
          ></a-gltf-model>
          <a-gltf-model
            id="speaker-icon-0"
            src="#speakerIconBlue"
            position="-0.3 -0.3 0"
            scale="0.008 0.008 0.008"
            rotation="90 0 0"
            class="clickable"
            visible="true"
          ></a-gltf-model>
          <a-image
            id="cc-icon-0"
            class="cc-icon clickable"
            src="https://cdn.glitch.global/142aa6f9-3bd6-4455-b12e-f96d9dc9bd7d/closed-captioning-icon-in-gradient-colors-cc-signs-illustration-png.webp?v=1733639276440"
            position="-0.4 -0.3 0"
            scale="0.1 0.1 0.1"
            data-text="To understand the Wisconsin State Capitol, it helps to look to New York City. That’s where the building’s architect, George B. Post, lived most of his life and designed many innovative buildings of his era.\n\nIn the late 19th and early 20th centuries, Post designed buildings that pushed boundaries of height and explored new ideas about the very ways in which structures can support themselves. By employing novel design and engineering approaches that used steel and wrought-iron frames to support buildings’ exterior walls, he made it easier for the buildings to have more open interior spaces, and in some cases, more windows. Wisconsin’s Capitol was a late-career highlight for Post, and one might even say a posthumous one — he died in 1913, while it was still being built.\n\n“He was really a preeminent architect of the time — one of those guys we don’t study in architecture school enough, probably,” said Charles Quagliana, a former Capitol preservation architect for the state of Wisconsin, in an Aug. 1, 2017 presentation at the Wisconsin Historical Museum in Madison. In his talk, recorded for Wisconsin Public Television’s University Place, Quagliana offered an overview of Post’s formative years and important works, and explored some of the details of the Capitol’s design and construction.\n\nThe structural ideas George B. Post used in early skyscrapers would later play a role in his design for the Wisconsin State Capitol.\n\nPost’s major architectural accomplishments ranged from the New York Stock Exchange building to a massive structure at the World’s Columbian Exposition in Chicago in 1893. Quagliana explained that surveying Post’s career reveals how the architect developed and sometimes wrestled with his ideas about how tall buildings should look and function, and how those innovations influenced the Wisconsin Capitol’s design alongside its more traditional inspirations.\n\nPost was personally quite involved in the building’s construction, making at least 20 train journeys from New York to Madison, which would have been pretty taxing for a man in his late 60s and early 70s. After Post died, both of his sons, who were architects and joined their father’s firm in 1901, would go on to supervise the rest of the construction."
          ></a-image>
        </a-entity>

        <a-entity mindar-image-target="targetIndex: 1">
          <a-gltf-model
            id="wisconsinCapitolModel"
            src="#wisconsinCapitol"
            position="0 0 0.1"
            scale="0 0 0"
            visible="false"
            class="interactive-model clickable"
          ></a-gltf-model>
          <a-gltf-model
            id="speaker-icon-1"
            src="#speakerIconBlue"
            position="-0.3 -0.3 0"
            scale="0.008 0.008 0.008"
            rotation="90 0 0"
            class="clickable"
            visible="true"
          ></a-gltf-model>
          <a-image
            id="cc-icon-1"
            class="cc-icon clickable"
            src="https://cdn.glitch.global/142aa6f9-3bd6-4455-b12e-f96d9dc9bd7d/closed-captioning-icon-in-gradient-colors-cc-signs-illustration-png.webp?v=1733639276440"
            position="-0.6 -0.3 0"
            scale="0.1 0.1 0.1"
            data-text="The Wisconsin State Capitol stands majestically at the heart of downtown Madison, a towering symbol of the state’s government and rich history. Its gleaming white dome rises above the city skyline, reflecting not only the architectural beauty but also the stories of the people and events that have shaped Wisconsin.\n\nConstruction on the current Capitol began in 1906, but this wasn’t the first Capitol building on the site. Two previous structures had stood in its place—both of which were destroyed by fires, the second of which occurred in 1904, leaving the state in need of a new, grander home for its government. Determined to build something that would stand the test of time, the state enlisted the help of George B. Post, a renowned architect from New York.\n\nCompleted in 1917, the Wisconsin State Capitol is the third such building to occupy its spot at the center of Madison’s Capitol Square. Its design reflects the Beaux-Arts style, a neoclassical architectural movement known for its grandeur, symmetry, and use of intricate details. The Capitol's most striking feature is its dome, which is the largest granite dome in the world and rises 284 feet from the ground—taller even than the dome of the U.S. Capitol in Washington, D.C.\n\nWalking into the Capitol, you are greeted by the awe-inspiring sight of the rotunda, with its towering columns and vibrant murals. The interior is filled with materials sourced from across the globe: marble from Italy, France, and Greece, and granite from the United States, all used to craft a space that reflects the grandeur and unity of the state. Every detail, from the ornately carved wood to the delicate mosaics, tells a story of craftsmanship and dedication.\n\nBeyond its beauty, the Capitol has been the backdrop to many of Wisconsin’s most important moments. Legislative debates, judicial decisions, and gubernatorial actions all unfold here, within its stately chambers. The Assembly Hall and Senate Chamber are where the voices of Wisconsin’s elected officials have shaped the laws and policies that govern the state.\n\nBut the Capitol is more than just a seat of power; it is also a gathering place for the people. Throughout its history, it has been the site of countless protests, rallies, and demonstrations—a space where citizens have exercised their right to make their voices heard. Most notably, in 2011, the Capitol became a focal point of national attention during massive protests against proposed legislation affecting public sector unions. Thousands of people filled the rotunda and Capitol grounds, underscoring the building’s importance not just as a government office, but as a place where democracy comes to life.\n\nThe Capitol is also home to 'Wisconsin,' the bronze statue that sits atop the dome, holding a gilded globe in one hand and wearing a helmet topped by a badger—Wisconsin’s state animal. This statue, created by Daniel Chester French, symbolizes the forward-looking spirit of the state, standing watch over the city and the people below.\n\nToday, the Wisconsin State Capitol is a National Historic Landmark, recognized not only for its architectural beauty but also for its historical significance. Whether hosting school groups, lawmakers, or citizens advocating for change, it remains a central part of life in Madison and the entire state. As you explore its halls, you are not just seeing a building—you are stepping into the very heart of Wisconsin’s government, a place where history has been made and will continue to be written."
          ></a-image>
        </a-entity>

        <a-entity mindar-image-target="targetIndex: 2">
          <a-gltf-model
            id="wisconsinLadyModel"
            src="#wisconsinLady"
            position="0 0 0.1"
            scale="0 0 0"
            visible="false"
            class="interactive-model clickable"
          ></a-gltf-model>
          <a-gltf-model
            id="speaker-icon-2"
            src="#speakerIconBlue"
            position="-0.3 -0.3 0"
            scale="0.008 0.008 0.008"
            rotation="90 0 0"
            class="clickable"
            visible="true"
          ></a-gltf-model>
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
            data-text="Commonly mistaken for Miss forward, this statue is actually named Wisconsin. Standing at a height of 15 feet and five inches and weighing three tons, it proudly sits atop the Wisconsin State Capitol building. The statue was crafted by Daniel Chester French, the same artist behind the iconic statue of Abraham Lincoln at the Lincoln Memorial in Washington, DC."
          ></a-image>
        </a-entity>

        <a-entity mindar-image-target="targetIndex: 3">
          <a-gltf-model
            id="jamesDotyModel"
            src="#jamesDoty"
            position="0 0 0.1"
            scale="0 0 0"
            visible="false"
            class="interactive-model clickable"
          ></a-gltf-model>
          <a-gltf-model
            id="speaker-icon-3"
            src="#speakerIconBlue"
            position="-0.3 -0.3 0"
            scale="0.008 0.008 0.008"
            rotation="90 0 0"
            class="clickable"
            visible="true"
          ></a-gltf-model>
          <a-image
            id="cc-icon-3"
            class="cc-icon clickable"
            src="https://cdn.glitch.global/142aa6f9-3bd6-4455-b12e-f96d9dc9bd7d/closed-captioning-icon-in-gradient-colors-cc-signs-illustration-png.webp?v=1733639276440"
            position="-0.6 -0.3 0"
            scale="0.1 0.1 0.1"
            data-text="Madison's first Capitol Building was constructed on the square Doty at earmark. By the time Wisconsin achieved statehood in 1848 this cold and leaky capital had earned the uncomplimentary nickname doty's wash bowl."
          ></a-image>
        </a-entity>
      </a-scene>
    </>
  );
}
