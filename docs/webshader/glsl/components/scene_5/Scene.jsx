import React from "react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"

import Shader_1 from "./Shader_1";
import Shader_2 from "./Shader_2";
import Shader_3 from "./Shader_3";
import Shader_4 from "./Shader_4";
import Shader_5 from "./Shader_5";
import Shader_6 from "./Shader_6";

export default function Scene() {
  return (
    <div style={{width:"500px",height:"500px"}}>
      <Canvas camera={{ position: [0, 0, 2.5] }}>

      <mesh position={[-1.1,1.1,0]}>
        <planeGeometry />
        <Shader_1/>
      </mesh>

      <mesh position={[0,1.1,0]}>
        <planeGeometry />
        <Shader_2 threshold={0.2}/>
      </mesh>

      <mesh position={[1.1,1.1,0]}>
        <planeGeometry />
        <Shader_3 thresholdY={0.1} thresholdX={0.1} gridX={5.0} gridY={5.0}/>
      </mesh>

      <mesh position={[-1.1,0,0]}>
        <planeGeometry />
        <Shader_4 thresholdY={0.2} thresholdX={0.8} gridX={5.0} gridY={5.0}/>
      </mesh>

      <mesh position={[0,0,0]}>
        <planeGeometry />
        <Shader_5 />
      </mesh>

      <mesh position={[1.1,0,0]}>
        <planeGeometry />
        <Shader_6 />
      </mesh>

      <OrbitControls/>

      </Canvas>
    </div>
  )
}
