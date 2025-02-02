import {
  DistortedRectangle,
  DistortedText,
  InstancedBlocks,
  Portal,
} from "./components";
import { BlurEffect } from "./components/BlurEffect";
import { ExperimentVignette } from "./components/ExperimentVignette";

export const experimentsData: Record<string, Experiment> = {
  blur_effect: {
    title: "Blur Texture Effect",
    slug: "blur_effect",
    img: "https://o1vj7bm9yy.ufs.sh/f/YS7X7tdqhV1FBfv6ZKNwMeQfYuL7xG5lmpC4VbRJD8SIriq3",
    component: BlurEffect,
  },
  distorted_rectangle: {
    title: "Distorted Rectangle",
    slug: "distorted_rectangle",
    img: "/assets/Experiments/DistortedRectangle.webp",
    component: DistortedRectangle,
  },
  portal: {
    title: "Portal",
    slug: "portal",
    img: "/assets/Experiments/Portal.webp",
    component: Portal,
  },
  distorted_text: {
    title: "Distorted Text",
    slug: "distorted_text",
    img: "/assets/Photos/s-eychenne-les-routes-de-mon-enfance.jpeg",
    component: DistortedText,
  },
  instancedblocks: {
    title: "Instanced Blocks",
    slug: "instancedblocks",
    img: "/assets/Experiments/InstancedBlocks.webp",
    component: InstancedBlocks,
  },
};

export const experimentsArray = Object.values(experimentsData);

const Experiments = () => {
  return (
    <div className="relative min-h-[--fullScreen] z-20 text-black py-10 px-5">
      <div className="pt-40 grid grid-cols-8 gap-5 mb-40">
        <div className="flex flex-col mt-10 justify-between col-span-6">
          <h1 className="text-7xl font-medium"> EXPERIMENTATIONS</h1>
        </div>

        <p className="col-span-2 flex items-end text-end">
          Welcome to the Experimentations page! Here, you'll find a collection
          of innovative and interactive projects showcasing the power
        </p>
      </div>

      <div className="grid grid-cols-2 gap-5">
        {experimentsArray.map((experiment, idx) => (
          <ExperimentVignette key={idx} {...experiment} />
        ))}
      </div>
    </div>
  );
};

export default Experiments;
