import { OrbitControls } from '@react-three/drei'
import { useControls } from 'leva'
import { Perf } from 'r3f-perf'

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

    let i = -1
    const theta = 360 / 36
    return <>
        <Perf position='top-left' />
        <OrbitControls makeDefault />

        <axesHelper args={[5, 5, 5]} />
        <group scale={0.2}>
            {[...Array(36)].map((e, index) => {
                i++
                let { x, y } = getCoordinates(i * theta)
                return <mesh
                    key={index}
                    scale-z={z}
                    position-x={x}
                    position-y={y}
                // rotation-x={3.6 * i}
                // rotation-y={3.6 * i}
                >
                    <torusGeometry args={[radius, tube, radialSeg, tubSeg]} />
                    <meshNormalMaterial
                        color="red"
                    // wireframe
                    />
                </mesh>
            })}
        </group>
    </>
}

const getCoordinates = (angle, distance = 25) => {
    angle *= Math.PI / 180
    let x = -distance * Math.cos(angle),
        y = -distance * Math.sin(angle)

    return { x, y, distance }
}