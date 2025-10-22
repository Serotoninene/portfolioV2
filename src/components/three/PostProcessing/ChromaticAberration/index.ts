import { Effect } from "postprocessing";
import { Uniform } from "three";

interface ChromaticAberrationEffectProps {
  fluidTexture?: THREE.Texture | null;
}

const fragment = `
    uniform sampler2D uFluidTexture;

    void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) {
        vec2 fluidTexture = texture2D(uFluidTexture, uv).rg;
        vec2 offset = (texture2D(uFluidTexture, uv).rg - 0.5) * 0.04;

        // Offset the UVs for each channel
        float c = 0.2 * fluidTexture.r;

        vec4 cr = texture2D(inputBuffer, (uv + c));
        vec4 cga = texture2D(inputBuffer, (uv));
        vec4 cb = texture2D(inputBuffer, (uv - c));
        vec4 rgbaShiftTexture = vec4(cga.r, cr.g, cb.b, cga.a);

        // Apply the offsets to the inputColor's rgb
        outputColor = rgbaShiftTexture;
    }
`;

export class ChromaticAberrationEffect extends Effect {
  constructor({ fluidTexture }: ChromaticAberrationEffectProps = {}) {
    const uniforms = new Map<string, Uniform>([
      ["uFluidTexture", new Uniform(fluidTexture)],
    ]);

    super("ASCIIEffect", fragment, { uniforms });
  }
}
