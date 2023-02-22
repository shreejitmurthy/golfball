import './style.css'
import * as THREE from 'three'
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
// import * as dat from 'dat.gui'

const textureLoader = new THREE.TextureLoader();
const ballTexture = textureLoader.load('textures/golfMap.jpg')

// const gui = new dat.GUI()
const canvas = document.querySelector('canvas.webgl')
const scene = new THREE.Scene()


const geometry = new THREE.SphereGeometry(.5, 64, 64);
const material = new THREE.MeshStandardMaterial()
material.metalness = 0.7
material.roughness = 0.2
material.color = new THREE.Color(0xffffff)
material.normalMap = ballTexture

const sphere = new THREE.Mesh(geometry,material)
scene.add(sphere)

const pointLight = new THREE.PointLight(0xffffff, 0.1)
pointLight.position.x = 0.5
pointLight.position.y = 3
pointLight.position.z = 4
pointLight.intensity = 0.1
scene.add(pointLight)


const pointLight2 = new THREE.PointLight(0x0000ff)
pointLight2.position.set(-20.4, -7.1, -3.6); // 0, -7.1, 4
pointLight2.intensity = 1;
pointLight2.distance = 100;
scene.add(pointLight2)

const pointLight3 = new THREE.PointLight(0xff0000)
pointLight3.position.set(20.4, 7.1, -3.6); // 0, -7.1, 4
pointLight3.intensity = 1;
pointLight3.distance = 100;
scene.add(pointLight3)

const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 0
camera.position.y = 0
camera.position.z = 2
scene.add(camera)

// Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

const renderer = new THREE.WebGLRenderer({
	canvas: canvas,
	alpha: false
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

document.addEventListener('mousemove', onDocumentMouseMove)

let mouseX = 0;
let mouseY = 0;

let targetX = 0;
let targetY = 0;

const windowX = window.innerWidth / 2;
const windowY = window.innerHeight / 2;

function onDocumentMouseMove(event) {
    mouseX = (event.clientX - windowX)
    mouseY = (event.clientY - windowY)
}


const clock = new THREE.Clock()

const tick = () =>
{

    targetX = mouseX * 0.001
    targetY = mouseY * 0.001

    const elapsedTime = clock.getElapsedTime()

    // sphere.rotation.y = .5 * elapsedTime

    sphere.rotation.y += 0.5 * (targetX - sphere.rotation.y)
    sphere.rotation.x += 0.05 * (targetY - sphere.rotation.x)
    sphere.rotation.z += 0.05 * (targetY - sphere.rotation.x)

    // Update Orbital Controls
    // controls.update()

    renderer.render(scene, camera)

    window.requestAnimationFrame(tick)
}

tick()
