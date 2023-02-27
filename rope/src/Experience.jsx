import { Canvas } from '@react-three/fiber'
import Box from './Box.jsx'

export default function Experience() {

    return <>
        <Canvas
            shadows
            camera={{
                position: [0, 0, 5]
            }}
        >
            <Box />
        </Canvas>
    </>

};
