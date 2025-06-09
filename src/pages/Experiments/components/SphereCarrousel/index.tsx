import { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import * as THREE from "three";
import { OrbitControls } from "@react-three/drei";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";

// Shaders
import vertexShader from "./shaders/vertex.glsl";
import fragmentShader from "./shaders/fragment.glsl";

import { useControls } from "leva";
import { Overlay } from "./Overlay";
import { useSphereCarrouselIndex } from "../../../../store/useSphereCarrouselIndex";

export const data = [
  {
    photo:
      "https://5f6x5qowvd.ufs.sh/f/skRwIEbJ4UkGQKUyKMXxy3LjqpuHb6m7GfiwIBaWSevTOc9R",

    title: "Photo 1",
  },
  {
    photo:
      "https://5f6x5qowvd.ufs.sh/f/skRwIEbJ4UkGBX6BYfxTXEYlhq87yGp6ZoMIQC4zc2rFA3VK",
    title: "Photo 1",
  },
  {
    photo:
      "https://5f6x5qowvd.ufs.sh/f/skRwIEbJ4UkGUgPswjFnTS31BKxvozY6Rc9XiAEC07r524Vy",
    title: "Photo 2",
  },
  {
    photo:
      "https://5f6x5qowvd.ufs.sh/f/skRwIEbJ4UkGUMwyuiFnTS31BKxvozY6Rc9XiAEC07r524Vy",
    title: "Photo 3",
  },
  {
    photo:
      "https://5f6x5qowvd.ufs.sh/f/skRwIEbJ4UkGAFrm4ordHpEckhiwbCf52orVMZau8P6dBOQz",
    title: "Photo 4",
  },
  {
    photo:
      "https://5f6x5qowvd.ufs.sh/f/skRwIEbJ4UkGGBrepFWpKtZaehzdVbw3L9Mc2xsjfXInr1Sk",
    title: "Photo 5",
  },
  {
    photo:
      "https://5f6x5qowvd.ufs.sh/f/skRwIEbJ4UkGXkodMuJ5f1OuCjGxsiovyYSkHE5be2Rp7Z3I",
    title: "Photo 6",
  },
];

function Scene() {
  const dispTexture = useLoader(THREE.TextureLoader, "/textures/disp1.jpg");
  const textures = useLoader(
    THREE.TextureLoader,
    data.map((item) => item.photo)
  );

  const meshRef = useRef<THREE.Mesh>(null);
  const targetRotation = useRef(new THREE.Vector3(0, 0, 0));
  const interval = useRef<NodeJS.Timeout | null>(null);

  const [isMouseRotation, setIsMouseRotation] = useState(true);

  const { lerp } = THREE.MathUtils;
  const { index } = useSphereCarrouselIndex();

  const animateTransition = () => {
    if (!meshRef.current) return;

    const tl = gsap.timeline({
      defaults: { duration: 1, ease: "expo.inOut" },
      onStart: () => {
        setIsMouseRotation(false);
        uniforms.uTexture2.value = textures[index];
      },
      onComplete: () => {
        setIsMouseRotation(true);
        uniforms.uTexture1.value = textures[index];
        uniforms.uProgress.value = 0;
        tl.kill();
      },
    });

    tl.to(uniforms.uProgress, {
      value: 1,
    });

    tl.to(
      meshRef.current.rotation,
      {
        y: `+=${Math.PI * 2}deg`,
        overwrite: "auto",
      },
      "<"
    );
  };

  const uniforms = useMemo(
    () => ({
      uProgress: { value: 0 },
      uIntensity: { value: 0.5 },
      uDispTexture: { value: dispTexture },
      uTexture1: { value: textures[0] },
      uTexture2: { value: textures[1] },
      uRefractionStrength: { value: 0.21 },
      uCenterScale: { value: 2 },
    }),
    []
  );

  useEffect(() => {
    // set the textures properties
    textures.forEach((texture) => {
      texture.minFilter = THREE.LinearFilter;
      texture.magFilter = THREE.LinearFilter;
      texture.generateMipmaps = false;
      texture.wrapS = THREE.ClampToEdgeWrapping;
      texture.wrapT = THREE.ClampToEdgeWrapping;
    });
  }, []);

  useEffect(() => {
    animateTransition();
  }, [index]);

  useFrame(({ pointer }) => {
    // Target rotation range: -PI/10 to PI/10
    const maxRotation = Math.PI / 20;

    if (isMouseRotation && meshRef.current) {
      // Update target rotation based on current mouse position
      targetRotation.current.x = lerp(
        targetRotation.current.x,
        pointer.y * maxRotation,
        0.1
      );
      targetRotation.current.y = lerp(
        targetRotation.current.y,
        pointer.x * maxRotation,
        0.1
      );

      meshRef.current.rotation.x = targetRotation.current.x;
      meshRef.current.rotation.y = targetRotation.current.y;
    }
  });

  return (
    <>
      <mesh ref={meshRef} scale={7} rotation={[0, 0, 0]}>
        <sphereGeometry />
        <shaderMaterial
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          uniforms={uniforms}
          side={THREE.DoubleSide}
        />
      </mesh>
    </>
  );
}

export function SphereCarrousel() {
  return (
    <div className="h-full">
      <Canvas>
        <OrbitControls />
        <Scene />
        <color attach="background" args={[new THREE.Color("#030303")]} />
      </Canvas>
      <Overlay />
    </div>
  );
}
