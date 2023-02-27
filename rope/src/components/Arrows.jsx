import { Text } from "@react-three/drei"
import { useThree } from "@react-three/fiber"

export const Arrows = ({ rightAction, leftAction }) => {

    const arrow = ">"
    const { width } = useThree(state => state.viewport)

    return <>
        <group>
            <Text
                color="red"
                position={[width - Math.min(2, width * 0.6), 0, 0]}
                scale={0.25}
                onClick={rightAction} >
                {arrow}
            </Text>
        </group>
        <group>
            <Text
                rotation-y={Math.PI}
                color="red"
                position={[-(width - Math.min(2, width * 0.6)), 0, 0]}
                scale={0.25}
                onClick={leftAction} >
                {arrow}
            </Text>
        </group>
    </>
}