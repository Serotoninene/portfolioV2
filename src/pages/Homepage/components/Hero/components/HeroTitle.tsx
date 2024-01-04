import { ScrollSceneChildProps } from "@14islands/r3f-scroll-rig";
import { Center, Text3D } from "@react-three/drei";

import { useRef } from "react";
import { Mesh } from "three";

type Props = {
  scrollScene?: ScrollSceneChildProps;
  isMobile: boolean;
};

export const HeroTitle = ({ isMobile }: Props) => {
  const threeTitle = useRef<Mesh>(null);

  // const { xPos, yPos, zPos, fontSize, lineHeight } = useControls({
  //   xPos: { value: 0, min: 0, max: 500 },
  //   yPos: { value: 0, min: -500, max: 500 },
  //   zPos: { value: 0, min: 0, max: 500 },
  //   fontSize: { value: 160, min: 0, max: 160 },
  //   lineHeight: { value: 0.45, min: 0, max: 1 },
  // });

  if (isMobile) return null;

  return (
    <>
      <Center position={[-0.5, 64, 0]}>
        <Text3D
          size={115}
          ref={threeTitle}
          font={"/font/Poppins-ExtraBold.json"}
          curveSegments={24}
          bevelEnabled
          bevelSize={0.08}
          bevelThickness={0.03}
          letterSpacing={0.3}
        >
          {`ALEX`}
          <meshStandardMaterial color={"red"} />
        </Text3D>
      </Center>
      <Center position={[3, -63, 0]}>
        <Text3D
          size={115}
          ref={threeTitle}
          font={"/font/Poppins-ExtraBold.json"}
          curveSegments={24}
          bevelEnabled
          bevelSize={0.08}
          bevelThickness={0.03}
          letterSpacing={0.3}
        >
          {`PUJOL`}
          <meshStandardMaterial color={"red"} />
        </Text3D>
      </Center>
    </>
  );
};
