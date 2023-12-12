import { useGLTF } from "@react-three/drei";
import { Mesh } from "three";

const LOGO_SRC = "./assets/ThreeModels/Serotonine_Icon/untitled.glb";

export const useLogo = () => {
  const model = useGLTF(LOGO_SRC);

  const mesh = model.scene.children[1] as Mesh;
  const geometry = mesh.geometry;
  const material = mesh.material;

  return { geometry, material };
};
