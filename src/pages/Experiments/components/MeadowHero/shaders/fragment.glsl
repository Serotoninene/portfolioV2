uniform sampler2D uTexture;
varying vec2 vUv;

void main(){
  vec4 texColor = texture2D(uTexture, vUv);
  gl_FragColor = vec4(texColor.rgb, 1.0);
}