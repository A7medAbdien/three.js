import { Center, Html, OrbitControls } from '@react-three/drei'
import { useControls } from 'leva'
import { Perf } from 'r3f-perf'
import { useEffect, useRef } from 'react'
import { rotations } from './rotation'

export default function Experience() {

    const { radius, tube, radialSeg, tubSeg, z } = useControls('pice', {
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
            value: 15,
            step: 1,
            min: 5,
            max: 100
        },
        tubSeg: {
            value: 10,
            step: 1,
            min: 5,
            max: 100
        },
    })

    const { hight, width, num, scale, fit } = useControls('Drop', {
        hight: {
            value: 40,
            step: 0.5,
            min: 5,
            max: 100
        },
        width: {
            value: 15,
            step: 0.5,
            min: 5,
            max: 100
        },
        num: {
            value: 39,
            step: 1,
            min: 5,
            max: 100
        },
        scale: {
            value: 0.05,
            step: 0.001,
            min: 0,
            max: 1
        },
        fit: {
            value: 1.25,
            step: 0.001,
            min: 0,
            max: 3
        }
    })

    let i = Number(num)
    const theta = 360 / (36 + 10)
    return <>
        <Perf position='top-left' />
        <OrbitControls makeDefault />

        <axesHelper args={[5, 5, 5]} />
        <Center>
            <group scale={scale}>
                {[...Array(36)].map((e, index) => {
                    i++
                    let { x, y } = getDropCoordinates(i * theta, hight, width)
                    return <mesh
                        key={index}
                        scale-z={z}
                        position-x={x}
                        position-y={y}
                        rotation-x={Math.PI / 2}
                        rotation-y={rotations[i - 40]}
                        lookAt={[0, 0, 0]}
                    >
                        <Html>
                            {/* {i - 40} */}
                        </Html>
                        <torusGeometry args={[radius, tube, radialSeg, tubSeg]} />
                        <meshNormalMaterial
                            color="red"
                        // wireframe
                        />
                    </mesh>
                })}
            </group>
        </Center>
    </>

}

const getDropCoordinates = (angle, hight = 15, width = 5) => {
    angle *= Math.PI / 180
    let x = width * Math.cos(angle) * (1 + Math.sin(angle)),
        y = hight * (1 + Math.sin(angle))

    return { x, y, angle }
}

const getCircleCoordinates = (angle, distance = 25) => {
    angle *= Math.PI / 180
    let x = distance * Math.cos(angle),
        y = distance * Math.sin(angle)

    return { x, y, angle, distance }
}