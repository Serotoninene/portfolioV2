import gsap, { Power3 } from "gsap";
import { useLayoutEffect, useRef } from "react";

export const useIntroAnim = () => {
  const tl = useRef<gsap.core.Timeline>();

  useLayoutEffect(() => {
    const headerTitle = gsap.utils.toArray("#ContactHeader_Title span");
    const headerParagraph = gsap.utils.toArray("#ContactHeader_Paragraph span");
    const formInputs = gsap.utils.toArray("#ContactForm input");

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

    gsap.set("#Contact textarea", {
      opacity: 0,
      rotate: 5,
      y: 50,
    });

    gsap.set("#Contact .button", {
      opacity: 0,
    });

    tl.current = gsap.timeline({
      scrollTrigger: {
        trigger: "#Contact",
        start: "51% top",
        toggleActions: "play none none reverse",
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
    tl.current.to(
      "#Contact textarea",
      {
        opacity: 1,
        rotate: 0,
        y: 0,
      },
      "<0.1"
    );

    // button
    tl.current.to(
      "#Contact .button",
      {
        opacity: 1,
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
