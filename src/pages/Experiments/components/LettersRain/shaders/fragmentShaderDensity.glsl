uniform sampler2D uOriginalPosition;

const float GRID_RESOLUTION = 64.0; // Number of grid cells per axis
const float SEARCH_RADIUS = 0.05;   // Influence radius for density count

void main() {
    vec2 uv = gl_FragCoord.xy / resolution.xy;

    // Get current particle position
    vec3 currentPosition = texture2D(uTexturePosition, uv).xyz;
    currentPosition += 0.5;

    vec3 originalPosition = texture2D(uOriginalPosition,uv).xyz;
    originalPosition+=0.5;
  
     // Compute displacement distance
    float displacement = length(currentPosition - originalPosition);

    // Normalize and map to [0, 1] (adjust sensitivity if needed)
    float density = smoothstep(0.0, 0.15, displacement);

    // Output grayscale density
    gl_FragColor = vec4(vec3(density), 1.0);
}