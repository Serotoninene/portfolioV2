import { useTexture } from "@react-three/drei";
import { useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import * as THREE from "three";
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
  const texture = useTexture(img) as THREE.Texture;
  const { setCursorStyle } = useCursorStore();

  const navigate = useNavigate();

  const handleClick = () => {
    if (slug) {
      navigate(`/experiments/${slug}`);
    }
  };

  const uniforms = useMemo(
    () => ({
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
      <planeGeometry args={[1, 1, 4, 4]} />
      <shaderMaterial
        vertexShader={vertex}
        fragmentShader={fragment}
        uniforms={uniforms}
      />
    </mesh>
  );
};
