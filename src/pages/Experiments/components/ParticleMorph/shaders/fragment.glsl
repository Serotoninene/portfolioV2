varying vec2 vRef;
varying vec3 vPos;

void main(){
  float heightColor = vPos.x * 20.;

  gl_FragColor = vec4(0. ,0.  , 1.0 , 1.);
}