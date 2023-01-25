import * as THREE from 'three'

// Scene
const scene = new THREE.Scene()

// Object
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
const mesh = new THREE.Mesh(geometry, material)
// mesh.position.x = 0.7
// mesh.position.y = - 0.6
// mesh.position.z = 1
mesh.position.set(0.7, -0.6, 1)
scene.add(mesh)


// Axes helper
const axesHelper = new THREE.AxesHelper(2)
scene.add(axesHelper)


// length is the length between the center of the scene and the object
// console.log(mesh.position.length())


// will reduce the vector length to be 1
// mesh.position.normalize()


// Sizes
const sizes = {
    width: 800,
    height: 600
}


// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3
// camera.position.set(1, 1, 3)
scene.add(camera)


// to get the distance from the camera
console.log(mesh.position.distanceTo(camera.position))


// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('canvas.webgl')
})
renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)