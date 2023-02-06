import React, { memo, useRef } from "react";
import { ThreeElements, useFrame, useLoader } from "@react-three/fiber";
import { ShaderMaterial, TextureLoader } from "three";
import monalisa from "style/monalisa.png";
import frog from "style/frog.png";

const vertexShader = `
varying vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
}
`;

// const fragmentShader = `
// varying vec2 vUv;

// uniform float time;
// uniform sampler2D channel0;
// uniform sampler2D channel1;

// void main() {
//   vec2 st = vUv.xy;

//   st.x += sin(time * 5.0 + st.y * 10.0) * 0.1;

//   gl_FragColor = texture2D(channel0, st);
// }
// `;

const fragmentShader = `
varying vec2 vUv;

uniform float time;
uniform sampler2D channel0;
uniform sampler2D channel1;

void main() {
  vec2 st = vUv.xy;
  
  vec4 noiseCol = texture2D(channel1, st);
  
  float smoothness = 0.3;
  float progress = mod(time, 2.0);
  progress += progress * smoothness;
  float alpha = smoothstep(noiseCol.x - smoothness, noiseCol.x, progress);
  
  vec4 finalCol = texture2D(channel0, st);
  finalCol.w *= alpha;

  gl_FragColor = finalCol;
}
`;

const St2 = memo((props: ThreeElements["mesh"]) => {
  const materialRef = useRef<ShaderMaterial | null>(null);
  const [monalisaTexture, frogTexture] = useLoader(TextureLoader, [
    monalisa,
    frog,
  ]);

  useFrame((state) => {
    if (!materialRef.current) {
      return;
    }

    materialRef.current.uniforms.time.value = state.clock.elapsedTime;
  });

  return (
    <mesh {...props} scale={[5, 5, 0]}>
      <planeBufferGeometry />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={{
          time: { value: 0 },
          channel0: { value: monalisaTexture },
          channel1: { value: frogTexture },
        }}
      />
    </mesh>
  );
});

export default St2;
