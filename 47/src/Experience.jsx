import { OrbitControls, Text3D } from '@react-three/drei'
import { Perf } from 'r3f-perf'

export default function Experience() {
    return <>

        <Perf position="top-left" />

        <OrbitControls makeDefault />

        <Text3D font={'/fonts/helvetiker_regular.typeface.json'}>
            I aM NoT hErE
            <meshNormalMaterial />
        </Text3D>
    </>
}