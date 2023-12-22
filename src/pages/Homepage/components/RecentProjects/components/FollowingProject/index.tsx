import { useFrame } from "@react-three/fiber";
import gsap, { Power1 } from "gsap";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { useProjectContext } from "../../../../../../hooks/useProjectContext";
import fragment from "./shaders/fragment.glsl";
import vertex from "./shaders/vertex.glsl";

import { useTexture } from "@react-three/drei";

import { projects } from "../../data";

type FollowingProjectProps = {
  scale: vec3;
};

export const FollowingProject = ({ scale }: FollowingProjectProps) => {
  const ref = useRef<THREE.Mesh>(null);
  const shader = useRef<THREE.ShaderMaterial>(null);
  const [mixFactor, setMixFactor] = useState({ value: 0 });
  const { selectedProject } = useProjectContext();

  // const controls = useControls({
  //   intensity: {
  //     value: 0.2,
  //     min: 0,
  //     max: 2,
  //     step: 0.01,
  //   },
  // });

  const textures = useTexture(projects.map((project) => project.img));
  const uDisplacement = useTexture("/assets/Noise/grundge-noise.webp");
  const targetPosition = useRef<THREE.Vector3>(new THREE.Vector3());

  useEffect(() => {
    if (!shader.current) return;

    const updateTexture = async () => {
      if (!shader.current) return;
      // Use the index to get the corresponding texture
      const index = projects.findIndex(
        (project) => project.title === selectedProject?.title
      );

      // Get the next texture
      const texture2 = selectedProject ? textures[index] : null;

      // Set the uniforms
      shader.current.uniforms.uTexture2.value = texture2;
      if (texture2)
        shader.current.uniforms.uTextureSize.value = new THREE.Vector2(
          texture2.image.width,
          texture2.image.height
        );

      // Animate the mix factor
      gsap.killTweensOf(mixFactor);
      await gsap.to(mixFactor, {
        value: 1,
        duration: 0.2,
        ease: Power1.easeIn,
      });

      // Set the first texture to the second texture
      shader.current.uniforms.uTexture.value = texture2;
      setMixFactor({ value: 0 });
    };

    if (!selectedProject) {
      ref.current?.scale.set(0, 0, 0);
    } else {
      ref.current?.scale.set(scale.x, scale.y, 0);
    }

    updateTexture();
  }, [selectedProject]);

  const uniforms = useMemo(
    () => ({
      uTexture: { value: null },
      uTexture2: { value: null },
      uDisplacement: { value: uDisplacement },
      uMixFactor: { value: mixFactor.value },
      uTime: { value: 0 },
      uIntensity: { value: 0.2 },
      // uIntensity: { value: controls.intensity },
      uTextureSize: {
        value: new THREE.Vector2(
          textures[0].image.width,
          textures[0].image.height
        ),
      },
      uQuadSize: {
        value: new THREE.Vector2(scale.x, scale.y),
      },
    }),
    []
  );

  useFrame(({ pointer, clock }) => {
    if (!ref.current || !shader.current) return;
    const scrollY = window.scrollY;
    const time = clock.getElapsedTime();

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
    shader.current.uniforms.uMixFactor.value = mixFactor.value;
    shader.current.uniforms.uTime.value = time;

    // ----------- UPDATING THE CONTROLS ----------- //
    // shader.current.uniforms.uIntensity.value = controls.intensity;
  });

  return (
    <mesh ref={ref} scale={[scale.x, scale.y, 0]}>
      <planeGeometry args={[1, 1, 16, 16]} />
      <shaderMaterial
        ref={shader}
        vertexShader={vertex}
        fragmentShader={fragment}
        uniforms={uniforms}
      />
    </mesh>
  );
};
