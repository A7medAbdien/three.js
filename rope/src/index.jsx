import './style.css'
import ReactDOM from 'react-dom/client'

import Experience from './Experience'
import { Canvas } from '@react-three/fiber'

const root = ReactDOM.createRoot(document.querySelector('#root'))

root.render(
    <Canvas
        shadows
        camera={{
            position: [0, 0, 2]
        }}
    >
        <Experience />
    </Canvas>
)