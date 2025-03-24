import { MutableRefObject, useRef } from "react";
import {
  ScrollScene,
  UseCanvas,
  useScrollRig,
} from "@14islands/r3f-scroll-rig";

import Lines from "../../../../components/three/Lines";
import { AnimLink } from "../../../../components/atoms";
import { useColorContext } from "../../../../hooks/useColorContext";

export const Footer = () => {
  const { colors } = useColorContext();
  const ref = useRef<HTMLDivElement>(null);
  const { hasSmoothScrollbar } = useScrollRig();

  return (
    <div
      className="relative pt-[20vh] px-[32px] flex flex-col gap-[12px] md:gap-[56px] pb-[80px]"
      style={{ backgroundColor: colors.secondaryColor }}
    >
      <div className="flex flex-col gap-1 justify-between md:flex-row">
        <a>pujol.alexandre@hotmail.fr</a>
        <p>51 T Rue Piat, 75020, PARIS</p>
        <div className="flex justify-between">
          <p>(+ 33) 6 03 53 11 63</p>{" "}
          <div className="block md:hidden overflow-hidden">
            <AnimLink href="instagram.com">Instagram</AnimLink>
          </div>
        </div>
        <ul className="hidden md:flex items-center md:gap-[16px] lggap-[80px]">
          <AnimLink href="https://www.instagram.com/serotoninene/?hl=fr">
            Instagram
          </AnimLink>
          <AnimLink href="https://www.malt.fr/profile/alexandrepujol?q=alexandre+pujol&sourceComponent=home_unlogged&searchid=65aea466d6258e0da5f71775">
            Malt
          </AnimLink>
        </ul>
      </div>

      <div
        ref={ref}
        className="h-[60vh] pointer-events-none flex justify-center items-center "
        style={{ opacity: hasSmoothScrollbar ? 0 : 1 }}
      >
        <img src="/assets/Photos/logo_lines-light.png" className="h-full" />
      </div>
      {hasSmoothScrollbar && (
        <UseCanvas>
          <ScrollScene track={ref as MutableRefObject<HTMLDivElement>}>
            {(props) => <Lines scrollScene={props} trackedDiv={ref} />}
          </ScrollScene>
        </UseCanvas>
      )}

      <div className="grid grid-cols-3">
        <a>Privacy Policy</a>
        <p className="text-center">@Alexandre Pujol, 2024</p>
        <a className="text-end">Terms and Conditions</a>
      </div>
    </div>
  );
};
