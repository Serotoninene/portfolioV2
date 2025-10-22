import { useMemo } from "react";
import { useTexture } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";

import fragmentShader from "./shaders/fragment.glsl";
import vertexShader from "./shaders/vertex.glsl";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import { useTouchTexture } from "../../../../components/three/TouchTexture";
import { ChromaticAberrationEffect } from "../../../../components/three/PostProcessing/ChromaticAberration";

function Scene() {
  const texture = useTexture(
    "https://5f6x5qowvd.ufs.sh/f/skRwIEbJ4UkGBX6BYfxTXEYlhq87yGp6ZoMIQC4zc2rFA3VK"
  );

  const touchTexture = useTouchTexture({
    maxAge: 30,
    radius: 0.1,
  });
  const uniforms = useMemo(
    () => ({
      uTexture: { value: texture },
    }),
    [texture]
  );

  useFrame(({ pointer }) => {
    touchTexture.update(pointer);
  });

  const chromaticAberrationEffect = useMemo(() => {
    return new ChromaticAberrationEffect({
      fluidTexture: touchTexture.texture,
    });
  }, [touchTexture.texture]);

  return (
    <>
      <mesh scale={[3, 5, 1]}>
        <planeGeometry />
        <shaderMaterial
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          uniforms={uniforms}
        />
      </mesh>
      <EffectComposer>
        {/* You can add the chromatic aberration effect here if needed */}
        <primitive object={chromaticAberrationEffect} />
      </EffectComposer>
    </>
  );
}

export function MeadowHero() {
  return (
    <Canvas style={{ height: "100vh", width: "100vw" }} color="black">
      <color attach="background" args={["black"]} />
      <ambientLight intensity={0.5} />
      <Scene />
    </Canvas>
  );
}
