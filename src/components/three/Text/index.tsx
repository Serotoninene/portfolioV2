import {
  useScrollRig,
  styles,
  UseCanvas,
  ScrollScene,
} from "@14islands/r3f-scroll-rig";
import { MeshDistortMaterial } from "@react-three/drei";
import { ElementType, useRef, ReactNode, RefObject } from "react";
import { WebGLText } from "@14islands/r3f-scroll-rig/powerups";

type Props = {
  children: ReactNode;
  wobble?: boolean;
  className?: string;
  font?: string;
  as?: ElementType;
};

export function Text({
  children,
  wobble,
  className,
  font = "fonts/Poppins-Regular.woff",
  as: Tag = "span",
  ...props
}: Props) {
  const el = useRef<HTMLElement>(null);
  const { hasSmoothScrollbar } = useScrollRig();
  return (
    <>
      {/* 
        This is the real DOM text that we want to replace with WebGL
        `styles.transparentColorWhenSmooth` sets the text to transparent when SmoothScrollbar is enabled
        The benefit of using transparent color is that the real DOM text is still selectable
        
        display: 'block' gives a more solid calculation for spans
      */}
      <Tag
        ref={el}
        className={hasSmoothScrollbar ? "opacity-0" : "" + " " + className}
        style={{ display: "block" }}
        {...props}
      >
        {children}
      </Tag>

      {hasSmoothScrollbar && (
        <UseCanvas debug={false}>
          <ScrollScene track={el as RefObject<HTMLElement>}>
            {(props) => (
              // WebGLText is a helper component from the scroll-rig that will
              // use getComputedStyle to match font size, letter spacing and color
              <WebGLText
                el={el} // getComputedStyle is called on this element
                font={font}
                glyphGeometryDetail={16} // needed for distortion to work
                {...props} // contains scale from the ScrollScene
              >
                {wobble && <MeshDistortMaterial speed={1.4} distort={0.5} />}
                {children}
              </WebGLText>
            )}
          </ScrollScene>
        </UseCanvas>
      )}
    </>
  );
}
