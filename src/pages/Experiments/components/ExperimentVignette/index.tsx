import { ScrollScene, UseCanvas } from "@14islands/r3f-scroll-rig";
import { useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { MutableRefObject, useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

import { useControls } from "leva";
import fragment from "./shader/fragment.glsl";
import vertex from "./shader/vertex.glsl";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const ThreeVignette = ({ scrollScene, img }) => {
  const shader = useRef<THREE.ShaderMaterial>(null);
  const texture = useTexture(img) as THREE.Texture;
  const controls = useControls({
    intensity: {
      value: 0.2,
      min: 0,
      max: 100,
      step: 0.01,
    },
    delta: {
      value: 38.1,
      min: 0,
      max: 100,
      step: 0.01,
    },
  });

  const uniforms = useMemo(() => {
    return {
      uTime: { value: 0 },
      uTexture: { value: texture },
      uQuadSize: {
        value: new THREE.Vector2(scrollScene?.scale.x, scrollScene?.scale.y),
      },
      uTextureSize: {
        value: new THREE.Vector2(texture.image.width, texture.image.height),
      },
      uIntensity: { value: controls.intensity },
      uDelta: { value: controls.delta },
      uSpeed: { value: 0 },
    };
  }, []);

  useEffect(() => {
    ScrollTrigger.create({
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        if (shader.current)
          shader.current.uniforms.uSpeed.value = self.getVelocity() / 1000;
      },
    });
  });

  useFrame(() => {
    // update the controls
    if (!shader.current) return;
  });
  return (
    <mesh {...scrollScene}>
      <planeGeometry args={[1, 1, 32, 32]} />
      <shaderMaterial
        ref={shader}
        vertexShader={vertex}
        fragmentShader={fragment}
        uniforms={uniforms}
      />
    </mesh>
  );
};

export const ExperimentVignette = ({ title, img }) => {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div ref={ref} className="relative w-full aspect-square">
      <h2 className="absolute top-0 left-0 z-10">{title}</h2>
      <img className="w-full object-cover opacity-5" src={img} />

      <UseCanvas>
        <ScrollScene
          track={ref as MutableRefObject<HTMLElement>}
          inViewportMargin="400%"
        >
          {(props) => <ThreeVignette scrollScene={props} img={img} />}
        </ScrollScene>
      </UseCanvas>
    </div>
  );
};
