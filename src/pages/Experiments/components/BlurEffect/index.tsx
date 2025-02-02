import * as THREE from "three";
import gsap, { Power3 } from "gsap";
import { useMemo, useRef } from "react";
import { Canvas, ThreeEvent, useFrame, useLoader } from "@react-three/fiber";
import { ShaderMaterial } from "three";

const HEIGHT = 6;
const ASPECT_RATIO = 1;
const WIDTH = HEIGHT * ASPECT_RATIO;
const PICTURE =
  "https://o1vj7bm9yy.ufs.sh/f/YS7X7tdqhV1FKZKUAlJSUm2o4VLarZCIiQ1wdz8Et59ATJvD";

function Plane() {
  const shader = useRef<ShaderMaterial>(null);
  const texture = useLoader(THREE.TextureLoader, PICTURE);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uRadius: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uTexture: { value: texture },
    }),
    []
  );

  useFrame((state) => {
    if (shader.current) {
      const elapsedTime = state.clock.getElapsedTime();
      shader.current.uniforms.uTime.value = elapsedTime;
    }
  });

  const handlePointerEnter = () => {
    if (!shader.current) return;
    gsap.to(shader.current.uniforms.uRadius, {
      value: 0.2,
      duration: 0.5,
      ease: Power3.easeOut,
    });
  };

  const handlePointerMove = (e: ThreeEvent<MouseEvent>) => {
    const xNormalized = e.point.x / HEIGHT + 0.5;
    const yNormalized = e.point.y / HEIGHT + 0.5;

    if (shader.current) {
      gsap.to(shader.current.uniforms.uMouse.value, {
        x: xNormalized,
        y: yNormalized,
        ease: Power3.easeOut,
        duration: 0.4,
      });
    }
  };

  const handlePointerLeave = () => {
    if (!shader.current) return;
    gsap.to(shader.current.uniforms.uRadius, {
      value: 0,
      duration: 0.5,
      ease: Power3.easeOut,
    });
  };

  return (
    <mesh
      onPointerEnter={handlePointerEnter}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      <planeGeometry args={[WIDTH, HEIGHT]} />
      <shaderMaterial
        ref={shader}
        uniforms={uniforms}
        vertexShader={`
          varying vec2 vUv;

          void main(){
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `}
        fragmentShader={`
          varying vec2 vUv;
          uniform float uTime;
          uniform vec2 uMouse; 
          uniform float uRadius;
          uniform sampler2D uTexture;
          
          float random(vec2 co) {
              return fract(sin(dot(co.xy, vec2(12.9898, 78.233))) * 43758.5453);
          }
          
          
          vec4 blurEffect(sampler2D tex, vec2 uv, float radius) {
              vec4 color = vec4(0.0);
              float total = 0.0;
              for (float x = -radius; x <= radius; x++) {
                  for (float y = -radius; y <= radius; y++) {
                      vec2 offset = vec2(x, y) / vec2(512.0, 512.0); // Adjust depending on texture resolution
                      color += texture2D(tex, uv + offset);
                      total += 1.0;
                  }
              }
              return color / total;
          }
          
          void main() {
            float smoothness = 0.1; // Adjust this value to change the smoothness of the transition
        
            // Calculate the distance from the current fragment to the center of the texture
            float dist = distance(vUv, uMouse);
        
            // Use smoothstep to create a smooth transition around the circle's edge
            float circle = smoothstep(uRadius, uRadius - smoothness, dist);

            // Displacement effect
            float ripple = sin(3.0 * dist) * 0.01;
            vec2 displacedUv = vUv + ripple;

            // Apply blur
            vec4 blurred = blurEffect(uTexture, displacedUv, 10.0);
        
            // Add animated noise
            float n = random(vUv + uTime * 0.02) * 0.1;
        
            // Combine blur and noise
            vec4 blurredColor = blurred + vec4(n);
            vec4 normalColor = texture2D(uTexture, vUv) + vec4(n);

            gl_FragColor = mix(blurredColor, normalColor, circle);
          }
        `}
      />
    </mesh>
  );
}

export function Scene() {
  return (
    <Canvas style={{ height: "100vh", width: "100vw" }}>
      <ambientLight intensity={0.5} />
      <Plane />
    </Canvas>
  );
}

export function BlurEffect() {
  return (
    <div>
      <Scene />
    </div>
  );
}
