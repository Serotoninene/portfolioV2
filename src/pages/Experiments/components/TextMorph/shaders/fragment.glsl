uniform float uTime;
uniform float uSegmentNb;
uniform float uLetterNb;
uniform sampler2D uTextTexture;
uniform float uProgress;

varying vec2 vUv;

// Smooth easing function (quadratic)
float easeInOutQuad(float t) {
  return t < 0.5 ? 2.0 * t * t : 1.0 - pow(-2.0 * t + 2.0, 2.0) / 2.0;
}


#define HALF_PI 1.5707963267948966


float elasticInOut(float t) {
  return t < 0.5
    ? 0.5 * sin(+13.0 * HALF_PI * 2.0 * t) * pow(2.0, 10.0 * (2.0 * t - 1.0))
    : 0.5 * sin(-13.0 * HALF_PI * ((2.0 * t - 1.0) + 1.0)) * pow(2.0, -10.0 * (2.0 * t - 1.0)) + 1.0;
}


void main() {
    // Calculate character index and normalized position
    float charIndex = floor(vUv.x * uLetterNb * 4. / 3.);
    
    // Add per-character delay with easing
    float staggerDelay = charIndex * 0.1; // Adjust stagger amount
    float animationTime = fract((uTime - staggerDelay) * 0.5);

    float holdDuration = 0.4; // 20% of the cycle is a hold

    float activeTime = 1.0 - holdDuration;

    float progress = (animationTime < activeTime) ? animationTime / activeTime : 1.0;


    float easedTime = easeInOutQuad(progress);

    // Vertical animation with easing and overflow
    float verticalMovement = easedTime * 2.0; // 2.0 makes it loop
    float verticalOffset = mix(-1.0, 0.0, easeInOutQuad(verticalMovement));

    vec2 animatedUV = vec2(
        vUv.x,
        fract((vUv.y * uSegmentNb + verticalMovement))
    );

    
    // UVs with bottom-up clipping
    vec2 introUV = vec2(
        vUv.x,
        fract(vUv.y * uSegmentNb) * uProgress - uProgress
    );

    vec2 finalUV = mix(introUV, animatedUV, uProgress);

    // Sample texture with smooth edges
    vec4 color = texture2D(uTextTexture, finalUV);
    
    // Combine everything
    gl_FragColor = vec4(color.rgb, color.a);
}