import { Canvas } from "@react-three/fiber";
import { useWindowSize } from "../../../../hooks";
import { useTexture } from "@react-three/drei";

import vertexShader from "./shaders/vertex.glsl";
import fragmentShader from "./shaders/fragment.glsl";

function Scene() {
  const { height, width } = useWindowSize();

  const texture = useTexture(
    "https://5f6x5qowvd.ufs.sh/f/skRwIEbJ4UkGBX6BYfxTXEYlhq87yGp6ZoMIQC4zc2rFA3VK"
  );

  return (
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={{ uTime: { value: 0 }, uTexture: { value: texture } }}
      />
    </mesh>
  );
}

export function MeadowHero() {
  return (
    <Canvas style={{ height: "100vh", width: "100vw" }}>
      <ambientLight intensity={0.5} />
      <Scene />
    </Canvas>
  );
}
