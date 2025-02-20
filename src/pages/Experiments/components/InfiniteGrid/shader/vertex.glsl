#pragma glslify: getResponsiveUV = require(../../../../../components/three/utils/getResponsiveUV);

uniform vec2 uTextureSize;
uniform vec2 uQuadSize;
uniform float uSpeed;
uniform float uIntensity;
uniform float uMomentum;


varying vec2 vUv;

float PI = 3.14;

void main() {
  vUv = getResponsiveUV(uv, uTextureSize, uQuadSize);

  vec4 modelPosition = modelMatrix * vec4(position, 1.0);  
 // Center the bend effect
  float normalizedY = (modelPosition.y / uQuadSize.y) * 2.0 - 1.0;
  
  // Create a smoother curve with controlled frequency
  float bendFactor = sin(normalizedY * PI * 0.5);
  
  // Apply dampened movement
  float movement = uMomentum * uSpeed * 0.1; // Reduce speed
  
  // Smooth out the intensity
  float smoothIntensity = uIntensity * 0.5; // Reduce intensity
  
  // Apply the final bend
  modelPosition.z += bendFactor * movement * smoothIntensity;

  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectedPosition = projectionMatrix * viewPosition;

  gl_Position = projectedPosition;   
}
