import './style.css'
import ReactDOM from 'react-dom/client'

import Experience from './Experience'
import { Canvas } from '@react-three/fiber'
import { Leva } from 'leva'

const root = ReactDOM.createRoot(document.querySelector('#root'))

root.render(
    <>
        <Leva hidden />
        <Canvas
            shadows
            camera={{
                position: [0, 0, 5]
            }}
        >
            <Experience />
        </Canvas>
    </>
)