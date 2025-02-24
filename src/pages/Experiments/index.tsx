import { InfiniteGrid } from "./components/InfiniteGrid";
import { experimentsArray } from "./experimentsData";

// TO DO
// [X] Integrate the experimentation text on the page
// [X] Set up a a back button on the experiment page
// [X] Activate the nav buttons in the menu
// [] revoir tout le système de couleurs là
// [] check the mobile version

const Experiments = () => {
  return (
    <div className="relative z-20 text-black py-10 px-5 h-screen overflow-hidden">
      <InfiniteGrid experimentsArray={experimentsArray} />
    </div>
  );
};

export default Experiments;
