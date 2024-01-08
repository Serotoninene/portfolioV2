#pragma glslify: snoise = require(glsl-noise/simplex/3d)
#pragma glslify: snoise4 = require(glsl-noise/simplex/4d)

varying vec2 vUv;

uniform float uTime;
uniform sampler2D uDisp;
uniform sampler2D uTouchTexture;
uniform vec2 uDispSize;
uniform vec2 uQuadSize;
uniform float uDispY;
uniform float uDispZ;

vec2 getResponsiveUV(vec2 uv, vec2 textureSize, vec2 quadSize){
  vec2 tempUV = uv - vec2(0.5);

  float quadAspect = quadSize.x / quadSize.y;
  float textureAspect = textureSize.x / textureSize.y;

  if(quadAspect < textureAspect){
    tempUV *= vec2(quadAspect / textureAspect, 1.);
  }else{
    tempUV*= vec2(1., textureAspect / quadAspect);
  }

  tempUV += vec2(0.5);
  return tempUV;
}


void main() {


  vUv = getResponsiveUV(uv,uDispSize, uQuadSize);
  vec3 pos = position;
  float disp = texture2D(uDisp, uv).r;
  float mouse = texture2D(uTouchTexture, vUv).r;
  vec4 modelPosition = modelMatrix * vec4(pos, 1.0);
  modelPosition.y += 10. * disp;
  modelPosition.y += uDispY * mouse ;

  float wave = sin(vUv.x * 10. + uTime * 2.) * 4.;

  modelPosition.y += wave;



  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectedPosition = projectionMatrix * viewPosition;

  gl_Position = projectedPosition;
}