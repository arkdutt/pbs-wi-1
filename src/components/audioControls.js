// audioControls.js

// Function to show the audio icon when the James Doty model is visible
export function showAudioIcon() {
    const audioIconEntity = document.querySelector("#audioIconEntity");
    if (audioIconEntity) {
      audioIconEntity.setAttribute("visible", "true");
    }
  }
  
  // Function to hide the audio icon when the James Doty model is not visible
  export function hideAudioIcon() {
    const audioIconEntity = document.querySelector("#audioIconEntity");
    if (audioIconEntity) {
      audioIconEntity.setAttribute("visible", "false");
    }
  }
  
  // Play the audio when the icon is clicked
  export function playAudio() {
    const audio = document.querySelector("#jamesDotyAudio");
    if (audio) {
      audio.play();
    }
  }