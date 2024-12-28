varying vec2 vUv;

uniform sampler2D uTexture;
uniform sampler2D uTexture2;

uniform float uProgress;
uniform float uIntensity;
uniform float uMixFactor;
uniform float uResolution;
uniform sampler2D uMouse;


// #define HASHSCALE3 vec3(.1031, .1030, .0973)
float hash12(vec2 p) {
  float h = dot(p,vec2(127.1,311.7));	
  return fract(sin(h)*43758.5453123);
}


float circle(vec2 uv, vec2 disc_center, float disc_radius, float border_size) {
  uv -= disc_center;
  uv*=uResolution;
  float dist = sqrt(dot(uv, uv));
  return smoothstep(disc_radius+border_size, disc_radius-border_size, dist);
}

float uVelo = 1.;

void main() {
  vec4 d1 = texture2D(uTexture, vUv);
  vec4 d2 = texture2D(uTexture2, vUv);

  float displace1 = (d1.r + d1.g + d1.b)*0.33;
  float displace2 = (d2.r + d2.g + d2.b)*0.33;

  vec2 touch = texture2D(uMouse, vUv).rg;

  float hash = hash12(vUv * 0.00000000001);
  // float c = circle(vUv, uMouse, 0.0, 0.1+1.*0.01)*10.*1.;
  vec2 offsetVector = normalize(touch - vUv);
  vec2 warpedUV = vUv + vec2(hash - 0.5) * touch; //power

  vec4 t1 = texture2D(uTexture, vec2(warpedUV.x, warpedUV.y + uMixFactor * (displace2 * uIntensity)));


  vec4 t2 = texture2D(uTexture2, vec2(vUv.x, vUv.y + (1.0 - uMixFactor) * (displace1 * uIntensity)));

  gl_FragColor = mix(t1, t2, uMixFactor);
  // gl_FragColor = vec4(0.,0., uProgress, 1.0);
}