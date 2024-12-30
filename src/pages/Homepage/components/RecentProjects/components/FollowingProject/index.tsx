import { useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

import { ScrollSceneChildProps } from "@14islands/r3f-scroll-rig";
import { projects } from "../../data";
import { useUpdateTexture } from "./animations";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
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

  const { width } = useWindowSize();

  const uniforms = useMemo(
    () => ({
      uProgress: { value: 0 },
      uAngle: { value: 0.36 },
      uRadius: { value: 0.15 },
      uRolls: { value: 8 },
      uTexture: { value: textures[0] },
      uTexture2: { value: null },
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

  // Expand the bounding sphere so the frustum doesn't clip the mesh too soon
  useEffect(() => {
    if (!ref.current || !ref.current.geometry) return;

    const geometry = ref.current.geometry;

    // Compute the sphere
    geometry.computeBoundingSphere();

    // Expand the radius (e.g., make it 2x bigger)
    if (geometry.boundingSphere) {
      geometry.boundingSphere.radius *= 2.5;
    }
  }, []);

  useUpdateTexture({
    shader: shader.current,
    textures,
    mixFactor,
    setMixFactor,
  });

  useGSAP(() => {
    if (!shader.current) return;

    gsap.to(shader.current.uniforms.uProgress, {
      value: 1,
      scrollTrigger: {
        trigger: "#StickyText",
        endTrigger: "#ProjectLines",
        start: "top top",
        end: "top top",
        scrub: 0.1,
        onUpdate: (self) => {
          if (!shader.current) return;
          shader.current.uniforms.uProgress.value = self.progress;
        },
      },
    });
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

    if (!touchTexture) return;
    touchTexture.update();
  });

  return (
    <mesh ref={ref} {...scrollScene}>
      <planeGeometry args={[1, 1, 32, 32]} />
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
