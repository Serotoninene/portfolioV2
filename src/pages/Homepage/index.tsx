import { useEffect } from "react";
import { Loader } from "../../components/organisms";
import {
  Contact,
  Footer,
  Hero,
  RecentProjects,
  Showreal,
  StickyText,
} from "./components";

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
    <div id="Homepage" className="overflow-hidden ">
      <Loader />
      <Hero />
      <Showreal />
      <StickyText />
      <RecentProjects />
      <Contact />
      <Footer />
    </div>
  );
}
