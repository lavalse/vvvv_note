import React from "react"
import * as THREE from "three"
import { Canvas, extend } from "@react-three/fiber"
import { OrbitControls, shaderMaterial } from "@react-three/drei"

const MyMaterial = shaderMaterial(
  {color: new THREE.Color(0.9, 0.0, 0.1), u_resolution: new THREE.Vector2(500,500)},
  ` 
    void main() {

      gl_Position = vec4( position, 1.0 );

    }
  `,
  `
    uniform vec3 color;
    uniform vec2 u_resolution;

    void main() {
      vec2 st = gl_FragCoord.xy/u_resolution.xy;
      gl_FragColor = vec4(st.x, 0.0, 0.0, 1.0);
    }
  `
)

extend({ MyMaterial })

export default function App() {
  return (
    <div style={{width:"500px",height:"500px"}}>
      <Canvas camera={{ position: [0, 0, 0] }}>
        <mesh>
          <planeGeometry args={[2,2]}/>
          <myMaterial/>
        </mesh>
        <OrbitControls/>
      </Canvas>
    </div>
  )
}
