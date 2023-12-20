import { useEffect, useRef } from "react";
import * as THREE from "three";
import { useLogo } from "./hooks/useLogo";

import vertex from "./shaders/vertex.glsl";
import fragment from "./shaders/fragment.glsl";

export const FallingLogos = () => {
  const count = 50;
  const instances = useRef<THREE.InstancedMesh>();
  const { geometry } = useLogo();

  const shaderMaterial = new THREE.ShaderMaterial({
    vertexShader: vertex,
    fragmentShader: fragment,

    // transparent: true,
    // depthWrite: false,
    // depthTest: false,
  });

  useEffect(() => {
    if (!instances.current) return;
    const width = window.innerWidth;
    const height = window.innerHeight;

    for (let i = 0; i < count; i++) {
      const matrix = new THREE.Matrix4();

      // position
      const range = i % 2 === 0 ? width / 2 : -width / 2;
      const x = Math.random() * range;
      const y = (-height - i * height) / 2;

      // rotation
      const rotation = new THREE.Quaternion();
      rotation.setFromEuler(
        new THREE.Euler(0, Math.PI * Math.random(), Math.random() * Math.PI)
      );

      matrix.compose(
        new THREE.Vector3(x, y, -500), // position
        rotation, // rotation
        new THREE.Vector3(100, 160, 160) // scale
      );
      instances.current.setMatrixAt(i, matrix);
      instances.current.instanceMatrix.needsUpdate = true;
    }
  }, []);

  return (
    <instancedMesh ref={instances} args={[geometry, shaderMaterial, count]} />
  );
};
