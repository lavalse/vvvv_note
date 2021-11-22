import React from "react"
import * as THREE from "three"
import { Canvas, extend } from "@react-three/fiber"
import { OrbitControls, shaderMaterial } from "@react-three/drei"

const MyMaterial = shaderMaterial(
  {color: new THREE.Color(0.9, 0.0, 0.1), u_resolution: new THREE.Vector2(500,500)},
  ` 
  varying vec2 vUv;
  void main()
  {
    vUv = uv;
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;

    gl_Position = projectedPosition;
  }
  `,
  `
    uniform vec3 color;
    uniform vec2 u_resolution;
    varying vec2 vUv;

    void main() {
      vec2 st = gl_FragCoord.xy/u_resolution.xy;
      gl_FragColor = vec4(vUv, 0.0, 1.0);
    }
  `
)

extend({ MyMaterial })

export default function App() {
  return (
    <div style={{width:"500px",height:"500px"}}>
      <Canvas camera={{ position: [0, 0, 3] }}>
        <mesh>
          <sphereGeometry/>
          <myMaterial/>
        </mesh>
        <OrbitControls/>
      </Canvas>
    </div>
  )
}
