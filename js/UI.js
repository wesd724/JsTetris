import { canvas, rect } from "./canvas.js";

const background = () => {
    document.body.appendChild(canvas);
    canvas.width = 450;
    canvas.height = 700;
    canvas.style.backgroundColor = "#F7C3D9";
}

const wall = () => {
    const thickness = 20;
    rect(0, 0, thickness, canvas.height, "#334443", 0, "#34656d");
    rect(canvas.width - thickness, 0, thickness, canvas.height, "#334443", 0, "#34656d");
    rect(thickness, canvas.height - (thickness + 10), canvas.width - thickness * 2, thickness + 10, "#34656d", 0, "#334443");
}

export { background, wall };

