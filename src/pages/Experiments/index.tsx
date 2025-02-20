import { UseCanvas, useScrollRig } from "@14islands/r3f-scroll-rig";
import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCursorStore } from "../../store/useCursorStyle";
import {
  DistortedRectangle,
  DistortedText,
  InstancedBlocks,
  Portal,
} from "./components";
import { ASCIIEffect } from "./components/ASCIIEffect";
import { BlurEffect } from "./components/BlurEffect";
import { NormalLightEffect } from "./components/NormalLightEffect";
import { RefractionGlass } from "./components/RefractionGlass";
import vertex from "./components/ExperimentVignette/shader/vertex.glsl";
import fragment from "./components/ExperimentVignette/shader/fragment.glsl";
import { useWindowSize } from "../../hooks";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { ExperimentVignette } from "./components/ExperimentVignette";
import { useTexture } from "@react-three/drei";

interface Experiment {
  title: string;
  slug: string;
  img: string;
  component: React.ComponentType;
}

export const experimentsData: Record<string, Experiment> = {
  refraction_glass: {
    title: "Refraction glass",
    slug: "refraction_glass",
    img: "https://o1vj7bm9yy.ufs.sh/f/YS7X7tdqhV1F6uI4xiWqLth0PVgZ6I23nKNypzWGrbxJDkvj",
    component: RefractionGlass,
  },
  ascii_effect: {
    title: "ASCII Effect",
    slug: "ascii_effect",
    img: "https://o1vj7bm9yy.ufs.sh/f/YS7X7tdqhV1FJ1r8x3By39B6xYKiHU8hSXsO2bnZVozAvpIu",
    component: ASCIIEffect,
  },
  normal_light_effect: {
    title: "Normal Map Magic",
    slug: "normal_light_effect",
    img: "https://o1vj7bm9yy.ufs.sh/f/YS7X7tdqhV1FXbVUZD65W9E3ypYKDvVgkwlhU8JbT7G1FeQR",
    component: NormalLightEffect,
  },
  blur_effect: {
    title: "Blur Texture Effect",
    slug: "blur_effect",
    img: "https://o1vj7bm9yy.ufs.sh/f/YS7X7tdqhV1FBfv6ZKNwMeQfYuL7xG5lmpC4VbRJD8SIriq3",
    component: BlurEffect,
  },
  distorted_rectangle: {
    title: "Distorted Rectangle",
    slug: "distorted_rectangle",
    img: "/assets/Experiments/DistortedRectangle.webp",
    component: DistortedRectangle,
  },
  portal: {
    title: "Portal",
    slug: "portal",
    img: "/assets/Experiments/Portal.webp",
    component: Portal,
  },
  distorted_text: {
    title: "Distorted Text",
    slug: "distorted_text",
    img: "/assets/Photos/s-eychenne-les-routes-de-mon-enfance.jpeg",
    component: DistortedText,
  },
  instancedblocks: {
    title: "Instanced Blocks",
    slug: "instancedblocks",
    img: "/assets/Experiments/InstancedBlocks.webp",
    component: InstancedBlocks,
  },
};

export const experimentsArray = Object.values(experimentsData);

const getGridPosition = (idx: number) => {
  let gridColumn = "";
  let marginTop = "";

  if (idx % 6 === 0) {
    gridColumn = `2 / span 3`;
    marginTop = "-32px";
  } else if (idx % 6 === 1) {
    gridColumn = `10 / span 3`;
    marginTop = "96px";
  } else if (idx % 6 === 2) {
    gridColumn = `4 / span 3`;
    marginTop = "-32px";
  } else if (idx % 6 === 3) {
    gridColumn = ` 8 / span 3`;
    marginTop = "226px";
  } else if (idx % 6 === 4) {
    gridColumn = `3 / span 3`;
    marginTop = "20px";
  } else if (idx % 6 === 5) {
    gridColumn = ` 8/ span 3`;
    marginTop = "206px";
  }

  return { gridColumn, marginTop };
};

export const getTrueGridHeight = (gridRef) => {
  if (!gridRef.current) return 0;

  // Get all child elements
  const children = Array.from(gridRef.current.children);

  const minTop = children[0]?.getBoundingClientRect().top;
  const maxBottom =
    children[children.length - 1]?.getBoundingClientRect().bottom;

  // True grid height based on the outermost child positions
  return maxBottom - minTop;
};

const Experiments = () => {
  const gridRef = useRef<HTMLDivElement>(null);

  return (
    <div className="relative z-20 text-black py-10 px-5 h-screen overflow-hidden">
      {/* <div className="pt-40 grid grid-cols-8 gap-5 mb-40">
        <div className="flex flex-col mt-10 justify-between col-span-6">
          <h1 className="text-7xl font-medium"> EXPERIMENTATIONS</h1>
        </div>

        <p className="col-span-2 flex items-end text-end">
          Welcome to the Experimentations page! Here, you'll find a collection
          of innovative and interactive projects I've made !
        </p>
      </div> */}

      <div
        ref={gridRef}
        className={`grid grid-cols-12 auto-rows-auto  pt-10 gap-5`}
      >
        <InfiniteGrid experimentsArray={experimentsArray} gridRef={gridRef} />
      </div>
    </div>
  );
};

const InfiniteGrid = ({ experimentsArray, gridRef }) => {
  const imgRefs = useRef<HTMLDivElement[]>([]);
  const { setCursorStyle } = useCursorStore();
  const { hasSmoothScrollbar } = useScrollRig();

  return (
    <>
      {experimentsArray.map((experiment, idx) => {
        const { gridColumn, marginTop } = getGridPosition(idx);
        return (
          <div
            id={experiment.slug}
            ref={(e) => {
              if (imgRefs.current) imgRefs.current[idx] = e;
            }}
            key={experiment.slug}
            className="relative w-full aspect-square object-cover"
            // onMouseEnter={() => setCursorStyle("pointer")}
            // onMouseLeave={() => setCursorStyle("default")}
            style={{
              gridColumn,
              marginTop,
            }}
          >
            <img
              className="w-full aspect-square object-cover"
              style={{
                opacity: hasSmoothScrollbar ? 0 : 1,
                pointerEvents: hasSmoothScrollbar ? "none" : "auto",
              }}
              src={experiment.img}
            />
          </div>
        );
      })}

      <UseCanvas>
        <Scene
          experimentsArray={experimentsArray}
          imgRefs={imgRefs}
          gridRef={gridRef}
        />
      </UseCanvas>
    </>
  );
};

const Scene = ({ experimentsArray, imgRefs, gridRef }) => {
  const groupRef = useRef<THREE.Group>(null);
  const meshRefs = useRef<THREE.Mesh[]>([]);
  const [gridSize, setGridSize] = useState(0);

  const width = useWindowSize();

  const scrollPosition = useRef(0);
  const momentum = useRef(0);

  useEffect(() => {
    setTimeout(() => {
      setGridSize(getTrueGridHeight(gridRef));
    }, 1000);
  }, [gridRef]);

  useEffect(() => {
    imgRefs.current?.forEach((img, idx) => {
      const { top, left, width, height } = img.getBoundingClientRect();
      const x = left - window.innerWidth / 2 + width / 2;
      const y = -top + window.innerHeight / 2 - height / 2;
      meshRefs.current[idx]?.position.set(x, y, 0);
      meshRefs.current[idx]?.scale.set(width, height, 1);
    });
  }, [meshRefs.current, width]);

  const handleWheel = (e: WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaX + e.deltaY;
    scrollPosition.current += delta * 0.5; // Reduced from 0.001 to 0.0005
    momentum.current = delta;
  };

  // Only for desktop so far
  useEffect(() => {
    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [groupRef, width]);

  useFrame(({ viewport }, delta) => {
    if (!groupRef.current) return;

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
    groupRef.current.position.y = THREE.MathUtils.lerp(
      groupRef.current.position.y,
      targetY,
      0.1
    );

    const worldPositions = new THREE.Vector3();

    groupRef.current.children.forEach((plane, idx) => {
      const planeWorldPosition = plane.getWorldPosition(worldPositions);

      if (planeWorldPosition.y > viewport.height / 2 + plane.scale.y / 2) {
        plane.position.y -= gridSize;
      } else if (
        planeWorldPosition.y <
        -viewport.height / 2 - plane.scale.y / 2
      ) {
        plane.position.y += gridSize;
      }
    });
  });

  return (
    <group ref={groupRef}>
      {experimentsArray.map((experiment, idx: number) => (
        <ThreeVignette
          key={experiment.slug}
          img={experiment.img}
          slug={experiment.slug}
          meshRefs={meshRefs}
          imgRefs={imgRefs}
          idx={idx}
        />
      ))}
    </group>
  );
};

const ThreeVignette = ({ slug, img, meshRefs, imgRefs, idx }) => {
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

export default Experiments;
