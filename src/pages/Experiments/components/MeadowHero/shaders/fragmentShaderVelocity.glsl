#define F4 0.309016994374947451
float mod289(float x){return x - floor(x * (1.0 / 289.0)) * 289.0;}
vec2  mod289(vec2 x) {return x - floor(x * (1.0 / 289.0)) * 289.0;}
vec3  mod289(vec3 x) {return x - floor(x * (1.0 / 289.0)) * 289.0;}
vec4  mod289(vec4 x) {return x - floor(x * (1.0 / 289.0)) * 289.0;}
float permute(float x){return mod289(((x*34.0)+1.0)*x);}
vec3  permute(vec3 x) {return mod289(((x*34.0)+1.0)*x);}
vec4  permute(vec4 x) {return mod289(((x*34.0)+1.0)*x);}
float taylorInvSqrt(float r){return 1.79284291400159 - 0.85373472095314 * r;}
vec4  taylorInvSqrt(vec4 r) {return 1.79284291400159 - 0.85373472095314 * r;}


vec4 grad4(float j, vec4 ip){
  const vec4 ones = vec4(1.0, 1.0, 1.0, -1.0);
  vec4 p,s;

  p.xyz = floor( fract (vec3(j) * ip.xyz) * 7.0) * ip.z - 1.0;
  p.w = 1.5 - dot(abs(p.xyz), ones.xyz);
  s = vec4(lessThan(p, vec4(0.0)));
  p.xyz = p.xyz + (s.xyz*2.0 - 1.0) * s.www;

  return p;
}
float snoise4D(vec4 v){
  const vec4  C = vec4( 0.138196601125011,  // (5 - sqrt(5))/20  G4
                        0.276393202250021,  // 2 * G4
                        0.414589803375032,  // 3 * G4
                       -0.447213595499958); // -1 + 4 * G4

  // First corner
  vec4 i  = floor(v + dot(v, vec4(F4)) );
  vec4 x0 = v -   i + dot(i, C.xxxx);

  // Other corners

  // Rank sorting originally contributed by Bill Licea-Kane, AMD (formerly ATI)
  vec4 i0;
  vec3 isX = step( x0.yzw, x0.xxx );
  vec3 isYZ = step( x0.zww, x0.yyz );
  //  i0.x = dot( isX, vec3( 1.0 ) );
  i0.x = isX.x + isX.y + isX.z;
  i0.yzw = 1.0 - isX;
  //  i0.y += dot( isYZ.xy, vec2( 1.0 ) );
  i0.y += isYZ.x + isYZ.y;
  i0.zw += 1.0 - isYZ.xy;
  i0.z += isYZ.z;
  i0.w += 1.0 - isYZ.z;

  // i0 now contains the unique values 0,1,2,3 in each channel
  vec4 i3 = clamp( i0, 0.0, 1.0 );
  vec4 i2 = clamp( i0-1.0, 0.0, 1.0 );
  vec4 i1 = clamp( i0-2.0, 0.0, 1.0 );

  //  x0 = x0 - 0.0 + 0.0 * C.xxxx
  //  x1 = x0 - i1  + 1.0 * C.xxxx
  //  x2 = x0 - i2  + 2.0 * C.xxxx
  //  x3 = x0 - i3  + 3.0 * C.xxxx
  //  x4 = x0 - 1.0 + 4.0 * C.xxxx
  vec4 x1 = x0 - i1 + C.xxxx;
  vec4 x2 = x0 - i2 + C.yyyy;
  vec4 x3 = x0 - i3 + C.zzzz;
  vec4 x4 = x0 + C.wwww;

  // Permutations
  i = mod289(i);
  float j0 = permute( permute( permute( permute(i.w) + i.z) + i.y) + i.x);
  vec4 j1 = permute( permute( permute( permute (
             i.w + vec4(i1.w, i2.w, i3.w, 1.0 ))
           + i.z + vec4(i1.z, i2.z, i3.z, 1.0 ))
           + i.y + vec4(i1.y, i2.y, i3.y, 1.0 ))
           + i.x + vec4(i1.x, i2.x, i3.x, 1.0 ));

  // Gradients: 7x7x6 points over a cube, mapped onto a 4-cross polytope
  // 7*7*6 = 294, which is close to the ring size 17*17 = 289.
  vec4 ip = vec4(1.0/294.0, 1.0/49.0, 1.0/7.0, 0.0) ;

  vec4 p0 = grad4(j0,   ip);
  vec4 p1 = grad4(j1.x, ip);
  vec4 p2 = grad4(j1.y, ip);
  vec4 p3 = grad4(j1.z, ip);
  vec4 p4 = grad4(j1.w, ip);

  // Normalise gradients
  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
  p0 *= norm.x;
  p1 *= norm.y;
  p2 *= norm.z;
  p3 *= norm.w;
  p4 *= taylorInvSqrt(dot(p4,p4));

  // Mix contributions from the five corners
  vec3 m0 = max(0.6 - vec3(dot(x0,x0), dot(x1,x1), dot(x2,x2)), 0.0);
  vec2 m1 = max(0.6 - vec2(dot(x3,x3), dot(x4,x4)            ), 0.0);
  m0 = m0 * m0;
  m1 = m1 * m1;
  return 49.0 * ( dot(m0*m0, vec3( dot( p0, x0 ), dot( p1, x1 ), dot( p2, x2 )))
                + dot(m1*m1, vec2( dot( p3, x3 ), dot( p4, x4 ) ) ) ) ;
}

uniform vec2 uMouse;
uniform sampler2D uOriginalPosition;

uniform float uDelta;
uniform float uTime;

// Vortex Uniforms
uniform float uVortexStrength;
uniform float uVortexMultiplicator;

// Turbulence uniforms
uniform float uTurbulenceStrength;

// Velocity uuniforms
uniform float uVelocityStrength;
uniform float uVelocityReduce;


const float PI = 3.141592653589793;
const float RADIUS = 1.;
const float RESTORE_SPEED = 5.;  // Smooth return effect

// 🌪️ Vortex Function
vec3 vorticityAroundZ(vec3 targetPositions, vec3 center, float xyStrength) {
  vec3 distToCenter = targetPositions - center;
  
  float distSQ = dot(distToCenter.xyz, distToCenter.xyz);
  vec3 direction = normalize(distToCenter.xyz);
  float verticalStrength = -100.;

  vec3 normalXYPlane = vec3(-direction.y * xyStrength, direction.x * xyStrength, verticalStrength * direction.z);

  // return vec3(normalXYPlane * 1. / distSQ);
  return vec3(normalXYPlane * min(1.0 / max(distSQ, 0.01), 10.0)); 
}

vec3 turbulence(vec3 position, float scale){
  float time = uTime * 0.01;

  float noiseX = snoise4D(vec4(position.xyz * scale, time));
  float noiseY = snoise4D(vec4(position.xyz * scale + 10., time));
  float noiseZ = snoise4D(vec4(position.xyz * scale + 20., time));

  return vec3(noiseX, noiseY, noiseZ);
}

void main() {
  vec2 uv = gl_FragCoord.xy / resolution.xy;
  
  vec3 originalPos = texture2D(uOriginalPosition, uv).xyz;
  vec3 selfPosition = texture2D(uTexturePosition, uv).xyz;
  vec3 selfVelocity = texture2D(uTextureVelocity, uv).xyz;
  vec3 velocity = selfVelocity;

  // 🎯 Convert uMouse (2D) to 3D space
  vec3 mousePos = vec3(uMouse, 0.0);
  
  // 🔥 Compute force from mouse interaction
  vec2 dir = uMouse - selfPosition.xy;
  float dist = length(dir);
  float influence = smoothstep(RADIUS, 0.0, dist); // 1.0 inside, 0.0 outside
  float force = ((dist * dist) / (RADIUS * RADIUS) - 1.0) * uDelta ; 

  vec2 attraction = normalize(dir) * force;
  vec2 vorticity = vorticityAroundZ(selfPosition, mousePos, uVortexStrength).xy * uVortexMultiplicator;
  vec3 noise = turbulence(selfPosition, uTurbulenceStrength);

  // Blend the forces smoothly
  velocity.xy += mix(vec2(0.0), vorticity + attraction, influence);
  velocity += mix(vec3(0.0), noise, influence);

  // 🌊 Smooth Return Effect
  vec3 newPosition = mix(selfPosition, originalPos, RESTORE_SPEED);
  velocity += (newPosition - selfPosition) * uDelta * uVelocityStrength;

  // ⚡ Reduce velocity gradually for stability
  velocity *= uVelocityReduce; 

  gl_FragColor = vec4(velocity, 1.0);
}
