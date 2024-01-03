import { ScrollScene, UseCanvas } from "@14islands/r3f-scroll-rig";
import { MutableRefObject, useLayoutEffect, useRef } from "react";
import Lines from "../../../../components/three/Lines";

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
    //     markers: true,
    //   },
    //   xPercent: 0,
    // });
  }, []);

  return (
    <div
      ref={footer}
      className="sticky bottom-0 px-[32px] flex flex-col gap-[56px] m-[80px]"
    >
      <div className="flex justify-between">
        <a>pujol.alexandre@hotmail.fr</a>
        <p>51 T Rue Piat, 75020, PARIS</p>
        <p>(+ 33) 6 03 53 11 63</p>
        <ul className="flex gap-[80px]">
          <a>Instagram</a>
          <a>Linkedin</a>
          <a>Behance</a>
        </ul>
      </div>

      <div ref={ref} className="h-[60vh]" />
      <UseCanvas>
        <ScrollScene track={ref as MutableRefObject<HTMLDivElement>}>
          {(props) => <Lines scrollScene={props} trackedDiv={ref} />}
        </ScrollScene>
      </UseCanvas>

      <div className="grid grid-cols-3">
        <a>Privacy Policy</a>
        <p>@Alexandre Pujol, 2024</p>
        <a>Terms and Conditions</a>
      </div>
    </div>
  );
};
