import React, { useRef, Suspense  } from "react"
import * as THREE from "three"
import { Canvas, extend, useFrame, useLoader } from "@react-three/fiber"
import { OrbitControls, shaderMaterial } from "@react-three/drei"

import mapTexture from "./tv.jpg"

const MyMaterial = shaderMaterial(
  {
    color: new THREE.Color(0.5, 0.5, 0.5), 
    u_resolution: new THREE.Vector2(500,500), 
    u_goto: new THREE.Vector3(0.0,0.0,0.0),
    time: 0,
    map: null,
  },
  ` 
  varying vec2 vUv;
  varying vec3 vNormal;
  uniform vec3 u_goto;
  uniform float time;
  void main()
  {

    vUv = uv;
    vNormal = normal;

    vec4 modelPosition = modelMatrix * vec4(position, 1.0);

    modelPosition.y = sin(modelPosition.x * 3.1415 * 3.0 + time * 2.0 ) * 0.1;

    modelPosition.x = modelPosition.x * 1.5;
    modelPosition.y = modelPosition.y + u_goto.y;

    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;

    gl_Position = projectedPosition;
  }
  `,
  `
    uniform vec3 color;
    uniform vec2 u_resolution;
    uniform sampler2D map;
    varying vec2 vUv;
    varying vec3 vNormal;

    void main() {
      vec2 st = gl_FragCoord.xy/u_resolution.xy;
      vec4 textureColor = texture2D(map, vUv);
      gl_FragColor = textureColor;
    }
  `,
  (self) => {
    self.side = THREE.DoubleSide
  },
)


extend({ MyMaterial })

function MyPlane(){
  
  const fsRef = useRef();

  const map = useLoader(THREE.TextureLoader, mapTexture);

  useFrame(({clock})=>{
    const a = clock.getElapsedTime();
    fsRef.current.uniforms.time.value = a;
  });

  return(
    <mesh position={[0,0,0]} rotation={[-Math.PI / 2,0,0]}>
      <planeGeometry args={[1,1,50,10]}/>
      <myMaterial ref={fsRef} map={map}/>
    </mesh>
  )
};

export default function Scene() {
  return (
    <div style={{width:"500px",height:"500px"}}>
      <Canvas camera={{ position: [0, 1, 1] }}>
        <Suspense fallback={null}>

          <ambientLight intensity={0.5} />

          <spotLight 
            position={[10, 10, 10]} 
            angle={0.15} 
            penumbra={1} 
            castShadow={true}/>

          <MyPlane/>

          <OrbitControls/>
        </Suspense>  
      </Canvas>
    </div>
  )
}
