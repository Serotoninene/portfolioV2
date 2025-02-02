import { Effect } from "postprocessing";
import gsap, { Power3 } from "gsap";

import {
  CanvasTexture,
  Color,
  NearestFilter,
  RepeatWrapping,
  Texture,
  Uniform,
} from "three";

interface IASCIIEffectProps {
  characters?: string; // The ASCII characters to use in brightness order dark -> light
  fontSize?: number; // Font Size of the characters drawn to the texture
  cellSize?: number; // Size of each cell in the grid
  color?: string; // Color of the characters
  invert?: boolean; // Flag which inverts the effect
  fluidTexture?: Texture | null;
}

const fragment = `
uniform sampler2D uCharacters;
uniform sampler2D uFluidTexture;
uniform float uCharactersCount;
uniform float uCellSize;
uniform bool uInvert;
uniform vec3 uColor;
uniform float uIntroOffsetX;
uniform float uIntroOffsetY;
uniform float uIsIntroOver;


vec3 greyscale(vec3 color, float strength) {
    float g = dot(color, vec3(0.299, 0.587, 0.114));
    return mix(color, vec3(g), strength);
}

vec3 greyscale(vec3 color) {
    return greyscale(color, 1.0);
}

void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) {
     vec2 SIZE = vec2(uCharactersCount);

    vec2 cell = resolution / uCellSize;
    vec2 grid = 1.0 / cell;
    vec2 pixelizedUV = grid * (0.5 + floor(uv / grid));
    vec4 normalTexture = texture2D(inputBuffer, vUv);
    normalTexture.rgb = greyscale(normalTexture.rgb);
    vec4 pixelized = texture2D(inputBuffer, pixelizedUV);
    float greyscaled = greyscale(pixelized.rgb).r;

    float fluidTexture = texture2D(uFluidTexture, vUv).r * 2.;

    if (uInvert) {
        greyscaled = 1.0 - greyscaled;
    }

    float characterIndex = floor((uCharactersCount - 1.0) * greyscaled);
    vec2 characterPosition = vec2(mod(characterIndex, SIZE.x), 0);
    vec2 offset = vec2(characterPosition.x + uIntroOffsetX, -characterPosition.y + uIntroOffsetY) / SIZE;
    vec2 charUV = mod(uv * (cell / SIZE), 1.0 / SIZE) - vec2(0., 1.0 / SIZE) + offset;
    vec4 asciiCharacter = texture2D(uCharacters, charUV += fluidTexture);

    asciiCharacter.rgb = uColor * asciiCharacter.r;
    asciiCharacter.a = step(0.1, asciiCharacter.a);
    outputColor = mix(asciiCharacter, normalTexture,  fluidTexture);
}
`;

export class ASCIIPost extends Effect {
  constructor({
    characters = ` .:,'-^=*+?!|0#X%WM@`,
    fontSize = 54,
    cellSize = 16,
    color = "#ffffff",
    invert = false,
    fluidTexture,
  }: IASCIIEffectProps = {}) {
    const uniforms = new Map<string, Uniform>([
      ["uCharacters", new Uniform(new Texture())],
      ["uCellSize", new Uniform(cellSize)],
      ["uCharactersCount", new Uniform(characters.length + 1)],
      ["uColor", new Uniform(new Color(color))],
      ["uInvert", new Uniform(invert)],
      ["uFluidTexture", new Uniform(fluidTexture)],
      ["uIntroOffsetX", new Uniform(characters.length / 2)],
      ["uIntroOffsetY", new Uniform(-2)],
      ["uIsIntroOver", new Uniform(0)],
    ]);

    super("ASCIIEffect", fragment, { uniforms });

    const charactersTextureUniform = this.uniforms.get("uCharacters");

    if (charactersTextureUniform) {
      charactersTextureUniform.value = this.createCharactersTexture(
        characters,
        fontSize,
        cellSize
      );
    }

    this.introAnim(characters.length);
  }

  private introAnim(length: number): void {
    const uIntroOffsetX = this.uniforms.get("uIntroOffsetX");
    const uIntroOffsetY = this.uniforms.get("uIntroOffsetY");
    const uIsIntroOver = this.uniforms.get("uIsIntroOver");

    if (!uIntroOffsetX || !uIntroOffsetY || !uIsIntroOver) return;
    const tl = gsap.timeline({
      defaults: {
        ease: Power3.easeOut,
      },
    });
    tl.to(uIntroOffsetY, {
      value: 0,
      duration: 1,
      ease: Power3.easeInOut,
      delay: 1,
    });

    tl.to(
      uIntroOffsetX,
      {
        value: 0,
        duration: 1,
      },
      "+=0.5"
    );
    tl.to(uIsIntroOver, {
      value: 1,
    });
  }

  /** Draws the characters on a Canvas and returns a texture */
  private createCharactersTexture(
    characters: string,
    fontSize: number,
    cellSize: number
  ): Texture {
    const canvas = document.createElement("canvas");
    canvas.style.position = "fixed";
    canvas.style.top = "0";
    canvas.style.width = "100vw";

    const SIZE = 1024;
    const MAX_PER_ROW = characters.length;
    const CELL = SIZE / MAX_PER_ROW;

    canvas.width = canvas.height = SIZE;

    const texture = new CanvasTexture(
      canvas,
      undefined,
      RepeatWrapping,
      RepeatWrapping,
      NearestFilter,
      NearestFilter
    );

    const context = canvas.getContext("2d", { alpha: true }); // Enable alpha channel

    if (!context) {
      throw new Error("Context not available");
    }

    context.clearRect(0, 0, SIZE, SIZE);
    context.font = `${fontSize}px IBM Plex Mono`;
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.fillStyle = "#fff";

    for (let i = 0; i < characters.length; i++) {
      const char = characters[i];
      const x = i % MAX_PER_ROW;
      const y = Math.floor(i / MAX_PER_ROW);

      context.fillText(char, x * CELL + CELL / 2, y * CELL + CELL / 2);
    }

    texture.needsUpdate = true;

    return texture;
  }
}
