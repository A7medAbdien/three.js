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


const RopeSegment = forwardRef(({ position, component, type, rotationZ, colliderShape }, ref) => {
    return (
        // <RigidBody ref={ref} type={type} position={position} rotation-z={rotationZ} scale={0.15} >
        <RigidBody colliders={"ball"} ref={ref} type={type} rotation-z={rotationZ} position={position}  >
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

export const Rope = ({ anchorLeft, anchorRightPos, length, radius, loss, scale, model }) => {
    const refs = useRef(
        Array.from({ length: length }).map(() => createRef())
    );

    console.log(model.children);

    // useFrame(() => {
    //     const now = performance.now();
    //     const leftAnchor = refs.current[0].current
    //     const rightAnchor = refs.current[refs.current.length - 1].current
    //     const anchorLeftPos = anchorLeft.position
    //     // console.log(anchorLeftPos);
    //     leftAnchor.setNextKinematicTranslation(
    //         anchorLeftPos
    //     );
    //     rightAnchor.setNextKinematicTranslation(
    //         anchorRightPos
    //     );
    // });

    return (
        <group >
            {refs.current.map((ref, i) => {
                // const { x, y } = positions[i]
                // const nextCoordinates = i > length - 1 ? { x: 0.21, y: -1.03 } : positions[i + 1]
                // const previousCoordinates = i == 0 ? { x: -0.83, y: 0.7 } : positions[i - 1]
                // const angle = getAngle(nextCoordinates, previousCoordinates, x, y)
                // const { z: shapeZ } = anchorLeft.position
                const data = model.children[i + 4]
                return (
                    <RopeSegment
                        ref={ref}
                        key={i}
                        position={[data.position.x, data.position.y, data.position.z]}
                        // rotationZ={i == length - 1 ? Math.PI : angle} 
                        component={
                            // < Clone object={anchorLeft} position={[0, 0, 0]} />
                            <primitive object={model.children[i + 4]} position={[0, 0, 0]} />
                        }
                        type={i === 0 || i === refs.current.length + 0 - 1 ? "kinematicPosition" : "dynamic"}
                    // type={"fixed"}
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
