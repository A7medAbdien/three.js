import { Box, Sphere } from "@react-three/drei";
import {
    RigidBody,
    useSphericalJoint
} from "@react-three/rapier";
import { forwardRef, useRef, createRef } from "react";



const RopeSegment = forwardRef(({ position, component, type, rotationZ }, ref) => {
    return (
        <RigidBody ref={ref} type={type} position={position} rotation-z={rotationZ} scale={1.2}>
            {component}
        </RigidBody >
    );
});


const RopeJoint = ({ a, b }) => {
    useSphericalJoint(a, b, [
        [0, -0.7, 0],
        [0, 0.7, 0]
    ]);
    return null;
};

const getCircleCoordinates = (angle, distance = 8) => {
    angle *= Math.PI / 180;
    let x = distance * Math.cos(angle),
        y = distance * Math.sin(angle);

    return { x, y, angle, distance };
};

export const Rope = ({ length }) => {
    const refs = useRef(
        Array.from({ length: length }).map(() => createRef())
    );

    const theta = 360 / 36;
    return (
        <group>
            {refs.current.map((ref, i) => {
                let { x, y, angle } = getCircleCoordinates((i) * theta);
                return (
                    <RopeSegment
                        ref={ref}
                        key={i}
                        position={[x, y, 0]}
                        rotationZ={angle}
                        // position={i === 35 ? [0, 0, 0] : [i * 1, 0, 0]}
                        // position={[i * 1, 0, 0]}
                        component={
                            <Sphere args={[0.6]}>
                                <meshStandardMaterial />
                            </Sphere>
                        }
                        type={i === 0 || i === 19 ? "kinematicPosition" : "dynamic"}
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
                        <RopeJoint a={refs.current[i]} b={refs.current[i - 1]} key={i} />
                    )
            )}
        </group>
    );
}
