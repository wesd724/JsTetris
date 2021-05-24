import { canvas, ctx } from "./canvas.js";
import { drawMap } from "./map.js";
import { downBlock } from "./block.js";
const paint = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawMap();
}

const render = () => {
    downBlock();
    paint();
}

export { render as default, paint };