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

    float maxDistance = 0.5 * uQuadSize.x;
    float distanceFactor = clamp( distance(position, vec3(0.0)) / maxDistance, 0.0, 1.0);

    vec3 wavyPosition = position;

    // Smoothly transition the wave effect based on uMixFactor
    float wave = sin(vUv.x * uWaveFrequency + uTime * 2.0) * uWaveIntensity;
    wavyPosition.z += wave;

    vec3 rotatyPosition = position;
    // Calculate the rotation angle based on uMixFactor
    float rotationAngle = uMixFactor * 2.0 * 3.14159;  // 2π radians for a full rotation

    rotationAngle *= distanceFactor;
    rotatyPosition *= rotation3dY(rotationAngle);

    vec3 newPosition = mix(wavyPosition, rotatyPosition, uMixFactor);

    vec4 modelPosition = modelMatrix * vec4(wavyPosition, 1.0);  
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;

    gl_Position = projectedPosition;   
}