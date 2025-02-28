varying vec3 vPos;

uniform vec2 uMouse;

void main(){
  float INTENSITY = 1000.0;
  float THRESHOLD_LOW = 0.; // Start fading effect
  float THRESHOLD_HIGH = 1.; // Fully applied at this point
  float factor = smoothstep(THRESHOLD_LOW, THRESHOLD_HIGH, abs(vPos.x) * 1000.);
  float heightColor = factor * clamp(abs(vPos.x) , 0.0, 1.0);

  gl_FragColor = vec4(vec3(heightColor), 1.0);
}