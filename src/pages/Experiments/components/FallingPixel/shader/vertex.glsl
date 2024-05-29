uniform float uTime;
uniform float uSpeed;
uniform float uEdge;
uniform float uRadius;
uniform float uRand1;
uniform float uRand2;
uniform float uRand3;
uniform float uRand4;

uniform float uOffset;

varying vec2 vUv;
varying float vZ;

float rand (vec2 st) {
  return fract(
    sin(dot(st.xy,
    vec2(12.9898,78.233))) * 43758.5453123
  );
}


vec3 applyFallingAnimation(vec2 uCenter) {
  vec3 particlePosition = position;
  particlePosition.xy -= uCenter;

  float distanceFromCenter = length(particlePosition);
  float centerProximity = (1. - distanceFromCenter);

  // Use smoothstep to create a smooth transition at the edge of the radius
  float radius = uRadius + uTime * 0.01 * uSpeed;
  float edge = uEdge;
  float smoothCenterProximity = smoothstep(radius, radius - edge, distanceFromCenter);

  particlePosition.z += sin(log(uTime * smoothCenterProximity * uSpeed + 1.0));
  particlePosition.y -= log(uTime * smoothCenterProximity * uSpeed + 1.0);

  return particlePosition;
}

void main() {
  vUv = uv;
  vZ = position.z;
  vec3 particlePosition1 = applyFallingAnimation(vec2(uRand1));
  vec3 particlePosition2 = applyFallingAnimation(vec2(uRand2));
  vec3 particlePosition3 = applyFallingAnimation(vec2(uRand3));
  vec3 particlePosition4 = applyFallingAnimation(vec2(uRand4));

  // Average the positions
  // vec3 particlePosition = (particlePosition1 + particlePosition2 + particlePosition3 + particlePosition4);
  // particlePosition.xy += 1.0;

  // from the center
  vec3 particlePosition = applyFallingAnimation(vec2(0.0));
  


  vec4 modelPosition = modelMatrix * vec4(particlePosition, 1.0);
  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectedPosition = projectionMatrix * viewPosition;

  gl_Position = projectedPosition;
  gl_PointSize = 10.0;
}