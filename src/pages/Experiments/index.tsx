import { InfiniteGrid } from "./components/InfiniteGrid";
import { experimentsArray } from "./experimentsData";

// TO DO
// [] Set up a a back button on the experiment page
// [] Integrate the experimentation text on the page
// []
// []

const Experiments = () => {
  return (
    <div className="relative z-20 text-black py-10 px-5 h-screen overflow-hidden">
      {/* <div className="pt-40 grid grid-cols-8 gap-5 mb-40">
        <div className="flex flex-col mt-10 justify-between col-span-6">
          <h1 className="text-7xl font-medium"> EXPERIMENTATIONS</h1>
        </div>

        <p className="col-span-2 flex items-end text-end">
          Welcome to the Experimentations page! Here, you'll find a collection
          of innovative and interactive projects I've made !
        </p>
      </div> */}

      <InfiniteGrid experimentsArray={experimentsArray} />
    </div>
  );
};

export default Experiments;
