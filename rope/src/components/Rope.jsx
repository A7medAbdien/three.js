import { Clone } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import {
    RigidBody,
    useSphericalJoint,
    // vec3
} from "@react-three/rapier";

import { forwardRef, useRef, createRef } from "react";
import { Vector3 } from "three";


const RopeSegment = forwardRef(({ position, component, type, rotation }, ref) => {
    return (
        <RigidBody
            restitution={0}
            ref={ref}
            colliders={"ball"}
            type={type}
            rotation={rotation}
            position={position}
        >
            {component}
        </RigidBody >
    );
});

const RopeJoint = ({ a, b, radius, loss }) => {
    const jointRadius = radius + loss
    useSphericalJoint(a, b, [
        [0, jointRadius, 0],
        [0, -jointRadius, 0]
    ]);
    return null;
};

export const Rope = ({ radius, loss, scale, nodes, anchor }) => {

    const refs = useRef(
        Array.from({ length: nodes.length }).map(() => createRef())
    );

    useFrame(() => {
        const { leftAnchorConnector, rightAnchorConnector } = anchor
        const leftPos = new Vector3()
        leftAnchorConnector.current.getWorldPosition(leftPos)
        refs.current[0].current.setTranslation(new Vector3(
            leftPos.x,
            leftPos.y,
            leftPos.z,
        ))
        const rightPos = new Vector3()
        rightAnchorConnector.current.getWorldPosition(rightPos)
        refs.current[refs.current.length - 1].current.setTranslation(new Vector3(
            rightPos.x,
            rightPos.y,
            rightPos.z,
        ))

    })
    return (
        <group >
            {refs.current.map((ref, i) => {
                const sphereMesh = nodes[i]
                return (
                    <RopeSegment
                        ref={ref}
                        key={i}
                        position={[sphereMesh.position.x, sphereMesh.position.y, sphereMesh.position.z]}
                        rotation={[sphereMesh.rotation.x, sphereMesh.rotation.y, sphereMesh.rotation.z]}
                        component={
                            < Clone object={nodes[1]} position={[0, 0, 0]} />
                            // <primitive object={sphereMesh} position={[0, 0, 0]} />
                        }
                        type={i === 0 || i === refs.current.length - 1 ? "kinematicPosition" : "dynamic"}
                    />
                );
            })}

            {refs.current.map(
                (ref, i) =>
                    i > 0 && (
                        <RopeJoint a={refs.current[i]} b={refs.current[i - 1]} radius={radius * scale} loss={loss} key={i} />
                    )
            )}
        </group>
    );
}
