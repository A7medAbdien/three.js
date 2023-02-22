import {
    Center,
    Clone,
    ContactShadows,
    Environment,
    OrbitControls,
} from "@react-three/drei";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
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


function Scene({ anchorLeft, anchorRightPos }) {
    const { scale, length, loss, radius } = useControls('Drop', {
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
        loss: {
            value: 0.07,
            step: 0.01,
            min: 0,
            max: 1
        },
    })

    console.log(anchorLeft);
    return (
        <group>
            <Rope
                anchorLeft={anchorLeft}
                anchorRightPos={anchorRightPos}
                scale={scale}
                length={length}
                radius={radius}
                loss={loss}
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
    const modelRef = useRef()
    useFrame((state, delta) => {
        // modelRef.current.rotation.y += Math.sin(delta)
        // console.log(modelRef.current);
    })
    const anchorLeft = model.scene.children[16]
    const anchorRightPos = model.scene.children[17].position
    // console.log(model.scene.children)
    return (
        <>
            {/* <Perf position="top-left" /> */}
            <axesHelper scale={5} />

            <OrbitControls />

            {/* <directionalLight position={[5, 5, 15]} /> */}
            {/* <ambientLight intensity={0.1} /> */}
            <Environment preset="studio" />
            <fog attach="fog" args={["#000", 2, 100]} />
            <group>
                <Physics>
                    <Scene anchorLeft={anchorLeft} anchorRightPos={anchorRightPos} />
                    <Debug />
                </Physics>
                <primitive
                    ref={modelRef}
                    object={model.scene}
                />
            </group>

        </>
    );
}