uniform sampler2D uTexture1;
uniform sampler2D uTexture2;

uniform float uRefractionStrength;
uniform float uCenterScale;

varying vec2 vUv;

void main() {
  vec2 centeredUv = vUv - 0.5;
  centeredUv *= uCenterScale;
   
  float dist = length(centeredUv);

  // Edge refraction intensity
  float refractionStrength = uRefractionStrength;
  vec2 offset = normalize(centeredUv) * pow(dist, 2.0) * refractionStrength;

  // Apply the offset for a fake refraction effect
  vec2 refractedUv = vUv + offset;
  vec4 color = texture2D(uTexture1, refractedUv);

  gl_FragColor = color;
}