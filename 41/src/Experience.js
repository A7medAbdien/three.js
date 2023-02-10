export default function Experience() {
    return (
        <>
            <mesh position-x={-2}>
                <sphereGeometry />
                <meshBasicMaterial color="orange" />
            </mesh>

            <mesh rotation-y={Math.PI / 4} position-x={2} scale={1.5}>
                <boxGeometry scale={1.5} />
                <meshBasicMaterial color="mediumpurple" />
            </mesh>

            <mesh position-y={-1} rotation-x={-Math.PI / 2} scale={10}>
                <planeGeometry />
                <meshBasicMaterial color="greenyellow" />
            </mesh>
        </>
    )
};
