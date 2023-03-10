import { Center, OrbitControls, Text3D, useMatcapTexture } from '@react-three/drei'
import { useFrame } from '@react-three/fiber';
import { Perf } from 'r3f-perf'
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const torusGeometry = new THREE.TorusGeometry(1, 0.6, 16, 32)
const material = new THREE.MeshMatcapMaterial()


export default function Experience() {

    const donuts = useRef([])
    // const donutsGroup = useRef()

    const [matcapTexture] = useMatcapTexture('673B2A_99735C_99593A_3A160E', 256)

    useEffect(() => {
        matcapTexture.encoding = THREE.sRGBEncoding
        matcapTexture.needsUpdate = true

        material.matcap = matcapTexture
        material.needsUpdate = true
    })

    useFrame((state, delta) => {
        // for (const donut of donutsGroup.current.children) {
        //     donut.rotation.y += delta * 0.2
        // }
        for (const donut of donuts.current) {
            donut.rotation.y += delta * 0.2
        }
    })

    return <>

        <Perf position="top-left" />

        <OrbitControls makeDefault />

        <Center>
            <Text3D
                font={'/fonts/helvetiker_regular.typeface.json'}
                size={0.75}
                height={0.2}
                curveSegments={12}
                bevelEnabled
                bevelThickness={0.02}
                bevelSize={0.02}
                bevelOffset={0}
                bevelSegments={5}
            >
                NOT 5ra
                <meshMatcapMaterial matcap={matcapTexture} />
            </Text3D>
        </Center>

        {/* <group ref={donutsGroup}> */}
        {[...Array(100)].map((value, index) =>
            <mesh
                ref={(element) => donuts.current[index] = element}
                key={index}
                position={[
                    (Math.random() - 0.5) * 10,
                    (Math.random() - 0.5) * 10,
                    (Math.random() - 0.5) * 10
                ]}
                scale={0.2 + Math.random() * 0.2}
                rotation={[
                    Math.random() * Math.PI,
                    Math.random() * Math.PI,
                    0
                ]}
                geometry={torusGeometry}
                material={material}
            >
            </mesh>
        )}
        {/* </group> */}
    </>
}