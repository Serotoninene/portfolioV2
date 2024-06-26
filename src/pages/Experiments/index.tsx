import { ExperimentVignette } from "./components/ExperimentVignette";

const experimentsData = [
  {
    title: "Instanced Blocks",
    slug: "instancedblocks",
    img: "/assets/Experiments/InstancedBlocks.webp",
  },
  {
    title: "Portal",
    slug: "portal",
    img: "/assets/Experiments/Portal.webp",
  },
  {
    title: "Falling Pixel",
    slug: "falling_pixel",
    img: "/assets/Experiments/FallingPixel.webp",
  },
  {
    title: "Distorted Rectangle",
    slug: "distorted_rectangle",
    img: "/assets/Experiments/DistortedRectangle.webp",
  },
  {
    title: "Distorted Text",
    slug: "distorted_text",
    img: "/assets/Photos/s-eychenne-les-routes-de-mon-enfance.jpeg",
  },
];

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
        {experimentsData.map((experiment, idx) => (
          <ExperimentVignette key={idx} {...experiment} />
        ))}
      </div>
    </div>
  );
};

export default Experiments;
