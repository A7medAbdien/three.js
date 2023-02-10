import "./style.css"
import { Canvas } from '@react-three/fiber'
import { createRoot } from 'react-dom/client'
import Experience from "./Experience"

const root = createRoot(document.querySelector('#root'))

root.render(
    <Canvas
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