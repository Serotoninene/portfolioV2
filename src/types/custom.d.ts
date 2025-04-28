import SimulationMaterial from "../components/three/SimulationMaterial";

export type Project = {
  title: string;
  subtitle: string;
  img: string;
  slug: string;
  href?: string;
};

export interface ProjectData {
  title: string;
  introParagraph: string;
  client: string;
  slug: string;
  color?: string;
  clientUrl?: string;
  project: string;
  websiteName: string;
  websiteUrl?: string;
  photos: string[];
  video?: string;
  paragraphs: string[];
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      customMaterial: ReactThreeFiber.Object3DNode<
        CustomMaterial,
        typeof CustomMaterial
      >;
      simulationMaterial: ReactThreeFiber.Object3DNode<
        SimulationMaterial,
        typeof SimulationMaterial
      >;
    }
  }
}

declare module "@14islands/r3f-scroll-rig/powerups";
