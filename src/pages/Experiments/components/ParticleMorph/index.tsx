import { useEffect, useMemo, useRef } from "react";

import { extend, Canvas, useFrame, createPortal } from "@react-three/fiber";
import { OrbitControls, useFBO, useGLTF } from "@react-three/drei";

import * as THREE from "three";

import SimulationMaterial from "./SimulationMaterial";
import vertexShader from "./shaders/vertex.glsl";
import fragmentShader from "./shaders/fragment.glsl";
import { useTouchTexture } from "../../../../components/three/TouchTexture";

extend({ SimulationMaterial: SimulationMaterial });
const st = `\nprecision highp float;\nvarying float vMorphImpulse;\nvarying float vIntroModulation;\nvarying float vPointerSpeedModulation;\nvarying vec2 vUv;\n\nuniform sampler2D uDefaultPositionOne;\nuniform vec3 uPointer;\nuniform float uMorphTime;\nuniform float uGlobalTime;\n\nuniform mat4 modelMatrix;\nuniform mat4 modelViewMatrix;\nuniform mat4 projectionMatrix;\n\nattribute vec3 position;\nattribute vec2 uv;\n\n".concat("\n// https://www.desmos.com/calculator/4dyq5zch4v\n#define PI 3.1415926\n\nfloat heaviside(float x) {\n  return (sign(x) + 1.0) / 2.0;\n}\n\nfloat chichon(float x, float stepness) {\n  return 1.0 - pow(abs(sin(0.5 * PI * x)), stepness);\n}\n\nfloat impulseModulation(float time, float center,float scale, float stepness){ \n    float scaledCenter = center * scale;\n    float x = time * scale;\n  \n    float wave = heaviside(1. - (x - scaledCenter)) * chichon(x -scaledCenter, stepness) * heaviside(x - scaledCenter + 1.);\n  \n    return wave;\n}\n","\n\nvoid main () {\n  vUv = uv;\n\n  // time modulation has big impact in output\n  vIntroModulation = impulseModulation(uGlobalTime, 1.5, .8, 5.);\n  vMorphImpulse = impulseModulation(uMorphTime, 0., .9 , 10.);\n  vPointerSpeedModulation = 5. * (1. - pow(1. - uPointer.z, 12.)) *  impulseModulation(uPointer.z, 1.4, .7, 12.);\n\n  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);\n}\n"),U="\nprecision highp float;\nprecision highp sampler2D;\n\nvarying vec2 vUv;\nvarying float vMorphImpulse;\n\nuniform sampler2D uVectorField;\nuniform sampler2D uVelocityField;\nuniform sampler2D uPositionField;\nuniform float uGlobalTime;\nuniform float uDeltaTime;\n\n".concat(D,"\n\nvec3 attractionField(vec3 positionField){\n  vec3 field = vec3(0.);\n  \n  vec4 defaultPositionOne = texture2D(uDefaultPositionOne, vUv);\n  vec4 defaultPositionTwo = texture2D(uDefaultPositionTwo, vUv);\n  vec4 targetPositions = getCurrentTarget(uMorphState);\n  float inverseMass = defaultPositionOne.w;\n\n  vec3 attractionForce = targetPositions.xyz - positionField;\n  attractionForce *= (1. - smoothstep(0., 1. ,vMorphImpulse) * 0.5); // reduces attraction force when morphing\n  field = inverseMass * attractionForce * smoothstep(2.25, 2.75 , uGlobalTime);\n\n\n  return field;\n}\n\nvoid main () {\n  vec4 velocityField = texture2D(uVelocityField, vUv);\n  vec4 vectorField = texture2D(uVectorField, vUv);\n  vec4 positionField = texture2D(uPositionField, vUv);\n  vec3 force = vec3(0.);\n  float dt = 50. * uDeltaTime;\n  float dampingFactor = 1. ;\n\n  force += vectorField.xyz;\n  force += attractionField(positionField.xyz);\n  force += -1. * dampingFactor * velocityField.xyz;\n \n  velocityField.xyz += dt * force.xyz;\n  velocityField.w = vMorphImpulse;\n  \n  gl_FragColor = velocityField`;
console.log(st);

const ParticleMesh = () => {
  const size = 1024;
  const touchTexture = useTouchTexture({
    isOnScreen: true,
    maxAge: 30,
    radius: 0.1,
  });

  const pointsRef = useRef<THREE.Points>(null);
  const simulationMaterialRef = useRef<THREE.ShaderMaterial>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const scene = new THREE.Scene();
  const camera = new THREE.OrthographicCamera(
    -1,
    1,
    1,
    -1,
    1 / Math.pow(2, 53),
    1
  );
  const positions = new Float32Array([
    -1, -1, 0, 1, -1, 0, 1, 1, 0, -1, -1, 0, 1, 1, 0, -1, 1, 0,
  ]);
  const uvs = new Float32Array([
    0,
    0, // bottom-left
    1,
    0, // bottom-right
    1,
    1, // top-right
    0,
    0, // bottom-left
    1,
    1, // top-right
    0,
    1, // top-left
  ]);

  const { nodes } = useGLTF(
    "/assets/ThreeModels/Serotonine_Icon/icon_remeshed_subdivided.glb"
  );

  const uniforms = useMemo(
    () => ({
      uPositions: { value: null },
    }),
    []
  );

  const particlesPosition = useMemo(() => {
    if (!nodes?.Plane) return null;

    // Get original model positions
    const originalPosition = nodes.Plane.geometry.attributes.position.array;
    const originalCount = originalPosition.length / 3;

    // FBO-compatible grid-based system
    const length = size * size; // Total particles
    const particles = new Float32Array(length * 3);

    for (let i = 0; i < length; i++) {
      const i3 = i * 3;

      // Pick a random point from the original model
      const originalIndex = (i % originalCount) * 3;
      const ox = originalPosition[originalIndex];
      const oy = originalPosition[originalIndex + 1];
      const oz = originalPosition[originalIndex + 2];

      // Apply small offsets to distribute particles more evenly inside the shape
      particles[i3 + 0] = ox + (Math.random() - 0.5) * 0.02; // Small jitter
      particles[i3 + 1] = oy + (Math.random() - 0.5) * 0.02;
      particles[i3 + 2] = oz + (Math.random() - 0.5) * 0.02;
    }

    return particles;
  }, [nodes, size]);

  const renderTarget = useFBO(size, size, {
    minFilter: THREE.NearestFilter,
    magFilter: THREE.NearestFilter,
    format: THREE.RGBAFormat,
    type: THREE.FloatType,
  });

  useFrame((state) => {
    const { gl, clock, pointer } = state;

    gl.setRenderTarget(renderTarget);
    gl.clear();
    gl.render(scene, camera);
    gl.setRenderTarget(null);

    if (materialRef.current) {
      materialRef.current.uniforms.uPositions.value = renderTarget.texture;
    }

    if (!touchTexture) return;
    touchTexture.update(pointer);
    if (simulationMaterialRef.current) {
      simulationMaterialRef.current.uniforms.uTime.value =
        clock.getElapsedTime();
      simulationMaterialRef.current.uniforms.uMouse.value =
        touchTexture.texture;
      simulationMaterialRef.current.uniforms.uMousePosition.value = pointer;
    }
  });

  if (!particlesPosition)
    return (
      <mesh>
        <boxGeometry />
      </mesh>
    );

  return (
    <>
      {createPortal(
        <mesh>
          <simulationMaterial
            ref={simulationMaterialRef}
            args={[size, nodes]}
          />
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={positions.length / 3}
              array={positions}
              itemSize={3}
            />
            <bufferAttribute
              attach="attributes-uv"
              count={uvs.length / 2}
              array={uvs}
              itemSize={2}
            />
          </bufferGeometry>
        </mesh>,
        scene
      )}
      <points ref={pointsRef} rotation={[0, 45, 0]}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[particlesPosition, 3]}
          />
        </bufferGeometry>
        <shaderMaterial
          ref={materialRef}
          depthWrite={false}
          fragmentShader={fragmentShader}
          vertexShader={vertexShader}
          uniforms={uniforms}
        />
      </points>
    </>
  );
};

const Scene = () => {
  useEffect(() => {}, []);
  return (
    <>
      <ParticleMesh />
      <OrbitControls />
      <ambientLight intensity={1000} />
    </>
  );
};

export const ParticleMorph = () => {
  return (
    <>
      <div className="flex flex-col justify-center items-center h-[--fullScreen]">
        <Canvas>
          <Scene />
        </Canvas>
      </div>
    </>
  );
};
