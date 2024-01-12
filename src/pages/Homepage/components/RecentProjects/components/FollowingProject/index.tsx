import { useTexture } from "@react-three/drei";
import { ThreeEvent, useFrame } from "@react-three/fiber";
import { useMemo, useRef, useState } from "react";
import * as THREE from "three";

import { ScrollSceneChildProps } from "@14islands/r3f-scroll-rig";
import { projects } from "../../data";
import { useUpdateTexture } from "./animations";

import fragment from "./shaders/fragment.glsl";
import vertex from "./shaders/vertex.glsl";
import TouchTexture from "../../../../../../components/three/TouchTexture";

type Props = {
  scrollScene: ScrollSceneChildProps;
};

export const FollowingProject = ({ scrollScene, isPinned }: Props) => {
  const ref = useRef<THREE.Mesh>(null);
  const shader = useRef<THREE.ShaderMaterial>(null);
  const [mixFactor, setMixFactor] = useState({ value: 0 });
  const touchTexture = useMemo(() => new TouchTexture(false, 128, 60, 0.2), []);

  // const textures = useTexture(projects.map((project) => project.img));
  const textures = useTexture([projects[0].img]);
  const uDisplacement = useTexture("/assets/Noise/grundge-noise.webp");
  console.log(isPinned);

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

  const handleMouseMove = (e: ThreeEvent<MouseEvent>) => {
    const r = scrollScene.scale.y / window.innerHeight;

    const mappedMouse = {
      x: e.pointer.x,
      y: THREE.MathUtils.mapLinear(e.pointer.y, -1 * r, r, 0, 1),
    };
    touchTexture.addTouch(mappedMouse);
  };
  let previousScrollPos = 0;
  const epsilon = 0.0001; // Tolerance value

  useFrame(({ clock }) => {
    if (!ref.current || !shader.current) return;
    const time = clock.getElapsedTime();

    // ----------- UPDATING THE UNIFORMS ----------- //
    shader.current.uniforms.uMixFactor.value = mixFactor.value;
    shader.current.uniforms.uTime.value = time;
    const trackedDiv = scrollScene.track.current;
    const rect = trackedDiv.getBoundingClientRect();

    const scrollPos = rect.top / window.innerHeight;

    ref.current.position.y = scrollPos;

    // Set the mesh position
    // console.log(rect.top / window.innerHeight);

    // ----------- UPDATING THE CONTROLS ----------- //
    // shader.current.uniforms.uWaveIntensity.value = controls.waveIntensity;
    // shader.current.uniforms.uWaveFrequency.value = controls.waveFrequency;

    if (!touchTexture) return;
    touchTexture.update();
  });

  return (
    <mesh
      ref={ref}
      scale={scrollScene.scale.xyz}
      onPointerMove={handleMouseMove}
    >
      <planeGeometry args={[1, 1, 16, 16]} />
      <shaderMaterial
        ref={shader}
        vertexShader={vertex}
        fragmentShader={fragment}
        transparent={true}
        uniforms={uniforms}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
};
