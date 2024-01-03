  #pragma glslify: getResponsiveUV = require(../../../../../../../components/three/utils/getResponsiveUV);

  
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

    float distanceFactor = pow(2. - distance(position, vec3(0.0)), 2.0);

    // waves
    // vec3 newPosition = rotation3dY(uTime * 0.3 * distanceFactor) * position;
    vec3 newPosition = position;
    newPosition.z += sin(vUv.x * uWaveFrequency + uTime * 2.0) * uWaveIntensity;

    // when mixFactor goes from 0 to 1, the quad will rotate 360 degrees
    float angle = mix(0.0, 2.0 * 3.14159265359, uMixFactor);
    newPosition = rotation3dY(angle) * newPosition;

    // when mixFactor goes from 0 to 1, the quad will rotate 90 degrees
    // float angle = mix(0.0, 1.57079632679, mixFactor);
    // newPosition.z = newPosition * rotation3dZ(angle).Z;

    vec4 modelPosition = modelMatrix * vec4(newPosition, 1.0);  
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;

    gl_Position = projectedPosition;   
  }