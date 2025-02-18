import { RefObject, useEffect, useMemo, useRef, useState } from "react";

import { ScrollSceneChildProps } from "@14islands/r3f-scroll-rig";
import { useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

import { useColorContext } from "../../../hooks/useColorContext";
import { useTouchTexture } from "../TouchTexture";

import { useStripesUVMapping } from "../utils/useStripesUVMapping";
import fragmentShader from "./shaders/fragment.glsl";
import vertexShader from "./shaders/vertex.glsl";
import { useWindowSize } from "../../../hooks";

const disp_src = "/assets/DisplacementMaps/logo-displacement_map.jpg";

type Props = {
  scrollScene: ScrollSceneChildProps;
  trackedDiv: RefObject<HTMLDivElement>;
};

const Lines = ({ scrollScene }: Props) => {
  // -------------------- SETTING CONSTANTS -------------------- //
  const GAP = 16;
  const VERTICES = 128;
  const NB_STRIPES = 24;
  const ARRAY_STRIPES = new Array(NB_STRIPES).fill(0);
  const WIDTH = scrollScene.scale.x;
  const HEIGHT = scrollScene.scale.y;

  // -------------------- SETTING REFS -------------------- //
  const shaderRef = useRef<THREE.ShaderMaterial>(null);
  const stripeGeometries = useRef<THREE.PlaneGeometry[]>([]);
  const planeGeometry = useRef<THREE.PlaneGeometry>(null);

  // -------------------- SETTING TEXTURES -------------------- //
  const texture = useTexture(disp_src);

  const touchTexture = useTouchTexture({
    isOnScreen: false,
    size: 128,
    maxAge: 120,
    radius: 0.1,
  });

  const [dimensions, setDimensions] = useState({
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  });
  const windowSize = useWindowSize();
  const { colors } = useColorContext();

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uDisp: { value: texture },
      uDispSize: {
        value: new THREE.Vector2(texture.image.width, texture.image.height),
      },
      uTouchTexture: { value: touchTexture.texture },
      uQuadSize: {
        value: new THREE.Vector2(scrollScene.scale.x, scrollScene.scale.y),
      },
      uColor: { value: new THREE.Color(colors.light) },
      uDispZ: { value: 0 },
      uDispY: { value: 20 },
      uMouse: { value: new THREE.Vector2(0, 0) },
    }),
    []
  );

  useStripesUVMapping({
    planeGeometry,
    stripeGeometries,
    nbStripes: NB_STRIPES,
  });

  useEffect(() => {
    const dimensions = scrollScene.track.current.getBoundingClientRect();

    const NDCDimensions = {
      left: (dimensions.left - window.innerWidth / 2) / (window.innerWidth / 2),
      right:
        (dimensions.right - window.innerWidth / 2) / (window.innerWidth / 2),
      top: (dimensions.top - window.innerHeight / 2) / (window.innerHeight / 2),
      bottom:
        (dimensions.bottom - window.innerHeight / 2) / (window.innerHeight / 2),
    };

    setDimensions(NDCDimensions);
  }, [windowSize, scrollScene.track]);

  useFrame(({ clock, pointer }) => {
    if (!touchTexture || !dimensions || !pointer) return;

    touchTexture.update(pointer);

    if (!shaderRef.current) return;
    const time = clock.getElapsedTime();
    //  updating the uniforms
    shaderRef.current.uniforms.uTime.value = time;
  });

  return (
    <>
      {ARRAY_STRIPES.map((_, index) => {
        const stripeHeight =
          (HEIGHT - GAP * (ARRAY_STRIPES.length - 1)) / ARRAY_STRIPES.length;
        const yPosition =
          index * (stripeHeight + GAP) - HEIGHT / 2 + stripeHeight / 2;

        return (
          <mesh key={index} position={[0, yPosition, 2]}>
            <planeGeometry
              ref={(e) => {
                if (!e) return;
                stripeGeometries.current[index] = e;
              }}
              args={[WIDTH, stripeHeight, VERTICES, VERTICES]}
            />
            <shaderMaterial
              ref={shaderRef}
              side={THREE.DoubleSide}
              uniforms={uniforms}
              vertexShader={vertexShader}
              fragmentShader={fragmentShader}
            />
          </mesh>
        );
      })}
      <mesh position={[0, 0, 50]}>
        <planeGeometry
          ref={planeGeometry}
          args={[WIDTH, HEIGHT, VERTICES, VERTICES]}
        />
        <meshStandardMaterial transparent opacity={0} />
      </mesh>
    </>
  );
};

export default Lines;
