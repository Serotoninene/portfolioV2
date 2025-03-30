import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";

import vertexShader from "./shaders/vertex.glsl";
import fragmentShader from "./shaders/fragment.glsl";
import { useEffect, useMemo, useRef } from "react";
import { useControls } from "leva";
import { useTouchTexture } from "../../../../components/three/TouchTexture";
import { useGSAP } from "@gsap/react";
import gsap, { Power3 } from "gsap";

function Scene() {
  const text = "A";
  const geometryRef = useRef<THREE.Mesh>(null);
  const touchTexture = useTouchTexture({ maxAge: 60 });

  const textTexture = useMemo(() => {
    const fontFace = "Poppins";

    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d")!;

    // Set font first to get accurate measurements
    context.font = `bold 200px Arial`;

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

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.ClampToEdgeWrapping;
    texture.wrapT = THREE.ClampToEdgeWrapping; // Prevent bleeding between segments
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;

    return texture;
  }, [text]);

  const controls = useControls("perlin field", {
    spacing: {
      value: 37.1,
      min: 1,
      max: 100,
      step: 0.1,
      onChange: (e) => {
        uniforms.uSpacing.value = e;
      },
    },
    resolution: {
      value: 0.08,
      min: 0,
      max: 1,
      step: 0.001,
      onChange: (e) => {
        uniforms.uRes.value = e;
      },
    },
    speed: {
      value: 0.4,
      min: 0.1,
      max: 10,
      step: 0.1,
      onChange: (e) => {
        uniforms.uSpeed.value = e;
      },
    },
  });

  const animControls = useControls("anim", {
    progress: {
      value: 0,
      min: 0,
      max: 1,
      step: 0.1,
      onChange: (e) => {
        uniforms.uProgress.value = e;
      },
    },
  });

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uTextTexture: { value: textTexture },
      uTouchTexture: { value: touchTexture.texture },

      uSpacing: { value: controls.spacing },
      uRes: { value: controls.resolution },
      uSpeed: { value: controls.speed },

      uProgress: { value: animControls.progress },
      uLineProgress: { value: 0 },
    }),
    [textTexture]
  );

  useGSAP(() => {
    const tl = gsap.timeline({
      delay: 1,
      defaults: {
        duration: 2,
        ease: Power3.easeOut,
      },
    });

    tl.to(uniforms.uProgress, {
      value: 1,
    });

    // tl.to(
    //   uniforms.uLineProgress,
    //   {
    //     value: 1,
    //   },
    //   "+=1"
    // );

    // tl.to(
    //   uniforms.uProgress,
    //   {
    //     value: 0,
    //   },
    //   "<"
    // );
  });

  useFrame(({ clock, pointer, viewport }) => {
    uniforms.uTime.value = clock.getElapsedTime();
    const geoParameters = geometryRef.current?.parameters;

    const mouse = {
      x: pointer.x * geoParameters.width * 0.5, // Map -1 to 1 to world space
      y: pointer.y * geoParameters.height * 0.5,
    };
    touchTexture.update(mouse);

    // uniforms.uTouchTexture.value = touchTexture;
  });

  return (
    <mesh>
      <boxGeometry ref={geometryRef} args={[5, 5, 1, 1]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
      />
    </mesh>
  );
}

export function KineticType() {
  return (
    <div className="h-full">
      <Canvas>
        <Scene />
        <color attach="background" args={[new THREE.Color("#030303")]} />
      </Canvas>
    </div>
  );
}
