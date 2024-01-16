import { useEffect } from "react";
import {
  Contact,
  Footer,
  Hero,
  RecentProjects,
  Showreal,
  StickyText,
} from "./components";
import { Loader } from "../../components/organisms";

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
    <div id="Homepage" className="overflow-clip">
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
