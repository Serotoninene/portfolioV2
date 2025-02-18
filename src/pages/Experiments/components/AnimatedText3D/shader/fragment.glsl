uniform float uFontSize;
uniform float uClipProgress;
uniform vec3 uColor;

varying vec2 vUv;
varying vec3 vPosition;

void main() {
  // Create sharp clipping line
  float clip = step(vUv.y, uClipProgress);
  if (vPosition.y < - uFontSize / 2.) discard;
  
  gl_FragColor = vec4(uColor, 1.);
}
