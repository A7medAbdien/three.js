export default function Experience() {

    return (
        <>
            <directionalLight position={[1, 2, 3]} intensity={1.5} />
            <ambientLight intensity={0.5} />

            <group>
                <mesh position-x={-2}>
                    <sphereGeometry />
                    <meshStandardMaterial color="orange" />
                </mesh>

                <mesh rotation-y={Math.PI / 4} position-x={2} scale={1.5}>
                    <boxGeometry scale={1.5} />
                    <meshStandardMaterial color="mediumpurple" />
                </mesh>
            </group>

            <mesh position-y={-1} rotation-x={-Math.PI / 2} scale={10}>
                <planeGeometry />
                <meshStandardMaterial color="greenyellow" />
            </mesh>
        </>
    )
};
