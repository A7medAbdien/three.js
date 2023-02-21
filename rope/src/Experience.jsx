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
            value: 5,
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
            position-z={z}
            position-y={3}
            position-x={-0.3}
            scale={scale}>
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
                {/* <Scene /> */}
                <Debug />
            </Physics>


            <primitive object={model.scene} />
            <group>
                <Clone
                    object={model.scene.children[4]}
                    position-x={-.83}
                    position-y={.4}
                    position-z={-0.36}
                />
                <Clone
                    object={model.scene.children[4]}
                    position-x={-.83}
                    position-y={.1}
                    position-z={-0.36}
                />
                <Clone
                    object={model.scene.children[4]}
                    position-x={-.83}
                    position-y={-.2}
                    position-z={-0.36}
                />
                {/* need R 1 */}
                <Clone
                    object={model.scene.children[4]}
                    position-x={-.81}
                    position-y={-.5}
                    position-z={-0.36}
                />
                {/* need R 2*/}
                <Clone
                    object={model.scene.children[4]}
                    position-x={-.78}
                    position-y={-.8}
                    position-z={-0.36}
                />
                {/* need R 3*/}
                <Clone
                    object={model.scene.children[4]}
                    position-x={-.70}
                    position-y={-1.1}
                    position-z={-0.36}
                />
                {/* need R 3*/}
                <Clone
                    object={model.scene.children[4]}
                    position-x={-.58}
                    position-y={-1.35}
                    position-z={-0.36}
                />
                {/* need R deep*/}
                <Clone
                    object={model.scene.children[4]}
                    position-x={-.4}
                    position-y={-1.58}
                    position-z={-0.36}
                />
                <Clone
                    object={model.scene.children[4]}
                    position-x={-.1}
                    position-y={-1.58}
                    position-z={-0.36}
                />
                <Clone
                    object={model.scene.children[4]}
                    position-x={.11}
                    position-y={-1.36}
                    position-z={-0.36}
                />
                <Clone
                    object={model.scene.children[4]}
                    position-x={.21}
                    position-y={-1.09}
                    position-z={-0.36}
                />
            </group>
            {/* <Clone
                ref={clone}
                object={model.scene.children[4]}
                position-x={position.x}
                position-y={position.y}
                position-z={-0.36}
            /> */}

        </>
    );
}