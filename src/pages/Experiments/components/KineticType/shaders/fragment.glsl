uniform float uTime;
uniform float uSpacing;
uniform float uSpeed;
uniform float uRes;

uniform float uProgress;
uniform float uLineProgress;


uniform sampler2D uTextTexture;
uniform sampler2D uTouchTexture;

varying vec2 vUv;

float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}

float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);

    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));

    vec2 u = f * f * (3.0 - 2.0 * f);

    return mix(a, b, u.x) +
           (c - a) * u.y * (1.0 - u.x) +
           (d - b) * u.x * u.y;
}

mat2 rotate2D(float angle) {
    float s = sin(angle);
    float c = cos(angle);
    return mat2(c, -s, s, c);
}

void main() {
    // INitial state

    // Determine grid cell
    vec2 uv = gl_FragCoord.xy / uSpacing;
    vec2 cellId = floor(uv); // Integer cell position
    vec2 gridUV = fract(uv) - 0.5; // Centered within the cell

    
    float touch = texture2D(uTouchTexture, vUv).r;

    // Compute angle from Perlin noise
    float angle = noise(cellId * uRes + uTime * uSpeed + touch * 7.) * 6.28318 * uProgress ; // TAU (2π)
    float angleFactor = abs(sin(angle));
    float scale = mix(0.2, 2., angleFactor) * uProgress + 1.;

    vec2 mixUV = mix(vUv - 0.5, gridUV , uProgress);
    // Rotate the texture sample coordinates
    vec2 rotatedUV = rotate2D(angle) * (mixUV * scale ) + 0.5;


    // Lines 
    // Compute line distance (dot product for projection)
    vec2 dir = vec2(cos(angle), sin(angle));
    float d = abs(dot(gridUV, dir));

    float lineThickness = mix(0.08,0.03 , angleFactor); // Thinner at 0° and thicker at 90°
    

    // Draw short dashes where d is close to 0
    float strength = smoothstep(lineThickness, lineThickness * 0.5, d);

    
    // Sample the text texture
    vec3 textColor = texture2D(uTextTexture, rotatedUV).rgb;
    vec3 lineColor = vec3(strength);

    vec3 finalColor = mix(textColor, lineColor, uLineProgress);

    gl_FragColor = vec4(finalColor, 1.);
}
