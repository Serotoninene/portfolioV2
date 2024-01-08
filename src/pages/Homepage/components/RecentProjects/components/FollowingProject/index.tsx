import { useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef, useState } from "react";
import * as THREE from "three";

import { ScrollSceneChildProps } from "@14islands/r3f-scroll-rig";
import { projects } from "../../data";
import { useUpdateTexture } from "./animations";

import { lerp } from "three/src/math/MathUtils.js";
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
      uTexture: { value: null },
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

  useFrame(({ clock, pointer }) => {
    if (!ref.current || !shader.current) return;
    const time = clock.getElapsedTime();

    // ----------- UPDATING THE POSITION ----------- //
    let targetX =
      ((pointer.x + 1) / 2) * window.innerWidth - scrollScene.scale.x / 2;
    targetX *= 0.1;
    let targetY = pointer.y * window.innerHeight;
    targetY *= 0.5;
    // adding lerp effect to the position
    ref.current.position.x = THREE.MathUtils.lerp(
      ref.current.position.x,
      targetX,
      0.1
    );
    ref.current.position.y = THREE.MathUtils.lerp(
      ref.current.position.y,
      targetY,
      0.1
    );

    // ----------- UPDATING THE ROTATION ----------- //
    const rotationY = -pointer.x * 0.76;
    const rotationZ = -pointer.x * 0.08;
    ref.current.rotation.y = lerp(ref.current.rotation.y, rotationY, 0.06);
    ref.current.rotation.z = lerp(ref.current.rotation.z, rotationZ, 0.6);

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
