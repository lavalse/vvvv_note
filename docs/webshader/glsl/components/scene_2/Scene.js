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
    //这里的uv已经定义好直接拿来使用就行
    vUv = uv;
    //同样的position是attribute参数，modelMatrix是uniform参数，都已经定义好了
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

const CustomMaterial = shaderMaterial(
  {},
  ` 
    //选好小车的名字叫vNormal
    varying vec3 vNormal;
    void main() {
      //把attribute参数normal放进小车vNormal中
      vNormal = normal;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0 );
    }
  `,
  `
    //呼叫小车（此时小车里面有参数normal）
    varying vec3 vNormal; 
    void main() {
      //直接用小车的参数
      gl_FragColor = vec4(vNormal, 1.0);
    }
  `
)

extend({ MyMaterial, CustomMaterial })

export default function App() {
  return (
    <div style={{width:"500px",height:"500px"}}>
      <Canvas camera={{ position: [0, 0, 4] }}>

        <mesh position={[-1.5,0,0]}>
          <sphereGeometry/>
          <myMaterial/>
        </mesh>

        <mesh position={[1.5,0,0]}>
          <torusGeometry args={[0.8,0.2,10,50]}/>
          <customMaterial />
        </mesh>

        <OrbitControls/>
      </Canvas>
    </div>
  )
}
