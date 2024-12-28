uniform float uProgress; // Unrolling uProgress (0 to 1)
uniform float uAngle;    // Rotation angle of the plane
uniform float uRolls;    // Number of uRolls
uniform float uRadius;   // Radius of each roll
varying vec2 vUv;

const float pi = 3.14159265359;

mat4 rotationMatrix(vec3 axis, float angle) {
    axis = normalize(axis);
    float s = sin(angle);
    float c = cos(angle);
    float oc = 1.0 - c;
    
    return mat4(oc * axis.x * axis.x + c, oc * axis.x * axis.y - axis.z * s, oc * axis.z * axis.x + axis.y * s, 0.0,
                oc * axis.x * axis.y + axis.z * s, oc * axis.y * axis.y + c, oc * axis.y * axis.z - axis.x * s, 0.0,
                oc * axis.z * axis.x - axis.y * s, oc * axis.y * axis.z + axis.x * s, oc * axis.z * axis.z + c, 0.0,
                0.0, 0.0, 0.0, 1.0);
}

vec3 rotate(vec3 v, vec3 axis, float angle) {
    mat4 m = rotationMatrix(axis, angle);
    return (m * vec4(v, 1.0)).xyz;
}

void main() {
    vUv = uv;
    
    vec3 newposition = position;
    
    // Modified progress curve that peaks at 0.5 and returns to 0 at 1.0
    float modifiedProgress = uProgress;
    
    // Offset for rolling calculation
    float offs = ((newposition.x + 0.5) - 0.5) / (sin(uAngle) + cos(uAngle));
    float dynamicRadius = uRadius * (1.0 - newposition.x); // Larger radius at the top, smaller at the bottom
    
    // Rolling logic with modified progress
    newposition.z = dynamicRadius * sin(-offs * uRolls * pi - 0.5 * pi) * modifiedProgress;
    newposition.x = dynamicRadius * cos(-offs * uRolls * pi + 0.5 * pi) * modifiedProgress;
    
    // // Apply unrolling motion with modified progress
    newposition = rotate(
        vec3(0.) + newposition * modifiedProgress, 
        vec3(sin(uAngle), cos(uAngle), 0.0),
        -pi * modifiedProgress * uRolls
    );
    
    // // Translation with modified progress
    newposition += vec3(
        -1. *(1.0 - modifiedProgress),
        (1.0 - modifiedProgress) * 2.5,
        (1.0 - modifiedProgress) * 0.01
    );

    float transitionProgress = smoothstep(0.8, 1., uProgress);
    vec3 finalPosition = mix(newposition, position, transitionProgress);
    
    // Final position
    gl_Position = projectionMatrix * modelViewMatrix * vec4(finalPosition, 1.0);
}