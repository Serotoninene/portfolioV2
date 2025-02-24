varying vec2 vUv;
uniform float uMomentum;
uniform vec2 uTextureSize;
uniform vec2 uQuadSize;

vec2 getResponsiveUV(vec2 uv, vec2 textureSize, vec2 quadSize){
  vec2 tempUV = uv - vec2(0.5);

  float quadAspect = quadSize.x / quadSize.y;
  float textureAspect = textureSize.x / textureSize.y;

  if(quadAspect < textureAspect){
    tempUV *= vec2(quadAspect / textureAspect, 1.);
  }else{
    tempUV*= vec2(1., textureAspect / quadAspect);
  }

  tempUV += vec2(0.5);
  return tempUV;
}


void main(){
  vUv = getResponsiveUV(uv, uTextureSize, uQuadSize);

  vec4 modelPosition = modelMatrix * vec4(position, 1.0);
  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectedPosition = projectionMatrix * viewPosition;

  float clipX = projectedPosition.x / projectedPosition.w;

  // Smoother edge detection with wider range
  float edgeFactor = smoothstep(0.1, 1.0, abs(clipX));

  float momentum = abs(uMomentum) * 0.05;
  
  // More gradual distortion curve
  float distortionCurve = pow(clipX, 3.0); 
  
  // Combine for final distortion
  float distortion = momentum * 0.5 * distortionCurve;
  
  float easedMomentum = smoothstep(0.0, 1.0, pow(abs(momentum), 0.5)); 
  modelPosition.y = mix(modelPosition.y, modelPosition.y + distortion, easedMomentum);    

  viewPosition = viewMatrix * modelPosition;
  projectedPosition = projectionMatrix * viewPosition;

  gl_Position = projectedPosition;
}