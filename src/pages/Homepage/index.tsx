import { useEffect, useRef } from "react";
import { Loader } from "../../components/organisms";
import {
  Contact,
  Footer,
  Hero,
  RecentProjects,
  Showreal,
  StickyText,
} from "./components";
import { ScrollScene, UseCanvas } from "@14islands/r3f-scroll-rig";
import { StickyScrollScene } from "@14islands/r3f-scroll-rig/powerups";

const StickyTest = () => {
  const el = useRef();
  return (
    <section>
      <div className="h-[300vh] bg-red-300  opacity-25">
        <div
          ref={el}
          className="sticky top-14 right-0 h-[50vh] w-[50vw] border border-blue-500 "
        >
          <p>This element is position:sticky and will be tracked.</p>
        </div>
      </div>
      <UseCanvas>
        <StickyScrollScene debug track={el}>
          {(props) => (
            <mesh {...props}>
              <boxGeometry />
              <meshNormalMaterial />
            </mesh>
          )}
        </StickyScrollScene>
      </UseCanvas>
    </section>
  );
};

export default function Homepage() {
  useEffect(() => {
    const handleBeforeUnload = () => {
      window.scrollTo(0, 0);
    };
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  return (
    <div id="Homepage" className="overflow-clip ">
      <RecentProjects />
      {/* <Loader />
      <Hero />
      <Showreal />
      <StickyText />
      <RecentProjects />
      <Contact />
      <Footer /> */}
    </div>
  );
}
