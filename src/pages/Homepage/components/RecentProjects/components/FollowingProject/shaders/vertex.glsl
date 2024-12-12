// Utility import for responsive UV calculation
#pragma glslify: getResponsiveUV = require(../../../../../../../components/three/utils/getResponsiveUV);

// Shader uniform inputs for controlling the unfolding effect
uniform float uProgress;     // Animation progress (0-1)
uniform vec2 uTextureSize;   // Texture dimensions
uniform vec2 uQuadSize;      // Mesh quad size
uniform float uRadius;       // Curvature radius
uniform float uRolls;        // Number of rotation rolls

// Pass UV coordinates to fragment shader
varying vec2 vUv;

// Create a 4x4 rotation matrix for 3D transformations
mat4 rotationMatrix(vec3 axis, float angle) {
  // Normalize the rotation axis
  axis = normalize(axis);
  float s = sin(angle);
  float c = cos(angle);
  float oc = 1.0 - c;
  
  // Construct rotation matrix using Rodrigues' rotation formula
  return mat4(
    oc * axis.x * axis.x + c,           oc * axis.x * axis.y - axis.z * s,  oc * axis.z * axis.x + axis.y * s,  0.0,
    oc * axis.x * axis.y + axis.z * s,  oc * axis.y * axis.y + c,           oc * axis.y * axis.z - axis.x * s,  0.0,
    oc * axis.z * axis.x - axis.y * s,  oc * axis.y * axis.z + axis.x * s,  oc * axis.z * axis.z + c,           0.0,
    0.0,                                0.0,                                0.0,                                1.0
  );
}

// Rotate a vector around a specific axis by a given angle
vec3 rotate(vec3 v, vec3 axis, float angle) {
  mat4 m = rotationMatrix(axis, angle);
  return (m * vec4(v, 1.0)).xyz;
}

void main() {
  // Calculate responsive UV coordinates
  vUv = getResponsiveUV(uv, uTextureSize, uQuadSize);

  // Define PI constant for precise trigonometric calculations
  float PI = 3.14159265359;
  
  // Start with original vertex position
  vec3 newPosition = position;

  // Calculate progress offset based on x position
  // Normalizes x position to 0-1 range to create a sequential unfolding effect
  float progressOffset = (newPosition.x + 0.5);
  
  // Create a local progress for each vertex with a slight delay
  // Ensures each vertex unfolds at a slightly different time
  float localProgress = clamp((uProgress - progressOffset * 0.9) / 0.1, 0.0, 1.0);

  // Define rotation axis (x-axis for horizontal unfolding)
  vec3 rotationAxis = vec3(1.0, 0.0, 0.0);
  
  // Calculate rotation angle based on progress and number of rolls
  float unfoldAngle = -PI * localProgress * uRolls;

  // Apply rotation:
  // 1. Translate vertex to rotation pivot point
  // 2. Rotate around the axis
  // 3. Translate back
  newPosition = rotate(
    newPosition - vec3(-0.5, 0.5, 0.0), 
    rotationAxis, 
    unfoldAngle
  ) + vec3(-0.5, 0.5, 0.0);

  // Add subtle wave/curl effect to z-coordinate
  // Creates a more organic, less rigid unfolding motion
  newPosition.z += uRadius * sin(localProgress * PI * uRolls);

  // Interpolate between original and transformed position
  // Allows smooth transition and potential reversal of animation
  vec3 finalPosition = mix(newPosition, position, uProgress);

  // Standard MVP (Model-View-Projection) matrix transformation
  vec4 modelPosition = modelMatrix * vec4(finalPosition, 1.0);  
  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectedPosition = projectionMatrix * viewPosition;

  // Set the final vertex position
  gl_Position = projectedPosition;   
}