import { useRef, useMemo } from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useFBO } from "@react-three/drei";

import vertexShader from "./shader/vertex.glsl";
import fragmentShader from "./shader/fragment.glsl";
import { useControls } from "leva";
import { AnimatedCurvedText3D } from "../../../../components/three/AnimatedCurvedText3D";

interface RefractionMeshProps {
  children: React.ReactNode;
  position?: [number, number, number];
  scale?: number;
}

export const RefractionMesh = ({
  children,
  position = [1, 1, 1],
  scale = 1,
}: RefractionMeshProps) => {
  const mesh = useRef<THREE.Mesh>(null);
  const material = useRef<THREE.ShaderMaterial>(null);
  const mainRenderTarget = useFBO();

  useControls({
    blurSize: {
      value: 0.01,
      min: 0,
      max: 1,
      step: 0.001,
      onChange: (e) => {
        if (material.current) material.current.uniforms.uBlurSize.value = e;
      },
    },
    refractPower: {
      value: 0.5,
      min: 0,
      max: 5,
      step: 0.01,
      onChange: (e) => {
        if (material.current) material.current.uniforms.uRefractPower.value = e;
      },
    },
    lineIntensity: {
      value: 0.5,
      min: 0,
      max: 5,
      step: 0.01,
      onChange: (e) => {
        if (material.current)
          material.current.uniforms.uLineIntensity.value = e;
      },
    },
  });

  const uniforms = useMemo(
    () => ({
      uTexture: {
        value: null,
      },
      winResolution: {
        value: new THREE.Vector2(
          window.innerWidth,
          window.innerHeight
        ).multiplyScalar(Math.min(window.devicePixelRatio, 2)),
      },
      uRefractPower: { value: 0.5 },
      uBlurSize: { value: 0.01 },
      uLineIntensity: { value: 0.5 },
      uIorR: {
        value: 1.39,
      },
      uIorG: {
        value: 1.4,
      },
      uIorB: {
        value: 1.42,
      },

      uTime: { value: 0 },
    }),
    []
  );

  useFrame((state) => {
    const { gl, scene, camera, clock } = state;

    if (!mesh.current || !material.current) return;
    // Hide the mesh
    mesh.current.visible = false;
    gl.setRenderTarget(mainRenderTarget);
    // Render into the FBO
    gl.render(scene, camera);

    // Pass the texture data to our shader material
    material.current.uniforms.uTexture.value = mainRenderTarget.texture;
    material.current.uniforms.uTime.value = clock.getElapsedTime();

    gl.setRenderTarget(null);
    // Show the mesh
    mesh.current.visible = true;
  });

  return (
    <mesh ref={mesh} position={position} scale={scale}>
      {children}
      <meshStandardMaterial color="red" />
      <shaderMaterial
        ref={material}
        key={"shader"}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
};

const Scene = () => {
  return (
    <>
      <ambientLight intensity={1.0} />
      <spotLight intensity={100} position={new THREE.Vector3(2, 2, 1)} />
      <color attach={"background"} args={["#F4F3F0"]} />

      <RefractionMesh position={[0, 0, 0]} scale={2.5}>
        <sphereGeometry args={[1, 32, 32]} />
      </RefractionMesh>
      <AnimatedCurvedText3D color="#000" radius={2.7}>
        Dispersion Dispersion Dispersion
      </AnimatedCurvedText3D>
      <mesh scale={2.3}>
        <icosahedronGeometry />
        <meshStandardMaterial color={"black"} />
      </mesh>
    </>
  );
};

export const RefractionGlass = () => {
  return (
    <div className="canvas_wrapper w-full h-screen  fixed inset-0">
      <Canvas gl={{ alpha: true }}>
        <OrbitControls />
        <Scene />
      </Canvas>
    </div>
  );
};
