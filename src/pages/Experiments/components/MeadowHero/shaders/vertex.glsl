uniform sampler2D uPositionTexture;
uniform float uTime;

attribute vec2 reference;

varying vec2 vRef;
varying vec3 vPos;

void main() {
  vRef = reference;

  vec3 pos = texture2D(uPositionTexture, reference).xyz;
  vPos = pos;

  vec4 modelPosition = modelMatrix * vec4(pos, 1.0);
  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectedPosition = projectionMatrix * viewPosition;

  gl_Position = projectedPosition;

  gl_PointSize = 5.;
}
