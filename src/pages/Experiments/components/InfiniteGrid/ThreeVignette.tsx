import { useEffect, useMemo, useRef } from "react";
import { useNavigate } from "react-router-dom";
import * as THREE from "three";
import { shaderMaterial, useTexture } from "@react-three/drei";

import { useControls } from "leva";
import { useCursorStore } from "../../../../store/useCursorStyle";

import vertex from "./shader/vertex.glsl";
import fragment from "./shader/fragment.glsl";

export const ThreeVignette = ({
  slug,
  img,
  meshRefs,
  imgRefs,
  idx,
  momentum,
}) => {
  const shaderRef = useRef<THREE.ShaderMaterial>(null);
  const texture = useTexture(img) as THREE.Texture;
  const { setCursorStyle } = useCursorStore();

  const navigate = useNavigate();

  const handleClick = () => {
    if (slug) {
      navigate(`/experiments/${slug}`);
    }
  };

  useControls({
    intensity: {
      value: 45,
      min: 1,
      max: 100,
      step: 0.1,
      onChange: (e) => {
        if (shaderRef.current) shaderRef.current.uniforms.uIntensity.value = e;
      },
    },
    speed: {
      value: 0.005,
      min: 0,
      max: 1,
      step: 0.001,
      onChange: (e) => {
        if (shaderRef.current) shaderRef.current.uniforms.uSpeed.value = e;
      },
    },
  });

  const uniforms = useMemo(
    () => ({
      // Texture uniforms
      uTexture: { value: texture },
      uQuadSize: {
        value: new THREE.Vector2(
          imgRefs.current[idx].offsetWidth,
          imgRefs.current[idx].offsetHeight
        ),
      },
      uTextureSize: {
        value: new THREE.Vector2(texture.image.width, texture.image.height),
      },
      // Scroll uniform
      uMomentum: { value: 0 },
      // Distortion uniform
      uIntensity: {
        value: 45,
      },
      uSpeed: {
        value: 0.2,
      },
    }),
    []
  );

  useEffect(() => {}, [momentum]);

  return (
    <mesh
      ref={(e) => {
        meshRefs.current[idx] = e;
      }}
      onPointerEnter={() => setCursorStyle("pointer")}
      onPointerLeave={() => setCursorStyle("default")}
      onClick={handleClick}
    >
      <planeGeometry args={[1, 1, 32, 32]} />
      <shaderMaterial
        ref={shaderRef}
        vertexShader={vertex}
        fragmentShader={fragment}
        uniforms={uniforms}
      />
    </mesh>
  );
};
