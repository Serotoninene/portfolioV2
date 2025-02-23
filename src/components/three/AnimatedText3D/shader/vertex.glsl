varying vec2 vUv;
varying vec3 vPosition;
uniform float uCharCount;

uniform float uClipProgress;
uniform float uFontSize;
void main() {
  vUv = uv;

    // Calculate which character this vertex belongs to
    float charIndex = floor(vUv.x * uCharCount);
    float normalizedCharIndex = charIndex / (uCharCount - 1.0);
    float staggerIntensity = 0.8;

    float staggerDelay = normalizedCharIndex * staggerIntensity; // Adjust delay factor as needed
    float remappedProgress = (uClipProgress - staggerDelay) / (1.0 - staggerDelay);
    remappedProgress = clamp(remappedProgress, 0., 1.);
    
    vec3 newPosition = position;

    // Apply staggered movement
    newPosition.y -= (uFontSize * 1.5 - remappedProgress * uFontSize * 1.5 );
    vPosition = newPosition;
    
    vec4 worldPosition = modelViewMatrix * vec4(newPosition, 1.0);
    gl_Position = projectionMatrix * worldPosition;
}