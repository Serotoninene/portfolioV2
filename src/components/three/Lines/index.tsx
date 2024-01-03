import { RefObject, useMemo, useRef } from "react";

import { ScrollSceneChildProps } from "@14islands/r3f-scroll-rig";
import { useTexture } from "@react-three/drei";
import { ThreeEvent, useFrame } from "@react-three/fiber";
import * as THREE from "three";

import { useColorContext } from "../../../hooks/useColorContext";
import TouchTexture from "../TouchTexture";
import { useStripesUVMapping } from "./hooks/useStripesUVMapping";
import fragmentShader from "./shaders/fragment.glsl";
import vertexShader from "./shaders/vertex.glsl";

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
  const refs = useRef<THREE.ShaderMaterial>(null);
  const stripeGeometries = useRef<THREE.PlaneGeometry[]>([]);
  const planeGeometry = useRef<THREE.PlaneGeometry>(null);

  // -------------------- SETTING TEXTURES -------------------- //
  const texture = useTexture(disp_src);
  const touchTexture = useMemo(() => new TouchTexture(true), []);

  const { colors } = useColorContext();

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uDisp: { value: texture },
      uDispSize: {
        value: new THREE.Vector2(texture.image.width, texture.image.height),
      },
      uTouchTexture: { value: touchTexture.texture },
      uColor: { value: new THREE.Color(colors.light) },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uQuadSize: { value: new THREE.Vector2(HEIGHT, WIDTH) },
    }),
    []
  );

  const handleMouseMove = (e: ThreeEvent<MouseEvent>) => {
    const mappedMouse = {
      x: THREE.MathUtils.mapLinear(e.pointer.x, -1, 1, 0, 1),
      y: THREE.MathUtils.mapLinear(e.pointer.y, -1, 1, 0, 1), // <-- PROBLEM HERE !
    };
    touchTexture.addTouch(mappedMouse);
  };

  useStripesUVMapping({
    planeGeometry,
    stripeGeometries,
    nbStripes: NB_STRIPES,
  });

  useFrame(() => {
    if (!touchTexture) return;
    touchTexture.update();
  });

  return (
    <>
      <mesh onPointerMove={handleMouseMove}>
        <planeGeometry
          ref={planeGeometry}
          args={[WIDTH, HEIGHT, VERTICES, VERTICES]}
        />
        <meshStandardMaterial transparent opacity={0} />
      </mesh>
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
              ref={refs}
              side={THREE.DoubleSide}
              uniforms={uniforms}
              vertexShader={vertexShader}
              fragmentShader={fragmentShader}
            />
          </mesh>
        );
      })}
    </>
  );
};

export default Lines;
