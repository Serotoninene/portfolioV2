import { Effect } from "postprocessing";
import { Uniform } from "three";

interface ChromaticAberrationEffectProps {
  fluidTexture?: THREE.Texture | null;
  strength?: number;
}

const fragment = `
    uniform sampler2D uFluidTexture;
    uniform float uStrength;

    void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) {
        mediump vec2 fluidTexture = texture2D(uFluidTexture, uv).rg;

        // Offset the UVs for each channel
        mediump vec2 offset = vec2(uStrength * fluidTexture.r);

          // Early exit if effect is negligible
        if (length(offset) < 0.001) {
            outputColor = inputColor;
            return;
        }


        // Red: up-left (-x, +y)
        vec4 cr = texture2D(inputBuffer, uv + vec2(-offset.x, offset.y));
        
        // Green: down-right (+x, -y)
        vec4 cg = texture2D(inputBuffer, uv + vec2(offset.x, -offset.y));
        
        // Blue: down-left (-x, -y)
        vec4 cb = texture2D(inputBuffer, uv + vec2(-offset.x, -offset.y));

        // Apply the offsets to the inputColor's rgb
        outputColor = vec4(cr.r, cg.g, cb.b, 1.0);
    }
`;

export class ChromaticAberrationEffect extends Effect {
  constructor({
    fluidTexture,
    strength = 0.2,
  }: ChromaticAberrationEffectProps = {}) {
    const uniforms = new Map<string, Uniform>([
      ["uFluidTexture", new Uniform(fluidTexture)],
      ["uStrength", new Uniform(strength)],
    ]);

    super("ASCIIEffect", fragment, { uniforms });
  }
}
