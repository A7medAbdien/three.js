import "./style.css"
import { Canvas } from '@react-three/fiber'
import { createRoot } from 'react-dom/client'
import Experience from "./Experience"
import * as THREE from 'three';

const root = createRoot(document.querySelector('#root'))

root.render(
    <Canvas
        // flat
        // gl={{
        //     antialias: true,
        //     toneMapping: THREE.ACESFilmicToneMapping
        // }}
        camera={{
            fov: 45,
            near: 1,
            far: 200,
            position: [3, 2, 6]
        }}
    >
        <Experience />
    </Canvas>
)