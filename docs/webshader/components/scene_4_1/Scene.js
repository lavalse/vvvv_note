import React from "react"
import { Canvas, extend } from "@react-three/fiber"
import { OrbitControls, shaderMaterial } from "@react-three/drei"

const MyMaterial = shaderMaterial(
  {},
  ` 
    void main() {

      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0 );

    }
  `,
  `
    void main() {

      gl_FragColor = vec4(1.0, 1.0, 0.0, 1.0);
      
    }
  `
)

extend({ MyMaterial })

export default function App() {
  return (
    <div style={{height:"250px"}}>
      <Canvas camera={{ position: [0, 0, 2] }}>
        <mesh>
          <boxGeometry/>
          <myMaterial/>
        </mesh>
        <OrbitControls/>
      </Canvas>
    </div>
  )
}
