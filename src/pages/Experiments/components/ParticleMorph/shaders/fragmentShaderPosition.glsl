uniform float uTime;
uniform float uDelta;

varying vec2 vUv;

void main() {
  vec2 uv = gl_FragCoord.xy / resolution.xy;
  // Get current position and velocity
  vec3 pos = texture2D(uTexturePosition, uv).rgb;
  vec3 vel = texture2D(uTextureVelocity, uv).rgb;
  
  // Update position (basic integration)
  pos += vel * uDelta;
  
  // Output new position
  gl_FragColor = vec4(pos, 1.0);
}
