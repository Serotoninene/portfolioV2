precision mediump float;

uniform sampler2D uTexture;
uniform vec3 uColor;

varying vec2 vUv;
varying float vZ;

void main() {
  vec4 color = texture2D(uTexture, vUv);

  // Use the z-coordinate to influence the red channel
  float red = 0.2 * (1. + log(vZ));

  gl_FragColor = vec4(uColor, 1.0);
}