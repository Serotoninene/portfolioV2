#pragma glslify: snoise = require(glsl-noise/simplex/3d)
#pragma glslify: snoise4 = require(glsl-noise/simplex/4d)

varying vec2 vUv;

uniform float uTime;
uniform sampler2D uDisp;
uniform sampler2D uTouchTexture;
uniform vec2 uDispSize;

uniform vec2 uQuadSize;

const float PI = 3.1415;

vec3 deformationCurve(vec3 position, vec2 uv, vec2 offset){
  position.x = position.x + (sin(uv.y * PI) * offset.x);
  position.y = position.y + (sin(uv.x * PI) * offset.y);
  return position;
}

float circle(vec2 uv, vec2 disc_center, float disc_radius, float border_size) {
  float dist = distance(uv, disc_center);
  return step(disc_radius, dist);
}

void main() {
  vUv = uv;
  vec3 pos = position;
  float disp = texture2D(uDisp, uv).r;
  float mouse = texture2D(uTouchTexture, vUv).r;
  vec4 modelPosition = modelMatrix * vec4(pos, 1.0);
  modelPosition.z += 100. * disp;
  modelPosition.z += 50. * mouse;



  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectedPosition = projectionMatrix * viewPosition;

  gl_Position = projectedPosition;
}