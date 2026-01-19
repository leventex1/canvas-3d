import { calcPerspectiveProjection, convertSceneToScreen, convertScreenToScene, drawLine, drawPoint, translatePoint, type Context, type Point } from "./renderer.js"

console.log("Hello Canvas3D!")

const appCanvas = document.getElementById("app-canvas") as HTMLCanvasElement
const context2D = appCanvas.getContext("2d") as CanvasRenderingContext2D

appCanvas.width = window.innerWidth
appCanvas.height = window.innerHeight

let WIDTH = appCanvas.width
let HEIGHT = appCanvas.height
let FPS = 60
let BACKGROUND = "rgb(25, 25, 25)"

const aspectRatio = WIDTH / HEIGHT
const context: Context = {
    screenSpaceMin: { x: 0, y: 0, z: 0 },
    screenSpaceMax: { x: WIDTH, y: HEIGHT, z: 1 },
    sceneSpaceMin: { x: -1 * aspectRatio, y: 1, z: 0 },
    sceneSpaceMax: { x: 1 * aspectRatio, y: -1, z: 1 },
}

let vertices: Array<Point> = [
    { x: -0.25, y: -0.25, z: -0.25 },
    { x: -0.25, y: +0.25, z: -0.25 },
    { x: +0.25, y: +0.25, z: -0.25 },
    { x: +0.25, y: -0.25, z: -0.25 },

    { x: -0.25, y: -0.25, z: +0.25 },
    { x: -0.25, y: +0.25, z: +0.25 },
    { x: +0.25, y: +0.25, z: +0.25 },
    { x: +0.25, y: -0.25, z: +0.25 },
]
let translation = { x: 0, y: 0, z: 1 }
let translationTop = { x: 0, y: 0, z: 1 }
const lineIndices: Array<[number, number]> = [
    [0, 1],
    [1, 2],
    [2, 3],
    [3, 0],

    [4, 5],
    [5, 6],
    [6, 7],
    [7, 4],

    [0, 4],
    [1, 5],
    [2, 6],
    [3, 7]
]

const timeout = 1000 / FPS
let changeOfAngle = 0 // 2 * Math.PI / (8 * FPS)
function render() {
    context2D.fillStyle = BACKGROUND
    context2D.fillRect(0, 0, appCanvas.width, appCanvas.height)

    const cos = Math.cos(changeOfAngle)
    const sin = Math.sin(changeOfAngle)

    for (let i = 0; i < vertices.length; i++) {
        const x = vertices[i]!.x
        const z = vertices[i]!.z
        vertices[i]!.x = +cos * x + sin * z
        vertices[i]!.z = -sin * x + cos * z
    }

    for (const [i, j] of lineIndices) {
        const pointI = translatePoint(vertices[i]!, i >= 4 ? translation : translationTop)
        const pointJ = translatePoint(vertices[j]!, j >= 4 ? translation : translationTop)
        const screenPoint1 = convertSceneToScreen(context, calcPerspectiveProjection(pointI))
        const screenPoint2 = convertSceneToScreen(context, calcPerspectiveProjection(pointJ))
        drawLine(context2D, screenPoint1, screenPoint2)
    }
}

function onMouseMove(event: MouseEvent) {
    const scenePoint = convertScreenToScene(context, { x: event.clientX, y: event.clientY, z: 0 })
    translationTop.x = scenePoint.x * 0.1
    translationTop.y = scenePoint.y * 0.1
}

setInterval(render, timeout)
window.onmousemove = onMouseMove
