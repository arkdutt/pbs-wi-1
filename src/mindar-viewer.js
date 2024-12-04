import React, { useEffect, useRef } from 'react';
import 'aframe';
import 'mind-ar/dist/mindar-image-aframe.prod.js';

export default () => {
  const sceneRef = useRef(null);

  useEffect(() => {
    const sceneEl = sceneRef.current;
    const arSystem = sceneEl.systems["mindar-image-system"];
    sceneEl.addEventListener('renderstart', () => {
      arSystem.start(); // start AR 
    });
  
    return () => {
      arSystem.stop();
    }
  }, []);
  //https://cdn.glitch.global/436a8662-ce0c-4fde-a24a-aa50c450c72e/James-Doty.gltf?v=1732939824970
  //https://cdn.glitch.global/68e5af42-4925-411b-a090-64dcec22f1bb/James-Doty.glb?v=1732585994143
  return (


    //James Doty
    <a-scene ref={sceneRef} mindar-image="imageTargetSrc: https://cdn.glitch.global/436a8662-ce0c-4fde-a24a-aa50c450c72e/james-ben.mind?v=1732943277541; autoStart: false; uiLoading: no; uiError: no; uiScanning: no;" color-space="sRGB" embedded renderer="colorManagement: true, physicallyCorrectLights" vr-mode-ui="enabled: false" device-orientation-permission-ui="enabled: false">
      <a-assets>
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
    



  )
}
