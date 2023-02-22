import { Box, Clone, Sphere } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import {
    RigidBody,
    useSphericalJoint,
    // vec3
} from "@react-three/rapier";

import { forwardRef, useRef, createRef } from "react";
import { positions } from "./positions";
import { Quaternion, Vector3 } from "three";


const RopeSegment = forwardRef(({ position, component, type, rotationZ }, ref) => {
    return (
        // <RigidBody ref={ref} type={type} position={position} rotation-z={rotationZ} scale={0.15} >
        <RigidBody ref={ref} type={type} rotation-z={rotationZ} position={position}  >
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

const getAngle = (nextCoordinates, previousCoordinates, x, y) => {
    let nextAngle = Math.atan2(nextCoordinates.y - y, nextCoordinates.x - x)
    let previousAngle = Math.atan2(previousCoordinates.y - y, previousCoordinates.x - x)

    return (nextAngle + previousAngle) / 2
}

export const Rope = ({ anchorLeft, length, radius, loss, scale }) => {
    const refs = useRef(
        Array.from({ length: length }).map(() => createRef())
    );

    useFrame(() => {
        const now = performance.now();
        const leftAnchor = refs.current[0].current
        const leftAnchorPosition = leftAnchor.translation()
        const rightAnchor = refs.current[refs.current.length - 1].current
        const rightAnchorPosition = rightAnchor.translation()

        leftAnchor.setNextKinematicTranslation(
            leftAnchor.translation()
        );
        rightAnchor.setNextKinematicTranslation(
            rightAnchor.translation()
        );
    });

    return (
        <group >
            {refs.current.map((ref, i) => {
                const { x, y } = positions[i]
                const nextCoordinates = i > length - 1 ? { x: 0.21, y: -1.03 } : positions[i + 1]
                const previousCoordinates = i == 0 ? { x: -0.83, y: 0.7 } : positions[i - 1]
                const angle = getAngle(nextCoordinates, previousCoordinates, x, y)
                const { z: shapeZ } = anchorLeft.position

                return (
                    <RopeSegment
                        ref={ref}
                        key={i}
                        position={[x, y, shapeZ]}
                        rotationZ={i == length - 1 ? Math.PI : angle}
                        // position={i === 35 ? [0, 0, 0] : [i * 1, 0, 0]}
                        // position={[i * 1, 0, 0]}
                        component={
                            // <Sphere args={[1, 20, 15]}  >
                            //     <meshStandardMaterial color={"red"} />
                            // </Sphere>
                            <Clone object={anchorLeft} position={[0, 0, 0]} />
                        }
                        type={i === 0 || i === refs.current.length + 0 - 1 ? "kinematicPosition" : "dynamic"}
                    // type={i === 0 ? "kinematicPosition" : "dynamic"}
                    // type={"fixed"}
                    />
                );
            })}
            {/**
             * Multiple joints can be initiated dynamically by
             * mapping out wrapped components containing the hooks
             */}
            {refs.current.map(
                (ref, i) =>
                    i > 0 && (
                        <RopeJoint a={refs.current[i]} b={refs.current[i - 1]} shapePosition={anchorLeft.position} radius={radius * scale} loss={loss} key={i} />
                    )
            )}
        </group>
    );
}
