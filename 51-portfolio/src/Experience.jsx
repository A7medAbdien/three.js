import { ContactShadows, Environment, Float, Html, OrbitControls, PresentationControls, Text, useGLTF } from '@react-three/drei'
import { useControls } from 'leva'
import { Perf } from 'r3f-perf'

export default function Experience() {
    const computer = useGLTF('https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/macbook/model.gltf')

    const { background } = useControls({
        'background': '#695b5b'
    })

    return <>

        <Perf position='top-left' />

        <Environment preset='city' />

        <color args={[background]} attach="background" />

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
                >
                    <rectAreaLight
                        width={2.5}
                        height={1.65}
                        intensity={65}
                        color={'#00b3c7'}
                        rotation={[0.1, Math.PI, 0]}
                        position={[0, 0.55, -1.15]}
                    />
                    <Html
                        transform
                        wrapperClass='htmlScreen'
                        distanceFactor={1.17}
                        position={[0, 1.56, -1.4]}
                        rotation-x={-0.256}
                    >
                        <iframe src='https://hazmy.vercel.app/' />
                    </Html>
                    <Text
                        font='./bangers-v20-latin-regular.woff'
                        fontSize={1}
                        position={[2, 1.75, 0.25]}
                        rotation-y={-1.25}
                        maxWidth={2}
                        textAlign="center"
                    >
                        GiMMy
                    </Text>
                </primitive>
            </Float>
        </PresentationControls>

        <ContactShadows
            position-y={-1.4}
            opacity={0.4}
            scale={5}
            blur={2.4}
        />
    </>
}