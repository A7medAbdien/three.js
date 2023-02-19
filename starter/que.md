Hi,

I am trying to place the objects based on an equation, so let us say that I want to draw a circle.

so I use this function to get the coordinates of x and y..

```js
const getCircleCoordinates = (angle, distance = 25) => {
    angle *= Math.PI / 180
    let x = distance * Math.cos(angle),
        y = distance * Math.sin(angle)

    return { x, y, angle, distance }
}
```

and this is my loop to place the objects.

```js
let i = -1
const theta = 360 / (36)
return <>
    <axesHelper args={[5, 5, 5]} />
    <Center>
        <group scale={scale}>
            {[...Array(36)].map((e, index) => {
                i++
                let { x, y, angle } = getCircleCoordinates(i * theta, hight, width)
                return <mesh
                    key={index}
                    scale-z={z}
                    position-x={x}
                    position-y={y}
                    rotation-x={Math.PI / 2}
                    rotation-y={angle}
                    lookAt={[0, 0, 0]}
                >
                    <torusGeometry args={[radius, tube, radialSeg, tubSeg]} />
                    <meshNormalMaterial
                        color="red"
                    // wireframe
                    />
                </mesh>
            })}
        </group>
    </Center>
</>
```

and this is my result

![circle](Screenshot%202023-02-19%20041635.png)

Now my issue is with the rotation, in the circle the rotation was simply the angle in radian, but what If I want to draw a square or triangle?

In my case, I want to draw a drop..

and this is the [function](https://mathworld.wolfram.com/PiriformCurve.html)...

```js
const getDropCoordinates = (angle, hight = 15, width = 5) => {
    angle *= Math.PI / 180
    let x = width * Math.cos(angle) * (1 + Math.sin(angle)),
        y = hight * (1 + Math.sin(angle))

    return { x, y, angle }
}
```

and this is the result when I use the angle for the rotation

![drop](Screenshot%202023-02-19%20042226.png)

Please check my [code](https://codesandbox.io/s/equation-rotation-62o76y)