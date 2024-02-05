import {
  ScrollScene,
  ScrollSceneChildProps,
  UseCanvas,
} from "@14islands/r3f-scroll-rig";
import {
  Environment,
  MeshTransmissionMaterial,
  OrbitControls,
  OrthographicCamera,
} from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

import { useControls } from "leva";
import { MutableRefObject, useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";

import headerVertex from "./shader/headerVertex.glsl";
import projectVertex from "./shader/projectVertex.glsl";
import gsap, { Power3 } from "gsap";

type Props = {
  scrollScene: ScrollSceneChildProps;
};

const Bille = () => {
  const controls = useControls("Bille controls", {
    roughness: { value: 0.3, min: 0, max: 1, step: 0.01 },
    distortion: { value: 5, min: 0, max: 10, step: 0.1 },
    distortionScale: { value: 1.5, min: 0, max: 10, step: 0.1 },
    metalness: { value: 0.1, min: 0, max: 1, step: 0.01 },
    transmission: { value: 1, min: 0, max: 1, step: 0.01 },
    thickness: { value: 0.3, min: 0, max: 1, step: 0.01 },
  });
  return (
    <>
      <mesh>
        <sphereGeometry />
        <MeshTransmissionMaterial
          chromaticAberration={1}
          thickness={controls.thickness}
          roughness={controls.roughness}
          transmission={controls.transmission}
          anisotropy={0.5}
          distortion={controls.distortion}
          distortionScale={controls.distortionScale}
          temporalDistortion={0.1}
          metalness={controls.metalness}
          backside
          resolution={32}
          backsideResolution={32}
        />
      </mesh>

      <mesh>
        <boxGeometry />
        <meshStandardMaterial color="red" />
      </mesh>
    </>
  );
};
const dummy = new THREE.Object3D();

const Boxes = () => {
  const grid = 55;
  const size = 0.5;
  const gridSize = grid * size;

  // const controls = useControls("Boxes controls", {
  //   gap: { value: 0.1, min: 0, max: 10, step: 0.01 },
  //   bevelSegments: { value: 1, min: 0, max: 10, step: 1 },
  //   radius: { value: 0.06, min: 0, max: 1, step: 0.01 },
  // });

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uPos0: { value: new THREE.Vector2() },
      uPos1: { value: new THREE.Vector2(0, 0) },
      uProgress: { value: 0 },
    }),
    []
  );

  const meshRef = useRef<THREE.InstancedMesh>(null);

  const geometry = new RoundedBoxGeometry(size, 4, size, 2, 0.06);
  if (meshRef.current) meshRef.current.instanceMatrix.needsUpdate = true;

  useEffect(() => {
    gsap.to(uniforms.uProgress, {
      value: 1,
      ease: Power3.easeOut,
      duration: 1,
    });
  }, []);

  useFrame(({ clock }) => {
    let i = 0;
    const time = clock.getElapsedTime();
    uniforms.uTime.value = time;

    for (let x = 0; x < grid; x++)
      for (let y = 0; y < grid; y++) {
        dummy.position.set(
          x * size - gridSize / 2 + size / 2,
          // ((grid - x) * (grid - y) * size) / 100,
          -1,
          y * size - gridSize / 2 + size / 2
        );

        dummy.updateMatrix();
        meshRef.current?.setMatrixAt(i, dummy.matrix);
        dummy.updateMatrixWorld();
        i++;
      }

    if (meshRef.current) {
      meshRef.current.instanceMatrix.needsUpdate = true;
      meshRef.current.material.onBeforeCompile = (shader) => {
        shader.vertexShader = shader.vertexShader.replace(
          "void main() {",
          headerVertex
        );
        shader.vertexShader = shader.vertexShader.replace(
          "#include <project_vertex>",
          projectVertex
        );
        shader.uniforms = {
          ...shader.uniforms,
          ...uniforms,
        };
      };
    }
  });

  return (
    <instancedMesh ref={meshRef} args={[geometry, undefined, grid * grid]}>
      <meshStandardMaterial color="red" />
    </instancedMesh>
  );
};

const Scene = ({ scrollScene }: Props) => {
  // const cameraPosition = new THREE.Vector3(22, 29, 21);
  const cameraPosition = new THREE.Vector3(-1.7, 4.8, 1.6);

  return (
    <>
      <color attach="background" args={["#f0f0f0"]} />
      <Boxes />
      <Environment preset="dawn" />
      <OrthographicCamera
        position={cameraPosition}
        left={-5}
        right={5}
        top={5}
        bottom={-5}
        near={-100}
        far={100}
        makeDefault
      />
      <OrbitControls domElement={scrollScene.track.current} makeDefault />
    </>
  );
};

export const Portal = () => {
  const el = useRef<HTMLDivElement>(null);

  return (
    <div>
      <div ref={el} id="Placeholder" className="fixed inset-0"></div>
      <UseCanvas>
        <ScrollScene
          track={el as MutableRefObject<HTMLDivElement>}
          hideOffscreen={false}
        >
          {(props) => <Scene scrollScene={props} />}
        </ScrollScene>
      </UseCanvas>
    </div>
  );
};
