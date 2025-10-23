import { useMemo } from "react";
import * as THREE from "three";
import { OrbitControls, useTexture } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";

import fragmentShader from "./shaders/fragment.glsl";
import vertexShader from "./shaders/vertex.glsl";
import { EffectComposer, Noise } from "@react-three/postprocessing";

import { useTouchTexture } from "../../../../components/three/TouchTexture";
import { ChromaticAberrationEffect } from "../../../../components/three/PostProcessing/ChromaticAberration";
import { useControls } from "leva";
import { AnimatedCurvedText3D } from "../../../../components/three/AnimatedCurvedText3D";

function Scene() {
  const texture = useTexture(
    "https://5f6x5qowvd.ufs.sh/f/skRwIEbJ4UkGihb4FDPiPrmf1A6ZJzpKuwSvakosCneUBXyH"
  );

  const controls = useControls("chromatic aberration", {
    strength: { value: 0.2, min: 0, max: 1, step: 0.01 },
  });

  const touchTextureControls = useControls("touch texture", {
    radius: { value: 0.1, min: 0.01, max: 0.5, step: 0.01 },
    maxAge: { value: 30, min: 1, max: 100, step: 1 },
  });

  const touchTexture = useTouchTexture({
    isOnScreen: true,
    maxAge: touchTextureControls.maxAge,
    radius: touchTextureControls.radius,
    size: 64,
  });

  const chromaticAberrationEffect = useMemo(() => {
    return new ChromaticAberrationEffect({
      fluidTexture: touchTexture.texture,
      strength: controls.strength,
    });
  }, [touchTexture.texture]);

  useFrame(({ pointer }) => {
    touchTexture.update(pointer);

    // Update the strength uniform
    if (chromaticAberrationEffect.uniforms) {
      chromaticAberrationEffect.uniforms.set(
        "uStrength",
        new THREE.Uniform(controls.strength)
      );
    }
  });

  return (
    <>
      <AnimatedCurvedText3D color="#fff" radius={2.7}>
        Dispersion Dispersion Dispersion
      </AnimatedCurvedText3D>
      <EffectComposer>
        <Noise />
        <primitive object={chromaticAberrationEffect} />
      </EffectComposer>
    </>
  );
}

export function MeadowHero() {
  return (
    <Canvas gl={{ alpha: false }} style={{ height: "100vh", width: "100vw" }}>
      <OrbitControls />
      <color attach="background" args={["black"]} />
      <ambientLight intensity={0.5} />
      <Scene />
    </Canvas>
  );
}
