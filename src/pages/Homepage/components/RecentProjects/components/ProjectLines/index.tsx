import { ScrollScene, UseCanvas } from "@14islands/r3f-scroll-rig";
import { useFrame } from "@react-three/fiber";
import { MutableRefObject, useRef } from "react";
import * as THREE from "three";
import { ProjectLine } from "..";
import { Project } from "../../types";
import { useProjectContext } from "../../hooks/useProjectContext";

type Props = {
  projects: Project[];
};

type FollowingProjectProps = {
  scale: vec3;
};

const FollowingProject = ({ scale }: FollowingProjectProps) => {
  const ref = useRef<THREE.Mesh>(null);
  const { selectedProject } = useProjectContext();

  const targetPosition = useRef<THREE.Vector3>(new THREE.Vector3());

  useFrame(({ pointer }) => {
    if (!ref.current) return;
    const scrollY = window.scrollY;
    if (selectedProject) {
      ref.current.scale.y = scale.y;
    } else {
      ref.current.scale.y = 0;
    }

    targetPosition.current.x =
      ((pointer.x + 1) / 2) * window.innerWidth - scale.x / 2;
    targetPosition.current.y =
      (pointer.y / 2) * window.innerHeight - scrollY - scale.y / 2;

    ref.current.position.x = THREE.MathUtils.lerp(
      ref.current.position.x,
      targetPosition.current.x,
      0.1
    );
    ref.current.position.y = THREE.MathUtils.lerp(
      ref.current.position.y,
      targetPosition.current.y,
      0.1
    );
  });

  return (
    <mesh ref={ref} scale={[scale.x, 0, 0]}>
      <planeGeometry args={[1, 1]} />
      <meshBasicMaterial color="red" />
    </mesh>
  );
};

export const ProjectLines = ({ projects }: Props) => {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <>
      <div className="relative mt-[64px] ml-4 mr-[160px]">
        {projects.map((item, index) => (
          <ProjectLine key={index} {...item} num={index + 1} />
        ))}
      </div>

      <div
        ref={ref}
        className="fixed top-0 left-0 w-[300px] aspect-[3/5] "
      ></div>

      <UseCanvas>
        <ScrollScene track={ref as MutableRefObject<HTMLElement>}>
          {({ scale }) => {
            return <FollowingProject scale={scale} />;
          }}
        </ScrollScene>
      </UseCanvas>
    </>
  );
};
