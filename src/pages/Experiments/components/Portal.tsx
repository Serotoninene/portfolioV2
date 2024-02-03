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
  RoundedBox,
} from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useControls } from "leva";
import { Perf } from "r3f-perf";
import { MutableRefObject, useRef } from "react";
import * as THREE from "three";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";

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

const tempObject = new THREE.Object3D();
const roundedBoxGeometry = new RoundedBoxGeometry(0.1, 0.1, 0.1, 0.005, 2);

const Boxes = () => {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const instancesCount = 100000;
  const controls = useControls("Boxes controls", {
    gap: { value: 0.11, min: 0, max: 10, step: 0.01 },
  });

  useFrame(() => {
    // console.log(camera.position);
    let i = 0;
    for (let x = 0; x < 100; x++)
      for (let z = 0; z < 100; z++) {
        const id = i++;
        tempObject.position.set(controls.gap * x, 0, controls.gap * z);
        tempObject.updateMatrix();
        meshRef.current?.setMatrixAt(id, tempObject.matrix);
      }

    if (meshRef.current) meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh
      ref={meshRef}
      args={[roundedBoxGeometry, undefined, instancesCount]}
    >
      <meshStandardMaterial color="red" />
    </instancedMesh>
  );
};

const Scene = ({ scrollScene }: Props) => {
  // const cameraPosition = new THREE.Vector3(22, 29, 21);
  const cameraPosition = new THREE.Vector3(1, 1, 1);
  return (
    <>
      <color attach="background" args={["#f0f0f0"]} />
      <Boxes />
      <Environment preset="dawn" />
      <OrthographicCamera
        position={cameraPosition}
        left={-1}
        right={1}
        top={1}
        bottom={-1}
        makeDefault

        // onUpdate={(self) => self.lookAt(0, 0, 0)}
      />
      {/* OrbitControls add touchAction='none' to the canvas eventSource and never removes it after events.connected changes it 
  - need to manually pass in tracked domElement to keep touch scrolling working */}
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
