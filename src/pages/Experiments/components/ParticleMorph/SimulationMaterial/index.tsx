import { extend } from "@react-three/fiber";
import * as THREE from "three";

import vertex from "./shader/vertex.glsl";
import fragment from "./shader/fragment.glsl";

const generatePositions = (size: number, nodes: any) => {
  const length = size * size * 4;
  const data = new Float32Array(length);

  if (!nodes?.Plane) return data;
  nodes.Plane.geometry.scale(0.1, 1, 1);

  // Get the vertices of the model
  const originalPosition = nodes.Plane.geometry.attributes.position.array;
  const originalCount = originalPosition.length / 3; // Number of vertices

  // Distribute particles based on the model's vertices
  for (let i = 0; i < length; i += 4) {
    // Pick a random vertex from the model
    const originalIndex = Math.floor(Math.random() * originalCount) * 3;
    const ox = originalPosition[originalIndex]; // x
    const oy = originalPosition[originalIndex + 1]; // y
    const oz = originalPosition[originalIndex + 2]; // z

    // Add some randomness to spread particles around the model
    data[i] = ox + (Math.random() - 0.5) * 0.05; // x with small jitter
    data[i + 1] = oy + (Math.random() - 0.5) * 0.05; // y with small jitter
    data[i + 2] = oz + (Math.random() - 0.5) * 0.05; // z with small jitter
    data[i + 3] = 1.0; // w (no impact, but required for vec4)
  }

  return data;
};

// Create a custom simulation shader material
class SimulationMaterial extends THREE.ShaderMaterial {
  constructor(size: number, nodes: any) {
    // Create a Data Texture with our positions data
    const positionsTexture = new THREE.DataTexture(
      generatePositions(size, nodes),
      size,
      size,
      THREE.RGBAFormat,
      THREE.FloatType
    );
    positionsTexture.needsUpdate = true;

    const simulationUniforms = {
      // Pass the positions Data Texture as a uniform
      positions: { value: positionsTexture },
      uFrequency: { value: 0.25 },
      uMouse: { value: THREE.Texture },
      uMousePosition: { value: new THREE.Vector2() },
      uTime: { value: 0 },
    };

    super({
      uniforms: simulationUniforms,
      vertexShader: vertex,
      fragmentShader: fragment,
    });
  }
}

// Make the simulation material available as a JSX element in our canva
extend({ SimulationMaterial: SimulationMaterial });

export default SimulationMaterial;
