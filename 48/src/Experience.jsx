import { Center, OrbitControls, shaderMaterial, Sparkles, useGLTF, useTexture } from '@react-three/drei'
import * as THREE from 'three';
import portalVertexShader from './shaders/portal/vertex.js'
import portalFragmentShader from './shaders/portal/fragment.js'
import { extend, useFrame } from '@react-three/fiber';
import { useRef } from 'react';

const PortalMaterial = shaderMaterial(
    {
        uTime: 0,
        uColorStart: new THREE.Color('#ffffff'),
        uColorEnd: new THREE.Color('#000000')
    },
    portalVertexShader,
    portalFragmentShader
)

extend({ PortalMaterial })

export default function Experience() {

    const portalMaterial = useRef()
    useFrame((state, delta) => {
        portalMaterial.current.uTime += delta
    })

    const { nodes } = useGLTF('./model/portal.glb')
    // console.log(nodes);

    const bakedTexture = useTexture('./model/baked.jpg')
    bakedTexture.flipY = false

    return <>
        <color args={['#201919']} attach="background" />

        <OrbitControls makeDefault />

        <Center>
            <mesh geometry={nodes.baked.geometry}>
                <meshBasicMaterial map={bakedTexture} />
            </mesh>

            <mesh
                geometry={nodes.poleLightA.geometry}
                position={nodes.poleLightA.position}
            >
                <meshBasicMaterial color={'#ffffe5'} />
            </mesh>

            <mesh
                geometry={nodes.poleLightB.geometry}
                position={nodes.poleLightB.position}
            >
                <meshBasicMaterial color={'#ffffe5'} />
            </mesh>

            <mesh
                geometry={nodes.portalLight.geometry}
                position={nodes.portalLight.position}
                rotation={nodes.portalLight.rotation}
            >
                <portalMaterial ref={portalMaterial} />
            </mesh>

            <Sparkles
                size={5}
                scale={[4, 2, 4]}
                position-y={1}
                speed={0.5}
                count={40}
            />

        </Center>
    </>
}