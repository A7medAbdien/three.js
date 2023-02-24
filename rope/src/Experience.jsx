import {
    Box,
    Center,
    Clone,
    ContactShadows,
    CubicBezierLine,
    Environment,
    Float,
    OrbitControls,
    QuadraticBezierLine,
    useGLTF,
    useHelper,
} from "@react-three/drei";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import {
    Debug,
    Physics,
    RigidBody,
    useRapier,
    useSphericalJoint,
} from "@react-three/rapier";

import "./style.css";
import { Rope } from "./Rope";
import { Perf } from "r3f-perf";
import { useControls } from "leva";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { createRef, forwardRef, useEffect, useLayoutEffect, useRef, useState } from "react";
import { Model } from "./Model";
import { Quaternion, SpotLightHelper, Vector3 } from "three";


const Scene = ({ nodes, anchor }) => {

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
                anchor={anchor}
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

    const model = createRef()
    const [gravity, setGravity] = useState([0, -9.87, 0])
    const leftAnchorConnector = useRef()
    const rightAnchorConnector = useRef()
    const midAnchorConnector = useRef()
    const midAnchorConnectorMesh = useRef()
    const ball = useRef()
    const ballMesh = useRef()

    /**
     * Leva
    */
    const { position, angle } = useControls({
        position: {
            value: { x: 3, y: 1.5, z: 1.5 },
            stop: 0.1,
            joystick: 'invertY'
        },
        angle: {
            value: 0,
            stop: 0.1,
            min: 0,
            max: 360
        }
    })

    /**
     * Model
    */
    const { nodes, materials, scene } = useGLTF("/boxWithSb7a.glb");
    const ropeNodes = scene.children.slice(24, 38)
    const leftAnchorPos = nodes.Sphere018.position
    const rightAnchorPos = nodes.Sphere031.position
    const midAnchorPos = nodes.Sphere037.position
    const ballPos = nodes.Sphere014.position
    const base = nodes.Sphere036.position
    const pp = new Vector3()
    nodes.Sphere014.getWorldPosition(pp)
    console.log(ballPos);
    useLayoutEffect(() => {
        Object.values(materials).forEach((material) => {
            material.roughness = 0.5
            material.metalness = 0
        })
    }, [])

    useEffect(() => {
        model.current.add(leftAnchorConnector.current)
        model.current.add(rightAnchorConnector.current)
        model.current.add(midAnchorConnectorMesh.current)
    })

    useFrame(() => {
        const leftPos = new Vector3()
        midAnchorConnectorMesh.current.getWorldPosition(leftPos)
        midAnchorConnector.current.setTranslation(new Vector3(
            leftPos.x,
            leftPos.y,
            leftPos.z,
        ))
    })

    return (
        <>
            {/* <Perf position="top-left" /> */}
            <axesHelper scale={5} />
            <OrbitControls />

            {/* <Environment preset="studio" />  */}
            <spotLight
                distance={5}
                angle={0.7}
                position-x={position.x}
                position-y={position.y}
                position-z={position.z}
                intensity={5}
            />
            <spotLight
                distance={5}
                angle={0.7}
                position-x={-position.x}
                position-y={-position.y}
                position-z={-position.z}
                intensity={5}
            />
            <ambientLight intensity={0.25} />
            <fog attach="fog" args={["#000", 2, 100]} />
            <Float
                speed={1} // Animation speed, defaults to 1
                rotationIntensity={1.5} // XYZ rotation intensity, defaults to 1
                floatIntensity={0.5} // Up/down float intensity, works like a multiplier with floatingRange,defaults to 1
                floatingRange={[0.1, 0.7]}
            >
                <Model ref={model} rotation-z={angle * (Math.PI / 180)} nodes={nodes} />
            </Float>
            <group ref={leftAnchorConnector} position={leftAnchorPos} />
            <group ref={rightAnchorConnector} position={rightAnchorPos} />

            <group>
                <Physics gravity={gravity}>
                    {/* <Scene anchor={{ leftAnchorConnector, rightAnchorConnector }} nodes={ropeNodes} /> */}

                    <RigidBody
                        ref={midAnchorConnector}
                        colliders={"ball"}
                        type={"kinematicPosition"} >
                        <group ref={midAnchorConnectorMesh} position={base} />
                    </RigidBody >

                    <RigidBody
                        ref={ball}
                        // colliders={"ball"}
                        type={"dynamic"}
                        position={ballPos}
                    >
                        <group ref={ballMesh}>
                            <mesh
                                castShadow
                                receiveShadow
                                geometry={nodes.Sphere.geometry}
                                material={nodes.Sphere.material}
                                position={[0, -0.17, 0]}
                                rotation={[-0.03, 0, 0]}
                                scale={0.42}
                            />
                            <mesh
                                castShadow
                                receiveShadow
                                geometry={nodes.Sphere014.geometry}
                                material={nodes.Sphere014.material}
                                rotation={[0.03, 0, 0]}
                                scale={0.69}
                            />
                        </group>
                    </RigidBody >
                    <RopeJoint a={ball} b={midAnchorConnector} radius={1.7} loss={0} />
                    <Cable start={midAnchorConnectorMesh} end={ballMesh} />

                    <Debug />
                </Physics>
            </group>
        </>
    );
}

const RopeJoint = ({ a, b, radius, loss }) => {
    const jointRadius = 0.5
    useSphericalJoint(a, b, [
        [0, 0.5, 0],
        [-0.05, 0, 0]
    ]);
    return null;
};

function Cable({ start, end, v1 = new Vector3(), v2 = new Vector3() }) {
    const ref = useRef()
    useFrame(() => {
        const s = start.current.getWorldPosition(v1)
        const e = end.current.getWorldPosition(v2)
        e.y += 0.08
        const m = new Vector3(
            s.x * 1.1,
            s.y * 1.1,
            s.z)
        ref.current.setPoints(s, e, m)

        // console.log(ref.current);
    }, [])
    return <QuadraticBezierLine ref={ref} lineWidth={5} color="#ff2060" />
}

useGLTF.preload("/boxWithSb7a.glb");