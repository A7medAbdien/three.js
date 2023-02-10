import * as THREE from 'three'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry'
import * as dat from 'lil-gui'

const myData = {
    text: 'HaPPy Birthday \n    :) HaZmY (:',
    noDonut: 100,
    noBox: 100,
}

/**
 * Cursor
 */
const cursor = {
    x: 0,
    y: 0
}
window.addEventListener('mousemove', e => {
    cursor.x = e.clientX / sizes.width - 0.5
    cursor.y = -(e.clientY / sizes.height - 0.5)
    // console.log(cursor)
})
window.addEventListener('touchmove', e => {
    cursor.x = e.touches[0].clientX / sizes.width - 0.5
    cursor.y = -(e.touches[0].clientY / sizes.height - 0.5)
    // console.log(e.touches[0])
})

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
const backgroundTexture = textureLoader.load('s.jpg')
scene.background = backgroundTexture

/**
 * Material
 */
const material = new THREE.MeshNormalMaterial()

/**
 * Fonts
 */
let text = null
const fontLoader = new FontLoader()
fontLoader.load(
    '/fonts/helvetiker_regular.typeface.json',
    (font) => {
        const textGeometry = new TextGeometry(
            myData.text,
            {
                font: font,
                size: 0.5,
                height: 0.5,
                curveSegments: 20,
                bevelEnabled: true,
                bevelThickness: 0.03,
                bevelSize: 0.02,
                bevelOffset: 0,
                bevelSegment: 5
            }
        )
        textGeometry.center()
        // textGeometry.scale(1.5, 1.5, 1.5)

        text = new THREE.Mesh(textGeometry, material)
        scene.add(text)
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
// Group camera
const cameraGroup = new THREE.Group()
scene.add(cameraGroup)

// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 4
cameraGroup.add(camera)

/**
 * Object
 */
const donutGeometry = new THREE.TorusGeometry(0.1, 0.05, 20, 45)
const boxGeometry = new THREE.BoxGeometry(0.3, 0.3, 0.3)
const group = new THREE.Group()
scene.add(group)

for (let i = 0; i < myData.noDonut; i++) {
    const donut = new THREE.Mesh(donutGeometry, material)

    donut.position.x = ((Math.random() - 0.5) * 10)
    donut.position.y = ((Math.random() - 0.5) * 10)
    donut.position.z = ((Math.random() - 0.5) * 10)

    donut.rotation.x = Math.random() * Math.PI
    donut.rotation.y = Math.random() * Math.PI

    // const scale = Math.random()
    // donut.scale.set(scale, scale, scale)

    group.add(donut)
}

for (let i = 0; i < myData.noBox; i++) {
    const donut = new THREE.Mesh(boxGeometry, material)

    donut.position.x = ((Math.random() - 0.5) * 20)
    donut.position.y = ((Math.random() - 0.5) * 20)
    donut.position.z = ((Math.random() - 0.5) * 20)

    donut.rotation.x = Math.random() * Math.PI
    donut.rotation.y = Math.random() * Math.PI

    // const scale = Math.random()
    // donut.scale.set(scale, scale, scale)

    group.add(donut)
}

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
let oldElapsedTime = 0

let entered = false
let enteringValue

const tick = () => {
    const elapsedTimeDiv2 = clock.getElapsedTime() / 2
    const elapsedTime = clock.getElapsedTime()
    const deltaTime = elapsedTime - oldElapsedTime
    oldElapsedTime = elapsedTime

    // Animate camera
    if (!entered) {
        enteringValue = - Math.tan(elapsedTimeDiv2 + Math.PI / 2)
        if (Math.abs(enteringValue) < 0.1) {
            entered = true
        }
        camera.position.x = - enteringValue
        camera.position.y = enteringValue
    }
    camera.position.z = Math.cos(elapsedTimeDiv2) + 4
    camera.lookAt(new THREE.Vector3())
    // console.log(camera.position.z);

    // Update camera with curser
    const parallaxX = cursor.x * Math.PI * 2.5
    const parallaxY = cursor.y * Math.PI * 2.5
    cameraGroup.position.x += (parallaxX * 2 - cameraGroup.position.x) * deltaTime * 2
    cameraGroup.position.y += (parallaxY * 2 - cameraGroup.position.y) * deltaTime * 2

    // Animate Group
    group.rotation.x = Math.cos(elapsedTimeDiv2 / 2)
    group.rotation.y = - Math.cos(elapsedTimeDiv2 / 2)


    // Update Text
    if (text !== null) {
        text.position.y = Math.cos(elapsedTimeDiv2) * 0.5
        text.rotation.x = Math.sin(elapsedTimeDiv2 * 0.5) * 0.5
        text.rotation.z = Math.cos(elapsedTimeDiv2) * 0.5
    }

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()