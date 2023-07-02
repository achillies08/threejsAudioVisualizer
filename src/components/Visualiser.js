import React, { useContext } from "react";
import { Canvas } from "@react-three/fiber";
import Three from "./Three";
import audioContext from "./contexts/audioContext";

function Visualiser() {
  const { playAudio } = useContext(audioContext);
  return (
    <Canvas className="three-canvas" shadows dpr={window.devicePixelRatio}>
      {playAudio ? <Three /> : null} ;
    </Canvas>
  );
}

export default Visualiser;
