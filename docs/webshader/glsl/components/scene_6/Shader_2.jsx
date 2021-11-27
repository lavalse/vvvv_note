import React from "react"
import * as THREE from "three"
import { extend } from "@react-three/fiber"
import { shaderMaterial } from "@react-three/drei"

const SecondMaterial = shaderMaterial(
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

        float strength = (floor(vUv.x * 10.0) * 0.1) * (floor(vUv.y * 10.0) * 0.1);

        gl_FragColor = vec4(vec3(strength), 1.0);
      }
    `,
    (self) => {
      self.side = THREE.DoubleSide
    },
  )

extend({ SecondMaterial })

const Shader_1 = () => {
    return <secondMaterial/>
}

export default Shader_1;