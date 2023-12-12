uniform float uTime;

uniform float uScale;
uniform float uSpeed;
uniform float uNoiseStrength;

varying vec2 vUv;

// Function to calculate the modulo of a float
float mod289(float x){return x - floor(x * (1.0 / 289.0)) * 289.0;}

// Function to calculate the modulo of a vec4
vec4 mod289(vec4 x){return x - floor(x * (1.0 / 289.0)) * 289.0;}

// Function to calculate the permutation of a vec4
vec4 perm(vec4 x){return mod289(((x * 34.0) + 1.0) * x);}

// Function to calculate noise
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

// Function to calculate random values
float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
}

void main() {
  // Define three colors to be used in the shader
  vec3 color1 = vec3(0.0, 0.0, 1.0);
  vec3 color2 = vec3(255. /255. , 254. / 255., 148. / 255.);
  vec3 color3 = vec3(255. /255. , 254. / 255., 248. / 255.);

  // Calculate a custom noise value using the noise function and the uniform variables
  float customNoise = noise(vec3(vUv * uScale, uTime * uSpeed ));

  // Mix the colors based on the custom noise value
  vec3 color = mix(color1, color2, customNoise);
  color = mix(color, color3, pow(customNoise, 3.0));

  // Calculate a random value and add a grain effect to the color
  vec2 randomValue = vec2(vUv.x, vUv.y) * uTime;
  float grain = random(randomValue) * uNoiseStrength;

  // Set the final color of the fragment
  gl_FragColor = vec4(color, 1.0);
}
