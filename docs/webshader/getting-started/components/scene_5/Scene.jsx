import React, { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Html } from "@react-three/drei"


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
      scale={click ? 1.01 : 1}
      onClick={handleClick}
      onPointerMove={hoverStart}
      onPointerOut={hoverEnd}
      rotation={[0,-1,0]}>
      <torusGeometry args={[1, 0.5, 32, 100]}/>
      <meshStandardMaterial color={click ? "maroon" : hover ? "red" : "orange"}/>
      <Html position={[1, 2, 0]}>
        <div style={{
          backgroundColor:"black",
          width: "250px",
          padding: "12px",
          display: click?"":hover?"":"none"
        }}>
          {click?"But what can I say ...":hover?"I want to say something ...":""}

        </div>
      </Html>
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
        
        <Html position={[-1.2,-3,0]}>
          <div style={{width:"500px"}}>
            <p>
              👆 hover and click me
            </p>
          </div>
        </Html>
      </Canvas>
    </div>
  )
}
