import { useRef, useState } from "react";
import { useColorContext } from "../../../../hooks/useColorContext";

import { useCursorStore } from "../../../../store/useCursorStyle";
import { useAnimation } from "./useAnimation";

export const Showreal = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const { setCursorStyle, setCursorText } = useCursorStore();

  const video = useRef<HTMLVideoElement>(null);

  const { colors } = useColorContext();

  const togglePlay = () => {
    setIsPlaying((prev) => !prev);
    setCursorText(isPlaying ? "play" : "pause");
  };

  const handleMouseEnter = () => {
    setCursorText(isPlaying ? "pause" : "play");
    setCursorStyle("text");
  };

  const handleMouseLeave = () => {
    setCursorStyle("default");
  };

  useAnimation();

  return (
    <div
      id="showreal__main-container"
      className="flex justify-center items-center will-change-transform"
    >
      <div
        id="showreal__video-container"
        onClick={togglePlay}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="relative w-full xl:h-[90vh] aspect-video mx-10 cursor-none"
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
