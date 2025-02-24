varying vec2 vUv;
uniform sampler2D uTexture;
uniform float uOffset;

void main(){
  vec2 offsetedUvs = vec2(vUv.x, vUv.y + uOffset);

  vec4 texture = texture2D(uTexture, offsetedUvs);
  texture.a -= uOffset;
  
  gl_FragColor = texture;
}