import { ScrollSceneChildProps } from "@14islands/r3f-scroll-rig";
import { Text3D } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";
import { NormalBufferAttributes, Object3D } from "three";

type Props = {
  scrollScene: ScrollSceneChildProps;
};

export const HeroTitle = ({ scrollScene }: Props) => {
  const threeTitle = useRef<NormalBufferAttributes | null>(null);
  const { viewport } = useThree();
  const { scale } = scrollScene;

  console.log(scale);

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    if (threeTitle.current) {
      console.log("eh");
      threeTitle.current.rotation.y = time * 10;
    }
  });

  return (
    <Text3D
      position={[0, 0, 0]}
      ref={threeTitle}
      font={"/font/Poppins-ExtraBold.json"}
      curveSegments={24}
      bevelEnabled
      bevelSize={0.08}
      bevelThickness={0.03}
      lineHeight={0.9}
      letterSpacing={0.3}
    >
      {`ALEX\n PUJOL`}
      <meshStandardMaterial color={"red"} />
    </Text3D>
  );
};
