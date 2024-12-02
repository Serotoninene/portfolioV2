import { ScrollScene, UseCanvas } from "@14islands/r3f-scroll-rig";
import { WebGLText } from "@14islands/r3f-scroll-rig/powerups";
import {
  MeshTransmissionMaterial,
  OrbitControls,
  SpotLight,
} from "@react-three/drei";
import * as THREE from "three";
import { useControls } from "leva";
import { MutableRefObject, useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";

function Text({ children, font, className = "", as: Tag = "span" }) {
  const el = useRef<HTMLElement>();
  return (
    <>
      {/* 
        This is the real DOM text that we want to replace with WebGL   
      */}
      <Tag ref={el} className={`opacity-50 ${className}`}>
        {children}
      </Tag>

      <UseCanvas>
        <ScrollScene track={el as MutableRefObject<HTMLElement>}>
          {(props) => (
            // WebGLText uses getComputedStyle() to calculate font size,
            // letter spacing, line height, color and text align
            <WebGLText
              el={el} // getComputedStyle is called on this element
              font={font} // path to the typeface (*.woff)
              // glyphGeometryDetail={16} // needed for distortion to look good
              {...props} // contains scale from the ScrollScene
            >
              {children}
            </WebGLText>
          )}
        </ScrollScene>
      </UseCanvas>
    </>
  );
}

function Lens() {
  const viewport = useThree((state) => state.viewport);

  const {
    transmission,
    thickness,
    chromaticAberration,
    anisotropicBlur,
    distortion,
    distortionScale,
    temporalDistortion,
    clearcoat,
    attenuationDistance,
  } = useControls({
    transmission: { value: 1, min: 0, max: 1, step: 0.1 },
    thickness: { value: 0, min: 0, max: 10, step: 0.1 },
    backsideThickness: { value: 0, min: 0, max: 1, step: 0.1 },
    roughness: { value: 0, min: 0, max: 1, step: 0.1 },
    chromaticAberration: { value: 0.03, min: 0, max: 1, step: 0.01 },
    anisotropicBlur: { value: 0.1, min: 0, max: 1, step: 0.1 },
    distortion: { value: 0, min: 0, max: 1, step: 0.1 },
    distortionScale: { value: 0.1, min: 0, max: 0.5, step: 0.01 },
    temporalDistortion: { value: 0.0, min: 0, max: 1, step: 0.1 },
    clearcoat: { value: 1, min: 0, max: 1, step: 0.1 },
    attenuationDistance: { value: 0.5, min: 0, max: 1, step: 0.1 },
  });

  return (
    <>
      <mesh scale={[viewport.width, viewport.height, 1]} position={[0, 0, 10]}>
        <sphereGeometry />
        <MeshTransmissionMaterial
          background={new THREE.Color("#e7ded9")}
          backside={false}
          samples={10}
          resolution={2048}
          transmission={transmission}
          roughness={0}
          thickness={thickness}
          ior={1.5}
          chromaticAberration={chromaticAberration}
          anisotropy={anisotropicBlur}
          distortion={distortion}
          distortionScale={distortionScale}
          temporalDistortion={temporalDistortion}
          clearcoat={clearcoat}
          attenuationDistance={attenuationDistance}
          attenuationColor="#ffffff"
          color="#eff0ee"
        />
      </mesh>
    </>
  );
}

const Lights = () => {
  return (
    <>
      <SpotLight
        position={[5.201835070133405, -1.91465018023303, -0.5758197299536444]}
        rotation={[
          -0.23656296849234418, -0.3804504852400494, -0.5758197299536444,
        ]}
        angle={0.9}
        penumbra={1}
        intensity={50}
        color={"#ffffff"}
        distance={10}
        decay={2.3}
        shadow-mapSize-width={256}
        shadow-mapSize-height={256}
      />
    </>
  );
};

function Plane() {
  const meshRef = useRef();
  const { size } = useThree();

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uColor: { value: new THREE.Color("red") },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uFoldAmount: { value: 0 },
    }),
    []
  );

  useFrame((state) => {
    uniforms.uTime.value = state.clock.elapsedTime;
  });

  const onMouseMove = (e) => {
    if (meshRef.current) {
      const x = (e.clientX / size.width) * 2 - 1;
      const y = -(e.clientY / size.height) * 2 + 1;
      uniforms.uMouse.value.set(x, y);

      // Calculate fold amount based on mouse position
      const foldThreshold = 0.5;
      const foldAmount = Math.max(
        0,
        Math.abs(x) > foldThreshold || y > foldThreshold ? 1 : 0
      );
      uniforms.uFoldAmount.value = THREE.MathUtils.lerp(
        uniforms.uFoldAmount.value,
        foldAmount,
        0.1
      );
    }
  };

  return (
    <mesh
      ref={meshRef}
      scale={[5, 5, 1]}
      // rotation={[-Math.PI / 2, 0, 0]}
      onPointerMove={onMouseMove}
    >
      <planeGeometry args={[100, 100, 32, 32]} />
      <shaderMaterial
        uniforms={uniforms}
        vertexShader={`
          uniform float uFoldAmount;
          uniform vec2 uMouse;
          varying vec2 vUv;

          void main() {
            vUv = uv;
            vec3 pos = position;
            
            // Fold upper corners
            float foldInfluence = smoothstep(0.7, 1.0, vUv.y) * smoothstep(0.7, 1.0, abs(vUv.x - 0.5) * 2.0);
            pos.z += foldInfluence * uFoldAmount * 200.0;
            
            gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
          }
        `}
        fragmentShader={`
          uniform float uTime;
          uniform vec3 uColor;
          uniform vec2 uMouse;
          varying vec2 vUv;

          void main() {
            vec3 color = uColor;
            float dist = distance(vUv, uMouse);
            gl_FragColor = vec4(color, 1.0);
          }
        `}
      />
    </mesh>
  );
}

const Scene = () => {
  return (
    <>
      {/* <Lights /> */}
      {/* <Lens /> */}
      <Plane />
      <OrbitControls />
      <ambientLight intensity={1000} />
    </>
  );
};

export const DistortedText = () => {
  return (
    <>
      <div className="flex flex-col justify-center items-center h-[--fullScreen] bg-red-300">
        {/* {new Array(3).fill(0).map((_, i) => (
          <Text
            key={i}
            font="/font/Poppins-ExtraBold.woff"
            className="text-[10vw] font-extrabold leading-none color-dark"
            as="h1"
          >
            HELLO WORLD
          </Text>
        ))} */}
        <UseCanvas>
          <Scene />
        </UseCanvas>
      </div>
    </>
  );
};
