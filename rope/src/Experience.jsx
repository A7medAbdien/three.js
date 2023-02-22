import {
    Center,
    Clone,
    ContactShadows,
    Environment,
    Float,
    OrbitControls,
    useGLTF,
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
import { useEffect, useLayoutEffect, useRef } from "react";
import { Model } from "./Model";


function Scene({ nodes }) {
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
                nodes={nodes}
                scale={scale}
                length={length}
                radius={radius}
                loss={loss}
            />
            <ContactShadows
                scale={20}
                blur={0.4}
                opacity={0.2}
                position={[-0, -2, 0]}
            />

        </group>
    );
}


export default function Experience() {

    const { nodes, materials, scene } = useGLTF("/boxWithSb7a.glb");
    const ropeNodes = scene.children.slice(24, 38)
    console.log(ropeNodes);

    useLayoutEffect(() => {
        Object.values(materials).forEach((material) => {
            material.roughness = 0
            // material.metalness = 1
        })
    }, [])

    return (
        <>
            {/* <axesHelper scale={5} /> */}
            <Perf />
            <OrbitControls />

            <Environment preset="studio" />
            <ambientLight intensity={0.5} />
            <Model nodes={nodes} />

            <fog attach="fog" args={["#000", 2, 100]} />
            <group>
                <Physics>
                    <Scene nodes={ropeNodes} />
                    <Debug />
                </Physics>
            </group>


        </>
    );
}

useGLTF.preload("/boxWithSb7a.glb");