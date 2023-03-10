import { Float, Html, MeshReflectorMaterial, OrbitControls, PivotControls, Text, TransformControls } from "@react-three/drei";
import { useRef } from "react";

export default function Experience() {

    const cube = useRef()
    const sphere = useRef()

    return (
        <>
            <OrbitControls makeDefault />

            <directionalLight position={[1, 2, 3]} intensity={1.5} />
            <ambientLight intensity={0.5} />

            <PivotControls
                anchor={[0, 0, 0]}
                depthTest={false}
                fixed
                scale={100}
            >
                <mesh ref={sphere} position-x={-2}>
                    <sphereGeometry />
                    <meshStandardMaterial color="orange" />
                    <Html
                        position={[1, 1, 0]}
                        wrapperClass="label"
                        center
                        distanceFactor={6}
                        occlude={[cube, sphere]}
                    >
                        This's a sphere 👌
                    </Html>
                </mesh>
            </PivotControls>
            <Float
                speed={3}
                floatIntensity={2}
            >
                <mesh ref={cube} rotation-y={Math.PI / 4} position-x={2} scale={1.5}>
                    <boxGeometry scale={1.5} />
                    <meshStandardMaterial color="mediumpurple" />
                </mesh>
            </Float>
            <TransformControls object={cube} />

            <mesh position-y={-1} rotation-x={-Math.PI / 2} scale={10}>
                <planeGeometry />
                {/* <meshStandardMaterial color="greenyellow" /> */}
                <MeshReflectorMaterial
                    resolution={512}
                    blur={[1000, 1000]}
                    mixBlur={1}
                    mirror={0.75}
                    color="greenyellow"
                />
            </mesh>

            <Float
                speed={3}
                floatIntensity={5}
            >
                <Text
                    font="./bangers-v20-latin-regular.woff"
                    fontSize={1}
                    color="salmon"
                    position-y={2}
                    maxWidth={2}
                    textAlign="center"
                >
                    I am Amazed
                </Text>
            </Float>
        </>
    )
};
