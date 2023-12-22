import { useEffect } from "react";
import { Hero, RecentProjects } from "./components";

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
    <div id="Homepage">
      <Hero />
      {/* <StickyText /> */}
      <RecentProjects />
    </div>
  );
}
