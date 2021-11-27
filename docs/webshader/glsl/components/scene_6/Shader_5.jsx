import React,{ useRef, useEffect } from "react"
import * as THREE from "three"
import { extend } from "@react-three/fiber"
import { shaderMaterial } from "@react-three/drei"

const FifthMaterial = shaderMaterial(
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
        float strength = step( mod( vUv.y * 5.0 + 0.7, 1.0 ), 0.2) * step( mod( vUv.x * 5.0, 1.0 ), 0.8) + step( mod( vUv.y * 5.0, 1.0 ), 0.8) * step( mod( vUv.x * 5.0 + 0.7, 1.0 ), 0.2);

        gl_FragColor = vec4(vec3(strength), 1.0);
      }
    `,
    (self) => {
      self.side = THREE.DoubleSide
    },
  )

extend({ FifthMaterial })

const Shader = ({thresholdY,thresholdX,gridX,gridY}) => {

  return <fifthMaterial />
}

export default Shader;