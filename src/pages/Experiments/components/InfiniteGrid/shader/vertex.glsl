#pragma glslify: getResponsiveUV = require(../../../../../components/three/utils/getResponsiveUV);

uniform vec2 uTextureSize;
uniform vec2 uQuadSize;
uniform float uSpeed;
uniform float uIntensity;
uniform float uMomentum;


varying vec2 vUv;

const float PI = 3.141592653589793;

void main() {
  vUv = getResponsiveUV(uv, uTextureSize, uQuadSize);

//   vec4 modelPosition = modelMatrix * vec4(position, 1.0);  
//  // Center the bend effect
//   float normalizedY = (modelPosition.y / uQuadSize.y) * 2.0 - 1.0;
  
//   // Create a smoother curve with controlled frequency
//   float bendFactor = sin(normalizedY * PI * 0.5);
  
//   // Apply dampened movement
//   float movement = uMomentum * uSpeed * 0.1; // Reduce speed
  
//   // Smooth out the intensity
//   float smoothIntensity = uIntensity * 0.5; // Reduce intensity
  
//   // Apply the final bend
//   modelPosition.z += bendFactor * movement * smoothIntensity;

 vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    
  // Calculate the radius of our "wheel"
  float wheelRadius = uQuadSize.y * 2.0;
  
  // Normalize position along Y axis
  float normalizedY = (modelPosition.y / uQuadSize.y);
  
  // Calculate angle based on momentum and position
  float angle = (normalizedY - 0.5) * abs(uMomentum) * uSpeed * 0.2;
  
  // Apply wheel transformation
  float wheelEffect = wheelRadius * (1.0 - cos(angle));
  modelPosition.z += wheelEffect * uIntensity * 0.5;
  
  // Optional: Add slight y-offset to create more natural wheel motion
  modelPosition.y += sin(angle) * uIntensity * wheelRadius * 0.1;

  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectedPosition = projectionMatrix * viewPosition;

  gl_Position = projectedPosition;   
}
