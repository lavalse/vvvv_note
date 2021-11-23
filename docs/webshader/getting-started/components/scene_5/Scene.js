import React, { useRef, useSate, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from "@react-three/drei"


import styles from './Scene.module.css';

function Torus(props) {

  const ref = useRef();

  const [hover, setHover] = useState(false);
  const [click, setClick] = useState(false);

  const handleClick = () =>{
    setClick(!click);
  }

  const hoverStart = () =>{
    setHover(true);
  }

  const hoverEnd = () =>{
    setHover(false);
  }

  useFrame(({clock}) => {
    const a = clock.getElapsedTime();
    ref.current.position.y = Math.sin(a);
    ref.current.rotation.y += 0.01;
  });

  return(
    <mesh 
      ref={ref}
      position={[0,0,0]}
      scale={click ? 1.2 : 1}
      onClick={handleClick}
      onPointerMove={hoverStart}
      onPointerOut={hoverEnd}
      rotation={[0,-1,0]}>
      <torusGeometry args={[1, 0.5, 32, 100]}/>
      <meshBasicMaterial color={hover ? "pink" : "orange"}/>
    </mesh>
  )
}

export default function App() {
  return (
    <div className={styles.canvas}>
      <Canvas 
        camera={{position:[0,0,5]}}
        shadows={true}>

        <ambientLight intensity={0.5} />

        <spotLight 
          position={[10, 10, 10]} 
          angle={0.15} 
          penumbra={1} 
          castShadow={true}
        />

        <Torus />
        
        <OrbitControls/>
        
      </Canvas>
    </div>
  )
}
