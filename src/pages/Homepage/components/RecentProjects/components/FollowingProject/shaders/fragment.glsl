varying vec2 vUv;

uniform sampler2D uTexture;
uniform sampler2D uTexture2;
uniform float uMixFactor;

void main() {
  vec4 color = texture2D(uTexture, vUv);
  vec4 color2 = texture2D(uTexture2, vUv);

  vec4 mixedColor = mix(color, color2, uMixFactor);

  gl_FragColor = mixedColor;
}