import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";

import * as THREE from "three";
import gsap from "gsap";

import { useGLTF } from "@react-three/drei";
import { EffectComposer } from "@react-three/postprocessing";

import { useTouchTexture } from "../../../../components/three/TouchTexture";
import { useWindowSize } from "../../../../hooks";
import { ASCIIPost } from "../../../../components/three/PostProcessing/ASCIIPost";

function MoaiStatue() {
  const moai = useGLTF(
    "https://o1vj7bm9yy.ufs.sh/f/YS7X7tdqhV1FXGTaDa65W9E3ypYKDvVgkwlhU8JbT7G1FeQR"
  );
  const moaiRef = useRef<THREE.Object3D>();

  // Initial rotation in radians (135 degrees)
  const baseRotation = THREE.MathUtils.degToRad(180);

  useFrame(({ pointer }) => {
    if (!moaiRef.current) return;

    // Get mouse position from -1 to 1
    const mouseX = pointer.x;
    const mouseY = pointer.y;

    // Calculate target rotation
    // Only rotate slightly (0.1 radians = ~5.7 degrees) from base rotation
    const targetRotationY = baseRotation + mouseX * 0.2;
    const targetRotationX = -mouseY * 0.05; // Even smaller vertical tilt

    // Smooth interpolation
    moaiRef.current.rotation.y +=
      (targetRotationY - moaiRef.current.rotation.y) * 0.05;
    moaiRef.current.rotation.x +=
      (targetRotationX - moaiRef.current.rotation.x) * 0.05;
  });

  return (
    <primitive
      ref={moaiRef}
      object={moai.scene}
      rotation={[0, baseRotation, 0]}
      scale={7}
      position={[0, -1, 0]}
    />
  );
}

export function Scene() {
  const touchTexture = useTouchTexture({
    maxAge: 30,
    radius: 0.1,
  });
  const chars = ".▓▒#@%=*+-:. ";

  const { width } = useWindowSize();

  useFrame(({ pointer }) => {
    touchTexture.update(pointer);
  });

  const asciiEffect = useMemo(() => {
    return new ASCIIPost({
      characters: chars,
      fontSize: 56,
      cellSize: (width ?? 1024) > 768 ? 32 : 20,
      color: "white",
      fluidTexture: touchTexture.texture,
    });
  }, [width]);

  return (
    <>
      <MoaiStatue />
      <ambientLight intensity={2} />
      <spotLight intensity={100} position={[0, -5, 4]} />
      <spotLight intensity={400} position={[-5, 5, 5]} />

      <EffectComposer>
        <primitive object={asciiEffect} />
      </EffectComposer>
    </>
  );
}

interface HeaderProps {
  children: string;
}

const Header = ({ children }: HeaderProps) => {
  const characters = children?.split("");
  const charactersRef = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    gsap.fromTo(
      charactersRef.current,
      { yPercent: 120 },
      {
        yPercent: 0,
        stagger: 0.02,
      }
    );
  }, [charactersRef.current]);

  return (
    <h1>
      {characters.map((char, idx) => (
        <span
          ref={(e) => {
            charactersRef.current[idx] = e;
          }}
          key={`${char}-${idx}`}
        >
          {char}
        </span>
      ))}
    </h1>
  );
};

export function ASCIIEffect() {
  return (
    <div className="">
      <div className="html_wrapper">
        <Header>Moai</Header>
        <footer>
          <p>Feel free to hover.</p>
          <p>© Alexandre Pujol</p>
        </footer>
      </div>
      <div className="canvas_wrapper w-full h-screen bg-black fixed inset-0">
        <Canvas gl={{ alpha: true }}>
          <Scene />
        </Canvas>
      </div>
    </div>
  );
}
