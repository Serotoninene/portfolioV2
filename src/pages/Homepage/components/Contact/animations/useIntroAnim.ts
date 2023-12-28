import { RefObject, useLayoutEffect, useRef } from "react";
import gsap, { Power3 } from "gsap";

export const useIntroAnim = () => {
  const tl = useRef<gsap.core.Timeline>();

  useLayoutEffect(() => {
    const headerTitle = gsap.utils.toArray("#ContactHeader_Title span");
    const headerParagraph = gsap.utils.toArray("#ContactHeader_Paragraph span");
    const formInputs = gsap.utils.toArray(
      "#ContactForm input, #ContactForm textarea"
    );

    // Initialisation
    gsap.set("#ContactImage", {
      opacity: 0,
      scale: 1.2,
    });
    gsap.set(headerTitle, {
      yPercent: 120,
    });

    gsap.set(headerParagraph, {
      yPercent: 220,
    });

    gsap.set(formInputs, {
      opacity: 0,
      rotate: 10,
      y: 50,
    });

    tl.current = gsap.timeline({
      scrollTrigger: {
        trigger: "#Contact",
        start: "51% top",
        toggleActions: "play none play none",
      },
      defaults: { ease: Power3.easeOut },
    });

    // header
    tl.current.to(headerTitle, {
      yPercent: 0,
      stagger: 0.005,
    });

    tl.current.to(
      headerParagraph,
      {
        yPercent: 0,
        stagger: 0.001,
      },
      "<0.1"
    );

    // form
    tl.current.to(
      formInputs,
      {
        opacity: 1,
        rotate: 0,
        y: 0,
        stagger: 0.05,
      },
      "<0.1"
    );

    // image
    tl.current.to(
      "#ContactImage",
      {
        opacity: 1,
        scale: 1,
      },
      "<"
    );

    // submit button

    return () => {
      tl.current?.kill();
    };
  }, []);

  return tl;
};
