import { useEffect, useRef } from "react";
import { gsap, Power3 } from "gsap";
import { Object3D } from "three";

type Props = {
  skateRef: React.RefObject<Object3D>;
};

export const mergeTimelines = (timelines: gsap.core.Timeline[]) => {
  const master = gsap.timeline({ paused: true });
  timelines.forEach((tl) => {
    master.add(tl);
  });

  return master;
};

export const useIntroAnim = ({ skateRef }: Props) => {
  const tl = useRef<gsap.core.Timeline>();

  useEffect(() => {
    if (!skateRef?.current) return;
    const skateScale = window?.innerWidth * 0.1;

    tl.current = gsap.timeline({});

    tl.current?.from(skateRef.current.rotation, {
      x: 1.5,
      y: -0.35,
      z: 0.55,
      duration: 1,

      ease: Power3.easeOut,
    });

    tl.current?.fromTo(
      skateRef.current.scale,
      { x: 0.1, y: 0.1, z: 0.1 },
      {
        duration: 1,
        x: skateScale,
        y: skateScale,
        z: skateScale,
      },
      "<"
    );

    return () => {
      tl.current?.kill();
    };
  }, []);

  return tl;
};

export const useScrollAnim = ({ skateRef }: Props) => {
  const tl = useRef<gsap.core.Timeline>();

  useEffect(() => {
    if (!skateRef?.current) return;

    // animation timeline with only the animation
    tl.current = gsap.timeline({
      ease: "none",
      scrollTrigger: {
        trigger: "#main--container",
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
      },
    });

    tl.current
      .fromTo(
        skateRef.current.rotation,
        {
          z: -0.55,
        },
        {
          z: 10,
        }
      )
      .progress(0.0001);

    // main.current = gsap.timeline({
    //   ease: "none",
    // });

    // main.current.to(tl.current, {
    //   progress: 1,
    // });
    // .to(tl.current, { progress: 0.5, duration: 1 })
    // .to(tl.current, { progress: 1, duration: 1 });
    return () => {
      tl.current?.kill();
    };
  }, []);

  return tl;
};
