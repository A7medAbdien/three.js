import Box from './Box.jsx'
import { OrbitControls, Sphere, SpotLight, Text, useHelper } from '@react-three/drei';
import { Canvas, useThree } from '@react-three/fiber'
import { Perf } from 'r3f-perf'
import gsap from 'gsap';
import { createRef, useEffect, useRef, useState } from 'react';
import { Arrows } from './components/Arrows';
import { Leva, useControls } from 'leva';
import { SpotLightHelper } from 'three';


export default function Experience() {

    return <>
        <Canvas
            shadows
            camera={{
                position: [0, 0, 5]
            }}
        >
            <Box />
        </Canvas>
    </>

};
