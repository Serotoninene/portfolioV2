import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";

import fragmentShader from "./shaders/fragment.glsl";
import vertexShader from "./shaders/vertex.glsl";
import { OrbitControls } from "@react-three/drei";
import { Lights } from "../../../../components/three/Lights/Lights";
import * as THREE from "three";
import { useControls } from "leva";
import { RefractionMesh } from "../RefractionGlass";
import { useGSAP } from "@gsap/react";
import gsap, { Power4 } from "gsap";

function rotateCamera(from, to) {
  const angle = { value: 0 };
  const angleEnd = { value: 0 };
  const normal = new Vector3();

  normal.copy(from).cross(to).normalize();
  angleEnd.value = from.angleTo(to);

  const tween = new Tween(angle).to(angleEnd, 500).onUpdate(() => {
    camera.position.copy(from).applyAxisAngle(normal, angle.value);
    camera.lookAt(0, 0, 0);
  });
  tween.start();
}

function Scene({
  text = "DispersionDispersionDispersion",
  numberOfSegments = 6,
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const { camera } = useThree();
  const textTexture = useMemo(() => {
    const fontFace = "Poppins";

    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d")!;

    // Set font first to get accurate measurements
    context.font = `bold 200px ${fontFace}`;

    // Get precise text metrics
    const metrics = context.measureText(text);

    // Calculate precise width and height
    const textWidth = metrics.width;
    const textHeight =
      metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent * 2;

    // Add extra padding to prevent cutting off characters
    const padding = 10; // Increased padding
    const topPadding = 24; // Extra space for ascenders like the dot on "i"
    const canvasWidth = Math.ceil(textWidth + padding * 2);
    const canvasHeight = Math.ceil(textHeight + topPadding + padding * 2);

    // Set canvas dimensions
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    // Clear and set background
    context.fillStyle = "rgba(0, 0, 0, 0)";
    context.fillRect(0, 0, canvasWidth, canvasHeight);

    // Configure text styling
    context.fillStyle = "#ffffff";
    context.font = `bold 200px ${fontFace}`;
    context.textAlign = "left";
    context.textBaseline = "top";

    // Draw text with precise positioning
    context.fillText(text, padding, padding);

    return new THREE.CanvasTexture(canvas);
  }, [text]);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uDelta: { value: 0 },
      uSegmentNb: { value: numberOfSegments },
      uLetterNb: { value: text.length },
      uWaveHeight: { value: 0.2 },
      uWaveSpeed: { value: 2 },
      uWaveFrequency: { value: 5 },
      uTextTexture: { value: textTexture },
      uProgress: { value: 0 },
    }),
    []
  );

  useEffect(() => {
    textTexture.wrapS = THREE.ClampToEdgeWrapping;
    textTexture.wrapT = THREE.ClampToEdgeWrapping; // Prevent bleeding between segments
    textTexture.minFilter = THREE.LinearFilter;
    textTexture.magFilter = THREE.LinearFilter;

    textTexture.repeat.set(1, 1);
    textTexture.needsUpdate = true;
    uniforms.uTextTexture.value = textTexture; // Explicitly update the uniform
  }, [textTexture]);

  useFrame(({ clock, camera }, delta) => {
    uniforms.uTime.value = clock.getElapsedTime();
    uniforms.uDelta.value = delta;
  });

  useGSAP(() => {
    // Set initial parameters

    const angle = {
      value: 0,
    };

    const angleEnd = { value: 0 };

    const normal = new THREE.Vector3();
    const from = new THREE.Vector3(
      camera.position.x,
      camera.position.y,
      camera.position.z
    );

    const to = new THREE.Vector3(
      0.5153815510851838,
      1.3709480458172243,
      -60.780678122659062
    );

    normal.copy(from).cross(to).normalize();

    angleEnd.value = from.angleTo(to);

    const tl = gsap.timeline({ delay: 0.5 });
    tl.to(uniforms.uProgress, {
      value: 1,
      // duration: 0, // Adjust the speed
      duration: 0.5, // Adjust the speed
      ease: Power4.easeOut,
    });

    tl.to(angle, {
      value: angleEnd.value,
      delay: 3,
      duration: 1,
      ease: Power4.easeOut,
      onUpdate: (e) => {
        camera.position.copy(from).applyAxisAngle(normal, angle.value);
      },
    });
  });
  return (
    <>
      <RefractionMesh scale={2} position={[0, 0, 0]}>
        <sphereGeometry args={[10, 10]} />
      </RefractionMesh>
      <mesh scale={2} ref={meshRef}>
        {/* <boxGeometry /> */}
        {/* <capsuleGeometry /> */}
        <sphereGeometry args={[1, 64, 64]} />
        <shaderMaterial
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          uniforms={uniforms}
          // wireframe
        />
      </mesh>
    </>
  );
}

export function TextMorph() {
  return (
    <div className="h-full bg-black">
      <Canvas>
        <Lights />
        <OrbitControls />
        <Scene />
      </Canvas>
    </div>
  );
}
