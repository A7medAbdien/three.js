import { Environment, Float, OrbitControls, PresentationControls, useGLTF } from '@react-three/drei'
import { Perf } from 'r3f-perf'

export default function Experience() {
    const computer = useGLTF('https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/macbook/model.gltf')

    return <>

        <Perf position='top-left' />

        <Environment preset='city' />

        <color args={['#695b5b']} attach="background" />

        <PresentationControls
            global
            polar={[-0.4, 0.2]}
            azimuth={[-1, 0.75]}
            config={{ mass: 2, tension: 400 }}
            snap={{ mass: 4, tension: 400 }}
        >
            <Float rotationIntensity={0.4}>
                <primitive
                    object={computer.scene}
                    position-y={- 1.2}
                />
            </Float>
        </PresentationControls>
    </>
}