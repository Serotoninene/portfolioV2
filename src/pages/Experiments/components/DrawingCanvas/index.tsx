import { useMemo, useRef } from "react";
import { PerspectiveCamera, useTexture } from "@react-three/drei";

import {
  BufferGeometry,
  Material,
  NormalBufferAttributes,
  Points,
  ShaderMaterial,
  Vector3,
} from "three";

import { CustomCanvas } from "../../../../components/three";
import vertexShader from "./shader/vertex.glsl";
import fragmentShader from "./shader/fragment.glsl";
import { useFrame } from "@react-three/fiber";
import { useControls } from "leva";

const img = "/assets/Photos/s-eychenne-les-routes-de-mon-enfance.jpeg";

const BasicParticles = ({ posZ, color }) => {
  const points =
    useRef<
      Points<BufferGeometry<NormalBufferAttributes>, Material | Material[]>
    >(null);
  const shader = useRef<ShaderMaterial>(null);

  const texture = useTexture(img);

  const controls = useControls({
    radius: {
      value: 0.1,
      min: 0,
      max: 1,
      step: 0.01,
    },
    edge: {
      value: 0.02,
      min: 0,
      max: 1,
      step: 0.01,
    },
    speed: {
      value: 0.25,
      min: 0,
      max: 1,
      step: 0.01,
    },
    offset: { value: 1, min: 0, max: 10, step: 0.1 },
  });

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uTexture: { value: texture },
      uRadius: { value: controls.radius },
      uEdge: { value: controls.edge },
      uSpeed: { value: controls.speed },
      uRand1: { value: Math.random() - 0.1 },
      uRand2: { value: Math.random() - 0.2 },
      uRand3: { value: Math.random() - 0.4 },
      uRand4: { value: Math.random() - 0.1 },
      uOffset: { value: 1 },
      uColor: { value: color },
    }),
    []
  );

  // const particles = 400;
  // const particles = 4000;
  const particles = 40000;

  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(particles * 3);
    const grid_size = Math.sqrt(particles);

    for (let i = 0; i < particles; i++) {
      const x = (i % grid_size) / grid_size - 0.5;
      const y = Math.floor(i / grid_size) / grid_size - 0.5;

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = 0;
    }

    return positions;
  }, [particles]);

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();

    if (shader.current) {
      shader.current.uniforms.uTime.value = time;
      shader.current.uniforms.uRadius.value = controls.radius + time * 0.01;
      shader.current.uniforms.uEdge.value = controls.edge + time * 0.01;
      shader.current.uniforms.uSpeed.value = controls.speed + time * 0.01;
      shader.current.uniforms.uOffset.value = controls.offset;
    }
  });

  return (
    <points ref={points} position={[0, 0, posZ]}>
      <bufferGeometry attach="geometry">
        <bufferAttribute
          attach="attributes-position"
          count={particles}
          array={particlesPosition}
          itemSize={3}
        />
      </bufferGeometry>
      <shaderMaterial
        ref={shader}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
      />
    </points>
  );
};

const Scene = () => {
  return (
    <>
      {new Array(10).fill(0).map((_, i) => (
        <BasicParticles
          key={i}
          posZ={i * -0.1}
          color={
            new Vector3(Math.random() - 0.5, Math.random() - 0.5, Math.random())
          }
        />
      ))}
    </>
  );
};

export const DrawingCanvas = () => {
  return (
    <CustomCanvas isCameraControls>
      <PerspectiveCamera makeDefault position={[0, 0, 0.5]} />
      <Scene />
    </CustomCanvas>
  );
};
