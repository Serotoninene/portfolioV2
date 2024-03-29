import SimulationMaterial from "../components/three/SimulationMaterial";

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
