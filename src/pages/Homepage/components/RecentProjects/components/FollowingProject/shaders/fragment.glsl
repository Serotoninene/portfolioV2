varying vec2 vUv;

uniform sampler2D uTexture;
uniform sampler2D uTexture2;
uniform sampler2D uDisplacement;
uniform float uIntensity;

uniform float uMixFactor;

void main() {
  // float x = uMixFactor;
  // x = smoothstep(.0,1.0,(x*2.0+vUv.x-1.0));

  // vec4 color = texture2D(uTexture, (vUv - .5)*(1.-x)+.5);
  // vec4 color2 = texture2D(uTexture2, (vUv - .5)*x+.5);

  // vec4 mixedColor = mix(color, color2, x);

  vec4 d1 = texture2D(uTexture, vUv);
  vec4 d2 = texture2D(uTexture2, vUv);

  float displace1 = (d1.r + d1.g + d1.b)*0.33;
  float displace2 = (d2.r + d2.g + d2.b)*0.33;
  
  vec4 t1 = texture2D(uTexture, vec2(vUv.x, vUv.y + uMixFactor * (displace2 * uIntensity)));
  vec4 t2 = texture2D(uTexture2, vec2(vUv.x, vUv.y + (1.0 - uMixFactor) * (displace1 * uIntensity)));

  gl_FragColor = mix(t1, t2, uMixFactor);

  // gl_FragColor = mixedColor;
}