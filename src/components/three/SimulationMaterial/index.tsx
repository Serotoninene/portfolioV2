import * as THREE from "three";

import simulationVertexShader from "./shaders/vertex.glsl";
import simulationFragmentShader from "./shaders/fragment.glsl";

const generatePositions = (
  width: number,
  height: number,
  radius: number = 1
) => {
  // we need to create a vec4 since we're passing the positions to the fragment shader
  // data textures need to have 4 components, R, G, B, and A
  const length = width * height * 4;
  const data = new Float32Array(length);

  for (let i = 0; i < length; i += 4) {
    const distance = Math.sqrt(Math.random()) * radius;
    const theta = THREE.MathUtils.randFloatSpread(360);
    const phi = THREE.MathUtils.randFloatSpread(360);

    data[i] = distance * Math.sin(theta) * Math.cos(phi);
    data[i + 1] = distance * Math.sin(theta) * Math.sin(phi);
    data[i + 2] = distance * Math.cos(theta);
    data[i + 3] = 1.0; // this value will not have any impact
  }

  return data;
};

// Create a custom simulation shader material
class SimulationMaterial extends THREE.ShaderMaterial {
  constructor(size: number, radius: number = 1) {
    // Create a Data Texture with our positions data
    const positionsTexture = new THREE.DataTexture(
      generatePositions(size, size, radius),
      size,
      size,
      THREE.RGBAFormat,
      THREE.FloatType
    );
    positionsTexture.needsUpdate = true;

    const simulationUniforms = {
      positions: { value: positionsTexture },
      uFrequency: { value: 0.25 },
      uTime: { value: 0 },
    };

    super({
      uniforms: simulationUniforms,
      vertexShader: simulationVertexShader,
      fragmentShader: simulationFragmentShader,
    });
  }
}

export default SimulationMaterial;
