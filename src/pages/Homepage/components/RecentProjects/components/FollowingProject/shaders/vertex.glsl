  #pragma glslify: getResponsiveUV = require(../../../../../../../components/three/utils/getResponsiveUV);

  uniform float uProgress;
  uniform vec2 uTextureSize;
  uniform vec2 uQuadSize;
  uniform float uWaveFrequency;
  uniform float uWaveIntensity;
  uniform float uTime;
  uniform float uMixFactor;

  varying vec2 vUv;

  // Source: https://github.com/dmnsgn/glsl-rotate/blob/main/rotation-3d-y.glsl.js
  mat3 rotation3dY(float angle) {
    float s = sin(angle);
    float c = cos(angle);
    return mat3(
      c, 0.0, -s,
      0.0, 1.0, 0.0,
      s, 0.0, c
    );
  }

 void main() {
    vUv = getResponsiveUV(uv, uTextureSize, uQuadSize);
    vec3 newPosition = position;
    newPosition.z += (sin(-position.y * -uTime)) * uProgress * 1.;

    vec4 modelPosition = modelMatrix * vec4(newPosition, 1.0);  
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;

    


    gl_Position = projectedPosition;   
}