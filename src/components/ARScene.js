// import React, { useEffect, useRef } from "react";
// import * as THREE from "three";
// import { MindARThree } from "mind-ar/dist/mindar-image-three.prod.js";
// import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

// const ARScene = () => {
//   const containerRef = useRef(null);

//   useEffect(() => {
//     const initializeAR = async () => {
//       // Initialize MindAR with the John Doty marker
//       const mindarThree = new MindARThree({
//         container: containerRef.current,
//         imageTargetSrc: "/markers/john-doty.mind", // Path to the MindAR marker
//       });

//       const { renderer, scene, camera } = mindarThree;

//       // Add an anchor for the tracked image marker
//       const anchor = mindarThree.addAnchor(0);

//       // Load the John Doty 3D model
//       const loader = new GLTFLoader();
//       loader.load("/models/john-doty.glb", (gltf) => {
//         const model = gltf.scene;
//         model.scale.set(0.1, 0.1, 0.1); // Adjust the size of the model
//         anchor.group.add(model);
//       });

//       // Add lighting to the scene
//       const ambientLight = new THREE.AmbientLight(0xffffff, 1); // Soft white light
//       scene.add(ambientLight);

//       const pointLight = new THREE.PointLight(0xffffff, 2, 50); // Point light for highlighting the model
//       pointLight.position.set(0, 3, 0);
//       scene.add(pointLight);

//       // Start the AR session
//       await mindarThree.start();

//       // Render the scene
//       renderer.setAnimationLoop(() => {
//         renderer.render(scene, camera);
//       });

//       // Clean up on unmount
//       return () => {
//         renderer.setAnimationLoop(null);
//         mindarThree.stop();
//         mindarThree.renderer.dispose();
//       };
//     };

//     initializeAR();
//   }, []);

//   return (
//     <div
//       ref={containerRef}
//       style={{ width: "100vw", height: "100vh", background: "black" }}
//     ></div>
//   );
// };

// export default ARScene;

import { ARAnchor, ARView } from "react-three-mind";

function Plane(props) {
  return (
    <mesh {...props}>
      <boxGeometry args={[1, 1, 0.1]} />
      <meshStandardMaterial color="orange" />
    </mesh>
  );
}

function App() {
  return (
    <ARView
      imageTargets="https://cdn.jsdelivr.net/gh/hiukim/mind-ar-js@1.1.4/examples/image-tracking/assets/card-example/card.mind"
      filterMinCF={1}
      filterBeta={10000}
      missTolerance={0}
      warmupTolerance={0}
    >
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <ARAnchor target={0}>
        <Plane />
      </ARAnchor>
    </ARView>
  );
}

export default App;