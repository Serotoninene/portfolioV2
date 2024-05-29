#pragma glslify: getResponsiveUV = require(../../../../../components/three/utils/getResponsiveUV);

uniform vec2 uTextureSize;
uniform vec2 uQuadSize;
uniform float uSpeed;
uniform float uIntensity;
uniform float uDelta;


varying vec2 vUv;

void main() {
  vUv = getResponsiveUV(uv, uTextureSize, uQuadSize);

  vec4 modelPosition = modelMatrix * vec4(position, 1.0);  
  modelPosition.z += (sin(-modelPosition.y * -uDelta)) * uIntensity * uSpeed;

  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectedPosition = projectionMatrix * viewPosition;

  gl_Position = projectedPosition;   
}
