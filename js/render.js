import { canvas, ctx } from "./canvas.js";
import { blockCoordinate } from "./block.js";

const paint = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

const render = () => {
    paint();
    blockCoordinate();
}

export default render;