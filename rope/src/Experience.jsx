import { Box } from './Box.jsx'
import { OrbitControls, Sphere, SpotLight, Text, useHelper } from '@react-three/drei';
import { Canvas, useThree } from '@react-three/fiber'
import { Perf } from 'r3f-perf'
import gsap from 'gsap';
import { createRef, useEffect, useRef, useState } from 'react';
import { Arrows } from './components/Arrows';
import { Leva, useControls } from 'leva';
import { SpotLightHelper } from 'three';
import useRunOnce from './useRunOnce.jsx';

const duration = 2.5

const getCoordinates = (angle, distance = 6) => {
    angle *= Math.PI / 180
    let x = -distance * Math.cos(angle) + 1.87,
        y = -distance * Math.sin(angle)

    return { x, y, distance }
}

const roll = (theta, ref) => {
    const { x, y: z } = getCoordinates(theta)
    gsap.to(
        ref.current.rotation,
        {
            duration: duration,
            ease: 'power2.inOut',
            y: x / 2,
        }
    )
    gsap.to(
        ref.current.position,
        {
            duration: duration,
            ease: 'power2.inOut',
            x: x,
            z: z
        }
    )
}


const SceneContainer = () => {
    const count = 5
    const baseTheta = 360 / count
    let boxesTheta = Array.from({ length: count }).map((_, i) => i * baseTheta)
    let isRolling = false

    const refs = useRef(
        Array.from({ length: count }).map(() => createRef())
    )

    const rollAll = (direction) => {
        isRolling = true

        direction ?
            //if true to right, if false to left
            boxesTheta.map((t, i) => { boxesTheta[i] = (t + 360 / 5) % 360 }) :
            boxesTheta.map((t, i) => { boxesTheta[i] = (t - 360 / 5) % 360 })
        refs.current.map((ref, i) => roll(boxesTheta[i], ref))

        setTimeout(() => {
            isRolling = false
        }, duration * 1000);
    }

    useRunOnce({
        fn: () => {
            rollAll(true);
        }
    });

    return <>
        <Arrows
            rightAction={(e) => isRolling ? null : rollAll(true)}
            leftAction={(e) => isRolling ? null : rollAll(false)}
        />

        {refs.current.map((ref, i) => {
            let { x, y } = getCoordinates(i * baseTheta)

            return <Box
                key={i}
                ref={ref}
                position-x={x}
                position-z={y}
                rotation-y={x / 2}
            />
        })}
    </>
}


export default function Experience() {

    /**
     * Leva
    */
    const spotLight = useRef()
    // useHelper(spotLight, SpotLightHelper)
    useEffect(() => {
        spotLight.current.target.updateMatrixWorld()
    })
    const { position, target, decay, penumbra } = useControls('', {
        position:
        {
            value: { x: 3, y: 5.5, z: 0.5 },
            step: 0.01,
            joystick: 'invertY'
        },
        target:
        {
            value: { x: 0.8, y: 0, z: -6 },
            step: 0.01,
            joystick: 'invertY'
        },
        decay:
        {
            value: 2,
            step: 0.01,
            min: 0,
            max: 5
        },
        penumbra:
        {
            value: 1,
            step: 0.01,
            min: 1,
            max: 2
        }
    })

    return <>


        {/* <Perf position="top-left" /> */}
        {/* <axesHelper scale={5} /> */}
        {/* <OrbitControls /> */}
        {/* <Environment preset="studio" />  */}
        {/* <fog attach="fog" args={["#000", 2, 100]} /> */}

        <spotLight ref={spotLight} attenuation={5} decay={decay} penumbra={penumbra} position={[position.x, position.y, position.z]} angle={0.3} distance={15} intensity={10} target-position={[target.x, target.y, target.z]} />
        <ambientLight intensity={0.25} />

        <SceneContainer />

    </>

};
