#pragma glslify: getResponsiveUV = require(../../../../../../../components/three/utils/getResponsiveUV);

uniform float uProgress;
uniform vec2 uTextureSize;
uniform vec2 uQuadSize;
uniform float uWaveFrequency;
uniform float uWaveIntensity;
uniform float uTime;
uniform float uMixFactor;

varying vec2 vUv;

mat4 rotationMatrix(vec3 axis, float angle) {
  axis = normalize(axis);
  float s = sin(angle);
  float c = cos(angle);
  float oc = 1.0 - c;
  
  return mat4(oc * axis.x * axis.x + c,           oc * axis.x * axis.y - axis.z * s,  oc * axis.z * axis.x + axis.y * s,  0.0,
              oc * axis.x * axis.y + axis.z * s,  oc * axis.y * axis.y + c,           oc * axis.y * axis.z - axis.x * s,  0.0,
              oc * axis.z * axis.x - axis.y * s,  oc * axis.y * axis.z + axis.x * s,  oc * axis.z * axis.z + c,           0.0,
              0.0,                                0.0,                                0.0,                                1.0);
}

vec3 rotate(vec3 v, vec3 axis, float angle) {
  mat4 m = rotationMatrix(axis, angle);
  return (m * vec4(v, 1.0)).xyz;
}

void main() {
  vUv = getResponsiveUV(uv, uTextureSize, uQuadSize);

  float rad = 0.05;
  float rolls = 64.;
  float pi = 3.14159265359;
  float angle = 0.3;

  float finalAngle = angle - 0.*0.3*sin(uProgress*6.);
  
  vec3 newposition = position;
  float offs = (newposition.x + 0.5)/(sin(finalAngle) + cos(finalAngle)) ; // -0.5..0.5 -> 0..1
  float tProgress = clamp((uProgress - offs*0.99)/0.01 , 0.,1.);
  newposition.z =  rad + rad*(1. - offs/2.)*sin(-offs*rolls*pi - 0.5*pi);
  newposition.x =  - 0.5 + rad*(1. - offs/2.)*cos(-offs*rolls*pi + 0.5*pi);

  newposition = rotate(newposition - vec3(-.5,.5,0.), vec3(0.,0.,1.),finalAngle) + vec3(-.5,.5,0.);
  newposition = rotate(newposition - vec3(-.5,0.5,rad), vec3(sin(finalAngle),cos(finalAngle),0.), -pi*uProgress*rolls);

  newposition +=  vec3(
    -.5 + uProgress*cos(finalAngle)*(sin(finalAngle) + cos(finalAngle)), 
    0.5 - uProgress*sin(finalAngle)*(sin(finalAngle) + cos(finalAngle)),
    rad*(1.-uProgress/2.)
  );


  vec3 finalPosition = mix(newposition, position, tProgress);

  vec4 modelPosition = modelMatrix * vec4(finalPosition, 1.0);  
  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectedPosition = projectionMatrix * viewPosition;

  gl_Position = projectedPosition;   
}