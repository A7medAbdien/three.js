import { QuadraticBezierLine } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { RigidBody, useSphericalJoint } from "@react-three/rapier";
import { useRef } from "react";
import { Vector3 } from "three";


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
    return <QuadraticBezierLine ref={ref} lineWidth={3} color="red" />
}

export const Cap = ({ anchor, free }) => {
    const { midAnchor, midAnchorMesh, midAnchorNode } = anchor
    const { freeCap, freeCapMesh, freeCapNode } = free


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

            <RigidBody mass={5} restitution={0} ref={freeCap} type={"dynamic"}>
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