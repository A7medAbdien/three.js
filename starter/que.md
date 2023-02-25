I can not get the rotation of a shape drawn by an equation

I am trying to place 3D objects, like a group of boxes or torus, in a shape of a some equation. 

Example (works fine):
let us say that I have 36 box and I want to place them in circle shape in a 2D space.

My process will be:

1. divide 2$\pi$ / 36, to get a fixed $\theta$. Let us call it `angle`
2. a value that ranges between 0 until 36. I called it `i`
3. the coordinates, $x=\cos\theta$, $y=\sin\theta$, where $\theta$ will be `i*angle`
4. rotate each box to be aligned with circle shape, this value will be the `angle` - and in this step is my problem
 
Since I can not add an image, this [link](https://drive.google.com/file/d/18bxzu7qJDhwQip9nAYpQQMaMKLmHgaS-/view?usp=sharing) have a final result of this example

Example (with problem):

I have 36 torus and I want to place them in a drop shape in a 2D space.

My process was:

1. divide 2$\pi$ / 36, to get a fixed $\theta$. Let us call it `angle`
2. a value that ranges between 0 until 36. I called it `i`
3. the coordinates, $x=b\cos\theta(1+\sin\theta)$, $y=a(1+\sin\theta)$, where $\theta$ will be `i*angle`, $a$ is the `hight` and $b$ is the `width`
4. rotate each box to be aligned with drop shape, this value will be the `angle` - NOT aligned with the drop shape

how to get rotation values that aligned toruses with the drop shape

## To check the code , here

Note: any change will have an immediate impact on the result, you do not to press any button to run the code.

I use this function to get the coordinates of x and y..

```js
const getDropCoordinates = (angle, hight = 15, width = 5) => {
    // change to radian
    angle *= Math.PI / 180
    let x = width * Math.cos(angle) * (1 + Math.sin(angle)),
        y = hight * (1 + Math.sin(angle))

    return { x, y, angle }
}
```

and this is my loop to place the tours.

```js
let i = -1
const theta = 360 / 36
return (
<>
    <OrbitControls makeDefault />

    <axesHelper args={[5, 5, 5]} />
    <Center>
    <group scale={scale}>
        {[...Array(36)].map((e, index) => {
        i++
        
        let { x, y, angle } = getDropCoordinates(i * theta, hight, width)
        // let { x, y, angle } = getCircleCoordinates(i * theta, hight, width)
        return (
            <mesh 
             key={index}
             scale-z={z}
             position-x={x}
             position-y={y}
             rotation-x={Math.PI / 2} 
             // Here where I pass the rotation
             rotation-y={angle}
            >
            <torusGeometry args={[radius, tube, radialSeg, tubSeg]} />
            <meshNormalMaterial
                color="red"
                // wireframe
            />
            </mesh>
        )
        })}
    </group>
    </Center>
</>
)
```

you can switch between the circle and drop coordinate by commenting `getDropCoordinates` and un-comment the `getCircleCoordinates`

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

---

## How to call a function on scroll event in React-three-fiber

I am trying to do such a scrolling affect, https://www.fromscout.com/.

what I want to do is..
1. add scroll listener - it seems that there should be a scroll bar to activate this event
2. onScroll call a method to move the object - done
3. at the beginning of the method, I need to remove the listener
4. at the end of the method, I activate the listener 

my code is

Experience.jsx
```js
export default function Experience() {
  const [wheelListener, setWheelListener] = useState()
  const count = 5
  const theta = 360 / count
  return (
    <>
      <Canvas camera={{ position: [0, 20, 5] }} onWheel={(e) => setWheelListener(e)}>
        <ambientLight intensity={5} />
        <axesHelper args={[2, 2, 2]} />

        {[...Array(count)].map((ref, i) => {
          let { x, y } = getCoordinates(i * theta)

          return (
            <Box onWheel={wheelListener} bTheta={i * theta} color={i * theta} key={i} position-x={x} position-z={y} rotation-y={x / 2} />
          )
        })}
      </Canvas>
    </>
  )
}
```

Box.jsx
```js
const Box = ({ onWheel, color, bTheta, ...props }) => {
  const mesh = useRef()
  const [theta, setTheta] = useState(bTheta)

  const roll = (e) => {
    setTheta((theta) => (theta + 360 / 5) % 360)
    const { x, y: z } = getCoordinates(theta)
    gsap.to(mesh.current.rotation, {
      duration: 1.5,
      ease: 'power2.inOut',
      y: x / 2
    })
    gsap.to(mesh.current.position, {
      duration: 1.5,
      ease: 'power2.inOut',
      x: x,
      z: z
    })
  }

  useEffect((onWheel) => {
      roll(onWheel)
    },
    [onWheel]
  )

  return (
    <>
      <mesh ref={mesh} {...props}>
        <boxGeometry args={[2, 2.5, 1]} />
        <meshStandardMaterial metalness={0} roughness={0} color={`rgb(${color + 100},0,0)`} />
      </mesh>
    </>
  )
}
```

https://codesandbox.io/s/r3f-starter-forked-b4yfqx?file=/src/Boxes.js