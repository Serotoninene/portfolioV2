import { InfiniteGrid } from "./components/InfiniteGrid";
import { experimentsArray } from "./experimentsData";

// TO DO
// [X] Integrate the experimentation text on the page
// [] Set up a a back button on the experiment page
// [] Activate the nav buttons in the menu
// [] check the mobile version

const Experiments = () => {
  return (
    <div className="relative z-20 text-black py-10 px-5 h-screen overflow-hidden">
      <InfiniteGrid experimentsArray={experimentsArray} />
    </div>
  );
};

export default Experiments;
