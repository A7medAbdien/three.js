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


function Scene() {
    return (
        <group>
            <Rope length={37} />
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
            <axesHelper />
            <Environment preset="studio" />
            <fog attach="fog" args={["#000", 2, 100]} />
            <Physics>
                <Scene />
                <Debug />
            </Physics>

        </>
    );
}