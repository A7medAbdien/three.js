import { OrbitControls } from '@react-three/drei'
import { Bloom, EffectComposer } from '@react-three/postprocessing'
import { useControls } from 'leva'
import { BlendFunction } from 'postprocessing'
import { Perf } from 'r3f-perf'
import Drunk from './Drunk.jsx'

export default function Experience() {

    const drankProps = useControls('Drunk Effect', {
        frequency: { value: 2, min: 1, max: 20 },
        amplitude: { value: 0.1, min: 0, max: 1 },
    })

    return <>

        <color args={['#ffffff']} attach="background" />

        <Perf position="top-left" />

        <OrbitControls makeDefault />

        <EffectComposer>
            {/* <Bloom mipmapBlur /> */}
            <Drunk
                {...drankProps}
                blendFunction={BlendFunction.DARKEN}
            />
        </EffectComposer>

        <directionalLight castShadow position={[1, 2, 3]} intensity={1.5} />
        <ambientLight intensity={0.5} />

        <mesh castShadow position-x={- 2}>
            <sphereGeometry />
            <meshStandardMaterial color="orange" />
        </mesh>

        <mesh castShadow position-x={2} scale={1.5}>
            <boxGeometry />
            {/* <meshStandardMaterial color={[1.5, 1, 4]} toneMapped={false} /> */}
            <meshStandardMaterial color="red" />
        </mesh>

        <mesh receiveShadow position-y={- 1} rotation-x={- Math.PI * 0.5} scale={10}>
            <planeGeometry />
            <meshStandardMaterial color="greenyellow" />
        </mesh>

    </>
}