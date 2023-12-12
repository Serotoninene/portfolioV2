#pragma glslify: curlNoise = require("../../utils/curl-noise.glsl")

varying vec2 vUv;
// void main() {
//   vec3 pos = texture2D(positions, vUv).rgb;
//   vec3 curlPos = texture2D(positions, vUv).rgb;

//   pos = curlNoise(pos * uFrequency + uTime * 0.1);
//   curlPos = curlNoise(curlPos * uFrequency + uTime * 0.1);
//   curlPos += curlNoise(curlPos * uFrequency * 2.0) * 0.5;

//   gl_FragColor = vec4(mix(pos, curlPos, sin(uTime)), 1.0);
// }

uniform sampler2D positions;
uniform float uTime;
uniform float uFrequency;

float RADIUS = 0.5;
float SPEED = 0.1;

void main() {
  vec3 pos = texture2D(positions, vUv).rgb;
  vec3 curlPos = texture2D(positions, vUv).rgb;
  pos = curlNoise(curlPos * uFrequency + uTime * SPEED) * RADIUS;
  pos += curlNoise(pos) * RADIUS * SPEED;

  curlPos = curlNoise(curlPos * uFrequency + uTime * SPEED) * RADIUS;
  curlPos += curlNoise(curlPos) * RADIUS; // Add some noise to curlPos
  curlPos += curlNoise(curlPos * uFrequency * 2.0) * 0.5;

  gl_FragColor = vec4(mix(pos, curlPos, cos(uTime)), 1.0);
}