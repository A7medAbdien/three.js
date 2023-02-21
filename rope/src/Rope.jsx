import { Box, Sphere } from "@react-three/drei";
import {
    RigidBody,
    useSphericalJoint
} from "@react-three/rapier";
import { forwardRef, useRef, createRef } from "react";


const getCircleCoordinates = (angle, hight = 8, width = 8) => {
    angle *= Math.PI / 180
    let x = width * Math.cos(angle) * (1 + Math.sin(angle)),
        y = -hight * (1 + Math.sin(angle))

    return { x, y, angle }
}

const RopeSegment = forwardRef(({ position, component, type, rotationZ }, ref) => {
    return (
        <RigidBody ref={ref} type={type} position={position} rotation-z={rotationZ} scale={1.2}>
            {component}
        </RigidBody >
    );
});

const RopeJoint = ({ a, b, radius, loss }) => {
    const jointRadius = radius + loss
    console.log(jointRadius);
    useSphericalJoint(a, b, [
        [0, -jointRadius, 0],
        [0, jointRadius, 0]
    ]);
    return null;
};

const getAngle = (nextCoordinates, previousCoordinates, x, y) => {
    let nextAngle = Math.atan2(nextCoordinates.y - y, nextCoordinates.x - x)
    let previousAngle = Math.atan2(previousCoordinates.y - y, previousCoordinates.x - x)

    return (nextAngle + previousAngle) / 2
}

export const Rope = ({ length, hight, width, circleSplit, startI, radius, loss, scale }) => {
    const refs = useRef(
        Array.from({ length: length }).map(() => createRef())
    );

    return (
        <group>
            {refs.current.map((ref, i) => {
                i += startI
                const theta = 360 / circleSplit;
                let { x, y } = getCircleCoordinates((i) * theta, hight, width);
                let nextCoordinates = getCircleCoordinates((i + 1) * theta, hight, width)
                let previousCoordinates = getCircleCoordinates((i - 1) * theta, hight, width)
                let angle = getAngle(nextCoordinates, previousCoordinates, x, y)
                return (
                    <RopeSegment
                        ref={ref}
                        key={i}
                        position={[x, y, 0]}
                        rotationZ={angle}
                        // position={i === 35 ? [0, 0, 0] : [i * 1, 0, 0]}
                        // position={[i * 1, 0, 0]}
                        component={
                            <Sphere args={[radius]} >
                                <meshStandardMaterial color={"red"} />
                            </Sphere>
                        }
                        // type={i === startI || i === refs.current.length + startI - 1 ? "kinematicPosition" : "dynamic"}
                        // type={i === startI ? "kinematicPosition" : "dynamic"}
                        type={"fixed"}
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
                        <RopeJoint a={refs.current[i]} b={refs.current[i - 1]} radius={radius * scale} loss={loss} key={i} />
                    )
            )}
        </group>
    );
}
