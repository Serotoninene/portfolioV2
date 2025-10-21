varying vec3 vPos;
varying vec2 vRef;

uniform sampler2D uPositions;
uniform sampler2D uDensityTexture;

uniform vec2 uMouse;

void main(){

  float density = texture2D(uDensityTexture, vRef).x;


  vec3 white = vec3(0.0);
  vec3 lightGrey = vec3(0.0);
  vec3 darkGrey = vec3(0.);

  vec3 color = mix(darkGrey, lightGrey, step(0.5, density));
  color = mix(color, white, step(0.8, density));

  gl_FragColor = vec4(color, 1.0);
}