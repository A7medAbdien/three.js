import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'


/**
 * Textures
 */
const loadingManager = new THREE.LoadingManager()

loadingManager.onStart = () => {
  console.log('onStart');
}

loadingManager.onLoaded = () => {
  console.log('onLoaded');
}

loadingManager.onProgress = () => {
  console.log('onProgress');
}

loadingManager.onError = () => {
  console.log('onError');
}


const textureLoader = new THREE.TextureLoader(loadingManager)
// const colorTexture = textureLoader.load('textures/checkerboard-8x8.png')
const colorTexture = textureLoader.load('textures/minecraft.png')
// const colorTexture = textureLoader.load('textures/checkerboard-8x8.png')
const alphaTexture = textureLoader.load('textures/door/alpha.jpg')
const heightTexture = textureLoader.load('textures/door/height.jpg')
const normalTexture = textureLoader.load('textures/door/normal.jpg')
const ambientOcclusionTexture = textureLoader.load('textures/door/ambientOcclusion.jpg')
const metalnessTexture = textureLoader.load('textures/door/metalness.jpg')
const roughnessTexture = textureLoader.load('textures/door/roughness.jpg')

// colorTexture.repeat.x = 2
// colorTexture.repeat.y = 3
// colorTexture.wrapS = THREE.MirroredRepeatWrapping
// colorTexture.wrapT = THREE.MirroredRepeatWrapping

// colorTexture.offset.x = 0.5
// colorTexture.offset.y = 0.5

// colorTexture.rotation = Math.PI / 4
// colorTexture.center.x = 0.5
// colorTexture.center.y = 0.5

colorTexture.generateMipmaps =  false
// colorTexture.minFilter = THREE.NearestFilter
colorTexture.magFilter = THREE.NearestFilter

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
const material = new THREE.MeshBasicMaterial({ map: colorTexture })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

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
