varying vec2 vUv;
varying vec3 vPosition;
uniform float uCharCount;

uniform float uClipProgress;
uniform float uFontSize;
void main() {
  vUv = uv;
  
  // Calculate which character this vertex belongs to
  float charIndex = floor(vUv.x * uCharCount);
  
  // Calculate staggered progress for this character
  float charDelay = charIndex * 0.2;
  float charProgress = clamp((uClipProgress - charDelay) / (1. - charDelay), 0.0, 1.0);
  
  vec3 newPosition = position;
  vec3 spherePos = normalize(newPosition) * 6.14;

  // Apply staggered movement
  newPosition.y -= (1. - charProgress) * uFontSize * 1.2;
  vPosition = newPosition;
  
  vec4 worldPosition = modelViewMatrix * vec4(newPosition, 1.0);
  gl_Position = projectionMatrix * worldPosition;
}