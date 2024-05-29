uniform float uTime;
uniform float uSpeed;
uniform float uAmplitude;

void main (){
  vec3 transformed = position;
  transformed.y += sin(((uTime + position.x))  * uSpeed) * uAmplitude;
  // transformed.y += sin(((uTime + position.x))  * uSpeed * 0.7) * uAmplitude; // Add a third cycle


  vec4 modelPosition = modelMatrix * vec4(transformed, 1.0);
  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectedPosition = projectionMatrix * viewPosition;

  gl_Position = projectedPosition;
}