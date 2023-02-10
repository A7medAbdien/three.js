import { useMemo } from 'react';
import * as THREE from 'three';

export default function CustomObject() {

    const verticesCount = 10 * 3

    const positions = useMemo(() => {
        const positions = new Float32Array(verticesCount * 3)

        for (let i = 0; i < positions.length; i++)
            positions[i] = (Math.random() - 0.5) * 3

        return positions
    }, [])

    return <mesh>
        <bufferGeometry>
            <bufferAttribute
                attach={"attributes-position"}
                count={verticesCount}
                itemSize={3}
                array={positions}
            />
        </bufferGeometry>
        <meshBasicMaterial color="red" side={THREE.DoubleSide} />
    </mesh>
};
