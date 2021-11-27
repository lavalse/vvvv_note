import * as THREE from 'three'
import React, { useRef, useMemo, useState, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import niceColors from 'nice-color-palettes'
import { OrbitControls } from "@react-three/drei"


const tempObject = new THREE.Object3D()
const tempColor = new THREE.Color()
const data = Array.from({ length: 480000 }, () => ({ color: niceColors[17][Math.floor(Math.random() * 5)], scale: 1 }))

function Boxes() {
  const [hovered, set] = useState()
  const colorArray = useMemo(() => Float32Array.from(new Array(480000).fill().flatMap((_, i) => tempColor.set(data[i].color).toArray())), [])
  const meshRef = useRef()
  const prevRef = useRef()
  useEffect(() => void (prevRef.current = hovered), [hovered])
  useFrame(() => {
    let i = 0
    for (let x = 0; x < 800; x++)
      for (let y = 0; y < 600 ; y++)
        for (let z = 0; z < 1; z++) {
          const id = i++
          tempObject.position.set(400-x, 300-y, z)
          tempObject.updateMatrix()
          meshRef.current.setMatrixAt(id, tempObject.matrix)
        }
    meshRef.current.instanceMatrix.needsUpdate = true
  })
  return (
    <instancedMesh ref={meshRef} args={[null, null, 480000]} onPointerMove={(e) => set(e.instanceId)} onPointerOut={(e) => set(undefined)}>
      <planeGeometry>
        <instancedBufferAttribute attachObject={['attributes', 'color']} args={[colorArray, 3]} />
      </planeGeometry>
      <meshBasicMaterial vertexColors={THREE.VertexColors}/>
    </instancedMesh>
  )
}

export default function App(){
  return(
    <div style={{width:"800px",height:"800px"}}>
      <Canvas
      linear
      gl={{ antialias: false, alpha: false }}
      camera={{ position: [0, 0, 700], near: 1, far: 20000 }}>
        <Boxes />
        <OrbitControls />
      </Canvas>
    </div>
    
  )
}

