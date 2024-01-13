import { ScrollScene, UseCanvas } from "@14islands/r3f-scroll-rig";
import { MutableRefObject, useLayoutEffect, useRef } from "react";
import Lines from "../../../../components/three/Lines";
import { AnimLink } from "../../../../components/atoms";

export const Footer = () => {
  const ref = useRef<HTMLDivElement>(null);
  const footer = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    // gsap.set(ref.current, { xPercent: -100 });
    // gsap.to(ref.current, {
    //   scrollTrigger: {
    //     trigger: footer.current,
    //     start: "top bottom",
    //     end: "bottom bottom",
    //   },
    //   xPercent: 0,
    // });
  }, []);

  return (
    <div ref={footer} className="px-[32px] flex flex-col gap-[56px] pb-[80px]">
      <div className="flex justify-between">
        <a>pujol.alexandre@hotmail.fr</a>
        <p>51 T Rue Piat, 75020, PARIS</p>
        <p>(+ 33) 6 03 53 11 63</p>
        <ul className="flex gap-[80px]">
          <AnimLink href="instagram.com">Instagram</AnimLink>
          <AnimLink href="linkedin">Linkedin</AnimLink>
          <AnimLink href="behance">Behance</AnimLink>
        </ul>
      </div>

      <div ref={ref} className="h-[40vh] pointer-events-none" />
      <UseCanvas>
        <ScrollScene track={ref as MutableRefObject<HTMLDivElement>}>
          {(props) => <Lines scrollScene={props} trackedDiv={ref} />}
        </ScrollScene>
      </UseCanvas>

      <div className="grid grid-cols-3">
        <a>Privacy Policy</a>
        <p className="text-center">@Alexandre Pujol, 2024</p>
        <a className="text-end">Terms and Conditions</a>
      </div>
    </div>
  );
};
