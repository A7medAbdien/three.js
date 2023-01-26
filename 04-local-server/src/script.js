import * as THREE from 'three'
import gsap from 'gsap'

// Scene
const scene = new THREE.Scene()

// Object
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

// Sizes
const sizes = {
    width: 800,
    height: 600
}

// Camera
// const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)

const aspectRatio = sizes.width / sizes.height
const camera = new THREE.OrthographicCamera(- 1 * aspectRatio, 1 * aspectRatio, 1, -1, 0.1, 100)
camera.position.set(2,2,2)
camera.lookAt(mesh.position)
scene.add(camera)

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('canvas.webgl')
})
renderer.setSize(sizes.width, sizes.height)

// Clock
const clock = new THREE.Clock()


// Animation
const tick = () => 
{
    // Clock
    const elapsedTime = clock.getElapsedTime()
    
    // Update objects
    mesh.rotation.y = elapsedTime 

    // Render
    renderer.render(scene, camera)

    window.requestAnimationFrame(tick)
}

tick()