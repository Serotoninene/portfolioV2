import {
  DistortedRectangle,
  InstancedBlocks,
  ParticleMorph,
  Portal,
} from "./components";
import { ASCIIEffect } from "./components/ASCIIEffect";
import { BlurEffect } from "./components/BlurEffect";
import { MotoyoshiInfiniteGrid } from "./components/MotoyoshiInfiniteGrid";
import { NormalLightEffect } from "./components/NormalLightEffect";
import { RefractionGlass } from "./components/RefractionGlass";
import { TextMorph } from "./components/TextMorph";

export interface Experiment {
  title: string;
  slug: string;
  img: string;
  component: React.ComponentType;
}

export const experimentsData: Record<string, Experiment> = {
  text_morph: {
    title: "Text Morph",
    slug: "text_morph",
    img: "https://viz1risw7o.ufs.sh/f/x0tNbNvWf7L64KpUP9YwZtzx7Q9CFTRXqpa2cuhlneBdVkOE",
    component: TextMorph,
  },
  particle_morph: {
    title: "Particle Morph",
    slug: "particle_morph",
    img: "https://viz1risw7o.ufs.sh/f/x0tNbNvWf7L64KpUP9YwZtzx7Q9CFTRXqpa2cuhlneBdVkOE",
    component: ParticleMorph,
  },
  refraction_glass: {
    title: "Refraction glass",
    slug: "refraction_glass",
    img: "https://o1vj7bm9yy.ufs.sh/f/YS7X7tdqhV1F6uI4xiWqLth0PVgZ6I23nKNypzWGrbxJDkvj",
    component: RefractionGlass,
  },
  motoyoshi_infinite_grid: {
    title: "Motoyoshi's infinite grid",
    slug: "motoyoshi_infinite_grid",
    img: "https://o1vj7bm9yy.ufs.sh/f/YS7X7tdqhV1FBLEQhhNwMeQfYuL7xG5lmpC4VbRJD8SIriq3",
    component: MotoyoshiInfiniteGrid,
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

  instancedblocks: {
    title: "Instanced Blocks",
    slug: "instancedblocks",
    img: "/assets/Experiments/InstancedBlocks.webp",
    component: InstancedBlocks,
  },
};

// Replacing the elements by cool photos to show off the effect
const photos = [
  "https://5f6x5qowvd.ufs.sh/f/skRwIEbJ4UkGihb4FDPiPrmf1A6ZJzpKuwSvakosCneUBXyH",
  "https://5f6x5qowvd.ufs.sh/f/skRwIEbJ4UkGBX6BYfxTXEYlhq87yGp6ZoMIQC4zc2rFA3VK",
  "https://5f6x5qowvd.ufs.sh/f/skRwIEbJ4UkGhrjq7CzJxvWinK18Uar9tDYMRGzFsybum3XZ",
  "https://5f6x5qowvd.ufs.sh/f/skRwIEbJ4UkGPbseOlxB1RqTnNFd5t9IskZDfWGgh3Axue0i",
  "https://5f6x5qowvd.ufs.sh/f/skRwIEbJ4UkGUgPswjFnTS31BKxvozY6Rc9XiAEC07r524Vy",
  "https://5f6x5qowvd.ufs.sh/f/skRwIEbJ4UkGUMwyuiFnTS31BKxvozY6Rc9XiAEC07r524Vy",
  "https://5f6x5qowvd.ufs.sh/f/skRwIEbJ4UkGPdhsQGbxB1RqTnNFd5t9IskZDfWGgh3Axue0",
  "https://5f6x5qowvd.ufs.sh/f/skRwIEbJ4UkGAFrm4ordHpEckhiwbCf52orVMZau8P6dBOQz",
  "https://5f6x5qowvd.ufs.sh/f/skRwIEbJ4UkGXntgd45f1OuCjGxsiovyYSkHE5be2Rp7Z3I4",
  "https://5f6x5qowvd.ufs.sh/f/skRwIEbJ4UkGGBrepFWpKtZaehzdVbw3L9Mc2xsjfXInr1Sk",
  "https://5f6x5qowvd.ufs.sh/f/skRwIEbJ4UkGX9cSjl5f1OuCjGxsiovyYSkHE5be2Rp7Z3I4",
  "https://5f6x5qowvd.ufs.sh/f/skRwIEbJ4UkGTphvODQMEmWIjKoDvpOiat3Rq42fJL1dCuSw",
  "https://5f6x5qowvd.ufs.sh/f/skRwIEbJ4UkGQKUyKMXxy3LjqpuHb6m7GfiwIBaWSevTOc9R",
  "https://5f6x5qowvd.ufs.sh/f/skRwIEbJ4UkGAMzsMwdHpEckhiwbCf52orVMZau8P6dBOQzY",
  "https://5f6x5qowvd.ufs.sh/f/skRwIEbJ4UkGXkodMuJ5f1OuCjGxsiovyYSkHE5be2Rp7Z3I",
  "https://5f6x5qowvd.ufs.sh/f/skRwIEbJ4UkGBlwPBMTXEYlhq87yGp6ZoMIQC4zc2rFA3VKv",
  "https://5f6x5qowvd.ufs.sh/f/skRwIEbJ4UkGKyxb8d6gsn8bwcJy3NrxkXYj50qdQMuHAezP",
  "https://5f6x5qowvd.ufs.sh/f/skRwIEbJ4UkGUqquHcgFnTS31BKxvozY6Rc9XiAEC07r524V",
  "https://5f6x5qowvd.ufs.sh/f/skRwIEbJ4UkGYVCOupfF8qru3tcXjlnCQmdbZk7yAgeLp9Mi",
  "https://5f6x5qowvd.ufs.sh/f/skRwIEbJ4UkG8jqVNQvyKrt0p6Imjg41sUn7OSadlYDvWhEV",
  "https://5f6x5qowvd.ufs.sh/f/skRwIEbJ4UkGWcJUdQesCIJkYwz1KcmFb3dGRgW9o7eEjMh5",
  "https://5f6x5qowvd.ufs.sh/f/skRwIEbJ4UkG0QXAwcmT4CVNbjW2tH8verwLfU1BF7iPYyqX",
  "https://5f6x5qowvd.ufs.sh/f/skRwIEbJ4UkGio5YOOPiPrmf1A6ZJzpKuwSvakosCneUBXyH",
  "https://5f6x5qowvd.ufs.sh/f/skRwIEbJ4UkGkzYa8DZKBuRdcW7DSvIfnP8oU9qYVjML0wlx",
  "https://5f6x5qowvd.ufs.sh/f/skRwIEbJ4UkG1DSlWkrSuEeAlhHfvPGa2zj6Xmgc3DTrp48Z",
  "https://5f6x5qowvd.ufs.sh/f/skRwIEbJ4UkGbMm7fRLpjezkPh5QtSomWBabXMwRUcdNKxVT",
  "https://5f6x5qowvd.ufs.sh/f/skRwIEbJ4UkGQpEeLAcXxy3LjqpuHb6m7GfiwIBaWSevTOc9",
  "https://5f6x5qowvd.ufs.sh/f/skRwIEbJ4UkGZhbwjKEGN9CJye1onf27hS8viYKRxF3LagXq",
  "https://5f6x5qowvd.ufs.sh/f/skRwIEbJ4UkG6BE7iqaCc0AWbg7XQNGh5rYpPy3HzZ4jeDnK",
  "https://5f6x5qowvd.ufs.sh/f/skRwIEbJ4UkGHIgHVUyN3jaIWxDC7Qdio5czvrmbwtKSYeq6",
];

// photos.forEach((photo, idx) => {
//   const content = {
//     title: "Normal Map Magic",
//     slug: "normal_light_effect" + idx,
//     img: photo,
//     component: NormalLightEffect,
//   };
//   experimentsData[idx] = content;
// });

export const experimentsArray = Object.values(experimentsData);
