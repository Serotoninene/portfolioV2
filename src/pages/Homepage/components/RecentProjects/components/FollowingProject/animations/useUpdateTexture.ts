import { useEffect } from "react";
import * as THREE from "three";
import gsap, { Power3 } from "gsap";

import { useProjectContext } from "../../../../../../../hooks/useProjectContext";
import { projects } from "../../../../../../../data";

type Props = {
  shader: THREE.ShaderMaterial | null;
  textures: THREE.Texture[];
  mixFactor: { value: number };
  setMixFactor: (value: { value: number }) => void;
};

export const useUpdateTexture = ({
  shader,
  textures,
  mixFactor,
  setMixFactor,
}: Props) => {
  const { selectedProject } = useProjectContext();

  useEffect(() => {
    if (!shader) return;

    const updateTexture = async () => {
      if (!shader) return;
      // Use the index to get the corresponding texture
      const index = projects.findIndex(
        (project) => project.title === selectedProject?.title
      );

      // Get the next texture
      const texture2 = selectedProject ? textures[index] : null;

      // If the current texture is the same as the selected texture, return early
      if (shader.uniforms.uTexture.value === texture2) return;

      // Set the uniforms
      shader.uniforms.uTexture2.value = texture2;
      if (texture2)
        shader.uniforms.uTextureSize.value = new THREE.Vector2(
          texture2.image.width,
          texture2.image.height
        );

      // Animate the mix factor
      gsap.killTweensOf(mixFactor);
      await gsap.to(mixFactor, {
        value: 1,
        duration: 0.5,
        ease: Power3.easeOut,
      });

      // Set the first texture to the second texture
      shader.uniforms.uTexture.value = texture2;
      setMixFactor({ value: 0 });
    };

    if (shader.uniforms.uTexture.value) updateTexture();
  }, [selectedProject]);
};
