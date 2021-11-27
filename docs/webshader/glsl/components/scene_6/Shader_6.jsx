import React,{ useRef, useEffect } from "react"
import * as THREE from "three"
import { extend } from "@react-three/fiber"
import { shaderMaterial } from "@react-three/drei"

const SixthMaterial = shaderMaterial(
    {
    },
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
        float strength = step(0.9, mod(vUv.x * 2.0 + 0.1, 1.0));

        gl_FragColor = vec4(vec3(strength), 1.0);
      }
    `,
    (self) => {
      self.side = THREE.DoubleSide
    },
  )

extend({ SixthMaterial })

const Shader = ({thresholdY,thresholdX,gridX,gridY}) => {

  return <sixthMaterial />
}

export default Shader;