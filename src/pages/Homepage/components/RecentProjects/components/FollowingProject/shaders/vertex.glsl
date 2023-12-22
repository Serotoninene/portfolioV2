  #pragma glslify: getResponsiveUV = require(../../../../../../../components/three/utils/getResponsiveUV)

  uniform vec2 uTextureSize;
  uniform vec2 uQuadSize;

  varying vec2 vUv;

  void main() {
    vUv = getResponsiveUV(uv, uTextureSize, uQuadSize);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }