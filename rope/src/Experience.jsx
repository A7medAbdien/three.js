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


function Scene({ model }) {
    const { scale, length, loss, radius } = useControls('Drop', {
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
                model={model}
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
    const rope = useRef()

    const { position } = useControls(
        {
            position: {
                value: { "x": .18, "y": - 1.4 },
                step: 0.01,
                joystick: 'invertY'
            }
        }
    )


    const model = useLoader(GLTFLoader, './boxWithSb7a2.glb')
    console.log(model.scene.children);
    const modelRef = useRef()
    useFrame((state, delta) => {
        // rope.current.rotation.x += Math.sin(state.clock.elapsedTime) * 0.002
    })

    // console.log(model.scene.children)
    return (
        <>
            <axesHelper scale={5} />

            <OrbitControls />
            <Environment preset="studio" />
            <fog attach="fog" args={["#000", 2, 100]} />

            <Physics
            // gravity={[9.81, 0, 0]}
            >
                <group ref={rope} >
                    <Scene model={model.scene} />
                    <Debug />
                    <primitive
                        object={model.scene}
                    />
                </group>

            </Physics>


        </>
    );
}