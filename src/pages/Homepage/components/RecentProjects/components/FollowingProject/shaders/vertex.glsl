  #pragma glslify: getResponsiveUV = require(../../../../../../../components/three/utils/getResponsiveUV)

  uniform vec2 uTextureSize;
  uniform vec2 uQuadSize;

  varying vec2 vUv;

  void main() {
    vUv = getResponsiveUV(uv, uTextureSize, uQuadSize);
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);  
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;

    gl_Position = projectedPosition;   
  }