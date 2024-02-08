float mouseTrail = sdSegment(position.xz, uPos0, uPos1);
mouseTrail = smoothstep(1., 3. , mouseTrail) ;

vec4 position = instanceMatrix[3];

float toCenter = length(position.xz);
float stagger = toCenter ; // Adjust this value to control the amount of stagger
float scale = mix(0.0, 1.0, uProgress);
scale = clamp(scale, 0.0, 1.0 ); // Ensure scale stays between 0 and 1

transformed.y += sin(uTime * 2.9 + toCenter) * 2.9;
transformed *= scale;

vec4 mvPosition = vec4( transformed, 1.0 );

#ifdef USE_INSTANCING
  mvPosition = instanceMatrix * mvPosition;
#endif

mvPosition = modelViewMatrix * mvPosition;

gl_Position = projectionMatrix * mvPosition;