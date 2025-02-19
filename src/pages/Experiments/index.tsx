import {
  DistortedRectangle,
  DistortedText,
  InstancedBlocks,
  Portal,
} from "./components";
import { ASCIIEffect } from "./components/ASCIIEffect";
import { BlurEffect } from "./components/BlurEffect";
import { ExperimentVignette } from "./components/ExperimentVignette";
import { NormalLightEffect } from "./components/NormalLightEffect";
import { RefractionGlass } from "./components/RefractionGlass";

interface Experiment {
  title: string;
  slug: string;
  img: string;
  component: React.ComponentType;
}

export const experimentsData: Record<string, Experiment> = {
  refraction_glass: {
    title: "Refraction glass",
    slug: "refraction_glass",
    img: "https://o1vj7bm9yy.ufs.sh/f/YS7X7tdqhV1F6uI4xiWqLth0PVgZ6I23nKNypzWGrbxJDkvj",
    component: RefractionGlass,
  },
  ascii_effect: {
    title: "ASCII Effect",
    slug: "ascii_effect",
    img: "https://o1vj7bm9yy.ufs.sh/f/YS7X7tdqhV1FJ1r8x3By39B6xYKiHU8hSXsO2bnZVozAvpIu",
    component: ASCIIEffect,
  },
  normal_light_effect: {
    title: "Normal Map Magic",
    slug: "normal_light_effect",
    img: "https://o1vj7bm9yy.ufs.sh/f/YS7X7tdqhV1FXbVUZD65W9E3ypYKDvVgkwlhU8JbT7G1FeQR",
    component: NormalLightEffect,
  },
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

const getGridPosition = (idx: number) => {
  let gridColumn = "";
  let marginTop = "";

  if (idx % 6 === 0) {
    const rowStart = idx === 0 ? 1 : idx + 8;
    gridColumn = `2 / span 3`;
    marginTop = "-32px";
  } else if (idx % 6 === 1) {
    gridColumn = `10 / span 3`;
    marginTop = "96px";
  } else if (idx % 6 === 2) {
    gridColumn = `4 / span 3`;
    marginTop = "-32px";
  } else if (idx % 6 === 3) {
    gridColumn = ` 8 / span 3`;
    marginTop = "226px";
  } else if (idx % 6 === 4) {
    gridColumn = `3 / span 3`;
    marginTop = "20px";
  } else if (idx % 6 === 5) {
    gridColumn = ` 8/ span 3`;
    marginTop = "206px";
  }

  return { gridColumn, marginTop };
};

const Experiments = () => {
  return (
    <div className="relative min-h-[--fullScreen] z-20 text-black py-10 px-5">
      <div className="pt-40 grid grid-cols-8 gap-5 mb-40">
        <div className="flex flex-col mt-10 justify-between col-span-6">
          <h1 className="text-7xl font-medium"> EXPERIMENTATIONS</h1>
        </div>

        <p className="col-span-2 flex items-end text-end">
          Welcome to the Experimentations page! Here, you'll find a collection
          of innovative and interactive projects I've made !
        </p>
      </div>

      <div className={`grid grid-cols-12 auto-rows-auto gap-5`}>
        {experimentsArray.map((experiment, idx) => {
          const { gridColumn, marginTop } = getGridPosition(idx);
          return (
            <div
              key={idx}
              style={{
                gridColumn,
                marginTop,
              }}
            >
              <ExperimentVignette {...experiment} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Experiments;
