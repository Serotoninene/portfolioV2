import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { useProjectContext } from "../../hooks/useProjectContext";
import vertex from "./shaders/vertex.glsl";
import fragment from "./shaders/fragment.glsl";

import photo from "/assets/Photos/s-eychenne-les-routes-de-mon-enfance.jpeg";
import { useTexture } from "@react-three/drei";
import { useControls } from "leva";

type FollowingProjectProps = {
  scale: vec3;
};

export const FollowingProject = ({ scale }: FollowingProjectProps) => {
  const ref = useRef<THREE.Mesh>(null);
  const shader = useRef<THREE.ShaderMaterial>(null);
  const { selectedProject } = useProjectContext();

  const texture = useTexture(photo);
  const targetPosition = useRef<THREE.Vector3>(new THREE.Vector3());

  const controls = useControls({
    frequency: {
      value: 3,
      min: 0,
      max: 10,
    },
  });

  const uniforms = useMemo(
    () => ({
      uTexture: { value: texture },
      uTextureSize: {
        value: new THREE.Vector2(texture.image.width, texture.image.height),
      },
      uQuadSize: {
        value: new THREE.Vector2(scale.x, scale.y),
      },
      uFrequency: { value: controls.frequency },
    }),
    []
  );

  useFrame(({ pointer }) => {
    if (!ref.current || !shader.current) return;
    const scrollY = window.scrollY;

    // ----------- POSITION ON MOUSE MOVE ----------- //
    targetPosition.current.x =
      ((pointer.x + 1) / 2) * window.innerWidth - scale.x / 2;
    targetPosition.current.y =
      (pointer.y / 2) * window.innerHeight - scrollY - scale.y / 2;

    ref.current.position.x = THREE.MathUtils.lerp(
      ref.current.position.x,
      targetPosition.current.x,
      0.1
    );
    ref.current.position.y = THREE.MathUtils.lerp(
      ref.current.position.y,
      targetPosition.current.y,
      0.1
    );

    // ----------- UPDATING THE UNIFORMS ----------- //
    shader.current.uniforms.uFrequency.value = controls.frequency;
  });

  return (
    <mesh ref={ref} scale={[scale.x, scale.y, 0]}>
      <planeGeometry args={[1, 1]} />
      <shaderMaterial
        ref={shader}
        vertexShader={vertex}
        fragmentShader={fragment}
        uniforms={uniforms}
      />
    </mesh>
  );
};
