import { Marquee } from "../../../../components/molecules/Marquee";

export const AboutMe = () => {
  return (
    <div id="AboutMe" className="relative pb-5">
      <div className="pt-10 pb-6">
        <Marquee text="ABOUT ME" direction={1} />

        <div className="grid grid-cols-5 md:gap-10">
          <div id="description" className="col-span-4"></div>
        </div>
      </div>
    </div>
  );
};
