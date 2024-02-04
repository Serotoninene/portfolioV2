float mouseTrail = sdSegment(position.xz, uPos0, uPos1);
mouseTrail = smoothstep(1., 3. , mouseTrail) ;

vec4 position = instanceMatrix[3];
float toCenter = length(position.xz);
// transformed = rotate(transformed, vec3(0., 1., 1. ),  uTime + toCenter * 0.4 );
transformed.y += sin(uTime * 2.9 + toCenter) * 0.9;
// float noise = snoise(position.xyz * 0.1 * uTime * 0.1);
// transformed.y += noise * 10.;

vec4 mvPosition = vec4( transformed, 1.0 );

#ifdef USE_INSTANCING
  mvPosition = instanceMatrix * mvPosition;
#endif

mvPosition = modelViewMatrix * mvPosition;

gl_Position = projectionMatrix * mvPosition;