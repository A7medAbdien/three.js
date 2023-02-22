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

export const Rope = ({ radius, loss, scale, nodes }) => {
    const refs = useRef(
        Array.from({ length: nodes.length }).map(() => createRef())
    );



    useFrame((state, delta) => {
        const now = performance.now();
        const leftAnchor = refs.current[0].current
        const rightAnchor = refs.current[nodes.length - 1].current

        const leftAnchorPos = leftAnchor.translation()
        const rightAnchorPos = rightAnchor.translation()
        // console.log(leftAnchor);

        // leftAnchor.setTranslation(
        //     new Vector3(leftAnchorPos.x, Math.sin(now / 800) * 0.5, leftAnchorPos.z)
        // )
        // rightAnchor.setTranslation(
        //     new Vector3(rightAnchorPos.x, Math.sin(now / 800) * 0.5, rightAnchorPos.z)
        // )
    });
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
