precision mediump float;

uniform sampler2D uDisp;
uniform sampler2D uTouchTexture;
uniform vec3 uColor;

varying vec2 vUv;

void main() {
  // Get the fragment coordinates
  vec2 fragCoord = gl_FragCoord.xy;
  // Calculate the coordinates of the line
  vec2 lineCoord = mod(fragCoord, vec2(10., 20.));
  // Get the color of the fragment
  vec3 color = texture2D(uDisp, vUv).rgb;
  vec3 touchColor = texture2D(uTouchTexture, vUv).rgb;
  // Determine if the fragment is part of the line
  float line = step(10. * 0.5 ,  color.g * 10.) ;
  // Set the color of the fragment based on whether it is part of the line or not
  gl_FragColor = vec4(uColor, 1.0);
}

