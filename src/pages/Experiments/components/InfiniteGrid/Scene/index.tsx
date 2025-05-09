import { useFrame } from "@react-three/fiber";
import { RefObject, useEffect, useRef, useState } from "react";
import * as THREE from "three";

import gsap, { Power3 } from "gsap";
import { InfiniteGridProps } from "..";
import { AnimatedText3D } from "../../../../../components/three/AnimatedText3D";
import { useWindowSize } from "../../../../../hooks";
import { useColorContext } from "../../../../../hooks/useColorContext";
import { ThreeVignette } from "../ThreeVignette";
import { useScrollEvents } from "./hooks/useInfiniteScroll";

interface SceneProps extends InfiniteGridProps {
  imgRefs: RefObject<HTMLDivElement[]>;
  gridRef: RefObject<HTMLDivElement>;
}

const getTrueGridHeight = (gridRef: RefObject<HTMLDivElement>) => {
  if (!gridRef.current) return 0;

  // Get all child elements
  const children = Array.from(gridRef.current.children);

  const minTop = children[0]?.getBoundingClientRect().top;
  const maxBottom =
    children[children.length - 1]?.getBoundingClientRect().bottom;

  // True grid height based on the outermost child positions
  return maxBottom - minTop;
};

const GAP_SIZE = 20;

export const Scene = ({ experimentsArray, imgRefs, gridRef }: SceneProps) => {
  const groupRef = useRef<THREE.Group>(null);
  const meshRefs = useRef<THREE.Mesh[]>([]);
  const [gridSize, setGridSize] = useState(0);
  const { colors } = useColorContext();

  const width = useWindowSize();

  useEffect(() => {
    setGridSize(getTrueGridHeight(gridRef));
  }, [gridRef, width]);

  const { momentum, scrollPosition } = useScrollEvents();

  useEffect(() => {
    // Positionning each mesh according to its dom counter part
    imgRefs.current?.forEach((img, idx) => {
      const { top, left, width, height } = img.getBoundingClientRect();
      const x = left - window.innerWidth / 2 + width / 2;
      const y = -top + window.innerHeight / 2 - height / 2;
      meshRefs.current[idx]?.position.set(x, y, 0);
      meshRefs.current[idx]?.scale.set(width, height, 1);
    });
  }, [meshRefs.current, width]);

  useEffect(() => {
    const dummyValue = { value: 0 };

    gsap.to(dummyValue, {
      value: 1,
      duration: 0.5,
      delay: 2,
      ease: Power3.easeOut,
    });
  }, []);

  // Scroll variables
  const scrollSpeedFactor = 1000;
  const momentumDamping = 0.9; // Higher value = more momentum (slower stop)

  useFrame(({ viewport }, delta) => {
    if (!groupRef.current) return;

    // // Calculate scroll position with momentum
    const scrollMultiplier =
      Math.abs(momentum.current) > 0.1 ? delta / 32 : delta / 64;
    scrollPosition.current +=
      momentum.current * scrollMultiplier * scrollSpeedFactor;

    // Dynamic friction calculation
    const baseFriction = 0.1;
    const speedFriction = 1 - Math.exp(-Math.abs(momentum.current));
    const friction = Math.min(
      baseFriction + speedFriction * momentumDamping,
      0.95
    );
    momentum.current *= friction;

    if (Math.abs(momentum.current) < 0.0001) {
      momentum.current = 0;
    }

    // Smooth position update
    const targetY = scrollPosition.current;
    groupRef.current.position.y = THREE.MathUtils.lerp(
      groupRef.current.position.y,
      targetY,
      0.1
    );

    const worldPositions = new THREE.Vector3();

    groupRef.current.children.forEach((plane) => {
      const mesh = plane as THREE.Mesh;
      const material = mesh.material as THREE.ShaderMaterial;
      const planeWorldPosition = plane.getWorldPosition(worldPositions);

      // update the momentum value in the shader
      if (material.uniforms && material.uniforms.uMomentum) {
        material.uniforms.uMomentum.value = THREE.MathUtils.lerp(
          material.uniforms.uMomentum.value,
          momentum.current,
          0.1
        );
      }

      if (planeWorldPosition.y > viewport.height / 2 + mesh.scale.y / 2) {
        mesh.position.y -= gridSize + GAP_SIZE;
      } else if (
        planeWorldPosition.y <
        -viewport.height / 2 - mesh.scale.y / 2
      ) {
        mesh.position.y += gridSize + GAP_SIZE;
      }
    });
  });

  return (
    <>
      <AnimatedText3D
        color={colors.secondaryColor}
        size={64}
        position={[0, 0, -500]}
      >
        EXPERIMENTS
      </AnimatedText3D>
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
    </>
  );
};
