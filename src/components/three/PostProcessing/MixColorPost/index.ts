import { Effect } from "postprocessing";

import { Uniform } from "three";

interface MixColorProps {}

const fragment = `
void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) {
   
  // outputColor = mix(asciiCharacter, normalTexture,  fluidTexture);
  outputColor = vec4(1., 0. , 0. ,1.);
}
`;

export class MixColorPost extends Effect {
  constructor() {
    const uniforms = new Map<string, Uniform>([]);

    super("MixColorPost", fragment, { uniforms });
  }
}
