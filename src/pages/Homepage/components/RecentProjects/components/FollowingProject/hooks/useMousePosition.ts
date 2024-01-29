import * as THREE from "three";
import TouchTexture from "../../../../../../../components/three/TouchTexture";
import { useEffect, useMemo } from "react";
import { useProjectMeshRect } from "../../../../../../../store/useProjectMeshRect";

export const useMousePosition = () => {
  const { rect } = useProjectMeshRect();

  const touchTexture = useMemo(() => new TouchTexture(false, 128, 60, 0.2), []);

  const handleMousePosition = (e: MouseEvent) => {
    if (!rect) return;
    const x = rect.x;
    const y = rect.y;
    const width = rect.width;
    const height = rect.height;

    const mappedX = THREE.MathUtils.mapLinear(e.clientX, x, width + x, 0, 1);
    const mappedY = THREE.MathUtils.mapLinear(e.clientY, y, height + y, 1, 0);
    // if (mappedX < 0 || mappedX > 1 || mappedY < 0 || mappedY > 1) return;

    const mousePosition = new THREE.Vector2(mappedX, mappedY);
    touchTexture.addTouch(mousePosition);
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMousePosition);
    return () => window.removeEventListener("mousemove", handleMousePosition);
  }, []);

  return touchTexture;
};
