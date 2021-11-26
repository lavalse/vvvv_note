import React from "react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"

import Shader_1 from "./Shader_1";
import Shader_2 from "./Shader_2";

export default function Scene() {
  return (
    <div style={{width:"500px",height:"500px"}}>
      <Canvas camera={{ position: [0, 0, 2] }}>

      <mesh position={[-1,0,0]}>
        <planeGeometry />
        <Shader_1/>
      </mesh>

      <mesh position={[0,0,0]}>
        <planeGeometry />
        <Shader_2 threshold={0.6}/>
      </mesh>

      <OrbitControls/>

      </Canvas>
    </div>
  )
}
