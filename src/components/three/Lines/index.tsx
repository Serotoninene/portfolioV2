import { RefObject, useEffect, useLayoutEffect, useMemo, useRef } from "react";

import * as THREE from "three";
import { ThreeEvent, useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import { ScrollSceneChildProps } from "@14islands/r3f-scroll-rig";

import vertexShader from "./shaders/vertex.glsl";
import fragmentShader from "./shaders/fragment.glsl";
import TouchTexture from "../TouchTexture";
import { useStripesUVMapping } from "./hooks/useStripesUVMapping";
import { useColorContext } from "../../../hooks/useColorContext";

const disp_src = "/assets/DisplacementMaps/logo-displacement_map.jpg";

type Props = {
  scrollScene: ScrollSceneChildProps;
  trackedDiv: RefObject<HTMLDivElement>;
};

const Lines = ({ scrollScene }: Props) => {
  const refs = useRef<THREE.ShaderMaterial>(null);
  const stripeGeometries = useRef<THREE.PlaneGeometry[]>([]);
  const planeGeometry = useRef<THREE.PlaneGeometry>(null);

  const texture = useTexture(disp_src);
  const touchTexture = useMemo(() => new TouchTexture(true), []);

  const { colors } = useColorContext();

  const gap = 16;
  const NB_STRIPES = 24;
  const ARRAY_STRIPES = new Array(NB_STRIPES).fill(0);

  const WIDTH = scrollScene.scale.x;
  const HEIGHT = scrollScene.scale.y;

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

    // console.log(mappedMouse.y);
    touchTexture.addTouch(mappedMouse);
  };

  useFrame(() => {
    if (touchTexture) {
      touchTexture.update();
    }
  });

  useStripesUVMapping({
    planeGeometry,
    stripeGeometries,
    nbStripes: NB_STRIPES,
  });

  const vertexNum = 128;

  return (
    <>
      <mesh onPointerMove={handleMouseMove}>
        <planeGeometry
          ref={planeGeometry}
          args={[WIDTH, HEIGHT, vertexNum, vertexNum]}
        />
        <meshStandardMaterial transparent opacity={0} />
      </mesh>
      {ARRAY_STRIPES.map((_, index) => {
        const stripeHeight =
          (HEIGHT - gap * (ARRAY_STRIPES.length - 1)) / ARRAY_STRIPES.length;
        const yPosition =
          index * (stripeHeight + gap) - HEIGHT / 2 + stripeHeight / 2;

        return (
          <mesh key={index} position={[0, yPosition, 2]}>
            <planeGeometry
              ref={(e) => {
                if (!e) return;
                stripeGeometries.current[index] = e;
              }}
              args={[WIDTH, stripeHeight, vertexNum, vertexNum]}
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
