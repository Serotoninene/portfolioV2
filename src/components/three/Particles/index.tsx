import { useMemo, useRef } from "react";
import * as THREE from "three";

import vertexShader from "./shaders/vertex.glsl";
import fragmentShader from "./shaders/fragment.glsl";
import { createPortal, extend, useFrame } from "@react-three/fiber";

import SimulationMaterial from "../SimulationMaterial";
import { useFBO } from "@react-three/drei";

// Make the simulation material available as a JSX element in our canva
extend({ SimulationMaterial: SimulationMaterial });

export default function Particles() {
  const size = 1024;

  const points = useRef<THREE.Points>(null);
  const simulationMaterialRef = useRef<THREE.ShaderMaterial>();

  const scene = new THREE.Scene();
  const camera = new THREE.OrthographicCamera(
    -1,
    1,
    1,
    -1,
    1 / Math.pow(2, 53),
    1
  );
  const positions = new Float32Array([
    -1, -1, 0, 1, -1, 0, 1, 1, 0, -1, -1, 0, 1, 1, 0, -1, 1, 0,
  ]);
  const uvs = new Float32Array([0, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 0]);

  const renderTarget = useFBO(size, size, {
    minFilter: THREE.NearestFilter,
    magFilter: THREE.NearestFilter,
    format: THREE.RGBAFormat,
    stencilBuffer: false,
    type: THREE.FloatType,
  });

  const particlesPosition = useMemo(() => {
    const length = size * size;
    const particles = new Float32Array(length * 3);
    for (let i = 0; i < length; i++) {
      const i3 = i * 3;
      particles[i3 + 0] = (i % size) / size;
      particles[i3 + 1] = i / size / size;
    }
    return particles;
  }, [size]);

  const uniforms = useMemo(
    () => ({
      uPositions: {
        value: new THREE.DataTexture(),
      },
    }),
    []
  );

  useFrame((state) => {
    const { gl, clock } = state;

    gl.setRenderTarget(renderTarget);
    gl.clear();
    gl.render(scene, camera);
    gl.setRenderTarget(null);

    if (points.current) {
      const material = points.current.material as THREE.ShaderMaterial;
      material.uniforms.uPositions.value = renderTarget.texture;
    }

    if (
      simulationMaterialRef.current &&
      simulationMaterialRef.current.uniforms &&
      simulationMaterialRef.current.uniforms.uTime
    ) {
      simulationMaterialRef.current.uniforms.uTime.value = clock.elapsedTime;
    }
  });

  return (
    <>
      {createPortal(
        <mesh>
          <simulationMaterial ref={simulationMaterialRef} args={[size, 500]} />
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={positions.length / 3}
              array={positions}
              itemSize={3}
            />
            <bufferAttribute
              attach="attributes-uv"
              count={uvs.length / 2}
              array={uvs}
              itemSize={2}
            />
          </bufferGeometry>
        </mesh>,
        scene
      )}
      <points ref={points}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particlesPosition.length / 3}
            array={particlesPosition}
            itemSize={3}
          />
        </bufferGeometry>
        <shaderMaterial
          depthWrite={false}
          fragmentShader={fragmentShader}
          vertexShader={vertexShader}
          uniforms={uniforms}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </>
  );
}
