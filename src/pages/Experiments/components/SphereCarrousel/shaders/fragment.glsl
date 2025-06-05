uniform sampler2D uTexture1;
uniform sampler2D uTexture2;
uniform sampler2D uDispTexture;

uniform float uProgress;

uniform float uIntensity;
uniform float uRefractionStrength;
uniform float uCenterScale;

varying vec2 vUv;

const float PI = 3.1415;
const float angle1 = PI * 0.25;
const float angle2 = -PI * 0.75;

mat2 getRotM(float angle) {
    float s = sin(angle);
    float c = cos(angle);
    return mat2(c, -s, s, c);
}

void main() {
  vec2 tiledUv = vUv;

  float index = min(floor(tiledUv.x * 2.0), 1.0);
  tiledUv.x = mod(tiledUv.x * 2.0, 1.0);

  if (index == 1.0) {
    tiledUv.x = 1.0 - tiledUv.x;
  }

  // Refraction based on distance from center
  vec2 center = vec2(0.5);
  vec2 dir = tiledUv - center;
  float dist = length(dir);
  vec2 refractOffset = normalize(dir) * pow(dist, 2.0) * uRefractionStrength;

  tiledUv += refractOffset;

  // Transition between two textures
  vec4 disp = texture2D(uDispTexture, tiledUv);
  vec2 dispVec = vec2(disp.b, disp.g);

  vec2 distortedPos1 = tiledUv + getRotM(angle1) * dispVec * uIntensity * uProgress;
  vec4 tex1 = texture2D(uTexture1, distortedPos1);
  vec2 distortedPos2 = tiledUv + getRotM(angle2) * dispVec * uIntensity * (1.0 - uProgress);
  vec4 tex2 = texture2D(uTexture2, distortedPos2);

  // if (index == 0.0) {
  //   tiledUv += getRotM(angle1) * dispVec * uCenterScale;
  // } else {
  //   tiledUv += getRotM(angle2) * dispVec * uCenterScale;
  // }




  vec4 color = mix(tex1, tex2, uProgress);

  gl_FragColor = color;
}
