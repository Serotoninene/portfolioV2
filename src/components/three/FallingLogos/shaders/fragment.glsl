

void main() {
  // Define three colors to be used in the shader
  vec3 color = vec3(1.0, 0.0, 0.0);
  // Set the final color of the fragment
  gl_FragColor = vec4(color, 1.0);
}