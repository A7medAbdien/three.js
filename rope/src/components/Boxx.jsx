import { Float, ScrollControls, useHelper } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import gsap from 'gsap';
import { useControls } from 'leva';
import { createRef, forwardRef, useEffect, useRef, useState } from 'react';
import { SpotLightHelper, Vector3 } from 'three';
import { Box } from '../Box';


export const Boxx = forwardRef(({ color, ...props }, ref) => {
    return <>
        <Box ref={ref} {...props} />
    </>
})


