varying vec3 worldNormal;
varying vec3 eyeVector;

uniform float uTime;

float PI = 3.14159265359;


// NOISE
float mod289(float x){return x - floor(x * (1.0 / 289.0)) * 289.0;}
vec4 mod289(vec4 x){return x - floor(x * (1.0 / 289.0)) * 289.0;}
vec4 perm(vec4 x){return mod289(((x * 34.0) + 1.0) * x);}

float noise(vec3 p){
  vec3 a = floor(p);
  vec3 d = p - a;
  d = d * d * (3.0 - 2.0 * d);

  vec4 b = a.xxyy + vec4(0.0, 1.0, 0.0, 1.0);
  vec4 k1 = perm(b.xyxy);
  vec4 k2 = perm(k1.xyxy + b.zzww);

  vec4 c = k2 + a.zzzz;
  vec4 k3 = perm(c);
  vec4 k4 = perm(c + 1.0);

  vec4 o1 = fract(k3 * (1.0 / 41.0));
  vec4 o2 = fract(k4 * (1.0 / 41.0));

  vec4 o3 = o2 * d.z + o1 * (1.0 - d.z);
  vec2 o4 = o3.yw * d.x + o3.xz * (1.0 - d.x);

  return o4.y * d.y + o4.x * (1.0 - d.y);
}

float lines(vec2 uv, float offset){
  return smoothstep(
    0., 0.5 + offset * 0.5,
    abs(0.5 * sin(uv.x*30.) + offset * 2.)
  );
}

void main() {
  // Original displaced position
  // float n = noise(position + uTime * 0.5);
  // vec3 displacedPosition = position * n;
  // float linePosition = lines(position.xy, 0.1);
  
  // // // Calculate displaced positions for neighboring points
  // // float eps = 0.001;
  
  // // // X+epsilon neighbor
  // // vec3 neighborX = position + vec3(eps, 0.0, 0.0);
  // // vec3 displacedX = neighborX + normal * noise(neighborX * 5.0 + uTime * 0.5) * 0.2;
  
  // // // Y+epsilon neighbor
  // // vec3 neighborY = position + vec3(0.0, eps, 0.0);
  // // vec3 displacedY = neighborY + normal * noise(neighborY * 5.0 + uTime * 0.5) * 0.2;
  
  // // // Z+epsilon neighbor
  // // vec3 neighborZ = position + vec3(0.0, 0.0, eps);
  // // vec3 displacedZ = neighborZ + normal * noise(neighborZ * 5.0 + uTime * 0.5) * 0.2;

  // // // Calculate partial derivatives
  // // vec3 dx = (displacedX - displacedPosition) / eps;
  // // vec3 dy = (displacedY - displacedPosition) / eps;
  // // vec3 dz = (displacedZ - displacedPosition) / eps;

  // // // Recalculate normal using cross product of partial derivatives
  // // vec3 newNormal = normalize(cross(dy, dx));

  // Transform to world space
  vec4 worldPos = modelMatrix * vec4(position, 1.0);
  vec3 transformedNormal = normalMatrix * normal;

  // Varying outputs
  worldNormal = normalize(transformedNormal);
  eyeVector = normalize(worldPos.xyz - cameraPosition);
  
  // Final position
  gl_Position = projectionMatrix * viewMatrix * worldPos;
}
