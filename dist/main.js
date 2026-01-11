console.log("Hello Canvas3D!");
const appCanvas = document.getElementById("app-canvas");
const context2D = appCanvas.getContext("2d");
appCanvas.width = window.innerWidth;
appCanvas.height = window.innerHeight;
let WIDTH = appCanvas.width;
let HEIGHT = appCanvas.height;
let FPS = 60;
let BACKGROUND = "rgb(25, 25, 25)";
let RSIZE = 50;
function drawRect(rect) {
    context2D.beginPath();
    context2D.strokeStyle = "green";
    context2D.lineWidth = 2;
    context2D.fillStyle = BACKGROUND;
    context2D.rect(rect.loc.x, rect.loc.y, rect.width, rect.height);
    context2D.stroke();
    context2D.fill();
}
function drawLine(p1, p2) {
    context2D.beginPath();
    context2D.strokeStyle = "green";
    context2D.lineWidth = 2;
    context2D.moveTo(p1.x, p1.y);
    context2D.lineTo(p2.x, p2.y);
    context2D.stroke();
}
function getRectPoints(rect) {
    return [
        rect.loc,
        { x: rect.loc.x + rect.width, y: rect.loc.y },
        { x: rect.loc.x + rect.width, y: rect.loc.y + rect.height },
        { x: rect.loc.x, y: rect.loc.y + rect.height }
    ];
}
let towerStack = [
    { loc: { x: WIDTH / 2 - RSIZE / 2, y: HEIGHT / 2 - RSIZE / 2 }, width: RSIZE, height: RSIZE },
    { loc: { x: WIDTH / 2, y: HEIGHT / 2 }, width: RSIZE, height: RSIZE },
];
function render() {
    context2D.fillStyle = BACKGROUND;
    context2D.fillRect(0, 0, appCanvas.width, appCanvas.height);
    for (let i = 0; i < towerStack.length; i++) {
        drawRect(towerStack[i]);
        if (i + 1 < towerStack.length) {
            const points1 = getRectPoints(towerStack[i]);
            const points2 = getRectPoints(towerStack[i + 1]);
            for (let j = 0; j < 4; j++)
                drawLine(points1[j], points2[j]);
        }
    }
}
setInterval(render, 1000 / FPS);
export {};
//# sourceMappingURL=main.js.map