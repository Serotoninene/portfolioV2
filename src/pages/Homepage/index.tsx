import { useEffect } from "react";
import { Loader } from "../../components/organisms";
import { Contact, Footer, RecentProjects, StickyText } from "./components";

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

  return (
    <div id="Homepage" className="overflow-clip">
      {!hasAlreadyLoaded && <Loader />}
      {/* <Hero />
      <Showreal /> */}
      <StickyText />
      <RecentProjects />
      <Contact />
      <Footer />
    </div>
  );
}
