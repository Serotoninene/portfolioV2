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
uniform sampler2D positions;
uniform float uTime;
uniform float uFrequency;
uniform sampler2D uMouse;
uniform vec2 uMousePosition; // Add this to pass actual mouse position

varying vec2 vUv;

void main() {
  // Read the current particle position from the texture
  vec3 pos = texture2D(positions, vUv).rgb;
  
  // Define the radius of the repelling effect
  float repelRadius = 0.2;

  // Calculate the direction from the mouse position to the particle
  vec2 dir = normalize(pos.xy - uMousePosition);
  
  // Calculate distance to mouse position
  float distanceToMouse = distance(pos.xy, uMousePosition);
  
  // Apply repulsion force that falls off with distance
  float force = max(0.0, (repelRadius - distanceToMouse) / repelRadius);
  force *= 0.8;
  
  // Apply the repelling force to move particles away from mouse
  pos.xy += dir * force * 5000.;

  
  // Output the updated particle position
  gl_FragColor = vec4(pos, 1.0);
}