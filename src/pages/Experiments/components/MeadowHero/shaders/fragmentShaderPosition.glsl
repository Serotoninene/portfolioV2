uniform float uTime;
uniform float uDelta;

uniform float uIntroProgress;

varying vec2 vUv;

void main() {
  vec2 uv = gl_FragCoord.xy / resolution.xy;

  // Get current position and velocity
  vec3 targetPosition = texture2D(uTexturePosition, uv).rgb;

  // Velocity influence
  vec3 vel = texture2D(uTextureVelocity, uv).rgb;
  vel *= step(0.7, uIntroProgress);


  // Update position (basic integration)
  targetPosition += vel * uDelta;

  // Output new position
  gl_FragColor = vec4(targetPosition, 1.0);
}

