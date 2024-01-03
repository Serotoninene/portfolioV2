import { ScrollSceneChildProps } from "@14islands/r3f-scroll-rig";
import { Text3D } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { Object3D } from "three";

type Props = {
  scrollScene: ScrollSceneChildProps;
};

export const HeroTitle = ({ scrollScene }: Props) => {
  const threeTitle = useRef<Object3D | null>(null);

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    if (threeTitle.current) {
      console.log("eh");
      threeTitle.current.rotation.y = time * 10;
    }
  });

  return (
    <Text3D
      font="/font/Poppins-ExtraBold.json"
      smooth={1}
      lineHeight={0.5}
      letterSpacing={0.9}
      scale={[500, 150, 0.1]}
      position={[0, 0, 0]}
    >
      {`hello`}
      <meshMatcapMaterial color="red" />
    </Text3D>
  );
};
