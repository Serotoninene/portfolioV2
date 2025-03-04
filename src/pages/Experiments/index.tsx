import { useEffect } from "react";
import { InfiniteGrid } from "./components/InfiniteGrid";
import { experimentsArray } from "./experimentsData";
import gsap from "gsap";

const Experiments = () => {
  useEffect(() => {
    gsap.set("#Navbar", { clearProps: "borderColor" });
  }, []);

  return (
    <div className="relative z-10 text-black py-10 px-5 h-screen overflow-hidden">
      <InfiniteGrid experimentsArray={experimentsArray} />
    </div>
  );
};

export default Experiments;
