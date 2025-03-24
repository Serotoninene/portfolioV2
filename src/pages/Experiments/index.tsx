import { InfiniteGrid } from "./components/InfiniteGrid";
import { experimentsArray } from "./experimentsData";

const Experiments = () => {
  return (
    <div className="relative z-10 text-black py-10 px-5 h-screen overflow-hidden">
      <InfiniteGrid experimentsArray={experimentsArray} />
    </div>
  );
};

export default Experiments;
