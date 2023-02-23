import { Box, Clone, Sphere } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import {
    RigidBody,
    useSphericalJoint,
    // vec3
} from "@react-three/rapier";

import { forwardRef, useRef, createRef } from "react";
import { Quaternion, Vector3 } from "three";


const RopeSegment = forwardRef(({ position, component, type, rotation }, ref) => {
    return (
        <RigidBody
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

export const Rope = ({ radius, loss, scale, nodes, model }) => {

    const refs = useRef(
        Array.from({ length: nodes.length }).map(() => createRef())
    );

    const leftAnchorPos = { x: -1.11, y: 1.06, z: -0.39 } // from model file
    const rightAnchorPos = { x: 0.05, y: - 0.98, z: -0.39 } // from model file
    const move = (leftAnchor, rightAnchor) => {

        const modelPos = model.current.position
        const leftPos = new Vector3(
            leftAnchorPos.x + modelPos.x,
            leftAnchorPos.y + modelPos.y,
            leftAnchorPos.z + modelPos.z)
        const rightPos = new Vector3(
            rightAnchorPos.x + modelPos.x,
            rightAnchorPos.y + modelPos.y,
            rightAnchorPos.z + modelPos.z)

        leftAnchor.setNextKinematicTranslation(leftPos)
        rightAnchor.setNextKinematicTranslation(rightPos)

    }
    useFrame((state, delta) => {
        const elapsedTime = state.clock.elapsedTime

        const leftAnchor = refs.current[0].current
        const rightAnchor = refs.current[nodes.length - 1].current
        move(leftAnchor, rightAnchor)

        const rotation = new Quaternion(0, 0, Math.sin(elapsedTime * 2) * 5)
        // leftAnchor?.setRotation(rotation)
        // rightAnchor?.setRotation(rotation)
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
                            < Clone object={sphereMesh} position={[0, 0, 0]} />
                            // <primitive object={sphereMesh} position={[0, 0, 0]} />
                        }
                        type={i === 0 || i === refs.current.length + 0 - 1 ? "kinematicPosition" : "dynamic"}
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
