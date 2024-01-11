import { useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef, useState } from "react";
import * as THREE from "three";

import { ScrollSceneChildProps } from "@14islands/r3f-scroll-rig";
import { projects } from "../../data";
import { useUpdateTexture } from "./animations";

import fragment from "./shaders/fragment.glsl";
import vertex from "./shaders/vertex.glsl";

type Props = {
  scrollScene: ScrollSceneChildProps;
};

export const FollowingProject = ({ scrollScene }: Props) => {
  const ref = useRef<THREE.Mesh>(null);
  const shader = useRef<THREE.ShaderMaterial>(null);
  const [mixFactor, setMixFactor] = useState({ value: 0 });

  const textures = useTexture(projects.map((project) => project.img));
  const uDisplacement = useTexture("/assets/Noise/grundge-noise.webp");

  useUpdateTexture({
    shader: shader.current,
    textures,
    mixFactor,
    setMixFactor,
  });

  const uniforms = useMemo(
    () => ({
      uTexture: { value: textures[0] },
      uTexture2: { value: null },
      uDisplacement: { value: uDisplacement },
      uMixFactor: { value: mixFactor.value },
      uTime: { value: 0 },
      uIntensity: { value: 0.2 },
      uWaveFrequency: { value: 10 },
      uWaveIntensity: { value: 100 },
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

  useFrame(({ clock }) => {
    if (!ref.current || !shader.current) return;
    const time = clock.getElapsedTime();

    // ----------- UPDATING THE UNIFORMS ----------- //
    shader.current.uniforms.uMixFactor.value = mixFactor.value;
    shader.current.uniforms.uTime.value = time;

    // ----------- UPDATING THE CONTROLS ----------- //
    // shader.current.uniforms.uWaveIntensity.value = controls.waveIntensity;
    // shader.current.uniforms.uWaveFrequency.value = controls.waveFrequency;
  });

  return (
    <mesh ref={ref} scale={scrollScene.scale.xyz}>
      <planeGeometry args={[1, 1, 16, 16]} />
      <shaderMaterial
        ref={shader}
        vertexShader={vertex}
        fragmentShader={fragment}
        uniforms={uniforms}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
};
