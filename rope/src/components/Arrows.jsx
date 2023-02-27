import { Sphere } from "@react-three/drei"
import { useThree } from "@react-three/fiber"

export const Arrows = ({ rightAction, leftAction }) => {

    const { width } = useThree(state => state.viewport)

    return <>
        <group>
            <Sphere
                color="red"
                // position={[width - Math.min(2, width * 0.6), 0, 0]}
                position={[1, 0, 0]}
                scale={0.25}
                onClick={rightAction} >

            </Sphere>
        </group>
        <group>
            <Sphere
                rotation-y={Math.PI}
                color="red"
                position={[-1, 0, 0]}
                scale={0.25}
                onClick={leftAction} >

            </Sphere>
        </group>
    </>
}