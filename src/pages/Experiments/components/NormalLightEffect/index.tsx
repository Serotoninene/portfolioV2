import { Canvas, useLoader } from "@react-three/fiber";
import gsap, { Power3 } from "gsap";
import { useRef } from "react";
import * as THREE from "three";

const HEIGHT = 6;
const ASPECT_RATIO = 1808 / 2400;
const WIDTH = HEIGHT * ASPECT_RATIO;
const PICTURE =
  "https://o1vj7bm9yy.ufs.sh/f/YS7X7tdqhV1FBUYlpLoNwMeQfYuL7xG5lmpC4VbRJD8SIriq";
const NORMAL_MAP =
  "https://o1vj7bm9yy.ufs.sh/f/YS7X7tdqhV1FfNe263XpM2KymJYEndGrlQX0469utCHeB7Fv";
const DISPLACEMENT_MAP =
  "https://o1vj7bm9yy.ufs.sh/f/YS7X7tdqhV1FB1adboNwMeQfYuL7xG5lmpC4VbRJD8SIriq3";

import { useEffect } from "react";
import { PointLight } from "three";

export function FollowingLight() {
  const ref = useRef<PointLight>(null);

  useEffect(() => {
    // Convert mouse position to 3D space coordinates
    const handleMouseMove = (event: MouseEvent) => {
      // Get normalized device coordinates (-1 to +1)
      const x = (event.clientX / window.innerWidth) * 2 - 1;
      const y = -(event.clientY / window.innerHeight) * 2 + 1;

      // Scale the coordinates to make the movement more pronounced
      // Adjust these multipliers to change the range of movement
      if (!ref.current) return;
      gsap.to(ref.current.position, {
        x: (x * WIDTH) / 2,
        y: (y * HEIGHT) / 2,
        duration: 0.5,
        ease: Power3.easeOut,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <pointLight ref={ref} position={[0, 0, 1]} intensity={10} color="#ffffff" />
  );
}

function Plane() {
  const mesh = useRef(null);
  const [texture, normalMap, displacement_map] = useLoader(
    THREE.TextureLoader,
    [PICTURE, NORMAL_MAP, DISPLACEMENT_MAP]
  );

  return (
    <mesh ref={mesh}>
      <planeGeometry args={[WIDTH, HEIGHT, 1, 1]} />
      <meshStandardMaterial
        map={texture}
        normalMap={normalMap}
        displacementMap={displacement_map}
        displacementScale={0.2}
        // wireframe
      />
    </mesh>
  );
}

export function Scene() {
  return (
    <Canvas style={{ height: "100vh", width: "100vw" }}>
      <ambientLight intensity={3.5} />
      <FollowingLight />
      <Plane />
    </Canvas>
  );
}

export function NormalLightEffect() {
  return (
    <div className="App" style={{ backgroundColor: "#F3F1EC" }}>
      <Scene />
    </div>
  );
}
