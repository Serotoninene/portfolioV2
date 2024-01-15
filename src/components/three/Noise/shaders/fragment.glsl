precision mediump float;

uniform sampler2D uTouchTexture;
uniform float uTime;

varying vec2 vUv;

float random (vec2 st) {
  return fract(sin(dot(st.xy,
    vec2(12.9898,78.233)))*
    43758.5453123);
}

void main() {
    vec2 st = gl_FragCoord.xy/vUv;
    float mouse = texture2D(uTouchTexture, vUv).r;

    float rnd = random( st * uTime );
    rnd = rnd + (1. - mouse) * 1.;

    gl_FragColor = vec4(vec3(rnd),0.1);
}
