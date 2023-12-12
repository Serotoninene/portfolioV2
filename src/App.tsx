import { Suspense } from "react";

import { Experience } from "./components/three";
import { useProgress } from "@react-three/drei";
import { Placeholder } from "./components/atoms";

const Loader = () => {
  const { progress } = useProgress();

  return (
    <div className="fixed inset-0 flex justify-center items-center">
      <div className="flex justify-center items-center text-black">
        {progress.toFixed(2)}%
      </div>
    </div>
  );
};

function App() {
  return (
    <main id="main--container" className="overflow-hidden text-dark">
      <div className="h-screen flex justify-center items-center bg-grey-400">
        {" "}
        Hello World
      </div>
      <div className="h-screen fixed inset-0 z-10">
        <Experience />
      </div>
    </main>
  );
}

export default App;
