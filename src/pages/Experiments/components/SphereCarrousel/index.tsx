import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import gsap from "gsap";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

// Shaders
import fragmentShader from "./shaders/fragment.glsl";
import vertexShader from "./shaders/vertex.glsl";

import { useSphereCarrouselIndex } from "../../../../store/useSphereCarrouselIndex";
import { Overlay } from "./Overlay";
import { OrbitControls } from "@react-three/drei";

export const data = [
  {
    photo:
      "https://5f6x5qowvd.ufs.sh/f/skRwIEbJ4UkGBX6BYfxTXEYlhq87yGp6ZoMIQC4zc2rFA3VK",
    title: "Reflections twist in liquid chrome and light",
  },
  {
    photo:
      "https://5f6x5qowvd.ufs.sh/f/skRwIEbJ4UkGGBrepFWpKtZaehzdVbw3L9Mc2xsjfXInr1Sk",
    title: "Petals unfold slowly in a digital tide",
  },
  {
    photo:
      "https://5f6x5qowvd.ufs.sh/f/skRwIEbJ4UkGQKUyKMXxy3LjqpuHb6m7GfiwIBaWSevTOc9R",

    title: "Memories dissolve in fluid, shifting form and color",
  },
];

function Scene({
  isIntroDone,
  setIsIntroDone,
}: {
  isIntroDone: boolean;
  setIsIntroDone: (done: boolean) => void;
}) {
  const dispTexture = useLoader(THREE.TextureLoader, "/textures/disp1.jpg");
  const textures = useLoader(
    THREE.TextureLoader,
    data.map((item) => item.photo)
  );

  const meshRef = useRef<THREE.Mesh>(null);
  const targetRotation = useRef(new THREE.Vector3(0, 0, 0));
  const [isMouseRotation, setIsMouseRotation] = useState(true);

  const { lerp } = THREE.MathUtils;
  const { index } = useSphereCarrouselIndex();

  const animateTransition = () => {
    if (!meshRef.current || !isIntroDone) return;

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
      uRefractionStrength: { value: 0.11 },
      uCenterScale: { value: 2 },
      uIorRatio: { value: 0.85 },
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

    // intro animation
    const tl = gsap.timeline({
      default: {
        ease: "power3.Out",
      },

      onStart: () => {
        console.log("start");
      },
      onComplete: () => {
        setIsIntroDone(true);
      },
    });

    tl.set(uniforms.uRefractionStrength, { value: 2 });

    tl.from(meshRef.current.position, {
      z: -70,
      duration: 2,
      ease: "expo.inOut",
    });
    tl.from(meshRef.current?.rotation, { y: -Math.PI, duration: 1 }, "<");

    tl.fromTo(
      uniforms.uRefractionStrength,
      {
        value: 1,
      },
      {
        value: 0.12,
      },
      "-=0.5"
    );
  }, []);

  useEffect(() => {
    animateTransition();
  }, [index]);

  useFrame(({ pointer }) => {
    if (!isIntroDone) return;
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
  const { index, setIndex } = useSphereCarrouselIndex();
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [isIntroDone, setIsIntroDone] = useState(false);

  useEffect(() => {
    // if (intervalRef.current) clearInterval(intervalRef.current);
    // if (!isIntroDone) return;
    // intervalRef.current = setInterval(() => {
    //   setIndex((prev) => (prev + 1) % data.length);
    // }, 4000);
    // return () => {
    //   if (intervalRef.current) clearInterval(intervalRef.current);
    // };
  }, [index, isIntroDone]);

  return (
    <div className="h-full bg-[#030303]">
      <Canvas>
        <OrbitControls />
        <Suspense fallback={<></>}>
          <Scene isIntroDone={isIntroDone} setIsIntroDone={setIsIntroDone} />
        </Suspense>
        <color attach="background" args={[new THREE.Color("#030303")]} />
      </Canvas>
      <Overlay isIntroDone={isIntroDone} />
    </div>
  );
}
