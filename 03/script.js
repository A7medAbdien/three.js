// Scene
const scene = new THREE.Scene()

// Red cube
const geometry = new THREE.BoxGeometry(1,1,1)
const material = new THREE.MeshBasicMaterial({color: 0xff0000})
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

// Sizes of view part
const sizes = {
    width: 800,
    height: 600
}

// Camera, POV
const camera = new THREE.PerspectiveCamera(
    75, // 75 is field of view (fov)
    sizes.width / sizes.height // the aspect ratio
) 
camera.position.z = 3
// camera.position.x = 3
// camera.position.y = 3
scene.add(camera)

// Renderer
const canvas = document.querySelector('canvas.webgl')
// console.log(canvas)
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)