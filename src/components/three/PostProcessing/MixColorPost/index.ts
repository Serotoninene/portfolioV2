import { Effect } from "postprocessing";

import { Uniform } from "three";
import fragment from "./shader/fragment.glsl";
export class MixColorPost extends Effect {
  constructor() {
    const uniforms = new Map<string, Uniform>([
      ["uTime", new Uniform(0)],
      ["uMomentum", new Uniform(0)],
      ["uIntroProcess", new Uniform(0)],
    ]);

    super("MixColorPost", fragment, { uniforms });
  }

  public updateTime(t: number) {
    const timeUniform = this.uniforms.get("uTime");

    if (timeUniform) timeUniform.value = t;
  }

  public updateMomentum(newMomentum: number) {
    const momentumUniform = this.uniforms.get("uMomentum");
    if (momentumUniform) momentumUniform.value = newMomentum;
  }

  public updateintroProcess(newIntroP: number) {
    const introProcessUniform = this.uniforms.get("uIntroProcess");
    if (introProcessUniform) introProcessUniform.value = newIntroP;
  }
}
