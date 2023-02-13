import { Environment, Float, OrbitControls, useGLTF } from '@react-three/drei'
import { Perf } from 'r3f-perf'

export default function Experience() {
    const computer = useGLTF('https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/macbook/model.gltf')

    return <>

        <Perf position='top-left' />

        <Environment preset='city' />

        <color args={['#695b5b']} attach="background" />

        <OrbitControls makeDefault />
        <Float rotationIntensity={0.4}>
            <primitive
                object={computer.scene}
                position-y={- 1.2}
            />
        </Float>
    </>
}