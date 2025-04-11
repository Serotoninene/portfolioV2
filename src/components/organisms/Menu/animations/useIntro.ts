import gsap, { Power3 } from "gsap";
import { RefObject, useLayoutEffect, useRef } from "react";

export const useIntro = (container: RefObject<HTMLDivElement>) => {
  const tl = useRef<gsap.core.Timeline>();

  // set up the timeline for the animation
  useLayoutEffect(() => {
    const sectionTl = gsap.timeline({
      defaults: { ease: Power3.easeOut, duration: 0.45 },
    });
    const sections = gsap.utils.toArray(".menu-section");

    const coordinatesTl = gsap.timeline({
      defaults: { ease: Power3.easeOut },
    });
    const coordinates = gsap.utils.toArray(".menu-coordinate");

    sections.forEach((section) => {
      if (!(section instanceof HTMLElement)) return;
      const index = section.querySelectorAll(".menu-section__idx");
      const title = section.querySelectorAll(".menu-section__title span");
      const line = section.querySelector(".menu-section__line");
      const arrow = section.querySelector(".menu-section__arrow");

      sectionTl.fromTo(
        index,
        { opacity: 0, y: 64 },
        { opacity: 1, y: 0, stagger: 0.1 },
        "<0.05"
      );
      sectionTl.fromTo(
        title,
        { opacity: 0, y: 64 },
        { opacity: 1, y: 0, stagger: 0.03 },
        "<0.1"
      );
      sectionTl.fromTo(line, { scaleX: 0 }, { scaleX: 1 }, "<");
      sectionTl.fromTo(
        arrow,
        { yPercent: 100, xPercent: -100 },
        { yPercent: 0, xPercent: 0 },
        "<0.1"
      );
    });

    coordinates.forEach((coordinate) => {
      if (!(coordinate instanceof HTMLElement)) return;
      const title = coordinate.querySelector(".menu-coordinate h5");
      const line = coordinate.querySelectorAll(".menu-coordinate p");

      coordinatesTl.fromTo(
        title,
        { opacity: 0, y: 64 },
        { opacity: 1, y: 0 },
        "<0.1"
      );
      coordinatesTl.fromTo(
        line,
        { opacity: 0, y: 64 },
        { opacity: 1, y: 0, stagger: 0.01 },
        "<0.1"
      );
    });

    tl.current = gsap.timeline({
      paused: true,
      defaults: { ease: Power3.easeOut },
    });
    tl.current.to("#Navbar", { yPercent: -150 });
    tl.current.fromTo(
      container.current,
      {
        opacity: 0,
        y: 64,
      },
      {
        y: 0,
        opacity: 1,
      },
      "<"
    );
    tl.current.add(sectionTl);
    tl.current.add(coordinatesTl, "-=1");
    tl.current.fromTo(
      ".menu-tagline",
      { opacity: 0 },
      { opacity: 1, duration: 1 },
      1
    );

    return () => {
      tl.current?.kill();
    };
  }, []);

  return tl;
};
