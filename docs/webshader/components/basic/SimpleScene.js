import React from 'react'
import { Canvas } from '@react-three/fiber'

import styles from './MyScene.module.css';

export default function App() {
  return (
    <div className={styles.canvas}>
      <Canvas 
        camera={{position:[0,0,2]}}
        shadows={true}>
        <ambientLight intensity={0.5} />
        <spotLight 
          position={[10, 10, 10]} 
          angle={0.15} 
          penumbra={1} 
          castShadow={true}/>
        <mesh position={[-1,0,0]} castShadow>
          <boxGeometry/>
          <meshStandardMaterial color="Teal"/>
        </mesh>
        <mesh position={[1,0,0]} castShadow>
          <boxGeometry/>
          <meshStandardMaterial color="Teal"/>
        </mesh>
        <mesh 
          position={[0,0.3,1]}
          scale={0.2}
          castShadow>
          <torusGeometry args={[1, 0.5, 32, 100]}/>
          <meshNormalMaterial/>
        </mesh>
        <mesh 
          rotation={[-Math.PI / 2,0,0]} 
          position={[0,-0.5,0]}
          scale={[5,5,1]}
          receiveShadow
          >
          <planeGeometry/>
          <meshStandardMaterial color="orange"/>
        </mesh>
      </Canvas>
    </div>
  )
}
