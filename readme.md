# Three.js Journey

## Setup
Do
```js

```
wnload [Node.js](https://nodejs.org/en/download/).
Run this followed commands:

``` bash
# Install dependencies (only the first time)
npm install

# Run the local server at localhost:8080
npm run dev

# Build for production in the dist/ directory
npm run build
```

# Controls

1. DeviceOrientation: with moving the device, iOS is no longer supported
2. Pointer lock: no mouse, move with keyboard
3. Orbit: with limits
4. TrackBall: loop over the objects

# Geometry

no `Geometry` anymore, [link](https://stackoverflow.com/questions/68000359/three-geometry-is-not-a-constructor)

# BufferGeometry

1. BufferGeometry
2. Float32Array, size = count * no. Vertices * 3, in our example it was a triangle so no. of vertices was 3
3. ArrayAttribute

# Debug

```js
import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import gsap from 'gsap'
import * as dat from 'dat.gui'

/**
 * Debug
 */
const gui = new dat.GUI()

const parameters = {
  color: 0xff0000,
  spin: ()=>{
    gsap.to( mesh.rotation, {duration: 1, y: mesh.rotation.y + 10 })
  },
}

gui
  .addColor(parameters, 'color')
  .onChange( () => {
    material.color.set(parameters.color)
  })
  
gui
  .add(parameters, 'spin')

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
}

window.addEventListener('resize', () => {
  // Update sizes
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight

  // Update camera
  camera.aspect = sizes.width / sizes.height
  camera.updateProjectionMatrix()

  // Update renderer
  renderer.setSize(sizes.width, sizes.height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

window.addEventListener('dblclick', () => {
  const fullscreenElement =
    document.fullscreenElement || document.webkitFullscreenElement

  if (!fullscreenElement) {
    if (canvas.requestFullscreen) {
      canvas.requestFullscreen()
    } else if (canvas.webkitRequestFullscreen) {
      canvas.webkitRequestFullscreen()
    }
  } else {
    if (document.exitFullscreen) document.exitFullscreen()
    else if (document.webkitExitFullscreen) document.webkitExitFullscreen
  }
})

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Object
const geometry = new THREE.BoxGeometry(1, 1, 1, 2, 2, 2)
const material = new THREE.MeshBasicMaterial({ color: parameters.color })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

gui
  .add(mesh.position, 'y')
  .min(-3)
  .max(3)
  .step(0.01)
  .name('elevation')
  
gui
  .add(mesh, 'visible')

gui
  .add(material, 'wireframe')

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
)
camera.position.z = 3
camera.lookAt(mesh.position)
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true // To enable damping update it on each frame

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

// Clock
const clock = new THREE.Clock()

/**
 * Animation
 */
const tick = () => {
  // Clock
  const elapsedTime = clock.getElapsedTime()

  // // Update objects
  // mesh.rotation.y = elapsedTime

  // Update Damping
  controls.update()

  // Render
  renderer.render(scene, camera)

  window.requestAnimationFrame(tick)
}

tick()

```

# Texture, Video 11

* mip mapping: if in the background no need 

1. color
2. alpha: what to see and what not
3. ambient occlusion: shadow affect, needs uv2
4. height: need vertexes, to give 3D effect, wight up black down  
5. normal: more details
6. metalness
7. roughness
8. matcap: it has its own geometry
9. gradient: it has its own geometry

# Geometries. V 12

1. Basic
2. Normal
3. Matcap
4. Depth
5. Lamber
6. Phong
7. Toon
8. Standard
9. Physical

* **uv2** for the Ambient Occlusion Texture

# 3D text

* we will center the text using bounding
* the reason for the bounding is the frustum culling,
* frustum culling: is about rendering or not rendering the object

* we move the geometry not the mesh

# Go Live

1. create an account on vercel 
2. `npm install vercel`
3. ```js
      {
        "scripts": {
          // ...
          "deploy": "vercel --prod"
        },
      }
    ```
4. `npm run deploy`

# Lights

1. Ambient: uniform
2. Directional: from a direction
   
3. Hemisphere: color from the top and granularly to another from the obesity direction
4. Pointer: like a candle, have a distance attribute (when it will dim)
   
5. Rect Area: the box they use in the photo sections
6. Spot: like a flashlight, it has a target that needs to be added to the scene 

* Baking: added to the texture

# Shadow

* core shadow working but the drop not

# Advices

1. no random at the beginning, start with the base shape
2. gui: one by one
3. gui: min is the steps

# Not in the center

1. angel = random * pi * 2
2. radius = 3 + random * 6
3. get the x and y = sin/cos(angel) * radius
4. position

# BufferGeometry

1. geometry
2. Float32Array, positions
3. geometry.setAttribute()
   1. BufferAttribute()

# Practicals

1. BufferGeometry
2. PointMaterial
3. Points, like the mesh

# galaxy affect

1. radius = random * radius => we get a line
2. branchAngle = (i % branches / branches) * 2pi => apply it with sin/cos on position => 3 lines
3. spinAngle = radius * spin ==> how far on the x is how far on the z => add it with branch angle => spin effect

# ray caster

1. origin, V3
2. direction, V3
3. normalize direction
4. set 1 and 2 to the raycaster
5. get the intersectObject/s

# Psychics

1. geometry/Shape
2. material
3. mesh/Body: the attributes added to the body
4. contactMaterial: when two body contacts
   1. ref
   2. the material itself
   3. add it to the world
   4. assign it to the bodies/ assign it to the world

1. create three.js
2. create cannon
3. copy the position||quaternion in tick()

## enhance

```js
const boxGeometry = new THREE.BoxGeometry(1, 1, 1)

const createBox = (width, height, depth, position) => {
    // Three.js
    const mesh = new THREE.Mesh(boxGeometry, material)
    mesh.scale.set(width, height, depth)
    mesh.castShadow = true
    mesh.position.copy(position)
    scene.add(mesh)

    // Cannon
    const shape = new CANNON.Box(new CANNON.Vec3(width / 2, height / 2, depth / 2))
    const body = new CANNON.Body({
        mass: 1,
        position: new CANNON.Vec3(0, 3, 0),
        shape,
    })
    body.position.copy(position)
    world.add(body)

    objectToUpdate.push({
        mesh,
        body
    })
}
```

## performance

1. Naive Broad Phase: like broad search!!
2. Grid Broad Phase: its grid and its neighbors, object moving fast may result a bug
3. SAP Broad Phase: ??, just better 

## Event, Sound

1. many sounds and play them randomly
2. add a delay to not allow more than x sounds per frame
3. scale the sound based on the strength

## constraint in CANNON

# Physics Library

1. CANNON
2. Ammo.js: uses web assembly, more defect, more control
3. PhysiJs: uses ammo and support workers natively

---

# 22 Load Model

1. glTF

## DRACO

1. get the draco file in the static, node_modules\three\examples\jsm\libs\draco

WHEN:

consider the size of the loader, consider the decompression time

## Animation

think of animation as a song, each object have a many songs/animations

1. animation mixer: like the player where you play the song / each song has its player
2. add song/animation to the player/mixer
3. update the mixer ?!

---

# Scroll based, Improvements suggestions

1. more HTML
2. animate:
   1. material
   2. HTML text
   3. particles

---

# Realistic Renderer

1. renderer.physicallyCorrectLights = true