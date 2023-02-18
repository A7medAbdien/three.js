import { OrbitControls } from '@react-three/drei'
import { useControls } from 'leva'

export default function Experience() {

    const { radius, tube, radialSeg, tubSeg, z } = useControls('', {
        z: {
            value: 2.3,
            step: 0.01,
            min: 0,
            max: 3
        },
        radius: {
            value: 1,
            step: 0.1,
            min: 0,
            max: 3
        },
        tube: {
            value: 0.8,
            step: 0.01,
            min: 0,
            max: 5
        },
        radialSeg: {
            value: 30,
            step: 1,
            min: 5,
            max: 100
        },
        tubSeg: {
            value: 30,
            step: 1,
            min: 5,
            max: 100
        },
    })

    return <>

        <OrbitControls makeDefault />

        <axesHelper args={[5, 5, 5]} />

        <mesh
            scale-z={z}
        >
            <torusGeometry args={[radius, tube, radialSeg, tubSeg]} />
            <meshNormalMaterial
                color="red"
            // wireframe
            />
        </mesh>

    </>
}