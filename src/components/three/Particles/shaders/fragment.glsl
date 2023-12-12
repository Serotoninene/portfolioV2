void main() {
  vec3 color = vec3(0.34, 0.53, 0.96);
  // Create a strength variable that's bigger the closer to the center of the particle the pixel is
  float strength = distance(gl_PointCoord, vec2(0.5));
  strength = 1.0 - strength;
  // Make it decrease in strength *faster* the further from the center by using a power of 3
  strength = pow(strength, 3.0);

  // Ensure the color is only visible close to the center of the particle
  color = mix(vec3(0.0), color, strength);
  gl_FragColor = vec4(color, strength);
}