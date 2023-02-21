import {
    Center,
    Clone,
    ContactShadows,
    Environment,
    OrbitControls,
} from "@react-three/drei";
import { Canvas, useLoader } from "@react-three/fiber";
import {
    Debug,
    Physics,
} from "@react-three/rapier";

import "./style.css";
import { Rope } from "./Rope";
import { Perf } from "r3f-perf";
import { useControls } from "leva";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useEffect, useRef } from "react";


function Scene() {
    const { z, scale, length, hight, width, startI, loss, circleSplit, radius } = useControls('Drop', {
        z: {
            value: -0.36,
            step: 0.001,
            min: -2,
            max: 0
        },
        scale: {
            value: 0.1,
            step: 0.001,
            min: 0,
            max: 0.2
        },
        length: {
            value: 10,
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
        hight: {
            value: 23,
            step: 0.5,
            min: 5,
            max: 100
        },
        width: {
            value: 12,
            step: 0.5,
            min: 5,
            max: 100
        },
        startI: {
            value: 10,
            step: 1,
            min: 0,
            max: 100
        },
        loss: {
            value: 0.07,
            step: 0.01,
            min: 0,
            max: 1
        },
        circleSplit: {
            value: 35,
            step: 1,
            min: 0,
            max: 100
        },
    })


    return (
        <group
        // position-z={z}
        // position-y={3}
        // position-x={-0.3}
        // scale={scale}
        >
            <Rope
                scale={scale}
                length={length}
                circleSplit={circleSplit}
                startI={startI}
                radius={radius}
                loss={loss}
                hight={hight}
                width={width}
            />
            <ContactShadows
                scale={20}
                blur={0.4}
                opacity={0.2}
                position={[-0, -1.5, 0]}
            />

        </group>
    );
}


export default function Experience() {
    const clone = useRef()

    const { position } = useControls(
        {
            position: {
                value: { "x": .18, "y": - 1.4 },
                step: 0.01,
                joystick: 'invertY'
            }
        }
    )

    const model = useLoader(GLTFLoader, './boxWithSb7a.glb')
    return (
        <>
            {/* <Perf position="top-left" /> */}
            <axesHelper scale={5} />

            <OrbitControls />

            {/* <directionalLight position={[5, 5, 15]} /> */}
            {/* <ambientLight intensity={0.1} /> */}
            <Environment preset="studio" />
            <fog attach="fog" args={["#000", 2, 100]} />
            <Physics>
                <Scene />
                <Debug />
            </Physics>


            {/* <primitive object={model.scene} /> */}

        </>
    );
}