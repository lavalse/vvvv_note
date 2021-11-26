import React from "react"
import * as THREE from "three"
import { extend } from "@react-three/fiber"
import { shaderMaterial } from "@react-three/drei"

const ThreeMaterial = shaderMaterial(
    {},
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
      varying vec2 vUv;
  
      void main() {
        float strength = mod(vUv.y * 5.0, 1.0);
        strength = step(strength, 0.5);
        gl_FragColor = vec4(vec3(strength), 1.0);
      }
    `,
    (self) => {
      self.side = THREE.DoubleSide
    },
  )

extend({ ThreeMaterial })

const Shader = () => {
    return <threeMaterial/>
}

export default Shader;