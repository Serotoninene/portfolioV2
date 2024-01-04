import { useEffect, useRef, useState } from "react";
import { useColorContext } from "../../../../hooks/useColorContext";

import gsap from "gsap";
import ReactPlayer from "react-player";

export const Showreal = () => {
  const mainContainer = useRef<HTMLDivElement>(null);
  const videoContainer = useRef<HTMLDivElement>(null);
  const [videoDimensions, setVideoDimensions] = useState({
    width: 0,
    height: 0,
  });

  const { colors } = useColorContext();

  useEffect(() => {
    setVideoDimensions({
      width: videoContainer.current!.offsetWidth,
      height: videoContainer.current!.offsetHeight,
    });

    gsap.to(videoContainer.current, {
      scrollTrigger: {
        trigger: mainContainer.current,
        start: "top bottom",
        end: "bottom bottom",
        markers: true,
        scrub: 0.9,
      },
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
    });
  }, []);

  return (
    <div ref={mainContainer} className="flex justify-center items-center">
      <div
        ref={videoContainer}
        className="relative h-[90vh] aspect-video px-5"
        style={{
          background: colors.dark,
          clipPath: "polygon(5% 20%, 95% 20%, 95% 80%, 5% 80%)",
        }}
      >
        <ReactPlayer
          url="https://player.vimeo.com/video/861989910?h=cd4ff54506"
          width={videoDimensions.width}
          height={videoDimensions.height}
        />
      </div>
    </div>
  );
};
