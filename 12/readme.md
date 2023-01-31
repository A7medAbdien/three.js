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

## Basic

```js

```

## Normal

```js

```

## Matcap

```js

```

## Depth

```js

```

## Lamber

```js

```

## Phong

```js

```

## Toon

```js

```

## Standard

```js

```

## Physical

```js

```


* **uv2** for the Ambient Occlusion Texture