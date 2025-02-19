import {
  ScrollScene,
  UseCanvas,
  useScrollRig,
} from "@14islands/r3f-scroll-rig";
import { useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { MutableRefObject, useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

import { useControls } from "leva";
import fragment from "./shader/fragment.glsl";
import vertex from "./shader/vertex.glsl";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useCursorStore } from "../../../../store/useCursorStyle";
import { useNavigate } from "react-router-dom";

const ThreeVignette = ({ scrollScene, img }) => {
  const shader = useRef<THREE.ShaderMaterial>(null);
  const texture = useTexture(img) as THREE.Texture;

  const controls = useControls({
    intensity: {
      value: 45.0,
      min: 0,
      max: 100,
      step: 0.01,
    },
    delta: {
      value: 0.006,
      min: 0,
      max: 1,
      step: 0.001,
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
    shader.current.uniforms.uIntensity.value = controls.intensity;
    shader.current.uniforms.uDelta.value = controls.delta;
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

type ExperimentVignetteProps = {
  title: string;
  slug?: string;
  img: string;
};

export const ExperimentVignette = ({ img, slug }: ExperimentVignetteProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { setCursorStyle } = useCursorStore();
  const { hasSmoothScrollbar } = useScrollRig();
  const navigate = useNavigate();

  const handleClick = () => {
    if (slug) {
      navigate(`/experiments/${slug}`);
    }
  };

  return (
    <div>
      <div
        ref={ref}
        className="relative w-full aspect-square object-cover"
        onMouseEnter={() => setCursorStyle("pointer")}
        onMouseLeave={() => setCursorStyle("default")}
        onClick={handleClick}
      >
        <img
          className="w-full h-full object-cover"
          // style={{ opacity: hasSmoothScrollbar ? 0 : 1 }}
          src={img}
        />
        {/* 
        <UseCanvas>
          <ScrollScene
            track={ref as MutableRefObject<HTMLElement>}
            inViewportMargin="400%"
          >
            {(props) => <ThreeVignette scrollScene={props} img={img} />}
          </ScrollScene>
        </UseCanvas> */}
      </div>
      {/* 
        <h2 className="text-xl text-secondary-400 font-semibold">
          {title}
        </h2> 
        */}
    </div>
  );
};
