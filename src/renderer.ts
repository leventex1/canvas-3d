
export interface Point {
    x: number
    y: number
    z: number
}

export interface Context {
    screenSpaceMin: Point   // Min coordinates of the screen bounding box
    screenSpaceMax: Point   // Max coordinates of the screen bounding box
    sceneSpaceMin: Point    // Min coordinates of the scene bounding box
    sceneSpaceMax: Point    // Max coordinates of the scene bounding box
}


export const calcPerspectiveProjection = (point: Point): Point => {
    return {
        x: point.x / point.z,
        y: point.y / point.z,
        z: 0
    }
}

export const convertSceneToScreen = (context: Context, point: Point): Point => {
    const screenWidth = context.screenSpaceMax.x - context.screenSpaceMin.x
    const screenHeight = context.screenSpaceMax.y - context.screenSpaceMin.y
    const screenDepth = context.screenSpaceMax.z - context.screenSpaceMin.z
    const sceneWidth = context.sceneSpaceMax.x - context.sceneSpaceMin.x
    const sceneHeight = context.sceneSpaceMax.y - context.sceneSpaceMin.y
    const sceneDepth = context.sceneSpaceMax.z - context.sceneSpaceMin.z

    return {
        x: context.screenSpaceMin.x + (point.x - context.sceneSpaceMin.x) / sceneWidth * screenWidth,
        y: context.screenSpaceMin.y + (point.y - context.sceneSpaceMin.y) / sceneHeight * screenHeight,
        z: context.screenSpaceMin.x + (point.z - context.sceneSpaceMin.z) / sceneDepth * screenDepth,
    }
}


export interface DrawStyle {
    size: number
    strokeColor: string
    fillColor: string
}
export const drawPoint = (
    renderContext: CanvasRenderingContext2D,
    point: Point,
    drawStyle: DrawStyle = { size: 10, strokeColor: "green", fillColor: "green" }
): void => {
    renderContext.beginPath()
    renderContext.strokeStyle = drawStyle.strokeColor
    renderContext.fillStyle = drawStyle.fillColor
    renderContext.lineWidth = 2 
    renderContext.rect(
        point.x - drawStyle.size / 2,
        point.y - drawStyle.size / 2,
        drawStyle.size,
        drawStyle.size
    )
    renderContext.stroke()
    renderContext.fill()
}
