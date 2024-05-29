import { useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

import { ScrollSceneChildProps } from "@14islands/r3f-scroll-rig";
import { projects } from "../../data";
import { useUpdateTexture } from "./animations";

import TouchTexture from "../../../../../../components/three/TouchTexture";
import { useWindowSize } from "../../../../../../hooks";
import { useProjectMeshRect } from "../../../../../../store/useProjectMeshRect";
import fragment from "./shaders/fragment.glsl";
import vertex from "./shaders/vertex.glsl";

type Props = {
  scrollScene?: ScrollSceneChildProps;
};

export const FollowingProject = ({ scrollScene }: Props) => {
  const ref = useRef<THREE.Mesh>(null);
  const shader = useRef<THREE.ShaderMaterial>(null);
  const { rect } = useProjectMeshRect();
  const [mixFactor, setMixFactor] = useState({ value: 0 });

  const touchTexture = useMemo(() => new TouchTexture(false, 128, 60, 0.2), []);

  const textures = useTexture(projects.map((project) => project.img));
  const uDisplacement = useTexture("/assets/Noise/grundge-noise.webp");

  const { width } = useWindowSize();

  const uniforms = useMemo(
    () => ({
      uTexture: { value: textures[0] },
      uTexture2: { value: null },
      uDisplacement: { value: uDisplacement },
      uMixFactor: { value: mixFactor.value },
      uMouse: { value: touchTexture.texture },
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
      uResolution: {
        value: window.innerHeight / window.innerWidth,
      },
      uQuadSize: {
        value: new THREE.Vector2(scrollScene?.scale.x, scrollScene?.scale.y),
      },
    }),
    [scrollScene]
  );

  const handleMousePosition = (e: MouseEvent) => {
    if (!ref.current || !rect) return;
    const x = rect.x;
    const y = rect.y;
    const width = rect.width;
    const height = rect.height;

    const mappedX = THREE.MathUtils.mapLinear(e.clientX, x, width + x, 0, 1);
    const mappedY = THREE.MathUtils.mapLinear(e.clientY, y, height + y, 1, 0);

    const mousePosition = new THREE.Vector2(mappedX, mappedY);
    touchTexture.addTouch(mousePosition);
  };

  useUpdateTexture({
    shader: shader.current,
    textures,
    mixFactor,
    setMixFactor,
  });

  useEffect(() => {
    if (!ref.current) return;

    window.addEventListener("mousemove", handleMousePosition);

    return () => {
      window.removeEventListener("mousemove", handleMousePosition);
    };
  }, [width, rect]);

  useFrame(({ clock }) => {
    if (!ref.current || !shader.current) return;
    const time = clock.getElapsedTime();
    ref.current.position.x = rect.x / 2 - 10;

    // ----------- UPDATING THE UNIFORMS ----------- //
    shader.current.uniforms.uMixFactor.value = mixFactor.value;
    shader.current.uniforms.uTime.value = time;

    // ----------- UPDATING THE CONTROLS ----------- //
    // shader.current.uniforms.uWaveIntensity.value = controls.waveIntensity;
    // shader.current.uniforms.uWaveFrequency.value = controls.waveFrequency;

    if (!touchTexture) return;
    touchTexture.update();
  });

  return (
    <mesh ref={ref} {...scrollScene}>
      <planeGeometry args={[1, 1, 16, 16]} />
      <shaderMaterial
        ref={shader}
        vertexShader={vertex}
        fragmentShader={fragment}
        transparent={true}
        uniforms={uniforms}
        side={THREE.DoubleSide}
        needsUpdate={true}
      />
    </mesh>
  );
};
