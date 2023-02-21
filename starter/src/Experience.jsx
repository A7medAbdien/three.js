import { Center, Html, OrbitControls } from '@react-three/drei'
import { useControls } from 'leva'
import { useEffect, useRef } from 'react'

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
        }
    })

    const { hight, width, startI, scale, keepEmpty } = useControls('Drop', {
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
        startI: {
            value: 38,
            step: 1,
            min: -1,
            max: 100
        },
        keepEmpty: {
            value: 9,
            step: 1,
            min: 0,
            max: 100
        },
        scale: {
            value: 0.05,
            step: 0.001,
            min: 0,
            max: 1
        }
    })

    let i = Number(startI)
    // let i = -1
    const theta = 360 / (36 + keepEmpty)
    const getAngle = (nextCoordinates, previousCoordinates, x, y) => {
        let nextAngle = Math.atan2(nextCoordinates.y - y, nextCoordinates.x - x)
        let previousAngle = Math.atan2(previousCoordinates.y - y, previousCoordinates.x - x)

        return (nextAngle + previousAngle) / 2
    }

    return (
        <>
            <OrbitControls makeDefault />

            <axesHelper args={[5, 5, 5]} />
            <Center>
                <group scale={scale}>
                    {[...Array(36)].map((e, index) => {
                        i++
                        // let getShapeCoordinates = getCircleCoordinates
                        let getShapeCoordinates = getDropCoordinates
                        let { x, y } = getShapeCoordinates(i * theta, hight, width)
                        let nextCoordinates = getShapeCoordinates((i + 1) * theta, hight, width)
                        let previousCoordinates = getShapeCoordinates((i - 1) * theta, hight, width)
                        let angle = getAngle(nextCoordinates, previousCoordinates, x, y)
                        // console.log(a)

                        return (
                            <mesh
                                key={index}
                                scale-z={z}
                                position-x={x}
                                position-y={y}
                                rotation-x={Math.PI / 2}
                                // Here where I pass the rotation
                                rotation-y={angle}>
                                <torusGeometry args={[radius, tube, radialSeg, tubSeg]} />
                                <meshNormalMaterial
                                    color="red"
                                // wireframe
                                />
                            </mesh>
                        )
                    })}
                </group>
            </Center>
        </>
    )
}

const getDropCoordinates = (angle, hight = 15, width = 5) => {
    // change angle to radion
    angle *= Math.PI / 180
    let x = width * Math.cos(angle) * (1 + Math.sin(angle)),
        y = hight * (1 + Math.sin(angle))

    return { x, y, angle }
}

const getCircleCoordinates = (angle, hight = 25, width = hight) => {
    angle *= Math.PI / 180
    let x = width * Math.cos(angle),
        y = hight * Math.sin(angle)

    return { x, y, angle, distance: hight }
}
