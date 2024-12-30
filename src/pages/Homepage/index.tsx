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
  const hasAlreadyLoaded =
    sessionStorage.getItem("hasAlreadyLoaded") === "true";

  useEffect(() => {
    const handleBeforeUnload = () => {
      window.scrollTo(0, 0);
    };
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  const handleScroll = (e) => {
    console.log(e.target.scrollTop);
  };

  return (
    <div id="Homepage" className="overflow-clip" onScroll={handleScroll}>
      {!hasAlreadyLoaded && <Loader />}
      <Hero />
      <Showreal />
      <StickyText />
      <RecentProjects />
      <Contact />
      <Footer />
    </div>
  );
}
