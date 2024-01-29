import { useEffect, useRef, useState } from "react";
import { useColorContext } from "../../../../hooks/useColorContext";

import gsap from "gsap";
import ReactPlayer from "react-player";
import { useCursorStore } from "../../../../store/useCursorStyle";
import { useWindowSize } from "../../../../hooks";

export const Showreal = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const { setCursorStyle, setCursorText } = useCursorStore();

  const mainContainer = useRef<HTMLDivElement>(null);
  const videoContainer = useRef<HTMLDivElement>(null);
  const [videoDimensions, setVideoDimensions] = useState({
    width: 0,
    height: 0,
  });
  const { width } = useWindowSize();
  const isMobile = width && width < 768;

  const tl = useRef<gsap.core.Timeline>();

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

  useEffect(() => {
    setVideoDimensions({
      width: videoContainer.current!.offsetWidth,
      height: videoContainer.current!.offsetHeight,
    });
  }, [width]);

  useEffect(() => {
    gsap.set(videoContainer.current, {
      clipPath: "polygon(20% 40%, 80% 40%, 95% 60%, 5% 60%)",
    });

    tl.current = gsap.timeline({
      scrollTrigger: {
        trigger: mainContainer.current,
        start: "top bottom",
        end: "bottom bottom",

        scrub: 0.9,
      },
    });

    tl.current.to(videoContainer.current, {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
    });

    return () => {
      tl.current?.kill();
    };
  }, []);

  return (
    <div ref={mainContainer} className="flex justify-center items-center">
      <div
        ref={videoContainer}
        onClick={togglePlay}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="relative w-full xl:h-[90vh] aspect-video mx-10 cursor-none"
        style={{
          background: colors.dark,
        }}
      >
        <div className="pointer-events-none w-full h-full object-fill">
          <ReactPlayer
            url="https://player.vimeo.com/video/905141032?h=656193ece9"
            playing={isMobile ? true : isPlaying}
            width={videoDimensions.width}
            height={videoDimensions.height}
            loop
          />
        </div>
      </div>
    </div>
  );
};
