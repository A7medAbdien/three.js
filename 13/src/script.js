import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry'
import * as dat from 'lil-gui'

const myText = 'HaZmY'

/**
 * Base
 */
// Debug
const gui = new dat.GUI()
gui.hide()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()
// const matcapTexture = textureLoader.load('textures/matcaps/4.png')


/**
 * Fonts
 */
const fontLoader = new FontLoader()

fontLoader.load(
    '/fonts/helvetiker_regular.typeface.json',
    (font) => {
        const textGeometry = new TextGeometry(
            myText,
            {
                font: font,
                size: 0.5,
                height: 0.3,
                curveSegments: 12,
                bevelEnabled: true,
                bevelThickness: 0.03,
                bevelSize: 0.02,
                bevelOffset: 0,
                bevelSegment: 5
            }
        )
        textGeometry.center()
        // textGeometry.scale(1.5, 1.5, 1.5)

        const material = new THREE.MeshNormalMaterial()

        const text = new THREE.Mesh(textGeometry, material)
        scene.add(text)

        const donutGeometry = new THREE.TorusGeometry(0.3, 0.2, 20, 45)
        const boxGeometry = new THREE.BoxGeometry(0.5, 0.5, 0.5)
        const group = new THREE.Group()
        scene.add(group)

        const clock = new THREE.Clock()

        const tick = () => {
            let elapsedTime = clock.getElapsedTime() / 1.5

            // Update Text
            text.position.y = Math.sin(elapsedTime) * 0.5
            text.position.x = Math.sin(elapsedTime) * 0.5
            // text.rotation.x = Math.sin(elapsedTime) * 0.5
            text.rotation.y = Math.sin(elapsedTime) * 0.5

            // Update Camera
            camera.position.y = Math.sin(elapsedTime)
            camera.position.x = Math.sin(elapsedTime)

            elapsedTime = -elapsedTime
            // Update Group
            group.position.y = Math.sin(elapsedTime) * 0.5
            group.position.z = Math.sin(elapsedTime) * 0.5
            group.rotation.x = Math.sin(elapsedTime) * 0.5
            group.rotation.z = Math.sin(elapsedTime) * 0.5


            // Update controls
            controls.update()

            // Render
            renderer.render(scene, camera)

            // Call tick again on the next frame
            window.requestAnimationFrame(tick)
        }

        tick()

        for (let i = 0; i < 100; i++) {
            const donut = new THREE.Mesh(donutGeometry, material)

            donut.position.x = ((Math.random() - 0.5) * 15) + 1
            donut.position.y = ((Math.random() - 0.5) * 15) + 1
            donut.position.z = ((Math.random() - 0.5) * 15) + 1

            donut.rotation.x = Math.random() * Math.PI
            donut.rotation.y = Math.random() * Math.PI

            const scale = Math.random()
            donut.scale.set(scale, scale, scale)

            group.add(donut)
        }

        for (let i = 0; i < 50; i++) {
            const donut = new THREE.Mesh(boxGeometry, material)

            donut.position.x = (Math.random() - 0.5) * 15
            donut.position.y = (Math.random() - 0.5) * 15
            donut.position.z = (Math.random() - 0.5) * 15

            donut.rotation.x = Math.random() * Math.PI
            donut.rotation.y = Math.random() * Math.PI

            const scale = Math.random()
            donut.scale.set(scale, scale, scale)

            group.add(donut)
        }
    }
)


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
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 1
camera.position.y = 1
camera.position.z = 8
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () => {
    const elapsedTime = clock.getElapsedTime() / 2

    // camera.lookAt(text.position)

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()