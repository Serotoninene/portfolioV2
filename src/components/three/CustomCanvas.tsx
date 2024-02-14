import { MutableRefObject, useRef } from "react";
import { CameraControls, PerspectiveCamera } from "@react-three/drei";
import { ScrollScene, UseCanvas } from "@14islands/r3f-scroll-rig";

type Props = {
  children: React.ReactNode;
  shadow?: boolean;
  isCameraControls?: boolean;
};

export const CustomCanvas = ({ children, isCameraControls }: Props) => {
  const el = useRef<HTMLDivElement>(null);

  return (
    <div>
      <div ref={el} id="Placeholder" className="fixed inset-0"></div>
      <UseCanvas>
        <ScrollScene
          track={el as MutableRefObject<HTMLDivElement>}
          hideOffscreen={false}
        >
          {() => (
            <>
              <PerspectiveCamera
                fov={14}
                position={[2.74, 1.2, 0.62]}
                makeDefault
                onUpdate={(self) => self.lookAt(0, 0, 0)}
              />
              {isCameraControls && <CameraControls maxZoom={1} minZoom={1} />}
              {children}
            </>
          )}
        </ScrollScene>
      </UseCanvas>
    </div>
  );
};
