// Source: https://github.com/drcmda/glsl-curl-noise2
// and: https://github.com/guoweish/glsl-noise-simplex/blob/master/3d.glsl

//
// Description : Array and textureless GLSL 2D/3D/4D simplex
//               noise functions.
//      Author : Ian McEwan, Ashima Arts.
//  Maintainer : ijm
//     Lastmod : 20110822 (ijm)
//     License : Copyright (C) 2011 Ashima Arts. All rights reserved.
//               Distributed under the MIT License. See LICENSE file.
//               https://github.com/ashima/webgl-noise
//

vec3 mod289(vec3 x) {
  return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec4 mod289(vec4 x) {
  return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec4 permute(vec4 x) {
     return mod289(((x*34.0)+1.0)*x);
}

vec4 taylorInvSqrt(vec4 r)
{
  return 1.79284291400159 - 0.85373472095314 * r;
}

float snoise(vec3 v)
  {
  const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
  const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);

// First corner
  vec3 i  = floor(v + dot(v, C.yyy) );
  vec3 x0 =   v - i + dot(i, C.xxx) ;

// Other corners
  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min( g.xyz, l.zxy );
  vec3 i2 = max( g.xyz, l.zxy );

  //   x0 = x0 - 0.0 + 0.0 * C.xxx;
  //   x1 = x0 - i1  + 1.0 * C.xxx;
  //   x2 = x0 - i2  + 2.0 * C.xxx;
  //   x3 = x0 - 1.0 + 3.0 * C.xxx;
  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy; // 2.0*C.x = 1/3 = C.y
  vec3 x3 = x0 - D.yyy;      // -1.0+3.0*C.x = -0.5 = -D.y

// Permutations
  i = mod289(i);
  vec4 p = permute( permute( permute(
             i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
           + i.y + vec4(0.0, i1.y, i2.y, 1.0 ))
           + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));

// Gradients: 7x7 points over a square, mapped onto an octahedron.
// The ring size 17*17 = 289 is close to a multiple of 49 (49*6 = 294)
  float n_ = 0.142857142857; // 1.0/7.0
  vec3  ns = n_ * D.wyz - D.xzx;

  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);  //  mod(p,7*7)

  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_ );    // mod(j,N)

  vec4 x = x_ *ns.x + ns.yyyy;
  vec4 y = y_ *ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);

  vec4 b0 = vec4( x.xy, y.xy );
  vec4 b1 = vec4( x.zw, y.zw );

  //vec4 s0 = vec4(lessThan(b0,0.0))*2.0 - 1.0;
  //vec4 s1 = vec4(lessThan(b1,0.0))*2.0 - 1.0;
  vec4 s0 = floor(b0)*2.0 + 1.0;
  vec4 s1 = floor(b1)*2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));

  vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
  vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;

  vec3 p0 = vec3(a0.xy,h.x);
  vec3 p1 = vec3(a0.zw,h.y);
  vec3 p2 = vec3(a1.xy,h.z);
  vec3 p3 = vec3(a1.zw,h.w);

//Normalise gradients
  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
  p0 *= norm.x;
  p1 *= norm.y;
  p2 *= norm.z;
  p3 *= norm.w;

// Mix final noise value
  vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
  m = m * m;
  return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1),
                                dot(p2,x2), dot(p3,x3) ) );
  }

#define PI 3.1415926




float heaviside(float x) {
  return (sign(x) + 1.0) / 2.0;
}

float chichon(float x, float stepness) {
  return 1.0 - pow(abs(sin(0.5 * PI * x)), stepness);
}

float impulseModulation(float time, float center,float scale, float stepness){ 
  float scaledCenter = center * scale;
  float x = time * scale;

  float wave = heaviside(1. - (x - scaledCenter)) * chichon(x -scaledCenter, stepness) * heaviside(x - scaledCenter + 1.);

  return wave;
}


uniform sampler2D positions;
uniform float uTime;
uniform float uFrequency;
uniform vec2 uMouse;
uniform vec2 uMousePosition; // Add this to pass actual mouse position

varying vec2 vUv;

vec3 HOLE_CENTER = vec3(0.);
float RADIUS = 0.3;
float EYE_RADIUS = 1.;
float INTENSITY = 0.01;
float SPEED = 0.2;

float length2(vec2 p) {
    return dot(p, p);
}

vec2 rotate2D(vec2 p, float angle) {
    float s = sin(angle);
    float c = cos(angle);
    return vec2(p.x * c - p.y * s, p.x * s + p.y * c);
}


void main() { 
  vec3 pos = texture2D(positions, vUv).rgb;

  float theta = vUv.x * PI * 2.;

  // Setting up new pos
  vec3 newPos = pos;

  vec2 dir = pos.yz - uMouse;
  float dist = length(pos.yz - uMouse);
  float strength = smoothstep(RADIUS + 0.1, RADIUS - 0.1, dist);

  float angle = atan(dir.y, dir.x);
  vec2 rotatedUV = rotate2D(dir, angle);
  rotatedUV += uMouse;

  float vortex = smoothstep(0.05, 0.15, dist) * strength;
  float vortexAngle = atan(uMouse.x, pos.z - uMouse.y); // Center rotation on uMouse
  float vortexSpeed = 2.;
  vortexAngle += vortexSpeed * uTime; // Apply rotational force
  vec3 pushedPos = newPos ;
  pushedPos.yz += dir * (EYE_RADIUS - dist) ; 
  
  vec3 vortexPos = pushedPos;
  vortexPos.yz += rotatedUV;

  vec3 finalPos = mix(newPos, vortexPos, vortex);

  gl_FragColor= vec4(finalPos, 1.);
}


// void main() { 
//   vec3 pos = texture2D(positions, vUv).rgb;
  
//   float timestep = uTime * 1.;

//   // Previous positions
//   float x = pos.x;
//   float y = pos.y;
//   float z = pos.z;

//   // // Increments calculation
//   // float dx = (a * (y - x)) * timestep;
//   // float  dy = (x * (b-z) - y) * timestep;
//   // float  dz = (x*y - c*z) * timestep;



//   // vec2 mouse = vec2(sin(uTime),0);

//   float theta = vUv.x * PI * 2.;
//   float r = RADIUS + RADIUS * hash12(vec2(pos.xy)) ;

//   // Setting up new pos
//   vec3 newPos = pos;

//   float dist = length(pos.yz - uMouse);
//   float factor = smoothstep(RADIUS, 0., dist);
//   vec2 dir = normalize(pos.yz- uMouse ) * atan(factor + uTime);


// 	// // Add the new increments to the previous position
//   // vec3 attractorForce = vec3(dx, dy, dz) * INTENSITY;

//   // newPos -= attractorForce * factor;




//   // float angle = r * theta * uTime * SPEED;

//   // vec2 distortion = dir * 0.1 * factor;



//   // newPos.yz += distortion;


//   vec3 vortexPos = pos;

//   float vortexAngle = atan(uMouse.x, pos.z - uMouse.y); // Center rotation on uMouse
//   float vortexSpeed = 2.;
//   float EYE_RADIUS = 1.;
  
// //  if (dist < EYE_RADIUS) {
// //       // Repel particles outward to keep the center empty
// //     vortexPos.yz += dir * (EYE_RADIUS - dist) * 0.1; // Adjust repulsion strength
// //   }

//   vortexAngle += vortexSpeed * uTime; // Apply rotational force
//   vortexPos.yz += vec2(cos(vortexAngle), sin(vortexAngle)) * dist ; // Recalculate position
//   vortexPos.x += sin(vortexAngle) * dist * factor * 1.; // Recalculate position

//   vec3 finalPos = mix(pos, vortexPos, factor);



//   gl_FragColor= vec4(finalPos, 1.);
// }

// void main() {    
//    vec3 pos = texture2D(positions, vUv).rgb;
//    vec3 newPos = pos;

//   vec3 holeCenter = vec3(0.);
//   float holeRadius = 0.3;
//   float minRadius = 0.27; // Minimum distance from center to ensure hollow core
//   float speed = 2.;

//   // Compute distance to the hole center
//   vec3 dir = newPos - holeCenter;
//   float dist = length(dir);
//   float normalizedDist = min(dist / holeRadius, 1.0);


//   // If within the hole radius, push outward
//   if (dist < holeRadius) {
//     // Normalize direction vector
//     vec3 normalizedDir = normalize(dir);
    
//     // First, ensure all particles are at least minRadius away from center
//     if (dist < minRadius) {
//       newPos = holeCenter + normalizedDir * minRadius;
//       dist = minRadius; // Update distance after pushing out
//       dir = normalizedDir * minRadius; // Update direction vector
//     }
    
//     // Then apply the tornado effect
//     float force = dist / holeRadius * 0.5; // Push force (increases with distance)
//     float angle = atan(dir.y, dir.z);
//     float angleOffset = uTime * speed;
//     angle += angleOffset;

//     // Create circular motion at current radius (won't go inward)
//     float currentRadius = max(dist, minRadius);
//     newPos = holeCenter;
//     newPos.y += currentRadius * sin(angle);
//     newPos.z += currentRadius * cos(angle);
//     newPos.x = pos.x; // Maintain x position
    
//     // Push outward with increasing force near the edge
//     newPos +=  normalizedDir * (holeRadius - dist) * 0.9;
//   }
//   gl_FragColor = vec4(newPos, 1.0);
// }

