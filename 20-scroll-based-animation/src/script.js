import * as THREE from 'three'
import * as dat from 'lil-gui'

/**
 * Debug
 */
const gui = new dat.GUI()

const parameters = {
    materialColor: '#ffeded',
    particlesMaterialColor: '#ffeded'
}
parameters.particlesSize = 0.03

gui
    .addColor(parameters, 'materialColor')
    .onChange(() => {
        material.color.set(parameters.materialColor)
        particlesMaterial.color.set(parameters.materialColor)
    })

gui
    .addColor(parameters, 'particlesMaterialColor')
    .onChange(() => {
        particlesMaterial.color.set(parameters.particlesMaterialColor)
    })

gui
    .add(parameters, 'particlesSize')
    .min(0.01)
    .max(0.1)
    .step(0.01)
    .onFinishChange(() => {
        particlesMaterial.size.set(parameters.particlesSize)
    })

/**
 * Loader
 */
const textureLoader = new THREE.TextureLoader()
const gradientTexture = textureLoader.load('/textures/gradients/3.jpg')
gradientTexture.magFilter = THREE.NearestFilter

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Objects
 */
// Material
const material = new THREE.MeshToonMaterial({
    color: parameters.materialColor,
    gradientMap: gradientTexture
})

// Meshes
const objetDistance = 4
const mesh1 = new THREE.Mesh(
    new THREE.TorusGeometry(1, 0.4, 16, 60),
    material
)
const mesh2 = new THREE.Mesh(
    new THREE.ConeGeometry(1, 2, 32),
    material
)
const mesh3 = new THREE.Mesh(
    new THREE.TorusKnotGeometry(0.8, 0.35, 100, 16),
    material
)

const sectionMeshes = [mesh1, mesh2, mesh3]

for (let i = 0; i < sectionMeshes.length; i++) {
    sectionMeshes[i].position.x = (i % 2) ? -2 : 2
    sectionMeshes[i].position.y = - objetDistance * i
}

scene.add(mesh1, mesh2, mesh3)

/**
 * Particles
 */
const particlesCount = 200
const positions = new Float32Array(particlesCount * 3)
for (let i = 0; i < positions.length; i++) {
    positions[i * 3 + 0] = (Math.random() - 0.5) * 10
    positions[i * 3 + 1] = objetDistance * 0.5 - Math.random() * objetDistance * sectionMeshes.length
    positions[i * 3 + 2] = (Math.random() - 0.5) * 10
}

const particlesGeometry = new THREE.BufferGeometry()
particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))

const particlesMaterial = new THREE.PointsMaterial({
    color: parameters.particlesMaterialColor,
    sizeAttenuation: true,
    size: parameters.particlesSize
})
const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial)
scene.add(particlesMesh)

/**
 * Lights
 */
const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
directionalLight.position.set(1, 1, 0)
scene.add(directionalLight)

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

/**
 * Camera
 */
// Group
const cameraGroup = new THREE.Group()
scene.add(cameraGroup)

// Base camera
const camera = new THREE.PerspectiveCamera(35, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 6
cameraGroup.add(camera)

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Scroll
 */
let scrollY = window.scrollY

window.addEventListener('scroll', () => {
    scrollY = window.scrollY
    // console.log(- (scrollY / sizes.height) * objetDistance);
})

/**
 * Cursor
 */
const cursor = {}
cursor.x = 0
cursor.y = 0

window.addEventListener('mousemove', (event) => {
    cursor.x = event.clientX / sizes.width - .5
    cursor.y = - (event.clientY / sizes.width - .5)
})


/**
 * Animate
 */
const clock = new THREE.Clock()
let oldElapsedTime = 0

const tick = () => {
    const elapsedTime = clock.getElapsedTime()
    const deltaTime = elapsedTime - oldElapsedTime
    oldElapsedTime = elapsedTime

    // Animate Camera
    camera.position.y = - (scrollY / sizes.height) * objetDistance

    const parallaxX = cursor.x * 0.5
    const parallaxY = cursor.y * 0.5
    cameraGroup.position.x += (parallaxX - cameraGroup.position.x) * deltaTime * 5
    cameraGroup.position.y += (parallaxY - cameraGroup.position.y) * deltaTime * 5

    // Animate Meshes
    for (const mesh of sectionMeshes) {
        mesh.rotation.x = elapsedTime * .1
        mesh.rotation.y = elapsedTime * .12
    }

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()