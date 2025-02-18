precision mediump float;

uniform float uIorR;
uniform float uIorG;
uniform float uIorB;
uniform float uBlurSize;
uniform vec2 winResolution;
uniform sampler2D uTexture;
uniform float uTime;
uniform float uRefractPower;
uniform float uLineIntensity;

varying vec3 worldNormal;
varying vec3 eyeVector;

// 2D Random
float random2 (in vec2 st) {
    return fract(sin(dot(st.xy,vec2(12.9898,78.233)))* 43758.5453123);
}

vec2 hash(in vec2 uv){
    vec2 uv2 = uv;
    uv2.y = uv2.y + 1.0 * (random2(uv));
    //uv2.x = uv2.x + 1.0 * (random2(uv));
    return uv2 - uv;
}

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

mat2 rotate2D(float angle){
    return mat2(
    cos(angle), -sin(angle), sin(angle), cos(angle)
    );
}

// Gaussian blur function
vec2 gaussianBlur(vec2 uv, float blur) {
    vec2 blurOffset = vec2(0.0);
    float total = 0.0;
    
    // 3x3 Gaussian kernel
    float kernel[9] = float[](
        1.0/16.0, 2.0/16.0, 1.0/16.0,
        2.0/16.0, 4.0/16.0, 2.0/16.0,
        1.0/16.0, 2.0/16.0, 1.0/16.0
    );
    
    for(int i = -1; i <= 1; i++) {
        for(int j = -1; j <= 1; j++) {
            vec2 offset = vec2(float(i), float(j)) * blur / winResolution.xy;
            vec2 sampleUV = uv + offset;
            int idx = (i + 1) * 3 + (j + 1);
            blurOffset += sampleUV * kernel[idx];
            total += kernel[idx];
        }
    }
    
    return blurOffset / total;
}


void main() {
    float n = noise(worldNormal + uTime * 0.25);
    float iorRatioRed = 1.0/uIorR;
    float iorRatioGreen = 1.0/uIorG;
    float iorRatioBlue = 1.0/uIorB;

    
    vec3 color = vec3(1.0);
    
    vec2 uv = gl_FragCoord.xy / winResolution.xy;

    for(int i =0; i <= 5; i++) {
        float offset = float(i) * 0.2;
        uv += hash(uv + vec2(offset)) * uBlurSize;
    }

    float linePattern = lines(uv * rotate2D(n) * uLineIntensity, 0.1);
    vec3 normal = worldNormal * linePattern;

    vec3 refractVecR = refract(eyeVector, normal, iorRatioRed);
    vec3 refractVecG = refract(eyeVector, normal, iorRatioGreen);
    vec3 refractVecB = refract(eyeVector, normal, iorRatioBlue);
    
    float R = texture2D(uTexture, uv + refractVecR.xy * uRefractPower).r;
    float G = texture2D(uTexture, uv + refractVecG.xy * uRefractPower).g;
    float B = texture2D(uTexture, uv + refractVecB.xy * uRefractPower).b;

    color.r = R;
    color.g = G;
    color.b = B;

    gl_FragColor = vec4(color , 1.0);
    // gl_FragColor = vec4(vec3(linePattern), 1.0);
    // #include <tonemapping_fragment>
    #include <colorspace_fragment>
}
