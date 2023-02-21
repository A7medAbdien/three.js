import {
    Center,
    ContactShadows,
    Environment,
    OrbitControls,
} from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import {
    Debug,
    Physics,
} from "@react-three/rapier";

import "./style.css";
import { Rope } from "./Rope";
import { Perf } from "r3f-perf";
import { useControls } from "leva";


// const circleSplit = 36
// const startI = 0
// const radius = 0.6
// const loss = 0
// const length = 18
// const hight = 8
// const width = 8


// const { hight } = useControls('Drop', {

function Scene() {
    const { length, hight, width, startI, loss, circleSplit, radius } = useControls('Drop', {
        length: {
            value: 18,
            step: 1,
            min: 0,
            max: 100
        },
        radius: {
            value: 0.6,
            step: 0.01,
            min: 0.1,
            max: 3
        },
        hight: {
            value: 8,
            step: 0.5,
            min: 5,
            max: 100
        },
        width: {
            value: 8,
            step: 0.5,
            min: 5,
            max: 100
        },
        startI: {
            value: 0,
            step: 1,
            min: 0,
            max: 100
        },
        loss: {
            value: 0,
            step: 1,
            min: 0,
            max: 100
        },
        circleSplit: {
            value: 36,
            step: 1,
            min: 0,
            max: 100
        },
    })


    return (
        <group>
            <Rope
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

            <OrbitControls />
        </group>
    );
}


export default function Experience() {



    return (
        <>
            {/* <Perf /> */}
            <axesHelper scale={5} />
            <Environment preset="studio" />
            <fog attach="fog" args={["#000", 2, 100]} />
            <Physics>
                <Scene />
                <Debug />
            </Physics>

        </>
    );
}