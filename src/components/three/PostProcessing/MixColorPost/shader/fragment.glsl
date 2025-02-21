uniform float uTime;
uniform float uMomentum;
uniform float uIntroProcess;

  // // Simplex Noise function by Ian McEwan, Ashima Arts
  // vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  // vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  // vec4 permute(vec4 x) { return mod289(((x * 34.0) + 1.0) * x); }
  // vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

  // float snoise(vec3 v) {
  //   const vec2 C = vec2(1.0 / 6.0, 1.0 / 3.0);
  //   const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);

  //   vec3 i = floor(v + dot(v, C.yyy));
  //   vec3 x0 = v - i + dot(i, C.xxx);

  //   vec3 g = step(x0.yzx, x0.xyz);
  //   vec3 l = 1.0 - g;
  //   vec3 i1 = min(g.xyz, l.zxy);
  //   vec3 i2 = max(g.xyz, l.zxy);

  //   vec3 x1 = x0 - i1 + C.xxx;
  //   vec3 x2 = x0 - i2 + C.yyy;
  //   vec3 x3 = x0 - D.yyy;

  //   i = mod289(i);
  //   vec4 p = permute(permute(permute(
  //             i.z + vec4(0.0, i1.z, i2.z, 1.0))
  //           + i.y + vec4(0.0, i1.y, i2.y, 1.0))
  //           + i.x + vec4(0.0, i1.x, i2.x, 1.0));

  //   float n_ = 0.142857142857;
  //   vec3 ns = n_ * D.wyz - D.xzx;

  //   vec4 j = p - 49.0 * floor(p * ns.z * ns.z);

  //   vec4 x_ = floor(j * ns.z);
  //   vec4 y_ = floor(j - 7.0 * x_);

  //   vec4 x = x_ * ns.x + ns.yyyy;
  //   vec4 y = y_ * ns.x + ns.yyyy;
  //   vec4 h = 1.0 - abs(x) - abs(y);

  //   vec4 b0 = vec4(x.xy, y.xy);
  //   vec4 b1 = vec4(x.zw, y.zw);

  //   vec4 s0 = floor(b0) * 2.0 + 1.0;
  //   vec4 s1 = floor(b1) * 2.0 + 1.0;
  //   vec4 sh = -step(h, vec4(0.0));

  //   vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
  //   vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;

  //   vec3 p0 = vec3(a0.xy, h.x);
  //   vec3 p1 = vec3(a0.zw, h.y);
  //   vec3 p2 = vec3(a1.xy, h.z);
  //   vec3 p3 = vec3(a1.zw, h.w);

  //   vec4 norm = taylorInvSqrt(vec4(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3)));
  //   p0 *= norm.x;
  //   p1 *= norm.y;
  //   p2 *= norm.z;
  //   p3 *= norm.w;

  //   vec4 m = max(0.6 - vec4(dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3)), 0.0);
  //   m = m * m;
  //   return 42.0 * dot(m * m, vec4(dot(p0, x0), dot(p1, x1),
  //                               dot(p2, x2), dot(p3, x3)));
  // }

  // // PERLIN NOISE
  //   float rand(vec2 c){
  //   return fract(sin(dot(c.xy ,vec2(12.9898,78.233))) * 43758.5453);
  // }

// Classic Perlin 2D Noise by Stefan Gustavson
vec2 fade(vec2 t) {
  return t * t * t * (t * (t * 6.0 - 15.0) + 10.0);
}

vec4 permute(vec4 x) {
  return mod(((x * 34.0) + 1.0) * x, 289.0);
}

float cnoise(vec2 P) {
  vec4 Pi = floor(P.xyxy) + vec4(0.0, 0.0, 1.0, 1.0);
  vec4 Pf = fract(P.xyxy) - vec4(0.0, 0.0, 1.0, 1.0);
  Pi = mod(Pi, 289.0); // To avoid truncation effects in permutation
  vec4 ix = Pi.xzxz;
  vec4 iy = Pi.yyww;
  vec4 fx = Pf.xzxz;
  vec4 fy = Pf.yyww;
  vec4 i = permute(permute(ix) + iy);
  vec4 gx = 2.0 * fract(i * 0.0243902439) - 1.0; // 1/41 = 0.024...
  vec4 gy = abs(gx) - 0.5;
  vec4 tx = floor(gx + 0.5);
  gx = gx - tx;
  vec2 g00 = vec2(gx.x, gy.x);
  vec2 g10 = vec2(gx.y, gy.y);
  vec2 g01 = vec2(gx.z, gy.z);
  vec2 g11 = vec2(gx.w, gy.w);
  vec4 norm = 1.79284291400159 - 0.85373472095314 *
    vec4(dot(g00, g00), dot(g01, g01), dot(g10, g10), dot(g11, g11));
  g00 *= norm.x;
  g01 *= norm.y;
  g10 *= norm.z;
  g11 *= norm.w;
  float n00 = dot(g00, vec2(fx.x, fy.x));
  float n10 = dot(g10, vec2(fx.y, fy.y));
  float n01 = dot(g01, vec2(fx.z, fy.z));
  float n11 = dot(g11, vec2(fx.w, fy.w));
  vec2 fade_xy = fade(Pf.xy);
  vec2 n_x = mix(vec2(n00, n01), vec2(n10, n11), fade_xy.x);
  float n_xy = mix(n_x.x, n_x.y, fade_xy.y);
  return 2.3 * n_xy;
}

void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) {
  // State 1: Intro state (uIntroProcess = 0)
  float noiseXIntro = cnoise(uv * 7.0 + vec2(uTime * 0.5, 0.0)) * 1.0;
  float noiseYIntro = cnoise(uv * 7.0 + vec2(0.0, uTime * 0.5)) * 1.0;

  // State 2: Momentum-based state (uIntroProcess = 1)
  float distortionStrength = uMomentum * 0.001; // Adjust multiplier for sensitivity
  float noiseXMomentum = cnoise(uv * 5.0 + vec2(uTime * 0.5, 0.0)) * distortionStrength;
  float noiseYMomentum = cnoise(uv * 5.0 + vec2(0.0, uTime * 0.5)) * distortionStrength;

  // Interpolate between the two states based on uIntroProcess
  float noiseX = mix(noiseXIntro, noiseXMomentum, uIntroProcess);
  float noiseY = mix(noiseYIntro, noiseYMomentum, uIntroProcess);

  // Distort UV coordinates
  vec2 distortedUV = uv + vec2(noiseX, noiseY);

  // Sample the input texture using distorted UV
  vec4 color = texture2D(inputBuffer, distortedUV);

  // Apply your existing color effect (optional)
  color.rgb = pow(color.rgb, vec3(2.0));

  outputColor = color;
}