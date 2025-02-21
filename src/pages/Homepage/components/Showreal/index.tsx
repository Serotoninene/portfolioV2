import { useRef } from "react";
import { useColorContext } from "../../../../hooks/useColorContext";

import { useAnimation } from "./useAnimation";

export const Showreal = () => {
  const video = useRef<HTMLVideoElement>(null);

  const { colors } = useColorContext();

  useAnimation();

  return (
    <div
      id="showreal__main-container"
      className="flex justify-center items-center will-change-transform"
    >
      <div
        id="showreal__video-container"
        className="relative w-full xl:h-[90vh] aspect-video mx-10 md:cursor-none"
        style={{
          background: colors.dark,
        }}
      >
        <video
          ref={video}
          className="pointer-events-none w-full h-full object-cover"
          src="https://utfs.io/f/x0tNbNvWf7L6O4xYQ1QjgW5nQ7itrKZ30okTFqxlmyURfMBb"
          loop
          muted
          autoPlay
          playsInline
        ></video>
      </div>
    </div>
  );
};
