  #pragma glslify: getResponsiveUV = require(../../../../../../../components/three/utils/getResponsiveUV);
  #pragma glslify: rotation2D = require(../../../../../../../components/three/utils/rotate);
  
  uniform vec2 uTextureSize;
  uniform vec2 uQuadSize;

  varying vec2 vUv;

  void main() {
    vUv = getResponsiveUV(uv, uTextureSize, uQuadSize);
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);  
    // use rotate function to rotate the quad
    modelPosition.xy = (rotation2D(-3.0) * vec3(modelPosition.xy, 1.0)).xy;
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;

    gl_Position = projectedPosition;   
  }