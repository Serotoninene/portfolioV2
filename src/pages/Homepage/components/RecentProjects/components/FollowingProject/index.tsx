import { useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import gsap, { Power1 } from "gsap";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

import { useProjectContext } from "../../../../../../hooks/useProjectContext";

import fragment from "./shaders/fragment.glsl";
import vertex from "./shaders/vertex.glsl";

import { projects } from "../../data";
import { ScrollSceneChildProps } from "@14islands/r3f-scroll-rig";

type Props = {
  scrollScene: ScrollSceneChildProps;
};

export const FollowingProject = ({ scrollScene }: Props) => {
  const ref = useRef<THREE.Mesh>(null);
  const shader = useRef<THREE.ShaderMaterial>(null);
  const [mixFactor, setMixFactor] = useState({ value: 0 });
  const { selectedProject } = useProjectContext();

  const textures = useTexture(projects.map((project) => project.img));
  const uDisplacement = useTexture("/assets/Noise/grundge-noise.webp");

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
        value: new THREE.Vector2(scrollScene?.scale.x, scrollScene?.scale.y),
      },
    }),
    [scrollScene]
  );

  useFrame(({ clock, pointer }) => {
    if (!ref.current || !shader.current) return;
    const time = clock.getElapsedTime();
    // ----------- UPDATING THE POSITION ----------- //
    // ref.current.needsUpdate = true;
    ref.current.position.x = pointer.x;
    ref.current.position.y = pointer.y;

    // ----------- UPDATING THE UNIFORMS ----------- //
    shader.current.uniforms.uMixFactor.value = mixFactor.value;
    shader.current.uniforms.uTime.value = time;

    // ----------- UPDATING THE CONTROLS ----------- //
    // shader.current.uniforms.uIntensity.value = controls.intensity;
  });

  return (
    <mesh ref={ref} {...scrollScene} matrixWorldNeedsUpdate>
      <planeGeometry args={[1, 1, 16, 16]} />
      <shaderMaterial
        ref={shader}
        vertexShader={vertex}
        fragmentShader={fragment}
        uniforms={uniforms}
        transparent={true}
      />
    </mesh>
  );
};
