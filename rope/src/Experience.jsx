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
    const midAnchor = useRef()
    const midAnchorMesh = useRef()
    const freeCap = useRef()
    const freeCapMesh = useRef()

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
    const midAnchorNode = nodes.Sphere036
    const freeCapNode = { big: nodes.Sphere014, small: nodes.Sphere }
    useLayoutEffect(() => {
        Object.values(materials).forEach((material) => {
            material.roughness = 0.5
            material.metalness = 0
        })
    }, [])

    useEffect(() => {
        model.current.add(leftAnchorConnector.current)
        model.current.add(rightAnchorConnector.current)
        model.current.add(midAnchorMesh.current)
    })


    return (
        <>
            {/* <Perf position="top-left" /> */}
            {/* <axesHelper scale={5} /> */}
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
                speed={1}
                rotationIntensity={1.5}
                floatIntensity={0.5}
                floatingRange={[0.1, 0.7]}
            >
                <Model ref={model} rotation-z={angle * (Math.PI / 180)} nodes={nodes} />
            </Float>
            <group ref={leftAnchorConnector} position={leftAnchorPos} />
            <group ref={rightAnchorConnector} position={rightAnchorPos} />

            <group>
                <Physics gravity={gravity}>
                    <Scene anchor={{ leftAnchorConnector, rightAnchorConnector }} nodes={ropeNodes} />
                    <Cap anchor={{ midAnchor, midAnchorMesh, midAnchorNode }} free={{ freeCap, freeCapMesh, freeCapNode }} />
                    {/* <Debug /> */}
                </Physics>
            </group>
        </>
    );
}

const Cap = ({ anchor, free }) => {
    const { midAnchor, midAnchorMesh, midAnchorNode } = anchor
    const { freeCap, freeCapMesh, freeCapNode } = free


    const RopeJoint = ({ a, b }) => {
        useSphericalJoint(a, b, [
            [0, 0.5, 0],
            [-0.05, 0, 0]
        ]);
        return null;
    };

    function Cable({ start, end, v1 = new Vector3(), v2 = new Vector3() }) {
        const ref = useRef()
        useFrame(() => {
            const startPoint = start.current.getWorldPosition(v1)
            const endPoint = end.current.getWorldPosition(v2)
            endPoint.y += 0.08
            const midPoint = new Vector3(
                startPoint.x * 1.1,
                startPoint.y * 1.1,
                startPoint.z * 1.1)
            ref.current.setPoints(startPoint, endPoint, midPoint)
        }, [])
        return <QuadraticBezierLine ref={ref} lineWidth={3} color="black" />
    }

    useFrame(() => {
        const pos = new Vector3()
        midAnchorMesh.current.getWorldPosition(pos)
        midAnchor.current.setTranslation(new Vector3(
            pos.x,
            pos.y,
            pos.z,
        ))
    })

    return (
        <>
            <RigidBody ref={midAnchor} colliders={"ball"} type={"kinematicPosition"}>
                <group ref={midAnchorMesh} position={midAnchorNode.position} />
            </RigidBody >

            <RigidBody ref={freeCap} type={"dynamic"}>
                <group ref={freeCapMesh}>
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={freeCapNode.small.geometry}
                        material={freeCapNode.small.material}
                        position={[0, -0.17, 0]}
                        rotation={[-0.03, 0, 0]}
                        scale={0.42}
                    />
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={freeCapNode.big.geometry}
                        material={freeCapNode.big.material}
                        rotation={[0.03, 0, 0]}
                        scale={0.69}
                    />
                </group>
            </RigidBody >
            <RopeJoint a={freeCap} b={midAnchor} radius={1.7} loss={0} />
            <Cable start={midAnchorMesh} end={freeCapMesh} />
        </>
    )



}


useGLTF.preload("/boxWithSb7a.glb");