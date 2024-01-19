import { useEffect, useState } from "react";
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
  const [hasLoaded, setHasLoaded] = useState(false);
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
      <Loader setHasLoaded={setHasLoaded} />
      <Hero hasLoaded={hasLoaded} />
      <Showreal />
      <StickyText />
      <RecentProjects />
      <Contact />
      <Footer />
    </div>
  );
}
