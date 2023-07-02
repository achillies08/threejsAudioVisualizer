import {
  AdaptiveDpr,
  OrbitControls,
  PerspectiveCamera,
} from "@react-three/drei";
import { useRef, useEffect, useContext, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import audioContext from "./contexts/audioContext";

function Three() {
  const meshRef = useRef();
  const analyser = useRef();
  const { aud } = useContext(audioContext);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let audio;
    let audioContext;
    let source;
    if (aud) {
      setIsLoading(true);
      const audio = new Audio();
      audio.src = URL.createObjectURL(aud);;
      audio.loop = true;

      const audioContext = new (window.AudioContext ||
        window.webkitAudioContext)();
      const source = audioContext.createMediaElementSource(audio);
      analyser.current = audioContext.createAnalyser();
      analyser.current.fftSize = 128;

      source.connect(analyser.current);
      analyser.current.connect(audioContext.destination);

      audio.play();

      return () => {
        audio.pause();
        audioContext.close();
      };
    }
  }, [aud]);

  useFrame(() => {
    if (meshRef.current && analyser.current) {
      const bufferLength = analyser.current.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);
      analyser.current.getByteFrequencyData(dataArray);

      const average = dataArray.reduce((a, b) => a + b, 0) / bufferLength;
      const scale = (average / 255) * 2; // Adjust the scale based on the average frequency

      // Update the scale of the mesh based on the audio
      meshRef.current.scale.set(scale, scale, scale);
    }
    meshRef.current.rotation.x = meshRef.current.rotation.y += 0.008;
  });

  return (
    <group>
      {" "}
      {/* Wrap all JSX elements in a group */}
      <AdaptiveDpr pixelated />
      <ambientLight color={"#fff"} intensity={0.5} />
      <spotLight position={[8, 4, 0]} castShadow receiveShadow />
      <PerspectiveCamera makeDefault position={[0, 0, 10]} />
      <OrbitControls enableZoom={false} />
      <mesh position={[0, 0, 0]} castShadow ref={meshRef}>
        <sphereGeometry args={[3, 50, 50]} />
        <meshPhongMaterial
          color={"#049ef4"}
          emissive={"#000000"}
          specular={"#111111"}
          shininess={100}
          combine={THREE.MultiplyOperation}
          wireframe
        />
      </mesh>
    </group>
  );
}

export default Three;
