import {
  ScrollScene,
  UseCanvas,
  useScrollRig,
} from "@14islands/r3f-scroll-rig";
import { useTexture } from "@react-three/drei";
import {
  MutableRefObject,
  RefObject,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import * as THREE from "three";

import gsap from "gsap";
import ScrollToPlugin from "gsap/ScrollToPlugin";
import { useNavigate } from "react-router-dom";
import { useCursorStore } from "../../../../store/useCursorStyle";
import fragment from "./shader/fragment.glsl";
import vertex from "./shader/vertex.glsl";
import { useFrame } from "@react-three/fiber";
import { getTrueGridHeight } from "../..";
import { useWindowSize } from "../../../../hooks";

const ThreeVignette = ({ scrollScene, gridRef, yPosition, index, img }) => {
  const mesh = useRef<THREE.Mesh>(null);
  const width = useWindowSize();
  const [gridHeight, setGridHeight] = useState(0);

  const scrollPosition = useRef(0);
  const momentum = useRef(0);

  const texture = useTexture(img) as THREE.Texture;

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
      uIntensity: { value: 45 },
      uDelta: { value: 0.0006 },
      uSpeed: { value: 0 },
    };
  }, []);

  const handleWheel = (e: WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaX + e.deltaY;
    scrollPosition.current += delta * 0.5; // Reduced from 0.001 to 0.0005
    momentum.current = delta;
  };

  // Only for desktop so far
  useEffect(() => {
    setGridHeight(getTrueGridHeight(gridRef));
    console.log(scrollScene.scale.y);
    console.log(yPosition);

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [gridRef, width]);

  useFrame(({ viewport }, delta) => {
    if (!mesh.current) return;

    // // Calculate scroll position with momentum
    const scrollMultiplier =
      Math.abs(momentum.current) > 0.1 ? delta / 32 : delta / 64;
    scrollPosition.current += momentum.current * scrollMultiplier * 5;

    // Dynamic friction calculation
    const baseFriction = 0.1;
    const speedFriction = 1 - Math.exp(-Math.abs(momentum.current));
    const friction = Math.min(baseFriction + speedFriction * 0.1, 0.95);
    momentum.current *= friction;

    // console.log(scrollPosition.current);
    // Smooth position update
    const targetY = scrollPosition.current;
    mesh.current.position.y = THREE.MathUtils.lerp(
      mesh.current.position.y,
      targetY,
      0.1
    );

    if (index === 0) {
    }

    // // Calculate boundaries relative to the mesh's initial position
    const bottomBoundary = -viewport.height + yPosition;
    const topBoundary = scrollScene.scale.y + yPosition;

    // // Reset position while maintaining relative spacing
    // if (mesh.current.position.y < bottomBoundary) {
    //   mesh.current.position.y += gridHeight;
    //   scrollPosition.current = mesh.current.position.y;
    // }
    if (mesh.current.position.y > topBoundary) {
      // console.log("reset top");gridHeight
      mesh.current.position.y -= gridHeight;
      scrollPosition.current = mesh.current.position.y;
    }
  });

  return (
    <mesh ref={mesh} {...scrollScene}>
      <planeGeometry args={[1, 1, 32, 32]} />
      <shaderMaterial
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
  index: number;
  img: string;
  gridRef: RefObject<HTMLDivElement>;
  gridPosition: { gridColumn: string; marginTop: string };
};

gsap.registerPlugin(ScrollToPlugin);

export const ExperimentVignette = ({
  img,
  index,
  slug,
  gridRef,
  gridPosition,
}: ExperimentVignetteProps) => {
  const ref = useRef<HTMLDivElement>(null);

  const { setCursorStyle } = useCursorStore();
  const { hasSmoothScrollbar } = useScrollRig();

  const navigate = useNavigate();

  const handleClick = () => {
    if (slug) {
      navigate(`/experiments/${slug}`);
    }
  };

  useEffect(() => {
    console.log(ref.current?.getBoundingClientRect().top);
  }, []);

  return (
    <div
      ref={ref}
      id={slug}
      className="relative w-full aspect-square object-cover"
      onMouseEnter={() => setCursorStyle("pointer")}
      onMouseLeave={() => setCursorStyle("default")}
      onClick={handleClick}
      style={{
        gridColumn: gridPosition.gridColumn,
        marginTop: gridPosition.marginTop,
      }}
    >
      <img
        className="w-full aspect-square object-cover"
        style={{ opacity: hasSmoothScrollbar ? 0.1 : 1 }}
        src={img}
      />

      <UseCanvas>
        <ScrollScene
          track={ref as MutableRefObject<HTMLElement>}
          hideOffscreen={false}
        >
          {(props) => (
            <ThreeVignette
              gridRef={gridRef}
              scrollScene={props}
              yPosition={ref.current?.getBoundingClientRect().top}
              img={img}
              index={index}
            />
          )}
        </ScrollScene>
      </UseCanvas>
    </div>
  );
};
