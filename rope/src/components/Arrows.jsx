import { Text } from "@react-three/drei"
import { useThree } from "@react-three/fiber"

export const Arrows = ({ rightAction, leftAction }) => {

    const arrow = ">"
    const { width, height } = useThree(state => state.viewport)
    const x = width - Math.min(2, width * 0.6)
    const y = -height + height * 0.55

    return <>
        <group>
            <Text
                color="red"
                position={[x, y, 0]}
                scale={0.25}
                onClick={rightAction} >
                {arrow}
            </Text>
        </group>
        <group>
            <Text
                rotation-y={Math.PI}
                color="red"
                position={[-x, y, 0]}
                scale={0.25}
                onClick={leftAction} >
                {arrow}
            </Text>
        </group>
    </>
}