import {
    Box,
    Center,
    Clone,
    ContactShadows,
    Environment,
    Float,
    OrbitControls,
    useGLTF,
    useHelper,
} from "@react-three/drei";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import {
    Debug,
    Physics,
    useRapier,
} from "@react-three/rapier";

import "./style.css";
import { Rope } from "./Rope";
import { Perf } from "r3f-perf";
import { useControls } from "leva";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Model } from "./Model";
import { SpotLightHelper } from "three";


function Scene({ nodes }) {
    const { scale, loss, radius } = useControls('Drop', {
        scale: {
            value: 0.1,
            step: 0.001,
            min: 0,
            max: 0.2
        },
        length: {
            value: 13,
            step: 1,
            min: 0,
            max: 100
        },
        radius: {
            value: 1,
            step: 0.01,
            min: 0.1,
            max: 3
        },
        loss: {
            value: 0.05,
            step: 0.01,
            min: 0,
            max: 1
        },
    })

    return (
        <group>
            <Rope
                nodes={nodes}
                scale={scale}
                radius={radius}
                loss={loss}
            />
            <ContactShadows
                scale={20}
                blur={0.4}
                opacity={0.5}
                position={[-0, -2, 0]}
            />

        </group>
    );
}


export default function Experience() {

    const [gravity, setGravity] = useState([0, -9.87, 0])
    const testBox = useRef()

    const { position } = useControls({
        position: {
            value: { x: 2.5, y: 2.5, z: 2 },
            stop: 0.1,
            joystick: 'invertY'
        }
    })

    const { nodes, materials, scene } = useGLTF("/boxWithSb7a.glb");
    const ropeNodes = scene.children.slice(24, 38)

    useLayoutEffect(() => {
        Object.values(materials).forEach((material) => {
            material.roughness = 0.5
            material.metalness = 0
        })
    }, [])


    useFrame((state, delta) => {
        const elapsedTime = state.clock.elapsedTime
        setGravity([
            (Math.sin(elapsedTime) * - 9.87),
            -Math.abs((Math.cos(elapsedTime) * - 9.87)),
            0
        ])
        // testBox.current.position = [Math.sin(elapsedTime), Math.cos(elapsedTime), 0]
        testBox.current.position.x = (Math.sin(elapsedTime) * - 9.87) - 2
        testBox.current.position.y = -Math.abs((Math.cos(elapsedTime) * - 9.87)) - 2
    })


    return (
        <>
            <axesHelper scale={5} />
            {/* <Perf position="top-left" /> */}
            <OrbitControls />

            {/* <Environment preset="studio" /> */}
            <spotLight
                distance={5}
                angle={0.7}
                position-x={position.x}
                position-y={position.y}
                position-z={position.z}
                intensity={5}
            />
            <ambientLight intensity={0.25} />
            {/* <Model nodes={nodes} /> */}

            <fog attach="fog" args={["#000", 2, 100]} />
            <group>
                <Physics
                    gravity={gravity}
                >
                    <Scene nodes={ropeNodes} />
                    <Debug />
                </Physics>
            </group>

            <Box ref={testBox} />

        </>
    );
}

useGLTF.preload("/boxWithSb7a.glb");