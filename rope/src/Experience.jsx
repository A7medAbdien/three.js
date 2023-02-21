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


const circleSplit = 36
const theta = 360 / circleSplit;
const startI = 0
const radius = 0.6
const loss = 0


function Scene() {
    return (
        <group
            position-x={-5}
        >
            <Rope
                length={20}
                circleSplit={circleSplit}
                startI={startI}
                radius={radius}
                loss={loss}
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