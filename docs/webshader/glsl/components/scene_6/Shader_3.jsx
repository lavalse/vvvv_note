import React,{ useRef, useEffect } from "react"
import * as THREE from "three"
import { extend } from "@react-three/fiber"
import { shaderMaterial } from "@react-three/drei"

const ThirdMaterial = shaderMaterial(
    {
      thresholdY: 0.5, 
      thresholdX: 0.5,
      gridY: 5.0,
      gridX: 5.0,
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
      uniform float thresholdX;
      uniform float thresholdY;
      uniform float gridX;
      uniform float gridY;
      void main() {
        float strength = step( mod( vUv.y * gridY, 1.0 ), thresholdY);
        strength += step( mod( vUv.x * gridX, 1.0 ), thresholdX);

        gl_FragColor = vec4(vec3(strength), 1.0);
      }
    `,
    (self) => {
      self.side = THREE.DoubleSide
    },
  )

extend({ ThirdMaterial })

const Shader = ({thresholdY,thresholdX,gridX,gridY}) => {
  const materialRef = useRef();

  useEffect(()=>{
    materialRef.current.uniforms.thresholdY.value = thresholdY;
    materialRef.current.uniforms.thresholdX.value = thresholdX;
    materialRef.current.uniforms.gridY.value = gridY;
    materialRef.current.uniforms.gridX.value = gridX;
  },[thresholdX,thresholdY,gridX,gridY]);

  return <thirdMaterial ref={materialRef}/>
}

export default Shader;